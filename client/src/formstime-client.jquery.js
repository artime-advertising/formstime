/* global jQuery */

/**
 * FormsTime jQuery plugin
 * @param {Object} options
 * @example
$('#form').formsTime({resetAfterSuccess: true});
 */

(function($) {
    var formsTimeServer = 'https://formstime.herokuapp.com/mailer';

    $.fn.formsTime = function(options) {

        var settings = $.extend({
            resetAfterSuccess: true,
            message: {
                show: true,
                success: 'Your message has been successfully received.',
                fail: 'Your message could not be sent. Please try again later.'
            }
        }, options);

        this.filter('form').each(function() {
            var self = this;

            $(self).on('submit', function(e) {
                e.preventDefault();
                var serializedForm =$(this).serializeArray();

                $.post(formsTimeServer, serializedForm)
                    .done(function(resp) {
                        $(self).trigger('submit:done');

                        if (settings.resetAfterSuccess) {
                            $(self).trigger('reset');
                        }

                        if (settings.message.show) {
                            alert(settings.message.success);
                        }
                    })
                    .fail(function(resp) {
                        $(self).trigger('submit:fail');
                        if (settings.message.show) {
                            alert(settings.message.fail);
                        }
                    })
                    .always(function() {
                        $(self).trigger('submit:always');
                    })
            });

        });

        return this;
    };

}( jQuery ));