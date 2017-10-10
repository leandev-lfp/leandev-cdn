(function ($) {
    $.fn.extend({
        "showMessage": function (msg, type) {
            var $this = $(this);
            $this.children('.ui-message').remove();
            var messageClass, iconClass, borderColor, summaryClass;
            if (typeof(type) === 'undefined' || 'success' === type) {
                messageClass = 'ui-messages-info';
                iconClass = 'ui-messages-info-icon';
                borderColor = '#bce8f1';
                summaryClass = 'ui-messages-info-summary';
            } else if ('error' === type) {
                messageClass = 'ui-messages-error';
                iconClass = 'ui-messages-error-icon';
                borderColor = '#eed3d7';
                summaryClass = 'ui-messages-error-summary';
            }
            var content = '<div class="ui-message ui-corner-all ' + messageClass + '" style="border-color: ' + borderColor + ';">' +
                '<span class="' + iconClass + '"></span>' +
                '<ul style="margin-top: 10px">' +
                '<li><span class="' + summaryClass + '" style="margin-top: 10px">' + msg + '</span></li>' +
                '</ul></div>';
            $this.prepend(content);
        },
        "hideMessage": function () {
            $(this).children('.ui-message').remove();
        }
    })
})(jQuery);
