// (function ($, Drupal) {
//   Drupal.behaviors.myModuleBehavior = {
//     attach: function (context, settings) {
//       $('input.myCustomBehavior', context).once('myCustomBehavior').each(function () {
//         // Apply the myCustomBehaviour effect to the elements only once.
//         $(context).find('.menu .menu-item--expanded').hide();
//       });
//     }
//   };
// })(jQuery, Drupal);

// (function ($) {
//   Drupal.behaviors.myModuleBehavior = {
//     attach: function (context, settings) {
//       // Behavior вызывается несколько раз на странице, не забывайте использовать функцию .once().
//       // $(context).find(".menu > .menu-item--expanded > .menu").once().hide();
//       $(".menu > .menu-item--expanded ").once().hover(function () {
//           $(".menu > .menu-item--expanded > .menu").show(), function () {
//             $(".menu > .menu-item--expanded > .menu").hide()
//         }
//       });
//     }
//   };
// })(jQuery);
(function ($) {
    Drupal.behaviors.myBehavior = {
        attach: function (context, settings) {

            // Using once() with more complexity.
            $('.field--name-field-currency-language', context).once('mySecondBehavior').each(function () {
                $(this).click(function () {
                    $('#block-languages').toggle();
                })
            })
        }
    }
})(jQuery);