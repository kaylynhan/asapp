import {Queue} from "./Queue.js"

export function generateSchedules(optionalCourseList, requiredCourseList) {

var listOfSchedules = []

var doubleSchedule = []

var scheduleStack1 = []

var scheduleStack2 = []

//////////////////////
var scheduleStack = []
var morePossibleSchedules = true;
var removeIndex = 0
var populateIndex = 1

var queue = new Queue()

scheduleStack[removeIndex] = new Queue
scheduleStack[populateIndex] = new Queue

//add Course information to optional course sections.
if(optionalCourseList != null){
	for(var i = 0; i < optionalCourseList.length; i++)
		for(var j = 0;j < optionalCourseList[i].sections.length; j++)
		{
			optionalCourseList[i].sections[j]["course"] = optionalCourseList[i].id
		}
}

//Add Course information to required course sections.
if(requiredCourseList != null)
{
	for(var i = 0; i < requiredCourseList.length; i++)
		for(var j = 0;j < requiredCourseList[i].sections.length; j++)
		{
			requiredCourseList[i].sections[j]["course"] = requiredCourseList[i].id
		}
}

//Add All optional course sections to the list of schedules.
if(optionalCourseList != null){
	for(var i = 0; i < optionalCourseList.length; i++)
		for(var j = 0;j < optionalCourseList[i].sections.length; j++)
		{
			scheduleStack1.push(optionalCourseList[i].sections[j])
			listOfSchedules.push([optionalCourseList[i].sections[j]])
		}
}

//Add All required course sections to the list of schedules.
if(requiredCourseList != null)
{
	for(var i = 0; i < requiredCourseList.length; i++)
		for(var j = 0;j < requiredCourseList[i].sections.length; j++)
		{
			scheduleStack1.push(requiredCourseList[i].sections[j])
			listOfSchedules.push([requiredCourseList[i].sections[j]])
		}
}

//Calculate all schedules with 2 sections that don't have time conflicts.
while(scheduleStack1.length != 0)
{
  var current = scheduleStack1.pop()

  var conflict = false

  for(var i = 0; i < scheduleStack1.length; i++)
    if(current.course != scheduleStack1[i].course)
    {
   // Make sure there are no schedule conflicts between the current 
 // section and scheduleStack[i] section.
for(var j = 0; j < current.meetings.length; j++)
{
  for(var k=0; k < scheduleStack1[i].meetings.length; k++)
  {
   //  Checks if a class starts during another class, or ends during
   //    another class. checks for these conflicts: (start2 start1 end2), (start2 end1 end2), and (start 1 start2 end2 end1)
    if(current.meetings[j].day == scheduleStack1[i].meetings[k].day)
	{
		if((current.meetings[j].start_time >= scheduleStack1[i].meetings[k].start_time 
		&& current.meetings[j].start_time <= scheduleStack1[i].meetings[k].end_time) || 
		(current.meetings[j].end_time >= scheduleStack1[i].meetings[k].start_time && 
		current.meetings[j].end_time <= scheduleStack1[i].meetings[k].end_time ) || 
		(current.meetings[j].start_time <= scheduleStack1[i].meetings[k].start_time &&
		current.meetings[j].end_time >= scheduleStack1[i].meetings[k].end_time))
		{
        conflict = true
        break //End the k loop.
		}
	}
  }

  if(conflict == true)
    break
}

  if(conflict == false)
  {
    doubleSchedule[[current.id,scheduleStack1[i].id]] = [current, scheduleStack1[i]]
	
    scheduleStack2.push([current, scheduleStack1[i]])
	scheduleStack[removeIndex].enqueue([current, scheduleStack1[i]])
	
	listOfSchedules.push([current, scheduleStack1[i]])
  }
  else
    conflict = false

}
}

var TEST_NUMBER = 0;

//Calculate all possible schedules with more than 2 courses.
while(morePossibleSchedules)
{
	TEST_NUMBER++
	
	while(scheduleStack[removeIndex].getLength() != 0)
	{
		var currentSchedule = scheduleStack[removeIndex].dequeue()
		var numSectionsMinusOne = currentSchedule.length - 1
		
		for(var i = 0; i < scheduleStack[removeIndex].getLength(); i++)
		{
			var newSchedule = []
			var valid = true
			
			for(j=0; j < numSectionsMinusOne; j++)
			{
				if(currentSchedule[j].id != scheduleStack[removeIndex].getIndex(i)[j].id)
				{
					valid = false;
					break;
				}
				else
				{
					newSchedule.push(currentSchedule[j])
				}
			}
		
			if(currentSchedule[numSectionsMinusOne].course == scheduleStack[removeIndex].getIndex(i)[numSectionsMinusOne].course ||
			doubleSchedule[[currentSchedule[numSectionsMinusOne].id,scheduleStack[removeIndex].getIndex(i)[numSectionsMinusOne].id]] == undefined)
			{
				valid = false;
			}
			else
			{
				newSchedule.push(currentSchedule[numSectionsMinusOne])
				newSchedule.push(scheduleStack[removeIndex].getIndex(i)[numSectionsMinusOne])
			}
			
			if(valid)
			{	
				scheduleStack[populateIndex].enqueue(newSchedule)
				listOfSchedules.push(newSchedule)
			}
			else
			{
				valid = true
			}
		}
	}
	
	if(scheduleStack[populateIndex].getLength() == 0 || TEST_NUMBER == 3)
	{	
		morePossibleSchedules = false
	}
	
	var placeHolder = removeIndex
	removeIndex = populateIndex
	populateIndex = placeHolder
}

//Filters out schedules without required courses.
var filtered = listOfSchedules.filter(function(value, index, arr){

    return value.length >= requiredCourseList.length;

});

var filtered2 = filtered.filter(function(value, index, arr){
	
	for(var i=0; i < requiredCourseList.length; i++)
	{
		var requiredCourseFound = false
		
		for(var j=0; j < value.length; j++)
		{
			if(requiredCourseList[i].id == value[j].course)
				requiredCourseFound = true
		}
		
		if(requiredCourseFound == false)
		{
			return false
		}
	}
	
	return true
});

	return filtered2
}