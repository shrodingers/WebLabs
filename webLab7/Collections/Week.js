//
//  Tasks.js
//  WebLabs
//
//  Created on 13/10/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

function getWeek(url, model) {
    console.log(url);
    return Backbone.Collection.extend({
        url: url,
        model: model,
        parse: function (data) {
            return data.forecast.simpleforecast.forecastday;
        },
        modelId: function (attrs) {
            return attrs.period;
        }
    });
}
