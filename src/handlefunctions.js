import constants from "./constants";
import indexFiles from "./index";
import $ from "jquery";

export function handleFileinput() {
  $("#video-picture").change(function (e) {
    var filename = e.target.files[0].name;
    var tmppath = URL.createObjectURL(e.target.files[0]);
    constants.global_TMPpath = tmppath;
    constants.global_FileName = filename;
  });
}

export function handleButtons() {
  var number_of_issue_buttons = document.querySelectorAll(constants.ADD_BUTTON)
    .length;

  for (var i = 0; i < number_of_issue_buttons; i++) {
    document
      .querySelectorAll(constants.ADD_BUTTON)
      [i].addEventListener("click", indexFiles.handleClickOfButtons);
  }
}

export default {
  handleFileinput,
  handleButtons
};
