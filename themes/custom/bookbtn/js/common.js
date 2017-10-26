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
                    $('#block-languageswitcher').toggle();
                })
            });

            $('#edit-field-booking-dates-end-value', context).once().each(function () {
                $(this).attr('readonly', 'readonly');
            });

            $('#edit-field-booking-dates-value', context).once().each(function () {
                $(this).attr('readonly', 'readonly');
            });


            // Inline popups


        }
    };


    Drupal.behaviors.myBehavior_one = {
        attach: function (context, settings) {

            // $('article .field--name-field-more-information').click(function () {
            //     var attr = $(this).attr('data-quickedit-entity-id');
            //     var attrStr = 'article[data-quickedit-entity-id='+ attr + ']' + '[data-quickedit-entity-instance-id="1"]';
            //     var attrNew = $(attrStr);
            //     return attrStr;
            //
            // }

            $('article[data-quickedit-entity-id="commerce_product/12"] .field--name-field-more-information').magnificPopup({
                items: {
                    src: 'article[data-quickedit-entity-id="commerce_product/12"].product-hidden',
                    type: 'inline',
                },

                mainClass: 'popup-block',
                closeOnBgClick: true
            });



            //$('article[data-quickedit-entity-id="commerce_product/12"]').css('display', 'block');


            $('article[data-quickedit-entity-id="commerce_product/13"] .field--name-field-more-information').magnificPopup({
                items: {
                    src: 'article[data-quickedit-entity-id="commerce_product/13"].product-hidden',
                    type: 'inline',
                },

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
                    dots: false,
                    infinite: true,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                    arrows : false,
                });
            });
        }
    };

    // Drupal.behaviors.lightsliderBehavior = {
    //     attach: function (context, settings) {
    //
    //         // Using once() with more complexity.
    //         $.once().each(function () {
    //             $('.popup-block .field--name-field-image').lightSlider({
    //
    //                 item: 1,
    //                 slideMargin: 0,
    //
    //                 autoWidth: true,
    //                 // slideMove: 1, // slidemove will be 1 if loop is true
    //                 // slideMargin: 10,
    //                 //
    //                 // // addClass: '',
    //                 mode: "fade",
    //                 useCSS: true,
    //                 // cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
    //                 // easing: 'linear', //'for jquery animation',////
    //                 //
    //                 // speed: 400, //ms'
    //                 // auto: false,
    //                 // pauseOnHover: false,
    //                 // loop: false,
    //                 // slideEndAnimation: false,
    //                 // pause: 2000,
    //                 //
    //                 // keyPress: false,
    //                 // controls: true,
    //                 // prevHtml: '',
    //                 // nextHtml: '',
    //                 //
    //                 // rtl: false,
    //                 // adaptiveHeight: false,
    //                 //
    //                 // vertical: false,
    //                 verticalHeight: 500,
    //                 vThumbWidth: 100,
    //                 //
    //                 thumbItem: 5,
    //                 // // pager: true,
    //                 gallery: true,
    //                 galleryMargin: 5,
    //                 thumbMargin: 5,
    //                 // currentPagerPosition: 'middle',
    //                 //
    //                 // // enableTouch:true,
    //                 // // enableDrag:true,
    //                 // freeMove: true,
    //                 // swipeThreshold: 40,
    //                 //
    //                 // responsive: [],
    //                 //
    //                 // onBeforeStart: function (el) {
    //                 // },
    //                 // onSliderLoad: function (el) {
    //                 // },
    //                 // onBeforeSlide: function (el) {
    //                 // },
    //                 // onAfterSlide: function (el) {
    //                 // },
    //                 // onBeforeNextSlide: function (el) {
    //                 // },
    //                 // onBeforePrevSlide: function (el) {
    //                 // }
    //             });
    //         })
    //     }
    // };


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


    Drupal.behaviors.datapickerBehavior = {
        attach: function (context, settings) {


            $(function () {
                // $('#edit-field-booking-dates-value').datepicker();
                // $('#edit-field-booking-dates-end-value').datepicker();
                var currDate = new Date();
                var dateFormat = "yy-mm-dd";
                from = $("#edit-field-booking-dates-value")
                    .datepicker({
                        minDate: currDate,
                        dateFormat: dateFormat,
                        // defaultDate: new Date(),
                        // changeMonth: true,
                        numberOfMonths: 2
                    }).datepicker("setDate", currDate)
                    .on("change", function () {
                        to.datepicker("option", "minDate", getDate(this));
                    }),
                    to = $("#edit-field-booking-dates-end-value").datepicker({
                        minDate: currDate,
                        dateFormat: dateFormat,
                        defaultDate: "+1w",
                        // changeMonth: true,
                        numberOfMonths: 2
                    }).datepicker("setDate", "+1d")
                        .on("change", function () {
                            from.datepicker("option", "maxDate", getDate(this));
                        });

                function getDate(element) {
                    var date;
                    try {
                        date = $.datepicker.parseDate(dateFormat, element.value);
                    } catch (error) {
                        date = null;
                    }

                    return date;
                }

            });

        }
    };

    // Drupal.behaviors.airdatepickerBehavior = {
    //     attach: function (context, settings) {
    //
    //         // Using once() with more complexity.
    //         $(function () {
    //             $('#edit-field-booking-dates-value').datepicker({
    //                 dateFormat: "yyyy-mm-dd",
    //                 minDate: new Date(),
    //                 numberOfMonths: 2,
    //
    //                 // // auto submit
    //                 // onSelect: function() {
    //                 //     $("#views-exposed-form-apartment-page-1").submit();
    //                 // }
    //             });
    //             $('#edit-field-booking-dates-end-value').datepicker({
    //                 dateFormat: "yyyy-mm-dd",
    //             });
    //         });
    //     }
    // };

    // Drupal.behaviors.imageBoxBehavior = {
    //     attach: function (context, settings) {
    //
    //         // Using once() with more complexity.
    //         $(function () {
    //             $('.field--name-field-image .field__item').click(function () {
    //                 if (!$(this).hasClass('image-box') && !$('.field--name-field-image .field__item').hasClass('image-box')) {
    //                     $(this).addClass('image-box');
    //                 } else if (!$(this).hasClass('image-box') && $('.field--name-field-image .field__item').hasClass('image-box')) {
    //                     $('.field--name-field-image .field__item').removeClass('image-box');
    //                     $(this).addClass('image-box');
    //                 } else {
    //                     //do nothing
    //                 }
    //             })
    //         });
    //     }
    // };

    Drupal.behaviors.tensBehavior = {
        attach: function (context, settings) {

            // Using once() with more complexity.
            $(function () {

                $('.product-hidden').ready(function () {
                    var attrImage = $(this).find('img').attr('src');
                    $(this).find('.modal-content').attr('src', attrImage);
                });

                $('.product-hidden .field--name-field-image.field__items img').click(function () {
                    var attrImage = $(this).attr('src');
                    $(this).parent().parent().parent().find('.modal-content').attr('src', attrImage);

                })

            });
        }
    };

    // Drupal.behaviors.authoSubmitBehavior = {
    //     attach: function (context, settings) {
    //
    //         // Using once() with more complexity.
    //         $(function () {
    //             // Autosubmit 'view-class-here' views exposed form.
    //             $("div.views-exposed-form").find("#views-exposed-form-apartment-page-1").find("select").bind("change", function () {
    //                 $(this).closest("form").trigger("submit");
    //             }).end().find("input[type='submit']").addClass("visually-hidden");
    //         });
    //     }
    // };


})(jQuery);