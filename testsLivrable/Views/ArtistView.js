//
//  ArtistView
//  WebLabs
//
//  Created on 08/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

ArtistView = Backbone.View.extend({
    template : _.template($("#artist_image").html()),

    initialize: function(){
        _.bindAll(this, 'render');
        this.listenTo(this.collection, "sync", this.render);
        this.listenTo(this.collection, "destroy", this.render);
        this.listenTo(this.collection, "change", this.render);
        this.listenTo(this.collection, "all", this.render);
    },

    render: function(){
        if (!this.collection.length)
            return;
        this.$el.html(this.template({artist : this.collection.models[0]}));
    },
});
