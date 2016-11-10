//
//  ArtistSearch
//  WebLabs
//
//  Created on 08/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

var ArtistSearch = Backbone.Collection.extend({
    initialize: function (data, options) {
        if (options) {
            this.url = "https://umovie.herokuapp.com/search/actors?q=" + options.name;
        }
    },
    model: Artist,
    parse: function(data) {
        return data.results;
    },
    modelId: function(attrs) {
        if (attrs)
            return attrs.artistName;
    }
});
