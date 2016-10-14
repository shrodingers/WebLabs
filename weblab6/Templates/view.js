//
//  loadTemplates
//  WebLabs
//
//  Created on 13/10/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

TasksView = Backbone.View.extend({
    // Définition de la template
    template : _.template($("#task_template").html()),

    current: null,

    clickList: function(event) {
        this.$('a').css({
            'background-color': '',
            color: 'black',
        });
        this.current = event.target.id;
        $(event.target).css({
            'background-color': 'pink',
            color: 'white',
        });
    },

    createTask: function () {
        this.collection.create({
            task: this.$('#note').val()
        });
    },

    updateTask: function () {
        const task = this.collection.get(this.current);
        if (task) task.save({
            task: this.$('#note').val()
        });
    },

    deleteTask: function() {
        const task = this.collection.get(this.current);
        if (task) this.collection.get(this.current).destroy({
            wait: true,
            success: function() {

            }
        });
    },

    events: {
        "click #add-note": "createTask",
        "click #modify-note": "updateTask",
        "click #delete-note": "deleteTask",
        "click a": "clickList"
    },

    initialize: function(){
        _.bindAll(this, 'render');
        this.render();
    },

    render: function(){
        this.$el.html(this.template());
    },
});

TaskListView = Backbone.View.extend({
    template : _.template($("#task_list_template").html()),
    initialize: function(){
        _.bindAll(this, 'render');
        this.listenTo(this.collection, "sync", this.render);
        this.listenTo(this.collection, "destroy", this.render);
    },
    render: function(){
        this.$el.html(this.template({tasks : this.collection}));
    }
});


