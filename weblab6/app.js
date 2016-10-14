//
//  app.js
//  WebLabs
//
//  Created on 13/10/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

var tasksCollection = new Tasks({});
tasksCollection.url = 'http://127.0.0.1:5000/tasks';

$(function () {
    var tasksView = new TasksView({
        el: '#tasks_container',
        collection: tasksCollection,
    });
    tasksView.render();

    var taskListView = new TaskListView({
        collection: tasksCollection,
        el: '#tasks_list',
    });


    tasksCollection.fetch().complete(function () {
        taskListView.render();
    });
});
