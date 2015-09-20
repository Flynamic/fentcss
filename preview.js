$(document).ready(function(){
	var dialog = $.dialog({
		title: "Lol",
		content: "Content",
		accept: function() {
			alert("lol");
		}
	});
});