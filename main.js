$("img[id='NatePic']").width('200px').height('300px');
$("document").ready(function() {

$(document).on("keypress", "form", function(event) { 
    return event.keyCode != 13;
});

$("#UpdateList").on('click', function() {
	$("li[name='number 1']").html('KOBE IS NUMBER1!');
	});

var options = {
	url: "playernames.js",
	theme: "bootstrap",
	list: {
		onKeyEnterEvent:function(){
			//do something with selected player?
		},
		match: {
			enabled: true
		}
	}
};

$("#choice1").easyAutocomplete(options);
$("#choice2").easyAutocomplete(options);
$("#choice3").easyAutocomplete(options);

$('#submitGoat').on('click',SubmitGoat);

});

function SubmitGoat(){
	var newGoatList = {
		'chocie1':$('#choice1').val(),
		'choice2':$('#choice2').val(),
		'choice3':$('#choice3').val()
	}

	alert(JSON.stringify(newGoatList, null, 4));
	$('.form-control').val('');	
	//$('#choice1').val('');

}