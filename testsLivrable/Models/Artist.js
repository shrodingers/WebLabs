//
//  Artist
//  WebLabs
//
//  Created on 08/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

var Artist = Backbone.Model.extend({
    urlRoot: 'https://umovie.herokuapp.com/actors',
    parse: function(data) {
        var current = data;
        if (data.results) {
            current = data.results[0];
        }
        current.id = current.artistId;
        var self = this;
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURI(current.artistName) + "&prop=pageimages&format=json&pithumbsize=100",
            method: 'GET',
            crossDomain: true,
            dataType: "jsonp",
            success: function (data) {
                Object.keys(data.query.pages).forEach(function (key) {
                    if (!data.query.pages[key].thumbnail) {
                        return;
                    }
                    self.set({
                        image: data.query.pages[key].thumbnail.source,
                    });
                });
                console.log(self.attributes);
            },
            error: function(err) {
                console.error(err);
            }
        });
        return current;
    }
});
