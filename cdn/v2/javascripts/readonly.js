/**
 * Created by tom wang on 11/3/17.
 */

function disableViewForReadOnlyUser(needToReadOnly){
    if(needToReadOnly){
        if(isNeedDisableViewForLoan()){
            disableView();
        }
    }
}

function isNeedDisableViewForLoan(){
    return ifPageIncludeToReadOnlyForLoan();
}

function ifPageIncludeToReadOnlyForLoan(){
    var currentPage = window.location.pathname;
    var pagePrefix = currentPage.substring(currentPage.indexOf("/"),currentPage.lastIndexOf("/"));
    var pagesShouldRead = ['/loan/report/accountreceivables', '/loan/report/badpayer', '/loan/report/sie', '/loan/admin/configuration','/ui/me'];
    return $.inArray(pagePrefix, pagesShouldRead) < 0;
}

function disableView() {
    //input
    var inputToBeReadonly = $("input[type=text]:not(.changableByReadOnly):not(.hasDatepicker)");
    inputToBeReadonly.attr('readonly', 'readonly');
    inputToBeReadonly.attr('class', function (i, val) {
        return val + ' ui-state-disabled-read-only';
    });

    //file upload
    var fileTypeInput = $("input[type=file]");
    fileTypeInput.attr('readonly', 'readonly');
    fileTypeInput.attr('class', function (i, val) {
        return val + ' ui-state-disabled';
    });


    //password
    var passwordTypeInput = $("input[type=password]:not(.changableByReadOnly)");
    passwordTypeInput.attr('readonly', 'readonly').removeAttr('onchange').removeAttr('onblur');
    passwordTypeInput.attr('class', function (i, val) {
        return val + ' ui-state-disabled';
    });

    //select one menu don't disable select one menu util get a confirm from customer
//    $('.ui-selectonemenu:not(.changableByReadOnly)').attr('class', function (i, val) {
//        return val + ' ui-state-disabled';
//    });
//
//    $('.ui-selectonemenu-panel .ui-selectonemenu-item').attr('class', function (i, val) {
//        return val + ' ui-state-disabled';
//    });
//
//    $('.ui-selectonemenu:has(.changableByReadOnly)').each(function (index,data) {
//        $(data).find('.ui-selectonemenu-item').removeClass('ui-state-disabled');
//    });

    //checkbox
    var divCheckbox = $('div.ui-chkbox-box');
    divCheckbox.each(function (index, data) {
        if(!$(data).parent().hasClass("changableByReadOnly")){
            $(data).addClass(" ui-state-disabled");
        }
    });

    $('a.ui-chkbox-box').each(function (index,data) {
        if(!$(data).parent().hasClass("changableByReadOnly")){
            $(data).replaceWith("<div class='ui-chkbox-box ui-widget ui-corner-all ui-state-default ui-state-disabled'>" + $(this).html() + "</div>");
        }
    });

    divCheckbox.each(function (index,data) {
        if(!$(data).parent().hasClass("changableByReadOnly")){
            $(data).replaceWith("<div class='ui-chkbox-box ui-widget ui-corner-all ui-state-default ui-state-disabled'>" + $(this).html() + "</div>");
        }
    });

    $("input[type=checkbox]").attr('readonly', 'readonly').removeAttr('onchange').attr('disabled', true);

    //note editor
    $('div#editor').attr('style', 'visibility:hidden');

    //radio don't disable select one menu util get a confirm from customer
//    $('div.ui-radiobutton-box:not(.changableByReadOnly)').each(function (index,data) {
//        if(!$(data).parent().hasClass("changableByReadOnly")){
//            $(data).addClass(" ui-state-disabled");
//        }
//    });
//
//    $('a.ui-radiobutton-box:not(.changableByReadOnly)').each(function (index,data) {
//        if(!$(data).parent().hasClass("changableByReadOnly")){
//            $(this).replaceWith("<div class='ui-radiobutton-box ui-widget ui-corner-all ui-radiobutton-relative ui-state-default ui-state-disabled'>" + $(this).html() + "</div>");
//        }
//    });
//
//    $('div.ui-radiobutton-box:not(.changableByReadOnly)').each(function (index,data) {
//        if(!$(data).parent().hasClass("changableByReadOnly")){
//            $(this).replaceWith("<div class='ui-radiobutton-box ui-widget ui-corner-all ui-radiobutton-relative ui-state-default ui-state-disabled'>" + $(this).html() + "</div>");
//        }
//    });

    //calendarbox
    $('.ui-datepicker-support-readonly').each(function (index,data) {
        if(!$(data).hasClass("changableByReadOnly")){
            $(data).children().attr('class', function (i, val) {
                return val + ' ui-state-disabled-read-only';
            });
            $(data).children().attr('readonly', 'readonly');
            $(data).children().attr('disabled', true);
        }
    });

    $('.ui-datepicker-trigger').each(function (index,data) {
        if(!$(data).parent().hasClass("changableByReadOnly")){
            $(data).replaceWith("<div/>");
        }
    });

    $('input.hasDatepicker').each(function (index,data) {
        if($(data).parent().hasClass("changableByReadOnly")){
            $(data).removeClass('ui-state-disabled').removeClass('ui-state-disabled-read-only').attr('readonly', false);
        }
    });


    //text area
    $("textarea").attr('readonly', 'readonly');

    //button
    $("button:has(.ui-icon-disk):not(.ui-state-disabled)," +
        "button:has(.ui-icon-trash):not(.ui-state-disabled)," +
        "button:has(.ui-icon-plus):not(.ui-state-disabled):not(.changableByReadOnly)," +
        "button:has(.ui-icon-arrowthick-1-w):not(.ui-state-disabled)," +
        "button:has(.ui-icon-arrowthick-1-e):not(.ui-state-disabled)," +
        "button:has(.ui-icon-wrench):not(.ui-state-disabled)," +
        "button:has(.ui-icon-arrow-1-e):not(.ui-state-disabled)," +
        "button:has(.ui-icon-arrowstop-1-e):not(.ui-state-disabled)," +
        "button:has(.ui-icon-arrow-1-w):not(.ui-state-disabled)," +
        "button:has(.ui-icon-arrowstop-1-w):not(.ui-state-disabled)," +
        "button:has(.ui-icon-pencil):not(.ui-state-disabled)," +
        "button:has(.ui-icon-arrowreturnthick-1-w):not(.ui-state-disabled)," +
        "button:has(.ui-icon-check):not(.ui-state-disabled)," +
        "button:has(.ui-icon-refresh):not(.ui-state-disabled)," +
        "button:has(.ui-icon-circle-check):not(.ui-state-disabled):not(.changableByReadOnly)").addClass("ui-state-disabled").attr('disabled', true).removeAttr('onclick').unbind("click").unbind("onclick");

    $('.ui-dialog-buttonset button:not(.changableByReadOnly)').each(function (index,data) {
        var buttonValue = $(data).find('span').html();
        if(buttonValue === "Ok" || buttonValue === "OK" || buttonValue === "Disburse" || buttonValue === "Save" || buttonValue === "Yes" || buttonValue === "Add"
            || buttonValue === "Save note" || buttonValue === "Spara kontonoteringen" || buttonValue === "Ja"){
            $(data).addClass("ui-state-disabled").attr('disabled', true).removeAttr('onclick').unbind("click").unbind("onclick");
        }
    });

    $("a.ui-icon-trash").removeAttr('onclick').removeAttr('click').unbind("click").attr('disabled', true).attr('class', function (i, val) {
        return val + ' ui-state-disabled-read-only';
    });

    //Find the button "Send" which is used for sending message,and make them disabled when the login user status is read-only.
    $("#sendingSecureMsgBtn").addClass("ui-state-disabled").attr('disabled', true).removeAttr('onclick').unbind("click").unbind("onclick");

    //find the button which is end with CancelQueueButton
    $("button[id*=CancelQueueButton]").addClass("ui-state-disabled").attr('disabled', true).removeAttr('onclick').unbind("click").unbind("onclick");

    //menu
    $('div:not(.changableByReadOnly).ui-menu>ul>li>a:not(.ui-separator)').addClass('ui-state-disabled').removeAttr('onclick').removeAttr('click').unbind("click").unbind("onclick").removeClass("ui-state-hover ui-state-active").attr('disabled', true).unbind("mouseover").unbind("mouseenter");

    //disable and remove function which has readonly class
    var readonlyElements = $('.readOnly');
    readonlyElements.attr('readonly', 'readonly').removeAttr('onchange').removeAttr('change').unbind("change").removeAttr('onblur').removeAttr('onclick').removeAttr('click').unbind("click").attr('disabled', true);

    readonlyElements.each(function (index,data) {
        $(data).addClass(' ui-state-disabled-read-only');
        if ($(data).is('select') && $(data).next().hasClass("chzn-container")) {
            $(data).next().addClass('chzn-disabled').unbind();
        }
    });

    //only for this id since this drop down list can save directly when change
    var chooseActualDecisionDropDownChzn = $("#chooseActualDecisionDropDown_chzn");
    chooseActualDecisionDropDownChzn.addClass(' ui-state-disabled-read-only');
    chooseActualDecisionDropDownChzn.off();

    //picklist
//    $(".ui-picklist-item").addClass("ui-state-disabled").unbind("mouseover").unbind("click").unbind("dblclick");
    $(".ui-picklist").addClass("ui-state-disabled").unbind("dblclick")




}
