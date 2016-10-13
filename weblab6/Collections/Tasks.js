//
//  Tasks.js
//  WebLabs
//
//  Created on 13/10/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

var Tasks = Backbone.Collection.extend({
    urlRoot: '/tasks',
    model: Task,
    parse: function(data) {
        return data.tasks;
    },
    modelId: function(attrs) {
        return attrs.id;
    }
});
