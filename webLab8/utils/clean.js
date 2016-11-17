//
//  clean
//  WebLabs
//
//  Created on 17/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

module.exports = function (tasks) {
    return tasks.reduce(function (prev, elem) {
        if (typeof elem.id !== 'undefined')
            prev.push(elem);
        return prev;
    }, []);
};
