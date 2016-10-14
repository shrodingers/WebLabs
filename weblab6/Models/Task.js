//
//  Task
//  WebLabs
//
//  Created on 13/10/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

var Task = Backbone.Model.extend({
   urlRoot: 'http://127.0.0.1:5000/tasks',
    parse: function(data) {
        return typeof data.task === 'object' ? data.task : data;
    }
});
