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

//old
//$('#submitGoat').on('click',SubmitGoat);
$('#submitGoat').on('click',postList);
$('#GetMongo').on('click',getfromdb);
$('#clearDB').on('click',clearDB);
});

function SubmitGoat(){

	//check if input is valid
	//if valid create object based on values

	var newGoatList = {
		'choice1':$('#choice1').val(),
		'choice2':$('#choice2').val(),
		'choice3':$('#choice3').val(),
		'ListName':$('#ListName').val()
	}

	//update dom with submitted results as test
	$('#showResults').append("List Name: "+newGoatList['ListName']+"<br>"+"GOAT Players: "+newGoatList['choice1']+", "+newGoatList['choice2']+", "+newGoatList['choice3']);

	//test
	alert(JSON.stringify(newGoatList, null, 4));

	//clear input
	$('.form-control').val('');	

//temporary api to pretend data is being set back end
// $.ajax('http://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   data: {
//     listname: newGoatList['ListName'],
//     choice1: newGoatList['choice1'],
//     choice2: newGoatList['choice2'],
//     choice3: newGoatList['choice3'],
//     userId: 1
//   }
//   //pretending server got submission
// }).then(function(data) {
//   console.log("server recieved this submission :)")
//   console.log(data);
// });



}

function getfromdb (){

var tableContent = '';
//console.log("inside");

$.getJSON('/list',function(data){
	//console.log("in getJSON");
	console.log(data);
	$.each(data,function(){

	tableContent += '<table class="table">';
    tableContent +='<thead>';
    tableContent += '<tr>'
    tableContent +=  '<th>Choice</th>'
    tableContent +=    '<th>Player Name</th>'
    tableContent +=  '</tr>'
    tableContent +='</thead>'
    tableContent +='<tbody>'
    tableContent +=  '<tr>'
    tableContent +=    '<td>Choice#1</td>'
    tableContent +=    '<td>'+this.choice1+'</td>'
    tableContent +=  '</tr>'
    tableContent +=  '<tr>'
    tableContent +=    '<td>Choice#2</td>'
    tableContent +=    '<td>'+this.choice2+'</td>'
    tableContent +=  '</tr>'
    tableContent +=  '<tr>'
    tableContent +=    '<td>Choice#3</td>'
    tableContent +=    '<td>'+this.choice3+'</td>'
    tableContent +=  '</tr>'
    tableContent +='</tbody>'
    tableContent +='</table>'
		
	});

	$('#mongostuff').html(tableContent);
});
}
function postList(){

	var newGoatList = {
		'choice1':$('#choice1').val(),
		'choice2':$('#choice2').val(),
		'choice3':$('#choice3').val(),
		'ListName':$('#ListName').val()
	}

	//var listToAdd = JSON.stringify(newGoatList);
	console.log(newGoatList);
	//console.log(listToAdd);
	$.post('/post',newGoatList).success(function(res){
		console.log("sent new user to db!");
	});
	getfromdb();
};

function clearDB(){
	$.ajax({
            type: 'DELETE',
            url: '/deleteall'
    });
    getfromdb();
}

