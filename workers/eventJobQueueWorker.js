
// Initialize Firebase
require('./app.js');
var firebase = require('firebase');

var Keen = require('keen.io'),
    WorkQueue = require('./workqueue-advanced.js'),
    eventJobQueueRef = firebase.database().ref('/keen/event-job-queue'), //new Firebase('https://fir-events-32d5f.firebaseio.com/keen/event-job-queue'),
    keenClient = Keen.configure({
        projectId: '58e4897595cfc9addc246f64',
        writeKey: '5D3E2175A9B4DE4E3327CE77274858DB0D78929B1B18BDC6E2CCE0BB241040C64BD5228D97AC6179B1C40B75B1FED601EAFA4638DB09B1F925A1ADACDAE6A43EEC51DBF3194C4535E20DDFDFA23C5EDCA9204B277AE4929C0597EE6D940A6F39'
    });

function processQueue(data, whenFinished) {
    var eventName = data.eventName;

//console.log('data.createdAt ' + data.createdAt);
var dateVal = new Date(data.createdAt).toISOString();
//console.log('date ' + dateVal);

    data.keen = {timestamp: dateVal};

    // Remove data we don't want in Keen.io
    delete data.createdAt;
    delete data.eventName;
    delete data.status;
    delete data.statusChanged;

    keenClient.addEvent(eventName, data, function(err) {
        if (err) console.log('Error adding event to Keen.io', err);

        console.log('Event data record added to Keen.io')

        whenFinished();
    });
}


new WorkQueue(eventJobQueueRef, processQueue);

console.log('Listening for event data...');

