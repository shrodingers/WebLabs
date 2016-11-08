//
//  loadTemplates
//  WebLabs
//
//  Created on 13/10/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

WeekView = Backbone.View.extend({
    // Définition de la template
    template : _.template($("#week_template").html()),

    current: null,

    initialize: function(){
        _.bindAll(this, 'render');
        this.listenTo(this.collection, "sync", this.render);
        this.listenTo(this.collection, "destroy", this.render);
    },

    render: function(){
        this.$el.html(this.template({days : this.collection}));
    },
});

TodayView = Backbone.View.extend({
    template : _.template($("#current_day_template").html()),
    initialize: function(){
        _.bindAll(this, 'render');
        this.listenTo(this.model, "sync", this.render);
        this.listenTo(this.model, "destroy", this.render);
    },
    render: function(){
        this.$el.html(this.template({
            day : this.model,
            location : this.location
        }));
    }
});


