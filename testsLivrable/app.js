//
//  app
//  WebLabs
//
//  Created on 08/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

//const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ODIyMTI1NjZhZDA0ODAzMDAzNDdjMDEiLCJleHAiOjE0Nzg3MTQzNTMzMTd9.GN6qxtAKLHT_btgLi0eUCG2LpoKBnyvc7DoqbfLerbE';

$(function() {
    $.ajax({
        url: 'https://umovie.herokuapp.com/login',
        method: 'POST',
        data: {
            email: 'test@brigad.co',
            password:'azerty',
        },
        success: function(authData) {
            var searchRes = new ArtistSearch({}, {
                name: 'David Tennant'
            });
            var auth = function (xhr) {
                var token = authData.token;
                xhr.setRequestHeader('Authorization', token)
            };
            searchRes.fetch({
                beforeSend: auth,
            }).then(function () {
                searchRes.each(function (model, index) {
                    if (index > 1)
                        return;
                    var save = model;
                    model.set({
                        authFn: auth,
                    })
                    model.fetch({
                        beforeSend: auth,
                    }).then(function () {
                        var movies = new ArtistMovies({}, {
                            id: model.id,
                        });

                        var moviesList = new MoviesList({
                            collection: movies,
                            el: '#list_movies',
                        });
                        movies.fetch({
                            beforeSend: auth
                        });
                    });
                });
            });
            var view = new ArtistView({
                collection: searchRes,
                el: '#actor_infos',
            });
        }
    });

});
