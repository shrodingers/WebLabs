//
//  put
//  WebLabs
//
//  Created on 17/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

const cleanTask = require('../../../utils/clean');

module.exports = function (req, tasks) {
    const task = tasks[req.params.id];
    if (task) {
        if (req.body.task) task.task = req.body.task;
        return {tasks : cleanTask(tasks)};
    }
    return {error: 'Not Found'};
};
