/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
    class Details {
        constructor() {
            this.DOM = {};

            const detailsTmpl = `
            <div class="details__bg details__bg--up"></div>
            <div class="details__bg details__bg--down"></div>
            <img class="details__img" src="" alt="img 01"/>
            <h2 class="details__title left-aligned"></h2>
            <h3 class="details__subtitle"></h3>
            <p class="details__description"></p>
            `;

            this.DOM.details = document.createElement('div');
            this.DOM.details.className = 'details';
            this.DOM.details.innerHTML = detailsTmpl;
            DOM.content.appendChild(this.DOM.details);
            this.init();
        }
        init() {
            this.DOM.bgUp = this.DOM.details.querySelector('.details__bg--up');
            this.DOM.bgDown = this.DOM.details.querySelector('.details__bg--down');
            this.DOM.img = this.DOM.details.querySelector('.details__img');
            this.DOM.title = this.DOM.details.querySelector('.details__title');
            this.DOM.subtitle = this.DOM.details.querySelector('.details__subtitle');
            this.DOM.description = this.DOM.details.querySelector('.details__description');
        }
        fill(info) {
            this.DOM.img.src = info.img;
            this.DOM.title.innerHTML = info.title;
            this.DOM.subtitle.innerHTML = info.subtitle;
            this.DOM.description.innerHTML = info.description;
        }
        getProductDetailsRect() {
            return {
                productBgRect: this.DOM.productBg.getBoundingClientRect(),
                detailsBgRect: this.DOM.bgDown.getBoundingClientRect(),
                productImgRect: this.DOM.productImg.getBoundingClientRect(),
                detailsImgRect: this.DOM.img.getBoundingClientRect()
            };
        }
        open(data) {
            if ( this.isAnimating ) return false;
            this.isAnimating = true;

            this.DOM.details.classList.add('details--open');
            
            this.DOM.productBg = data.productBg;
            this.DOM.productImg = data.productImg;

            this.DOM.productBg.style.opacity = 0;
            this.DOM.productImg.style.opacity = 0;

            const rect = this.getProductDetailsRect();

            this.DOM.bgDown.style.transform = `translateX(${rect.productBgRect.left-rect.detailsBgRect.left}px) translateY(${rect.productBgRect.top-rect.detailsBgRect.top}px) scaleX(${rect.productBgRect.width/rect.detailsBgRect.width}) scaleY(${rect.productBgRect.height/rect.detailsBgRect.height})`;
            this.DOM.bgDown.style.opacity = 1;
            
            this.DOM.img.style.transform = `translateX(${rect.productImgRect.left-rect.detailsImgRect.left}px) translateY(${rect.productImgRect.top-rect.detailsImgRect.top}px) scaleX(${rect.productImgRect.width/rect.detailsImgRect.width}) scaleY(${rect.productImgRect.height/rect.detailsImgRect.height})`;
            this.DOM.img.style.opacity = 1;

            anime({
                targets: [this.DOM.bgDown,this.DOM.img],
                duration: (target, index) => index ? 800 : 250,
                easing: (target, index) => index ? 'easeOutExpo' : 'easeOutSine',
                elasticity: 250,
                translateX: 0,
                translateY: 0,
                scaleX: 1,
                scaleY: 1,
                complete: () => this.isAnimating = false
            });

            anime({
                targets: [this.DOM.title, this.DOM.subtitle, this.DOM.description, this.DOM.magnifier],
                duration: 600,
                easing: 'easeOutExpo',
                delay: (target, index) => {
                    return index*60;
                },
                translateY: (target, index, total) => {
                    return index !== total - 1 ? [50,0] : 0;
                },
                scale:  (target, index, total) => {
                    return index === total - 1 ? [0,1] : 1;
                },
                opacity: 1
            });

            anime({
                targets: this.DOM.bgUp,
                duration: 100,
                easing: 'linear',
                opacity: 1
            });

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeOutSine',
                translateY: ['100%',0],
                opacity: 1
            });
        }
        close() {
            if ( this.isAnimating ) return false;
            this.isAnimating = true;

            this.DOM.details.classList.remove('details--open');

            anime({
                targets: this.DOM.close,
                duration: 250,
                easing: 'easeOutSine',
                translateY: '100%',
                opacity: 0
            });

            anime({
                targets: this.DOM.bgUp,
                duration: 100,
                easing: 'linear',
                opacity: 0
            });

            anime({
                targets: [this.DOM.title, this.DOM.subtitle, this.DOM.description],
                duration: 20,
                easing: 'linear',
                opacity: 0
            });

            const rect = this.getProductDetailsRect();
            anime({
                targets: [this.DOM.bgDown,this.DOM.img],
                duration: 250,
                easing: 'easeOutSine',
                translateX: (target, index) => {
                    return index ? rect.productImgRect.left-rect.detailsImgRect.left : rect.productBgRect.left-rect.detailsBgRect.left;
                },
                translateY: (target, index) => {
                    return index ? rect.productImgRect.top-rect.detailsImgRect.top : rect.productBgRect.top-rect.detailsBgRect.top;
                },
                scaleX: (target, index) => {
                    return index ? rect.productImgRect.width/rect.detailsImgRect.width : rect.productBgRect.width/rect.detailsBgRect.width;
                },
                scaleY: (target, index) => {
                    return index ? rect.productImgRect.height/rect.detailsImgRect.height : rect.productBgRect.height/rect.detailsBgRect.height;
                },
                complete: () => {
                    this.DOM.bgDown.style.opacity = 0;
                    this.DOM.img.style.opacity = 0;
                    this.DOM.bgDown.style.transform = 'none';
                    this.DOM.img.style.transform = 'none';
                    this.DOM.productBg.style.opacity = 1;
                    this.DOM.productImg.style.opacity = 1;
                    this.isAnimating = false;
                }
            });
        }
    };

    class Item {
		constructor(el) {
			this.DOM = {};
            this.DOM.el = el;
            this.DOM.product = this.DOM.el.querySelector('.product');
            this.DOM.productBg = this.DOM.product.querySelector('.product__bg');
            this.DOM.productImg = this.DOM.product.querySelector('.product__img');

            this.info = {
                img: this.DOM.productImg.src,
                title: this.DOM.product.querySelector('.product__title').innerHTML,
                subtitle: this.DOM.product.querySelector('.product__subtitle').innerHTML,
                description: this.DOM.product.querySelector('.product__description').innerHTML
            };

			this.initEvents();
		}
        initEvents() {
            this.DOM.product.addEventListener('click', function(e) {
                console.log('')
                if (e.target && e.target.getAttribute('class') === 'product'){
                    this.open()
                 }
            });
        }
        open() {
            DOM.details.fill(this.info);
            DOM.details.open({
                productBg: this.DOM.productBg,
                productImg: this.DOM.productImg
            });
        }
    };

    const DOM = {};
    DOM.grid = document.querySelector('.grid');
    DOM.content = DOM.grid.parentNode;
    DOM.gridItems = Array.from(DOM.grid.querySelectorAll('.grid__item'));
    let items = [];
    DOM.gridItems.forEach(item => items.push(new Item(item)));
    DOM.details = new Details();
    imagesLoaded(document.body, () => document.body.classList.remove('loading'));
};