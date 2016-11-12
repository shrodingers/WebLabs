//
//  MoviesList
//  WebLabs
//
//  Created on 10/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

MoviesList = Backbone.View.extend({
    template : _.template($("#movies_list").html()),

    initialize: function(){
        _.bindAll(this, 'render');
        this.listenTo(this.collection, "sync", this.render);
        this.listenTo(this.collection, "destroy", this.render);
        this.listenTo(this.collection, "change", this.render);
        this.listenTo(this.collection, "all", this.render);
    },

    render: function(){
        this.$el.html(this.template({movies : this.collection}));
    },
});
