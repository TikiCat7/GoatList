//current data structure
{  
   "choices":{  
      "choice1":"aaa",
      "choice2":"bbb",
      "choice3":"aaa"
   },
   "choiceArr":["aaa","bbb","aaa"],
   "ListName":"unique"
}

{  
   "choices":{  
      "choice1":"aaa",
      "choice2":"bbb",
      "choice3":"aaa"
   },
   "choiceArr":["aaa","bbb","aaa"],
   "ListName":"unique"
}

{  
   "choices":{  
      "choice1":"aaa",
      "choice2":"bbb",
      "choice3":"aaa"
   },
   "choiceArr":["aaa","bbb","aaa"],
   "ListName":"unique"
}

//results I want
{
	"Results":{
	"aaa":6,
	"bbb":3
	}
}

//solution was to add "choiceArr":[] as extra element in the JSON