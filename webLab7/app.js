//
//  app.js
//  WebLabs
//
//  Created on 13/10/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

function init(callback) {
    $(function () {
        var lat, long;
        function getPosition(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            $.ajax({
                url: "https://search.mapzen.com/v1/reverse?point.lat="+ lat +"&point.lon=" + long,
                //dataType: "json",

            }).done(function(data)
            {
                $.ajax({
                    url:"http://autocomplete.wunderground.com/aq?&cb=call=?", //"http://autocomplete.wunderground.com/aq?query=" + encodeURIComponent(data.features[0].properties.locality)+ "cb=call=?",
                    dataType: "jsonp",
                    crossDomain: true,
                    data: {
                        "query": data.features[0].properties.locality
                    },
                    success: function (parsed_data) {
                        console.log(parsed_data);
                        callback('http://api.wunderground.com/api/1abe5e6d7312c213/forecast/q/zmw:' + parsed_data.RESULTS[0].zmw + '.json',
                            'http://api.wunderground.com/api/1abe5e6d7312c213/forecast10day/q/zmw:' + parsed_data.RESULTS[0].zmw + '.json',
                            parsed_data.RESULTS[0]);
                    },
                }).fail(function (jqXHR) {
                    var error = jQuery.parseJSON(jqXHR.responseText);
                    console.log(error);
                });
            }).fail(function(error) {

                console.error("Error");
            })
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
        } else {
            callback("http://api.wunderground.com/api/1abe5e6d7312c213/forecast/q/CA/San_Francisco.json",
                "http://api.wunderground.com/api/1abe5e6d7312c213/forecast10day/q/CA/San_Francisco.json",
                {
                    "name": "San Francisco, California",
                    "type": "city",
                    "c": "US",
                    "zmw": "94102.1.99999",
                    "tz": "America/Los_Angeles",
                    "tzs": "PST",
                    "l": "/q/zmw:94102.1.99999",
                    "ll": "37.779999 -122.419998",
                    "lat": "37.779999",
                    "lon": "-122.419998"
                });
        }
    });
}

init(function(urlModel, urlCollection, location) {
    console.log("Here");
    var Day = getDaY(urlModel);
    var Week = getWeek(urlCollection, Day);
    var currentWeek = new Week({});
    var currentDay = new Day({});
    currentWeek.fetch().complete(function() {
        var currentDay = currentWeek.filter(function(day) {
            return day.get('period') == 1;
        })[0];
        currentDay.set({
            location: location.name,
        });
        var weekView = new WeekView({
            el: '#days',
            collection: currentWeek,
        });
        var todayView = new TodayView({
            el: '#today',
            model: currentDay,
        });
        todayView.render();
        weekView.render();
    });
});
