'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);
	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	e.preventDefault();
	var projectID = $(this).closest('.project').attr('id');
	var idNumber = projectID.substr('project'.length);
	console.log("User clicked on project " + idNumber);
	var url = "/project/" + idNumber;
	$.get(url, addProject);
}

function addProject(result) {
	console.log(result);
	var idNumber = result.id;
	var detailsSelector = "div#project" + idNumber + " div.details";
	var htmlInsert = 
		'<img src="' + result.image + '" class="detailsImage">' +
		'<h3>' + result.title + '</h3>' +
		'<p><small>' + result.date + '</small></p>' +
		'<p>' + result.summary + '</p>';
	$(detailsSelector).html(htmlInsert);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette", applyPalette);

}

function applyPalette(result) {
	console.log(result);
	var colors = result.colors.hex;
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}