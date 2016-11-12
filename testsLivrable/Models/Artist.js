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
            url:'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvparse=true&format=json&titles=' + encodeURI(current.artistName) +'&rvsection=0', //'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURI(current.artistName) + "&prop=pageimages&format=json&pithumbsize=100",
            method: 'GET',
            crossDomain: true,
            dataType: "jsonp",
            success: function (data) {
                Object.keys(data.query.pages).forEach(function (key) {
                    var box = $(data.query.pages[key].revisions[0]['*']).filter('.infobox');
                    if (!box.length)
                        return;
                    self.set({
                        bday: box.find('.bday').text(),
                        age: box.find('.ForceAgeToShow').text().match(/\d+/g)[0],
                        image1: box.find('img').attr('src'),
                    });
                });
                console.log(self.attributes);
            },
            error: function(err) {
                console.error(err);
            }
        });
        $.ajax({
            url: 'http://imdb.wemakesites.net/api/search?q=' + encodeURI(current.artistName),
            method: 'GET',
            crossDomain: true,
            dataType: "jsonp",
            success: function (data) {
                var id;
                data.data.results.names.forEach(function(elem) {
                    if (elem.title == current.artistName) {
                        id = elem.id;
                    }
                });
                if (id) {
                    $.ajax({
                        url:'http://imdb.wemakesites.net/api/' + id,
                        method: 'GET',
                        crossDomain: true,
                        dataType: "jsonp",
                        success: function (data) {
                            self.set({
                                desc: data.data.description.split('...')[0] + "...",
                                image2: data.data.image,
                            });
                        }
                    });
                }
            },
            error: function(err) {
                console.error(err);
            }
        });
        return current;
    }
});
