
// Initialize Firebase
require('./app.js');
var firebase = require('firebase');

 var Keen = require('keen.io'),
    cacheRef =  firebase.database().ref('/keen/cache') , //new Firebase('https://fir-events-32d5f.firebaseio.com/keen/cache'),
    client = Keen.configure({
        projectId: '58e4897595cfc9addc246f64',
        readKey: '81B6F8C825F056209125043955C3A4CC8A894BA1E5713E0CF5C2D7CC1ADC0AD92BC68113CB93EEB4FDC4261309D9AD1A9235E9A86668762A2A7DAFF6725E7C8479A28FB6E967C64F550479535D0A7020F54C8F28CCC0F1884463E6E275329AB7'
    }),
    checkInterval = 5000, // get new data from Keen.io every 5 seconds
    dataDelay = 20000, // allow 20 seconds of delay for data to start showing from Keen.io
    checkKeen = function() {
        var dateNow = new Date(),
            startDate = new Date(dateNow.getTime() - dataDelay),
            endDate = new Date(dateNow.getTime() - dataDelay + checkInterval),
            avgCostByGender = new Keen.Query('average', {
                eventCollection: 'Purchases',
                targetProperty: 'cost',
                groupBy: 'customer.gender',
                filters: [
                    {
                        property_name: 'keen.timestamp',
                        operator: 'gte',
                        property_value: startDate.toISOString()
                    },
                    {
                        property_name: 'keen.timestamp',
                        operator: 'lt',
                        property_value: endDate.toISOString()
                    }
                ]
            });

        client.run(avgCostByGender, function(err, res) {
            if (err) {
                console.log('error:', err);
                return;
            }

            cacheRef.child('avgCostByGender').push({
                payload: JSON.stringify(res),
                timestamp: parseInt(startDate.getTime() / 1000)
            });
        });

    };

checkKeen();

setInterval(checkKeen, checkInterval);
