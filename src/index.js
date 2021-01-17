import constants from "./constants";
import $ from "jquery";

export function handleClickOfButtons() {
  var get_button_id = this.id;

  switch (get_button_id) {
    case constants.ID_OF_ACTIVE_ISSUE_BUTTON:
      handleActiveIssueButton();
      break;
    case constants.ID_OF_CLOSED_ISSUE_BUTTON:
      handleClosedIssueButton();
      break;
    case constants.ID_OF_SUBMIT_ACTIVE_ISSUE_BUTTON:
      handleSubmitActiveIssueButton();
      break;
    case constants.ID_OF_CLOSE_ACTIVE_ISSUE_BUTTON:
      handleCloseActiveIssueButton();
      break;
    case constants.ID_OF_ADD_PROGRESS_BUTTON:
      handleAddProgressButton();
      break;
    case constants.ID_OF_ClOSE_PROGRESS_BUTTON:
      handleCloseProgressButton();
      break;
    case "button-send-to-closed-issues":
      sendToClosedIssueList(this);
      break;
    default:
  }
}

function handleActiveIssueButton() {
  moduleOpen();
}

function handleClosedIssueButton() {
  moduleOpen();
}

function handleCloseActiveIssueButton() {
  moduleClose();
  clearActiveIssueModuleForm();
}

function handleAddProgressButton() {
  moduleOpen();
  alert("hei");
}

function handleCloseProgressButton() {
  moduleClose();
}

function handleSubmitActiveIssueButton() {
  if ($("#active-issue-submit-btn").text() == "Update") {
    updateToActiveIssueTable(constants.global_active_id);
    updateUploadInput(constants.global_active_id);
  } else {
    addToActiveIssueTable();
    updateUploadInput(constants.global_next_id);
    constants.global_next_id += 1;
  }

  moduleClose();

  clearActiveIssueModuleForm();
}

function updateToActiveIssueTable(id) {
  var row = $("#activeissuetable button[data-id='" + id + "']").parents(
    "tr"
  )[0];
  $(row).after(buildActiveIssueTableRow(id));
  $(row).remove();
  $("#active-issue-submit-btn").text("Submit");
}

function addToActiveIssueTable() {
  if ($("#activeissuetable tbody").length == 0) {
    $("#activeissuetable").append("<tbody></tbody>");
  }

  $("#activeissuetable tbody").append(
    buildActiveIssueTableRow(constants.global_next_id)
  );
  //$("#activeissuetable tbody").append("</tr>");
}

function sendToClosedIssueList(ctl) {
  var row = $(ctl).parents("tr");
  var cols = row.children("td");
  var active_id = $($(cols[0]).children("button")[0]).data("id");
  var date = $(cols[1]).text();
  var description = $(cols[2]).text();
  var high_level = $(cols[3]).text();
  var medium_level = $(cols[4]).text();
  var low_level = $(cols[5]).text();
  var row_number = active_id;
  var id_of_download = "file" + active_id;
  var severity_icon = $(cols[6]).html();
  var is_severity_icon_red = severity_icon.includes("red");
  var is_severity_icon_yellow = severity_icon.includes("yellow");
  var is_severity_icon_green = severity_icon.includes("green");
  var color_square = "";
  if (is_severity_icon_red) {
    color_square = '<i class="fas fa-square-full red"></i>';
  } else if (is_severity_icon_yellow) {
    color_square = '<i class="fas fa-square-full yellow"></i>';
  } else if (is_severity_icon_green) {
    color_square = '<i class="fas fa-square-full green"></i>';
  } else {
    color_square = "";
  }

  if ($("#closedissuetable tbody").length == 0) {
    $("#closedissuetable").append("<tbody></tbody>");
  }

  var file_ID = "#file" + active_id;
  var upload_file_href = $(file_ID).attr("href");
  var upload_file_name = $(file_ID).text();

  $("#closedissuetable tbody").append(
    "<tr>" +
      "<th>" +
      row_number +
      "</th>" +
      "<td>" +
      '<button data-id="' +
      active_id +
      '" class="btn btn-default btn-sm action-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span class="fas fa-chevron-circle-down"></span></button>' +
      '<div class="dropdown-menu" aria-labelledby="first-action-button">' +
      '<button class="dropdown-item" onclick="ReopenIssue(this)" type="button">Re-open issue</button>' +
      "</div>" +
      "</td>" +
      "<td>" +
      date +
      "</td>" +
      "<td>" +
      description +
      "</td>" +
      "<td>" +
      high_level +
      "</td>" +
      "<td>" +
      medium_level +
      "</td>" +
      "<td>" +
      low_level +
      "</td>" +
      "<td>" +
      color_square +
      "</td>" +
      "<td>" +
      '<a id="' +
      id_of_download +
      '" href="' +
      upload_file_href +
      '" download>' +
      upload_file_name +
      "</a>" +
      "</td>" +
      "</tr>"
  );

  $(ctl).parents("tr").remove();
}

function updateUploadInput(id) {
  var file_ID = "#file" + id;
  if (constants.global_TMPpath != "undefined") {
    $(file_ID).attr("href", constants.global_TMPpath);
    $(file_ID).text(constants.global_FileName);
    constants.global_FileName = "undefined";
    constants.global_TMPpath = "undefined";
  }
}

function buildActiveIssueTableRow(id) {
  // Append product to the table
  var cause_of_incident = document.getElementById("causeOfIncident").value;
  var description = document.getElementById("DescriptionActiveIssueInput")
    .value;
  var date = document.getElementById("datetimepicker5").value;
  var high_level = document.getElementById("exampleFormControlSelect1").value;
  var medium_level = document.getElementById("exampleFormControlSelect2").value;
  var low_level = document.getElementById("exampleFormControlSelect3").value;
  var row_number = id;
  var id_of_download = "file" + id;
  var id_of_close_issue_button = "button" + id;
  var severity_icon = $("#exampleFormControlSelect4")
    .find(":selected")
    .attr("data-icon");
  var red_square = "fa-square redsquare";
  var yellow_square = "fa-square yellowsquare";
  var green_square = "fa-square greensquare";
  var color_square = "";

  if (severity_icon == red_square) {
    color_square = '<i class="fas fa-square-full red"></i>';
  } else if (severity_icon == yellow_square) {
    color_square = '<i class="fas fa-square-full yellow"></i>';
  } else if (severity_icon == green_square) {
    color_square = '<i class="fas fa-square-full green"></i>';
  } else {
    color_square = "";
  }

  var file_ID = "#file" + id;
  var upload_file_href = $(file_ID).attr("href");
  var upload_file_name = $(file_ID).text();
  // TODO: Add correct actioncolumn button actionsdata-id="' + id + '"data-id="' + id + '"
  var get_append_to_table_value =
    "<tr>" +
    "<th>" +
    row_number +
    "</th>" +
    "<td>" +
    '<button data-id="' +
    id +
    '" class="btn btn-default btn-sm action-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span class="fas fa-chevron-circle-down"></span></button>' +
    '<div class="dropdown-menu" aria-labelledby="first-action-button">' +
    '<button onclick ="editDisplay(this)" class="dropdown-item" type="button">Edit</button>' +
    '<a class="dropdown-item" href="update-page.html">Update issue</a>' +
    '<button id="button-send-to-closed-issues" class="dropdown-item" type="button">Close issue</button>' +
    '<button id="button-delete" class="dropdown-item" type="button">Delete</button>' +
    "</div>" +
    "</td>" +
    "<td>" +
    date +
    "</td>" +
    "<td>" +
    description +
    "</td>" +
    "<td>" +
    high_level +
    "</td>" +
    "<td>" +
    medium_level +
    "</td>" +
    "<td>" +
    low_level +
    "</td>" +
    "<td>" +
    color_square +
    "</td>" +
    "<td>" +
    '<a id="' +
    id_of_download +
    '" href="' +
    upload_file_href +
    '" download>' +
    upload_file_name +
    "</a>" +
    "</td>" +
    "<td>" +
    '<div class="progress">' +
    '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%">' +
    "<span>0%</span>" +
    "</div> " +
    "</div>" +
    "</tr>";
  return get_append_to_table_value;
}

function editDisplay(ctl) {
  moduleOpen();

  var row = $(ctl).parents("tr");
  var cols = row.children("td");
  constants.global_active_id = $($(cols[0]).children("button")[0]).data("id");
  $("#datepicker").val($(cols[1]).text());
  $("#DescriptionActiveIssueInput").val($(cols[2]).text());
  $("#exampleFormControlSelect1").val($(cols[3]).text());
  $("#exampleFormControlSelect2").val($(cols[4]).text());
  $("#exampleFormControlSelect3").val($(cols[5]).text());

  var severity_icon = $(cols[6]).html();
  var is_severity_icon_red = severity_icon.includes("red");
  var is_severity_icon_yellow = severity_icon.includes("yellow");
  var is_severity_icon_green = severity_icon.includes("green");
  if (is_severity_icon_red) {
    $("#exampleFormControlSelect4").val("red");
    window.$("#exampleFormControlSelect4").selectpicker("refresh");
  }
  if (is_severity_icon_yellow) {
    $("#exampleFormControlSelect4").val("yellow");
    window.$("#exampleFormControlSelect4").selectpicker("refresh");
  }
  if (is_severity_icon_green) {
    $("#exampleFormControlSelect4").val("green");
    window.$("#exampleFormControlSelect4").selectpicker("refresh");
  }
  //Change the output text of submit button to edit
  $("#active-issue-submit-btn").text("Update");
  // TODO: Show picture/video pdf that is stored in the database
}

function productDelete(ctl) {
  $(ctl).parents("tr").remove();

  var row = $(ctl).parents("tr");
  var cols = row.children("th");
  var current_row_value = parseInt($(cols[0]).text());

  var get_number_of_rows = $("#activeissuetable tbody th").length;

  var active_issue_table = document.getElementById("activeissuetable");
  for (var i = current_row_value - 1; i < get_number_of_rows; i++) {
    var get_current_value_of_row_number =
      active_issue_table.rows[i + 1].cells[0].innerHTML;
    active_issue_table.rows[i + 1].cells[0].innerHTML =
      get_current_value_of_row_number - 1;
  }
  constants.global_next_id -= 1;
}

function clearActiveIssueModuleForm() {
  $("#datepicker").val("");
  $("#DescriptionActiveIssueInput").val("");
  $("#exampleFormControlSelect1").val("");
  $("#exampleFormControlSelect2").val("");
  $("#exampleFormControlSelect3").val("");
  $("#exampleFormControlSelect4").val("");
  $("#video-picture").val("");
  window.$("#exampleFormControlSelect4").selectpicker("refresh");
  $("#causeOfIncident").val("");
}

function moduleClose() {
  var e = document.getElementsByClassName("modalbox");
  e[0].style.display = "none";
}

function moduleOpen() {
  var e = document.getElementsByClassName("modalbox");
  e[0].style.display = "block";
}

export default {
  handleClickOfButtons
};
