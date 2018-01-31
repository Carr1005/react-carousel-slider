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
* `slidesItems` -  accepts an array of objects, specific structure and keys are required.
```js
    [
        {
            des: "1",
            imgSrc: "https://i.imqur.com/yourImage.jpg"
        },
        {
            des: "2",
            imgSrc: "https://i.imqur.com/yourImage2.jpg"
        }
    ]
```
* `slidesCpnts` -  accepts an array of regular React elements, the `<img></img>` element and available image source are required, we have the [default style](#textBoxStyle) for `<p>` block, override it by specifying your own with using inline-styles.
    
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
All props below are optional, default setting is applied if we don't specify ours.
The **Key** without prefixng a  ' * '  is pure css property, what be filled in column **Value** are just recommended because of the anticipated purpose, feel free to try if things are under control.

***

* `manner` - accepts an object, defines how your carousel / slider performs animating.

| Key           | Value               | Default | Description & Notice |
|:---           |      :---:          |:---:    |:---                  |
| * autoSliding | `{interval: "?s" }` | `false` | Interval between sliding, suffix 's'(seconds)</br>is required, only giving `true` is ineffectual.|
| * circular    | `true \| false`     | `true`  |                      | 
| * duration    | `"?s"`              | `"0.5s"`|                      |
| * button      | `true \| false`     | `true`  | Wheather to render button or not, it may</br>be set to `false` in mobile device viewport.|
| * flag        | `true \| false`     | `false` |                      |

***

* `buttonSetting` - accepts an object.

| Key           | Value                   | Default      | Description & Notice |
|:---           |      :---:              |:---:         |:---                  |
| * placeOn     | `top-left`</br>`\| top-right`</br>`\| middle-inside`</br>`\| middle-outside`</br>`\| bottom-left`</br>`\| bottom-right`</br>`\| bottom-beneath`     | `"top-left"` | Only options in column **Value** are</br>available, fine-tune the position with `margin`</br>property in `style.left` / `style.right`|
| * hoverEvent  | `true \| false`         | `false`      | Buttons are only visible when the</br>cursor hover on the slider. |
| * style       | `{left: {}, right: {}}` |              |                      |

Recommended keys and values in object which `buttonSetting.style.left` or `buttonSetting.style.right` accepts.

| Key             | Value                            | Default      | Description & Notice |
|      :---       |      :---:                       |   :---:      |         :---         |
| color           | hex value                        |  `"#ffffff"` |                      |
| background      | `rgb()` \| `rgba()` \| hex value |  `"#757575"` |                      |
| height          |    `<length>`                    |  `"30px"`    |                      |
| width           |    `<length>`                    |  `"30px"`    |                      |
| margin          |    `<length>`                    |  `"10px"`    |                      |
| "font-size"     |    `<length>`                    |  `"20px"`    |                      |
| "border-radius" | `<length>` \| `<percentage>`     |  `"2px"`     |                      |
| border          | [All border property](https://developer.mozilla.org/en-US/docs/Web/CSS/border) | `"none"` | |

***

* `lBtnCpnt`, `rBtnCpnt` - Both accepts a regular React element. Use these props to give our own designed button, `style` property in `buttonSetting` would be ignored, see the example in [Demo]().

***

* `sliderBoxStyle` - accepts an object.

| Key             | Value                            | Default      | Description & Notice |
|      :---       |             :---:                |   :---:      |    :---              |
| height          | `<length>` \| `<percentage>`     | `"400px"`    |                      |
| width           | `<length>` \| `<percentage>`     | `"90%"`      |                      |
| background      | `rgb()` \| `rgba()` \| hex value | `"#EEEEEE"`  |                      |
| border          | [All border property](https://developer.mozilla.org/en-US/docs/Web/CSS/border) | `none` | | 

***

* `itemsStyle` - accepts an object.

| Key             | Value                              | Default      | Description & Notice |
|      :---       |        :---:                       |  :---:       |  :---                |
| height          | `<length>` \| `<percentage>`       | `"400px"`    |                      |
| padding         | `<length>` \| `<percentage>`       | `"3px"`      |                      |
| background      | `rgb()` \| `rgba()` \| hex value   | `"#EEEEEE"`  |                      |
| margin          | `0px ?px`                          | `"0px 40px"` | To decide the space between slides</br>, only accept value in form `0px ?px` now. |

***

* `textBoxStyle` <a id="textBoxStyle"></a> accepts an object.

| Key             | Value                          | Default                       | Description & Notice |
|      :---       |             :---:                |   :---:                     |    :---              |
| color           | hex value                        | `"#ffffff"`                 |                      |
| padding         | `<length>` \| `<percentage>`     | `"10px"`                    |                      |
| background      | `rgb()` \| `rgba()` \| hex value | `"rgba(117, 117, 117, .6)"` |                      |
| "border-radius" | `<length>` \| `<percentage>`     | `"2px"`                     |                      |
| "text-align"    | `left \| right \| center`        | `"center"`                  |                      |
| width           | `<length>` \| `<percentage>`     | `"75%"`                     |                      |
| top             | `<length>` \| `<percentage>`     | `"80%"`                     | To adjust vertical position</br>, `50%` for centering|

    
[npm-badge]: https://img.shields.io/npm/v/react-carousel-slider.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-carousel-slider

