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

            // $('.field--name-title').on('click', function () {
            //     $('.room-conf').magnificPopup({
            //         // type: 'inline'
            //     });
            // });

            // $(".field--name-title").click(function(){
            //     $(".field--name-field-bathroom").magnificPopup({ type:'inline', midClick: true})
            // })

            // $('.field--name-field-more-information').click(function () {
            //     // var attrArticle = $(this).parent("article").attr("data-quickedit-entity-id");
            //     // var attrArticle = 'data-quickedit-entity-id=' + attrArticle;
            //     // $('article').hasAttribute(attrArticle).hasAttribute('data-quickedit-entity-instance-id="1"').;
            //     $(this).closest("article").addClass('test');
            //
            //
            // })
            $( 'article[data-quickedit-entity-id="commerce_product/12"] .field--name-field-more-information').magnificPopup({
                items: {
                    src: 'article[data-quickedit-entity-id="commerce_product/12"]',
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
                closeBtnInside: true
            });
            // $('article[data-quickedit-entity-id="commerce_product/12"]').css('display', 'block');

            $( 'article[data-quickedit-entity-id="commerce_product/13"] .field--name-field-more-information').magnificPopup({
                items: {
                    src: 'article[data-quickedit-entity-id="commerce_product/13"]',
                    type: 'inline',

                },
                mainClass: "test",
                closeBtnInside: true
            });
            // $('article[data-quickedit-entity-id="commerce_product/13"]').removeClass('mfp-hide');

        }
    };


    Drupal.behaviors.slickBehavior = {
        attach: function (context, settings) {

            // Using once() with more complexity.
            $(context).once().each(function () {
                $('.field--name-field-image').slick({
                    dots: true,
                    infinite: true,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                });
            });

        }
    };

})(jQuery);