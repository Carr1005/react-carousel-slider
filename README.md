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

We could render a <CarouselSlider> component with the `slideItems` prop which accepts an array of objects with the specific simple sturcture and keys in default style.

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
Or give an array of your own regular React elements to `slideCpnts` prop, this lets our slide have availability to contain a clickable link. Even cooperating with `<Link>` component of [React Router](https://github.com/ReactTraining/react-router) library for client side routing is possible.

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
            <Link to = {'/' + item.des} >
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

## Allowable Props
* `slidesItems` -  accepts an array of objects, the required structure and keys are described in the first example above.
* `slidesCpnts` -  accepts an array of regular React elements, the `<img></img>` element and available image source are required, we have [default style]() for `<p>` block, override it by specifying your own with using inline-styles.
    
```jsx
    let textBoxStyle = {
        width: "50%",
        background: "transparent",
        textAlign: "right",
        color: "black"
    };
    
    let items = jsonData.items.map((item, index) => 
        <div>
            <img src = {item.imgSrc} ></img>
            <p style = {textBoxStyle} >{item.des}</p>
        </div>
    );
```
***
* All props below are optional, they apply default setting if we don't specify ours.
* The **Key** without prefixng a  ' * '  is pure css property, what be filled in column **Value** are just recommended because of anticipated purpose, feel free to try if things are under control.

* `manner` - accepts an object.

| Key | Value | Default | Description & Notice |
|:---|:---:|:---:|:---|
| * autoSliding | `{interval: "?s" }` | `false` |  |
| * circular | `true \| false` | `true` | |
| * duration | `"?s"` | `"0.5s"` | |
| * flag | `true \| false` | `false` | |
| * button | `true \| false` | `true` | |

* `buttonSetting` - accepts an 

| Key | Value | Default | Description & Notice |
|:---|:---:|:---:|:---|
| * placeOn | `top-left`</br>`\| top-right`</br>`\| middle-inside`</br>`\| middle-outside`</br>`\| bottom-left`</br>`\| bottom-right`</br>`\| bottom-beneath` | `top-left` |  |
| * hoverEvent | `true \| false` | `false` | |
| * style | `{left: {}, right: {}}` | | |

Keys and Values in object that `buttonSetting.style.left` and `buttonSetting.style.right` accept

| Key | Value | Default | Description & Notice |
|:---|:---:|:---:|:---|
| color | hex value | #ffffff |  |
| background | rgb(), rgba(), hex value | #757575 | |
| height | `<length>` | 30px | |
| width | `<length>` | 30px | |
| margin | `<length>` | 10px | |
| "font-size" | "?px" | 20px | |
| "border-radius" | "?px" | 2px | |
| border | [All border property](https://developer.mozilla.org/en-US/docs/Web/CSS/border) | none | |
 



* `sliderBoxStyle` - accepts an object.

| Key | Value | Default | Description & Notice |
|:---|:---:|:---:|:---|
| height | 	`<length>`, `<percentage>` | 400px |  |
| width | `<length>`, `<percentage>` | 90% | |
| background | rgb(), rgba(), hex value | #EEEEEE | |
| border | [All border property](https://developer.mozilla.org/en-US/docs/Web/CSS/border) | none | | 

* `itemsStyle` -

| Key | Value | Default | Description & Notice |
|:---|:---|:---|:---|
| height | 	`<length>`, `<percentage>` | 400px |  |
| padding | `<length>`, `<percentage>` | 3px | |
| background | rgb(), rgba(), hex value | #EEEEEE | |
| margin | `0px ?px` | `0px 40px` | To decide the space between slides, only accept in form "0px ?px" now.| 

    
[npm-badge]: https://img.shields.io/npm/v/react-carousel-slider.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-carousel-slider

