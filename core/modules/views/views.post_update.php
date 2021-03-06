<?php

/**
 * @file
 * Post update functions for Views.
 */

use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\views\Entity\View;
use Drupal\views\Views;

/**
 * Update the cacheability metadata for all views.
 */
function views_post_update_update_cacheability_metadata() {
  // Load all views.
  $views = \Drupal::entityManager()->getStorage('view')->loadMultiple();

  /* @var \Drupal\views\Entity\View[] $views */
  foreach ($views as $view) {
    $displays = $view->get('display');
    foreach (array_keys($displays) as $display_id) {
      $display =& $view->getDisplay($display_id);
      // Unset the cache_metadata key, so all cacheability metadata for the
      // display is recalculated.
      unset($display['cache_metadata']);
    }
    $view->save();
  }

}

/**
 * Update some views fields that were previously duplicated.
 */
function views_post_update_cleanup_duplicate_views_data() {
  $config_factory = \Drupal::configFactory();
  $ids = [];
  $message = NULL;
  $data_tables = [];
  $base_tables = [];
  $revision_tables = [];
  $entities_by_table = [];
  $duplicate_fields = [];
  $handler_types = Views::getHandlerTypes();

  /** @var \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager */
  $entity_type_manager = \Drupal::service('entity_type.manager');
  // This will allow us to create an index of all entity types of the site.
  foreach ($entity_type_manager->getDefinitions() as $entity_type_id => $entity_type) {
    // Store the entity keyed by base table. If it has a data table, use that as
    // well.
    if ($data_table = $entity_type->getDataTable()) {
      $entities_by_table[$data_table] = $entity_type;
    }
    if ($base_table = $entity_type->getBaseTable()) {
      $entities_by_table[$base_table] = $entity_type;
    }

    // The following code basically contains the same kind of logic as
    // \Drupal\Core\Entity\Sql\SqlContentEntityStorage::initTableLayout() to
    // prefetch all tables (base, data, revision, and revision data).
    $base_tables[$entity_type_id] = $entity_type->getBaseTable() ?: $entity_type->id();
    $revisionable = $entity_type->isRevisionable();

    $revision_table = '';
    if ($revisionable) {
      $revision_table = $entity_type->getRevisionTable() ?: $entity_type->id() . '_revision';
    }
    $revision_tables[$entity_type_id] = $revision_table;

    $translatable = $entity_type->isTranslatable();
    $data_table = '';
    // For example the data table just exists, when the entity type is
    // translatable.
    if ($translatable) {
      $data_table = $entity_type->getDataTable() ?: $entity_type->id() . '_field_data';
    }
    $data_tables[$entity_type_id] = $data_table;

    $duplicate_fields[$entity_type_id] = array_intersect_key($entity_type->getKeys(), array_flip(['id', 'revision', 'bundle']));
  }

  foreach ($config_factory->listAll('views.view.') as $view_config_name) {
    $changed = FALSE;
    $view = $config_factory->getEditable($view_config_name);

    $displays = $view->get('display');
    if (isset($entities_by_table[$view->get('base_table')])) {
      $entity_type = $entities_by_table[$view->get('base_table')];
      $entity_type_id = $entity_type->id();
      $data_table = $data_tables[$entity_type_id];
      $base_table = $base_tables[$entity_type_id];
      $revision_table = $revision_tables[$entity_type_id];

      if ($data_table) {
        foreach ($displays as $display_name => &$display) {
          foreach ($handler_types as $handler_type) {
            if (!empty($display['display_options'][$handler_type['plural']])) {
              foreach ($display['display_options'][$handler_type['plural']] as $field_name => &$field) {
                $table = $field['table'];
                if (($table === $base_table || $table === $revision_table) && in_array($field_name, $duplicate_fields[$entity_type_id])) {
                  $field['table'] = $data_table;
                  $changed = TRUE;
                }
              }
            }
          }
        }
      }
    }

    if ($changed) {
      $view->set('display', $displays);
      $view->save();
      $ids[] = $view->get('id');
    }
  }
  if (!empty($ids)) {
    $message = new TranslatableMarkup('Updated tables for field handlers for views: @ids', ['@ids' => implode(', ', array_unique($ids))]);
  }

  return $message;
}

/**
 * Include field formatter dependencies in a view when the formatter is used.
 */
function views_post_update_field_formatter_dependencies() {
  $views = View::loadMultiple();
  array_walk($views, function(View $view) {
    $view->save();
  });
}

/**
 * Fix views with dependencies on taxonomy terms that don't exist.
 */
function views_post_update_taxonomy_index_tid() {
  $views = View::loadMultiple();
  array_walk($views, function(View $view) {
    $old_dependencies = $view->getDependencies();
    $new_dependencies = $view->calculateDependencies()->getDependencies();
    if ($old_dependencies !== $new_dependencies) {
      $view->save();
    }
  });
}

/**
 * Fix views with serializer dependencies.
 */
function views_post_update_serializer_dependencies() {
  $views = View::loadMultiple();
  array_walk($views, function(View $view) {
    $old_dependencies = $view->getDependencies();
    $new_dependencies = $view->calculateDependencies()->getDependencies();
    if ($old_dependencies !== $new_dependencies) {
      $view->save();
    }
  });
}

/**
 * Set all boolean filter values to strings.
 */
function views_post_update_boolean_filter_values() {
  $config_factory = \Drupal::configFactory();
  foreach ($config_factory->listAll('views.view.') as $view_config_name) {
    $view = $config_factory->getEditable($view_config_name);
    $save = FALSE;
    foreach ($view->get('display') as $display_name => $display) {
      if (isset($display['display_options']['filters'])) {
        foreach ($display['display_options']['filters'] as $filter_name => $filter) {
          if (isset($filter['plugin_id']) && $filter['plugin_id'] === 'boolean') {
            $new_value = FALSE;
            // Update all boolean and integer values to strings.
            if ($filter['value'] === TRUE || $filter['value'] === 1) {
              $new_value = '1';
            }
            elseif ($filter['value'] === FALSE || $filter['value'] === 0) {
              $new_value = '0';
            }
            if ($new_value !== FALSE) {
              $view->set("display.$display_name.display_options.filters.$filter_name.value", $new_value);
              $save = TRUE;
            }
          }
        }
      }
    }
    if ($save) {
      $view->save();
    }
  }
}

/**
 * Rebuild caches to ensure schema changes are read in.
 */
function views_post_update_grouped_filters() {
  // Empty update to cause a cache rebuild so that the schema changes are read.
}

/**
 * Fix table names for revision metadata fields.
 */
function views_post_update_revision_metadata_fields() {
  // The table names are fixed automatically in
  // \Drupal\views\Entity\View::preSave(), so we just need to re-save all views.
  $views = View::loadMultiple();
  array_walk($views, function(View $view) {
    $view->save();
  });
}

/**
 * Fix views containing entity fields with an empty group column value set.
 */
function views_post_update_empty_entity_field_group_column() {
  $views = View::loadMultiple();
  /** @var \Drupal\Core\Entity\EntityFieldManagerInterface $entity_field_manager */
  $entity_field_manager = \Drupal::service('entity_field.manager');

  array_walk($views, function (View $view) use ($entity_field_manager) {
    $save = FALSE;
    $displays = $view->get('display');
    foreach ($displays as $display_name => &$display) {
      if (isset($display['display_options']['fields'])) {
        foreach ($display['display_options']['fields'] as $field_name => &$field) {
          // Only update fields that have group_column set to an empty value.
          if (!empty($field['plugin_id']) && $field['plugin_id'] == 'field' && isset($field['group_column']) && empty($field['group_column'])) {
            // Attempt to load the field storage definition of the field.
            $executable = $view->getExecutable();
            $executable->setDisplay($display_name);
            /** @var \Drupal\views\Plugin\views\field\FieldHandlerInterface $field_handler */
            $field_handler = $executable->getDisplay()->getHandler('field', $field['id']);
            if ($entity_type_id = $field_handler->getEntityType()) {
              $field_storage_definitions = $entity_field_manager->getFieldStorageDefinitions($entity_type_id);

              $field_storage = NULL;
              if (isset($field['field']) && isset($field_storage_definitions[$field['field']])) {
                $field_storage = $field_storage_definitions[$field['field']];
              }
              // If a main property is defined use that as a default.
              if (!empty($field_storage) && $field_storage->getMainPropertyName()) {
                $save = TRUE;
              }
              elseif (!empty($field_storage)) {
                $save = TRUE;
              }
            }
          }
        }
      }
    }
    if ($save) {
      $view->save();
    }
  });
}
