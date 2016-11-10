//
//  ArtistMovie
//  WebLabs
//
//  Created on 09/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

var Movie = Backbone.Model.extend({
    urlRoot: 'https://umovie.herokuapp.com/movies',
    parse: function(data) {
        console.log(data);
        return data;
    }
});
