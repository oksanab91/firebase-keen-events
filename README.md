# firebase-keen-events

The system is an example of a real-time reporting solution that uses advantages of the Firebase database and converts Keen.io chart into real-time one.<br/>
The source code and tutorial are on github at https://github.com/markoshust/firebase-keen
 
Node.js command prompt was used to run the following three jobs:<br/>
<p>•	<b>eventJobQueueWorker</b> module, listens for the new entries in Firebase database and transfers them into Keen online streamer;</p>
<p>•	<b>eventJobQueueGenerator</b> module, generates new records in the Firebase db for simulation purposes;</p>
<p>•	<b>keenCacheWorker</b>, runs query (filter, grouping) in the Keen online streamer and pushes the results back into the Firebase db.</p> 
Then the visualized data could be seen on the index.html page opened in the web browser.
 
After updating Firebase version to the latest one, some modifications of the Firebase initialization and its properties were required.<br/>
To solve the first issue, app.js file was created containing Firebase initialization, and index.html was modified.<br/>
The second issue was solved by updating the way Firebase properties (functions in the previous version) were called in the 'workers' modules and dashboard.js.<br/>
In order to view the real-time results, the jobs should be run simultaneously.
 
This solution demonstrates how to integrate Firebase into a production app and add some real-time capabilities to the Keen.io platform.

For more info, please read the complete tutorial at https://www.airpair.com/firebase/posts/making-a-keenio-dashboard-realtime-by-integrating-it-with-firebase--d3js


