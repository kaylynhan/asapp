export function generateSchedules(optionalCourseList, requiredCourseList) {

var listOfSchedules = []
var doubleSchedule = []
var scheduleQueue = []
var scheduleQueue2 = []

//Add course information to optional course sections.
if(optionalCourseList != null){
	for(var i = 0; i < optionalCourseList.length; i++)
		for(var j = 0;j < optionalCourseList[i].sections.length; j++)
		{
			optionalCourseList[i].sections[j]["course"] = optionalCourseList[i].department + " " + optionalCourseList[i].number
			optionalCourseList[i].sections[j]["units"] = optionalCourseList[i].units
		}
}

//Add course information to required course sections.
if(requiredCourseList != null)
{
	for(var i = 0; i < requiredCourseList.length; i++)
		for(var j = 0;j < requiredCourseList[i].sections.length; j++)
		{
			requiredCourseList[i].sections[j]["course"] = requiredCourseList[i].department + " " + requiredCourseList[i].number
			requiredCourseList[i].sections[j]["units"] = requiredCourseList[i].units
		}
}

//Add all optional course sections to the list of schedules.
if(optionalCourseList != null){
	for(var i = 0; i < optionalCourseList.length; i++)
		for(var j = 0;j < optionalCourseList[i].sections.length; j++)
		{
			listOfSchedules.push([optionalCourseList[i].sections[j]])
			scheduleQueue.push([optionalCourseList[i].sections[j]])
		}
}

//Add all required course sections to the list of schedules.
if(requiredCourseList != null)
{
	for(var i = 0; i < requiredCourseList.length; i++)
		for(var j = 0;j < requiredCourseList[i].sections.length; j++)
		{
			listOfSchedules.push([requiredCourseList[i].sections[j]])
			scheduleQueue.push([requiredCourseList[i].sections[j]])
		}
}

//Find all schedules with 2 courses and no conflicts.
var conflict = false
for(var i=0; i< scheduleQueue.length; i++)
{
	for(var j=i+1; j< scheduleQueue.length; j++)
	{

		//Check for final conflicts.
		if(scheduleQueue[i][0].final != undefined && scheduleQueue[j][0].final != undefined)
		{
			if(scheduleQueue[i][0].final.date == scheduleQueue[j][0].final.date)
				if(!((scheduleQueue[i][0].final.start_time > scheduleQueue[j][0].final.end_time) ||
				(scheduleQueue[i][0].final.end_time < scheduleQueue[j][0].final.start_time)))
				{
					conflict = true
				}
		}


		//Check for meeting conflicts.
		if(conflict == false && scheduleQueue[i][0].course != scheduleQueue[j][0].course)
		{
			for(var k=0; k<scheduleQueue[i][0].meetings.length; k++)
			{
				for(var z=0; z<scheduleQueue[j][0].meetings.length; z++)
				{
					if(scheduleQueue[i][0].meetings[k].day == scheduleQueue[j][0].meetings[z].day)
					{
						if(!((scheduleQueue[i][0].meetings[k].start_time > scheduleQueue[j][0].meetings[z].end_time) ||
						(scheduleQueue[i][0].meetings[k].end_time < scheduleQueue[j][0].meetings[z].start_time)))
						{
							conflict = true
							break //End the k loop.
						}
					}
				}

				if(conflict == true)
					break
			}
		}
		else
		{
			conflict = true
		}

		if(conflict == false)
		{
			doubleSchedule[[scheduleQueue[i][0].id,scheduleQueue[j][0].id]] = 1

			scheduleQueue2.push([scheduleQueue[i][0], scheduleQueue[j][0]])
			listOfSchedules.push([scheduleQueue[i][0], scheduleQueue[j][0]])
		}
		else
			conflict = false

	}
}

scheduleQueue = []

//Find all schedules with 3 courses.
for(var i=0; i<scheduleQueue2.length; i++)
{
	for(var j=i+1; j<scheduleQueue2.length; j++)
	{
		if (scheduleQueue2[i][0].id == scheduleQueue2[j][0].id)
			if(scheduleQueue2[i][1].course != scheduleQueue2[j][1].course)
			{
				if(doubleSchedule[[scheduleQueue2[i][1].id, scheduleQueue2[j][1].id]] != undefined)
				{
					listOfSchedules.push([scheduleQueue2[i][0], scheduleQueue2[i][1], scheduleQueue2[j][1]])
					scheduleQueue.push([scheduleQueue2[i][0], scheduleQueue2[i][1], scheduleQueue2[j][1]])
				}
			}
	}
}

scheduleQueue2 = []

//Find all schedules with 4 courses.
for(var i=0; i<scheduleQueue.length; i++)
{
	for(var j=i+1; j<scheduleQueue.length; j++)
	{
		if (scheduleQueue[i][0].id == scheduleQueue[j][0].id)
			if(scheduleQueue[i][1].id == scheduleQueue[j][1].id)
				if(scheduleQueue[i][2].course != scheduleQueue[j][2].course)
				{
					if(doubleSchedule[[scheduleQueue[i][2].id, scheduleQueue[j][2].id]] != undefined)
					{
						scheduleQueue2.push([scheduleQueue[i][0], scheduleQueue[i][1], scheduleQueue[i][2], scheduleQueue[j][2]])
						listOfSchedules.push([scheduleQueue[i][0], scheduleQueue[i][1], scheduleQueue[i][2], scheduleQueue[j][2]])
					}
				}
	}
}

scheduleQueue = []

//Find all schedules with 5 courses.
for(var i=0; i<scheduleQueue2.length; i++)
{
	for(var j=i+1; j<scheduleQueue2.length; j++)
	{
		if (scheduleQueue2[i][0].id == scheduleQueue2[j][0].id)
			if(scheduleQueue2[i][1].id == scheduleQueue2[j][1].id)
				if(scheduleQueue2[i][2].id == scheduleQueue2[j][2].id)
					if(scheduleQueue2[i][3].course != scheduleQueue2[j][3].course)
					{
						if(doubleSchedule[[scheduleQueue2[i][3].id, scheduleQueue2[j][3].id]] != undefined)
						{
							scheduleQueue.push([scheduleQueue2[i][0], scheduleQueue2[i][1], scheduleQueue2[i][2], scheduleQueue2[i][3], scheduleQueue2[j][3]])
							listOfSchedules.push([scheduleQueue2[i][0], scheduleQueue2[i][1], scheduleQueue2[i][2], scheduleQueue2[i][3], scheduleQueue2[j][3]])
						}
					}
	}
}

scheduleQueue2 = []

//Find all schedules with 6 courses.
for(var i=0; i<scheduleQueue.length; i++)
{
	for(var j=i+1; j<scheduleQueue.length; j++)
	{
		if (scheduleQueue[i][0].id == scheduleQueue[j][0].id)
			if(scheduleQueue[i][1].id == scheduleQueue[j][1].id)
				if(scheduleQueue[i][2].id == scheduleQueue[j][2].id)
					if(scheduleQueue[i][3].id == scheduleQueue[j][3].id)
						if(scheduleQueue[i][4].course != scheduleQueue[j][4].course)
						{
							if(doubleSchedule[[scheduleQueue[i][4].id, scheduleQueue[j][4].id]] != undefined)
								listOfSchedules.push([scheduleQueue[i][0], scheduleQueue[i][1], scheduleQueue[i][2], scheduleQueue[i][3], scheduleQueue[i][4], scheduleQueue[j][4]])
						}
	}
}

//Filters out schedules that don't contain required courses.
var filtered = listOfSchedules.filter(function(value, index, arr){

	if(value.length < requiredCourseList.length)
		return false

	for(var i=0; i < requiredCourseList.length; i++)
	{
		var requiredCourseFound = false

		for(var j=0; j < value.length; j++)
		{
			if(requiredCourseList[i].department + " " + requiredCourseList[i].number == value[j].course)
				requiredCourseFound = true
		}

		if(requiredCourseFound == false)
		{
			return false
		}
	}

	return true
});

	return filtered
}
