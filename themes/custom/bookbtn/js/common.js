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
            });

            // Inline popups


        }
    };

    Drupal.behaviors.myBehavior_one = {
        attach: function (context, settings) {

            $('article[data-quickedit-entity-id="commerce_product/12"] .field--name-field-more-information').magnificPopup({
                items: {
                    src: 'article[data-quickedit-entity-id="commerce_product/12"].product-hidden',
                    type: 'inline',
                },
                // callbacks: {
                //     beforeOpen: function() {
                //         var elemToClass = $('article[data-quickedit-entity-id="commerce_product/12"]');
                //         var $triggerEl = $(elemToClass.st.el),
                //             newClass = $triggerEl.data("test");
                //         if (newClass) {
                //             elemToClass.st.mainClass = elemToClass.st.mainClass + ' ' + newClass;
                //         }
                //     }
                // },
                mainClass: 'popup-block',
                closeOnBgClick: true
            });

            // $('article[data-quickedit-entity-id="commerce_product/12"]').css('display', 'block');

            $('article[data-quickedit-entity-id="commerce_product/13"] .field--name-field-more-information').magnificPopup({
                items: {
                    src: 'article[data-quickedit-entity-id="commerce_product/13"].product-hidden',
                    type: 'inline',
                },
                // callbacks: {
                //     beforeOpen: function() {
                //         // Will fire when this exact popup is opened
                //         // this - is Magnific Popup object
                //         $('.product-hidden').css('display', 'none');
                //     },
                // afterClose: function() {
                //     // Will fire when popup is closed
                //     $('.field--name-field-image').slick();
                // }
                // // e.t.c.
                mainClass: 'popup-block',
                closeOnBgClick: true
            });
            // $('article[data-quickedit-entity-id="commerce_product/13"]').removeClass('mfp-hide');
        }
    };




    Drupal.behaviors.slickBehavior = {
        attach: function (context, settings) {

            // Using once() with more complexity.

            $(context).once().each(function () {
                $('article:not(.product-hidden) .field--name-field-image').slick({
                    dots: true,
                    infinite: true,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                });
            });

        }
    }



    Drupal.behaviors.popupBehavior = {
        attach: function (context, settings) {

            // Using once() with more complexity.
            $('.product-hidden', context).once().each(function () {
                // hide popup window
                $(this).addClass('mfp-hide');

                // remove slick slider
                // $('.product-hidden .field--name-field-image').slick('unslick');
            });
        }
    };

})(jQuery);