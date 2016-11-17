//
//  get
//  WebLabs
//
//  Created on 17/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

module.exports = function (req, tasks) {
    const task = tasks[req.params.id];
    return task ? {task} : {error: 'Not Found'};
};
