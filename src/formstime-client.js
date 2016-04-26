/* global jQuery */

/**
 * FormsTime jQuery plugin
 * @param {Object} options
 * @example
$('#form').formsTime({resetAfterSuccess: true});
 */

(function($) {
    var formsTimeServer = 'https://formstime.herokuapp.com';

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
                        if (settings.resetAfterSuccess) {
                            $(self).trigger('reset');
                        }

                        if (settings.message.show) {
                            alert(settings.message.success);
                        }
                    })
                    .fail(function(resp) {
                        if (settings.message.show) {
                            alert(settings.message.fail);
                        }
                    });
            });

        });

        return this;
    };

}( jQuery ));