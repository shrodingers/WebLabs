//
//  delete
//  WebLabs
//
//  Created on 17/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

const cleanTask = require('../../../utils/clean');

module.exports = function (req, tasks) {
    if (tasks[req.params.id]) {
        tasks[req.params.id] = {};
        return {tasks: cleanTask(tasks)};
    }
    return {error: 'Not Found'};
};
