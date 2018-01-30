# React Carousel Slider
[![npm package][npm-badge]][npm]

A React component that endeavors to provide flexbility for customizing carousel/slider.

## Installation

Install it from npm.

```js
npm install react-carousel-slider
```
As ES module:
```js
import CarouselSlider from "react-carousel-slider"
```
As CommonJS module:
```js
var CarouselSlider = require("react-carousel-slider")
```

The UMD build:
```html 
<script src="https://unpkg.com/react-carousel-slider/umd/react-carousel-slider.js"></script>
```

## Usage

We could render a <CarouselSlider> component with the `slideItems` prop which accepts a array of objects with the specific simple sturcture and keys in default style.

```jsx

import React, {Component} from 'react'
import CarouselSlider from 'react-carousel-slider';

class App extends Component {
    render() {
        let data = [
            {
                des: "1",
                imgSrc: "https://i.imqur.com/yourImage.jpg"
            },
            {
                des: "2",
                imgSrc: "https://i.imqur.com/yourImage2.jpg"
            }
        ];
        
        return <CarouselSlider slideItems = {data} />;
    }
}
```
Or give a array of your own regular React elements to `slideCpnts` prop, so we could let our slide contain a clickable link, even cooperating with `<Link>` component of [React Router](https://github.com/ReactTraining/react-router) library for client side routing is possible.

```jsx

import React, {Component} from 'react'
import CarouselSlider from 'react-carousel-slider';
import {BrowserRouter as Router, Link } from 'react-router-dom';

class App extends Component {
    render() {
        let jsonData = require('./slidesExample.json');
        /*
            {
                "items": [
                    {
                        "des": "1",
                        "imgSrc": "https://i.imqur.com/yourImage.jpg"
                    },
                    {
                        "des": "2",
                        "imgSrc": "https://i.imqur.com/yourImage2.jpg"
                    }
                ] 
            }
        */
        
        let items = jsonData.items.map((item, index) => 
            <Link to = {'/'+index} key = {index}>
                <img src = {item.imgSrc} ></img>
                <p>{item.des}</p>
            </Link>
        );
        
        return (<Router>
            <CarouselSlider slideCpnts = {items} />
        </Router>);
    }
}
```
    
[npm-badge]: https://img.shields.io/npm/v/react-carousel-slider.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-carousel-slider

