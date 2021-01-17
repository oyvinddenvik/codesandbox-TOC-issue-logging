import handlefunctions from "./handlefunctions";
import $ from "jquery";

function main() {
  // Handle Buttons

  handlefunctions.handleButtons();
  handlefunctions.handleFileinput();

  $(document).ready(function () {
    window.$.fn.datetimepicker.Constructor.Default = $.extend(
      {},
      window.$.fn.datetimepicker.Constructor.Default,
      {
        icons: {
          time: "fas fa-clock",
          date: "far fa-calendar",
          up: "fas fa-arrow-up",
          down: "fas fa-arrow-down",
          previous: "far fa-chevron-left",
          next: "far fa-chevron-right",
          today: "far fa-calendar-check-o",
          clear: "far fa-trash",
          close: "far fa-times"
        }
      }
    );
    window.$("#datetimepicker5").datetimepicker({
      format: "DD/MM/YYYY, HH:mm"
    });
  });
  // Handle select and datepicker
  /*
   $(document).ready(function () {
    window.$("#dateTimepicker").datetimepicker({
      format: "dd-mm-yyyy",
      autoclose: true,
      todayHighlight: true
    });
    window.$("#datepickerCurrentIssue").datetimepicker({
      format: "dd-mm-yyyy",
      autoclose: true,
      todayHighlight: true
    });
    window.$("#exampleFormControlSelect4").selectpicker({
      iconBase: "fa",
      tickIcon: "fa-check"
    });
  });
  */
}

main();
