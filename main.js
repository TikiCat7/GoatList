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
		'choice1':$('#choice1').val(),
		'choice2':$('#choice2').val(),
		'choice3':$('#choice3').val(),
		'ListName':$('#ListName').val()
	}

	$('#showResults').append("List Name: "+newGoatList['ListName']+"<br>"+"GOAT Players: "+newGoatList['choice1']+", "+newGoatList['choice2']+", "+newGoatList['choice3']);

	alert(JSON.stringify(newGoatList, null, 4));
	$('.form-control').val('');	
	//$('#choice1').val('');

$.ajax('http://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  data: {
    listname: newGoatList['ListName'],
    choice1: newGoatList['choice1'],
    choice2: newGoatList['choice2'],
    choice3: newGoatList['choice3'],
    userId: 1
  }
}).then(function(data) {
  console.log("server recieved this submission :)")
  console.log(data);
});

}