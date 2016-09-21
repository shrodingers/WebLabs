//
//  caroussel.js
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

        for (let i = 0; i < size; ++i) {
            this.pictures.add(`url('http://lorempixel.com/${this.width}/${this.height}/?salt=${i}')`)
        }
        this.carroussel = document.getElementById('caroussel');


    }

    getIndex() {
        return this.index % this.size;
    }

    refresh() {
        this.carroussel.style.backgroundImage = this.pictures[this.getIndex()];
    }

    goLeft() {
        --this.index;
        this.refresh();
    }

    goRight() {
        ++this.index;
        this.refresh();
    }

};

export default RandomCaroussel;
