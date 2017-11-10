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
                    $('#block-languageswitcher').fadeToggle(500);
                })
            });

            $('#edit-field-check-out-date-value', context).once().each(function () {
                $(this).attr('readonly', 'readonly');
            });

            $('#edit-field-check-in-date-value', context).once().each(function () {
                $(this).attr('readonly', 'readonly');
            });
        }
    };

    Drupal.behaviors.addFirstImageBehavior = {
        attach: function (context, settings) {
            $(function () {
                // This implement to show most large picture in popup
                $('.product-hidden .field--name-field-image.field__items img').click(function () {
                    var attrImage = $(this).attr('src');
                    $(this).parent().parent().parent().find('.modal-content').attr('src', attrImage);

                })
            });
        }
    };


    Drupal.behaviors.disableClickingOnLink = {
        attach: function (context, settings) {

            $(function () {
                $('.field--name-field-currency-language a').removeAttr('href');
                $('#block-bookbtn-branding a').removeAttr('title');
                $('.field--name-field-amenities i').removeAttr('aria-hidden');
            });
        }
    };

    Drupal.behaviors.slickBehavior = {
        attach: function (context, settings) {

            // Using once() with more complexity.

            $(context).once().each(function () {
                $('article .field--name-field-image:first-child').slick({
                    dots: false,
                    infinite: true,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                    arrows : false,
                });

                $('.group-header .field--name-field-image').slick({
                    dots: false,
                    infinite: true,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                    arrows : true,
                    respondTo: 'slider',
                });
            });
        }
    };

    Drupal.behaviors.deletePopupForMobile = {
        attach: function (context, settings) {
            if ($(window).width() <= 425) {
                $('.field--name-field-currency-language a:first-child').css('display', 'none');
                $('.field--name-field-currency-language').append('<a><i class="fa fa-bars fa-3x" aria-hidden="true"></i></a>');
            }
        }
    };

    Drupal.behaviors.myBehavior_one = {
        attach: function (context, settings) {
            if ($(window).width() <= 425) {
                $('article .product-item a').css('pointer-events', 'auto');
            } else {
                //pop-up after clicking on img
                $('article .product-item .image-wrapper').each(function () {
                    var item = $(this);

                    //add image to modal window
                    var attrImage = item.parents('article .product-item').find('div.product-hidden .field--name-field-image img').first().attr('src');
                    item.find('.myModal img').attr('src', attrImage);

                    // pop-up
                    item.magnificPopup({
                        items: {
                            src: item.parents('article .product-item').find('div.product-hidden'),
                            type: 'inline',
                        },
                        type: 'inline',
                        mainClass: 'popup-block',
                        closeOnBgClick: true,
                    });
                });

                //pop-up after clicking on "more information"
                $('article .product-item .right-col .field--name-field-more-information').each(function() {
                    var item = $(this);

                    //add image to modal window
                    var attrImage = item.parents('article .product-item').find('div.product-hidden .field--name-field-image img').first().attr('src');
                    item.find('.myModal img').attr('src', attrImage);

                    // pop-up
                    item.magnificPopup({
                        items: {
                            src: item.parents('article .product-item').find('div.product-hidden'),
                            type: 'inline',
                        },
                        type: 'inline',
                        mainClass: 'popup-block',
                        closeOnBgClick: true,
                    });
                });
            }
        }
    };

    Drupal.behaviors.popupBehavior = {
        attach: function (context, settings) {

            // hide popup window
            $('.product-hidden', context).once().each(function () {
                $(this).addClass('mfp-hide');

            });
        }
    };

    Drupal.behaviors.datapickerBehavior = {
        attach: function (context, settings) {


            $(function () {

                var currDate = new Date();
                var dateFormat = "yy-mm-dd";

                from = $( "#edit-field-check-out-date-value" )
                    .datepicker({
                        dateFormat: dateFormat,
                        minDate: currDate,
                        defaultDate: currDate,
                        changeMonth: false,
                        numberOfMonths: 1
                    })
                        .on( "change", function() {
                            to.datepicker( "option", "minDate", getDate( this ) );
                        }),
                        // .on ("click", function () {
                        // from.datepicker("setDate", "+1d");
                        // }),
                    to = $( "#edit-field-check-in-date-value" ).datepicker({
                        minDate: "+1d",
                        dateFormat: dateFormat,
                        defaultDate: "+1d",
                        changeMonth: false,
                        numberOfMonths: 1
                    })
                        .on( "change", function() {
                            from.datepicker( "option", "maxDate", getDate( this ) );
                        })
                        // .on ("click", function () {
                        //     to.datepicker("setDate", "+1d");
                        // })

                function getDate(element) {
                    var date;
                    try {
                        date = $.datepicker.parseDate(dateFormat, element.value);
                    } catch (error) {
                        date = null;
                    }

                    return date;
                }

                if ($(window).width() <= 425) {
                    // $("#edit-field-check-out-date-value").on("change", function () {
                    $("#edit-field-check-out-date-value").datepicker("option", "numberOfMonths", 1);
                    // });
                    $("#edit-field-check-in-date-value").datepicker("option", "numberOfMonths", 1);
                }

                // Set default values for input fields
                if( $('#edit-field-check-out-date-value').val() === '' ){
                    $('#edit-field-check-out-date-value').datepicker("setDate", new Date());
                }

                if( $('#edit-field-check-in-date-value').val() === '' ){
                    $('#edit-field-check-in-date-value').datepicker("setDate", '+1d');
                }

            });

        }
    };

})(jQuery);