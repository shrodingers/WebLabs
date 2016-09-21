'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
//  caroussel.js
//  WebLab2
//
//  Created on 13/09/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

var RandomCaroussel = function () {
    function RandomCaroussel(width, height, size) {
        _classCallCheck(this, RandomCaroussel);

        this.width = width;
        this.height = height;
        this.size = size;
    }

    _createClass(RandomCaroussel, [{
        key: 'initialize',
        value: function initialize() {
            this.pictures = [];
            this.index = 0;

            for (var i = 0; i < size; ++i) {
                this.pictures.add('url(\'http://lorempixel.com/' + this.width + '/' + this.height + '/?salt=' + i + '\')');
            }
            this.carroussel = document.getElementById('caroussel');
        }
    }, {
        key: 'getIndex',
        value: function getIndex() {
            return this.index % this.size;
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            this.carroussel.style.backgroundImage = this.pictures[this.getIndex()];
        }
    }, {
        key: 'goLeft',
        value: function goLeft() {
            --this.index;
            this.refresh();
        }
    }, {
        key: 'goRight',
        value: function goRight() {
            ++this.index;
            this.refresh();
        }
    }]);

    return RandomCaroussel;
}();

;

exports.default = RandomCaroussel;