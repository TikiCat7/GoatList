$("img[id='NatePic']").width('200px').height('300px');
$("document").ready(function() {

getstats();

$(document).on("keypress", "form", function(event) { 
    return event.keyCode != 13;
});

$("#UpdateList").on('click', function() {
	$("li[name='number 1']").html('KOBE IS NUMBER1!');
	});

$('body').on('click','td', function() {
	var listname = $(this).closest('.table').attr('id');
	console.log("td clicked in table: "+listname);
	//console.log(this);
	var f = findOne(listname);
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
$('#GetStats').on('click',getstats);
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

	tableContent += '<table class="table" id="'+this.ListName+'">';
    tableContent +='<thead>';
    tableContent += '<tr>'
    tableContent +=  '<th>Choice</th>'
    tableContent +=    '<th>Player Name</th>'
    tableContent +=  '</tr>'
    tableContent +='</thead>'
    tableContent +='<tbody>'
    tableContent +=  '<tr>'
    tableContent +=    '<td>Choice#1</td>'
    tableContent +=    '<td>'+this.choices.choice1+'</td>'
    tableContent +=  '</tr>'
    tableContent +=  '<tr>'
    tableContent +=    '<td>Choice#2</td>'
    tableContent +=    '<td>'+this.choices.choice2+'</td>'
    tableContent +=  '</tr>'
    tableContent +=  '<tr>'
    tableContent +=    '<td>Choice#3</td>'
    tableContent +=    '<td>'+this.choices.choice3+'</td>'
    tableContent +=  '</tr>'
    tableContent +='</tbody>'
    tableContent +='</table>'
		
	});

	$('#mongostuff').html(tableContent);
});
}


function postList(){

	var newGoatList = {
		'choices':{
		'choice1':$('#choice1').val(),
		'choice2':$('#choice2').val(),
		'choice3':$('#choice3').val()},
		'choicearr':[$('#choice1').val(),$('#choice2').val(),$('#choice3').val()],
		'ListName':$('#ListName').val()
	}

	//var listToAdd = JSON.stringify(newGoatList);
	console.log(newGoatList);
	//console.log(listToAdd);
	$.post('/post',newGoatList).success(function(res){
		console.log("sent new user to db!");
	});
	getfromdb();
	getstats();
};

function clearDB(){
	$.ajax({
            type: 'DELETE',
            url: '/deleteall'
    });
    getfromdb();
    getstats();
}

function findOne(list){
$.getJSON('/find',{"ListName":list},function(data){
	console.log(JSON.stringify(data));
	return data;
	});
};

function getstats(){
$.getJSON('/stats2',function(data){
	var i;
	var tableContent = "";

	tableContent += '<table class="table" id="ranking">';
    tableContent +='<thead>';
    tableContent += '<tr>'
    tableContent +=  '<th>Rank</th>'
    tableContent +=    '<th class="text-left">Player Name</th>'
    tableContent +=    '<th class="text-left">Count</th>'
    tableContent +=  '</tr>'
    tableContent +='</thead>'
    tableContent +='<tbody>'

	console.log(JSON.stringify(data));

	for(i=0;i<data.length;i++){
		console.log(("Name: "+data[i]._id+" Count: "+data[i].recordcnt));	
	}

	$.each(data,function(){
    tableContent +=  '<tr>'
    tableContent +=  '<td class="text-left">'+(data.indexOf(this)+1)+'</td>'
    tableContent +=  '<td class="text-left">'+this._id+'</td>'
    tableContent +=  '<td class="text-left">'+this.recordcnt+'</td>'
   	tableContent +=  '</tr>'
	});

	tableContent +='</tbody>'
    tableContent +='</table>'

	$('#tableStats').html(tableContent);
	//return data;
	});
};

