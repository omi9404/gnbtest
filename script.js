/*Load content for text file Start here*/
var file = "data.txt";
var fileDta = "";
function getFile() {
	$.get(file, function(txt) {
		fileDta = txt;
	});
}
getFile();
/*Load content for text file Ends here*/
$(document).ready(function() {
	getFile();
	RenderTableData("", "", "");
});

function RenderTableData(filterByWeek = "", TeamName = "", EmployeeName = "") {
	var selectedData = $('select :selected').val();
	filterByWeek = selectedData.split(',');

	/*
  create day row with date row start here.Sunday is hard coded for now,
  Need to add at txt to k=make it dynamic
  */
	var dayWithDate = '';
	dayWithDate += '<tr id="headingRow">';
	dayWithDate += '<td align="center" height="50" width="100"><br><b>#</b></br></td>';
	$.each(filterByWeek, function(key, val) {
		dayWithDate += '<td align="center" height="50" width="100"><b>Sunday<br>' + val + ' May</b></td>';
	});
	dayWithDate += '<td align="center" height="50" width="100"><b>Total</td>';
	dayWithDate += '</tr>';
	/*create day with date row ends here*/

	var totalArr = 0;
	$('table').append(dayWithDate);
  /*Get first data of first line*/
	$.each(fileDta.split("#"), function(key, val) {
     /*Get Second data of first line*/
		$.each(val.split("*"), function(key1, val1) {
      /*Get Third data of first line*/
			if (val1.length > 2) {
				$.each(val1.split("|"), function(key2, val2) {
					var textData = '';
					var count = 0;
          /*Make heading row and other row dynamic*/
					if (key2 == 0) {
						textData += '<tr class="team-row">'; //For colorfull row
					} else {
						textData += '<tr class="non-color-row">'; //For plain color row
					}
					var dateElement = '';
					$.each(val2.split(" "), function(key3, val3) {
						if (val3.split('-').length == 2) {
               /*Take date from the data*/
							dateElement = val3.split('-')[0];
						}
						if (key3 == 0 && val2.length > 2) {
							textData += '<td align="center" height="50" ><b>' + val3 + '</b></td>';
						}

            /*
            Check lenght of data to render it at tr one by one
            */

						if (key3 > 0 && val2.length > 2) {
							if (val3.split('-').length == 2) {
								val3 = val3.split('-')[1];
							}
							textData += '<td align="center" height="50">' + val3 + '</td>';
						}
						count++;
					});
					textData += '</tr>';
					count = 0;
          /*
          If selected date range is availabe at array then draw new tr with it's element
          */
					if (jQuery.inArray(dateElement, filterByWeek) == -1 && filterByWeek != "") {
						$('table').append(textData);
					}
				});
			}
		});
	});
}
/*
On dropdown change get selected values.
Remove old td and tr from table to render new data.
Also we can pass team name and employee name to filter data.
*/
$(function() {
	$("#ddlViewBy").change(function() {
		$('#headingRow').remove();
		$('.team-row,.non-color-row').remove();
		RenderTableData(filterByWeek = "", TeamName = "", EmployeeName = "");
	});
});