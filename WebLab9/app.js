//
//  router
//  WebLabs
//
//  Created on 26/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

const Router = Backbone.Router.extend({
    routes: {
        "userprofile": "userProfile",
        "login": "login"
    },
    userProfile: function () {
        var that = this;
        if (!Cookies.get('token')) {
            this.navigate("login", {trigger: true});
            return;
        }
        $.ajax({
            url: 'http://localhost:5000/userprofile',
            method: 'GET',
            dataType: 'json',
            data: {
                token: Cookies.get('token')
            },
            success: function (data) {
                $('#Welcome').text('Welcome Mr ' + data.username);
                $('#Welcome').show();
            },
            error: function () {
                $('#Welcome').hide();
                that.navigate('login',  {trigger : true})
            }
        });
    },

    login: function () {
        $("form").show();
        const that = this;
        $("form").submit(function (event) {
            event.preventDefault();
            const data = btoa($(this).find('input[type="password"]').val());
            $.ajax({
                url: 'http://localhost:5000/authorize',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    username: $(this).find('input[type="text"]').val(),
                    password: data
                }),
                success: function (data) {
                    Cookies.set('token', data.token, {expires: 2});
                    $("form").hide();
                    that.navigate('userprofile',  {trigger : true});
                },
                error: function (xhr) {
                    var json = xhr.responseJSON;
                    alert(json ? json.error : 'Unknown error');
                }
            })
        });
    }
});


$(function () {
    $("form").hide();
    $("#Welcome").hide();
    const router = new Router();

    Backbone.history.start();
    router.navigate("userprofile", {trigger : true});
});
