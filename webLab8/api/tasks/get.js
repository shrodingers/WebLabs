//
//  get.js
//  WebLabs
//
//  Created on 17/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

const cleanTask = require('../../utils/clean');

module.exports = function(tasks) {
    return {
        tasks : cleanTask(tasks),
    };
};
