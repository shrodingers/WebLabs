//
//  post.js
//  WebLabs
//
//  Created on 17/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//


module.exports = function (req, tasks) {
    const len = tasks.length;
    const task = {
        id: tasks.length,
        task: req.body.task,
    };

    tasks.push(task);
    return task;
};
