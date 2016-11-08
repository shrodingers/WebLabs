//
//  Task
//  WebLabs
//
//  Created on 13/10/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//



function getDaY(url) {
    return Backbone.Model.extend({
        urlRoot: url,
        parse: function(data) {
            return data.forecast ? data.forecast.simpleforecast.forecastday[0] : data;
        }
    });
}
