//
//  index
//  WebLab2
//
//  Created on 13/09/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

class RandomCaroussel {
    constructor(width, height, size) {
        this.width = width;
        this.height = height;
        this.size = size;
    }
    initialize() {
        this.pictures = [];
        this.index = 0;
        this.indexContainer = document.getElementById('index-container');
        for (let i = 0; i < this.size; ++i) {
            this.pictures.push(`url('http://thecatapi.com/api/images/get?format=src&type=jpg&salt=${i}')`)
            const elem = document.createElement('i');
            elem.onclick = ((idx) => () => {
                this.lastIndex = this.getIndex();
                this.index = idx;
                this.refresh();
                this.timeOut();
            })(i);
            this.indexContainer.appendChild(elem);
        }
        Array.prototype.forEach.call(this.indexContainer.childNodes, ((elem) => {
            elem.className = 'fa fa-circle-o clickable';
        }));
        this.carroussel = document.getElementById('caroussel');
        this.carroussel.style.width = `${this.width}px`;
        this.carroussel.style.height = `${this.height}px`;
        document.getElementById('left-button').onclick = () => {
            this.goLeft();
        };
        document.getElementById('right-button').onclick = () => {
            this.goRight();
        };
        this.refresh();
        this.timeOut();
    }

    timeOut() {
        if (this.curTimeOut) window.clearTimeout(this.curTimeOut);
        this.curTimeOut = window.setTimeout(() => {
            this.goRight();
        }, 3000);
    }

    getIndex() {
        return (this.index > 0 ? this.index : this.index * -1) % this.size;
    }

    refresh() {
        const idx = this.getIndex() + 1;
        console.log(`${this.lastIndex + 1}, ${idx}`);
        this.carroussel.style.backgroundImage = this.pictures[this.getIndex()];
        console.log(this.indexContainer.childNodes[idx].className);
        if (this.lastIndex || this.lastIndex === 0) {
            const lastChild = this.indexContainer.childNodes[this.lastIndex + 1]
            lastChild.className = lastChild.className.replace( /(?:^|\s)fa-circle(?!\S)/g , ' fa-circle-o' );
        }
        const child = this.indexContainer.childNodes[idx]
        child.className = child.className.replace( /(?:^|\s)fa-circle-o(?!\S)/g , ' fa-circle' );
        console.log( this.indexContainer.childNodes[idx].className);
    }

    goLeft() {
        this.lastIndex = this.getIndex();
        --this.index;
        this.refresh();
        this.timeOut();
    }

    goRight() {
        this.lastIndex = this.getIndex();
        ++this.index;
        this.refresh();
        this.timeOut();
    }

};


window.onload = () => {
    const caroussel = new RandomCaroussel(800, 600, 4);
    caroussel.initialize();
};

