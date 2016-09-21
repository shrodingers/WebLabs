'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
//  index
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
            var _this = this;

            this.pictures = [];
            this.index = 0;
            this.indexContainer = document.getElementById('index-container');
            for (var i = 0; i < this.size; ++i) {
                this.pictures.push('url(\'http://thecatapi.com/api/images/get?format=src&type=jpg&salt=' + i + '\')');
                var elem = document.createElement('i');
                elem.onclick = function (idx) {
                    return function () {
                        _this.lastIndex = _this.getIndex();
                        _this.index = idx;
                        _this.refresh();
                        _this.timeOut();
                    };
                }(i);
                this.indexContainer.appendChild(elem);
            }
            Array.prototype.forEach.call(this.indexContainer.childNodes, function (elem) {
                elem.className = 'fa fa-circle-o clickable';
            });
            this.carroussel = document.getElementById('caroussel');
            this.carroussel.style.width = this.width + 'px';
            this.carroussel.style.height = this.height + 'px';
            document.getElementById('left-button').onclick = function () {
                _this.goLeft();
            };
            document.getElementById('right-button').onclick = function () {
                _this.goRight();
            };
            this.refresh();
            this.timeOut();
        }
    }, {
        key: 'timeOut',
        value: function timeOut() {
            var _this2 = this;

            if (this.curTimeOut) window.clearTimeout(this.curTimeOut);
            this.curTimeOut = window.setTimeout(function () {
                _this2.goRight();
            }, 3000);
        }
    }, {
        key: 'getIndex',
        value: function getIndex() {
            return (this.index > 0 ? this.index : this.index * -1) % this.size;
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            var idx = this.getIndex() + 1;
            console.log(this.lastIndex + 1 + ', ' + idx);
            this.carroussel.style.backgroundImage = this.pictures[this.getIndex()];
            console.log(this.indexContainer.childNodes[idx].className);
            if (this.lastIndex || this.lastIndex === 0) {
                var lastChild = this.indexContainer.childNodes[this.lastIndex + 1];
                lastChild.className = lastChild.className.replace(/(?:^|\s)fa-circle(?!\S)/g, ' fa-circle-o');
            }
            var child = this.indexContainer.childNodes[idx];
            child.className = child.className.replace(/(?:^|\s)fa-circle-o(?!\S)/g, ' fa-circle');
            console.log(this.indexContainer.childNodes[idx].className);
        }
    }, {
        key: 'goLeft',
        value: function goLeft() {
            this.lastIndex = this.getIndex();
            --this.index;
            this.refresh();
            this.timeOut();
        }
    }, {
        key: 'goRight',
        value: function goRight() {
            this.lastIndex = this.getIndex();
            ++this.index;
            this.refresh();
            this.timeOut();
        }
    }]);

    return RandomCaroussel;
}();

;

window.onload = function () {
    var caroussel = new RandomCaroussel(800, 600, 4);
    caroussel.initialize();
};