# Flight Schedule App

## Intro

The purpose of the application is to allow the user to schedule a rotation of flights for a given aircraft that respects the aircrafts physical location at the end/start of consecutive flights, as well as maintaining a minimum 20 minute turnover window inbetween flights. In addition to the ability to add/remove/rearrange flights in the schedule, the user may also visually see the flights laid out in a colour-coded timeline, and the user may see the per-aircraft utilisation percentage based on the amount of time in the 24hour window that is being used (with any 20 minute gaps ignored).

Any flights that have conflicts will have the relevant conflicts highlighted in red. Once a completely valid schedule has been organised, the use may then try to save the schedule (currently to local storyage) and will then be able to reload the same scheduled in a later session with the app 

## Future Improvements

In the interest of time, certain aspects of development were prioritised over others. A list of improvements given further development is included below: 

1. A friendlier, more approachable sense of styling that helps draw the user's eyes to the key points of each component
2. There is a bug with the drag and drop functionality wherein it is not possible to drag a flight to the first or last slot. This is not a blocker or a major bug as there is a workaround where the user may simply drag the first below the target flight, or drag the last before the target flight to achieve the desired ordering. Nonetheless this is a bug that should be fixed
3. There is a duplication bug in the reducer used by the SchedulesProvider in schedules.js whereby adding or removing flights resulted in duplicates being created. A workaround fix was implemented, but the ultimate cause of the bug remains a mystery and it should be investigated and resolved
4. General unit, integration and end to end testing has been omitted
5. The styling has not been made dynamic or responsive in the interest of time, but in the interests of usability and approachability it should definitely be implemented in the future
6. In accordance with some given simplifications, certain aspects of the application (such as the date in the DateDisplay) have been hard coded
7. Perhaps implement external libraries to integrate features such as drag-and-drop rather than building from scratch.

## Pre-requisites

You must have Nodejs/NPM installed 

## Local Setup

1. Clone the repo
2. Within the local directory, run `npm install` to install all necessary dependencies
3. Once the dependencies have been installed, run `npm start` to start the application on localhost:3000
