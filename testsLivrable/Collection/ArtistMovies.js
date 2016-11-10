//
//  Movies
//  WebLabs
//
//  Created on 09/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

var ArtistMovies = Backbone.Collection.extend({
    initialize: function(data, options) {
        this.url = 'https://umovie.herokuapp.com/actors/' + options.id + '/movies';
    },
    model: Movie,
    parse: function(data) {
        return data.results;
    }
});
