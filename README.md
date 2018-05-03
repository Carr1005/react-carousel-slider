# React Carousel Slider
[![npm package][npm-badge]][npm]

A React component that endeavors to provide flexbility for customizing carousel/slider.

## Demo & Examples

 [carr1005.github.io/react-carousel-slider/index.html](http://carr1005.github.io/react-carousel-slider/index.html)

## Having a quick try:
[![Edit l7qynnp41m](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/l7qynnp41m)

## Installation

Install it from [npm](https://www.npmjs.com/package/react-carousel-slider).

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
## Mobile Compatible

Touch events would be rigistered on this component automatically when mobile device viewport is detected, so the drag event is also available on mobile.

## Usage

We could render a <CarouselSlider> component with the `slideItems` prop which accepts an array of objects with the specific simple sturcture and keys in default style. If the slider doesn't show the image when you are testing with local images, make sure if you do it in the [right way](#loadingLocalImage).

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

#### Click the slide and observe the address bar in CodeSandbox:

[![Edit 5y7v8ppn0x](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5y7v8ppn0x)

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


* [`slideItems`](#slideItems)
* [`slideCpnts`](#slideCpnts)

All props below are optional, default setting is applied if we don't specify ours.

The **Key** without prefixng a  \*  is pure css property, what be filled in column **Value** are just recommended because of the anticipated purpose, feel free to try if things are under control.

* [`manner`](#manner)
* [`accEle`](#accEle)
* [`dotsSetting`](#dotsSetting)
* [`buttonSetting`](#buttonSetting)
* [`lBtnCpnt`](#btnCpnts)
* [`rBtnCpnt`](#btnCpnts)
* [`sliderBoxStyle`](#sliderBoxStyle)
* [`itemsStyle`](#itemsStyle)
* [`textBoxStyle`](#textBoxStyle)


***

* `slideItems` <a id="slideItems"></a> -  accepts an array of objects, specific structure and keys are required.
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
* `slideCpnts` <a id="slideCpnts"></a> -  accepts an array of regular React elements, the `<img></img>` element and available image source are required, we have the [default style](#textBoxStyle) for `<p>` block, override it by specifying your own with using inline-styles.
    
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

#### Allowable Props - Optional

* `manner` <a id="manner"></a> - accepts an object, defines how your carousel / slider performs animating.

| Key           | Value               | Default | Description & Notice |
|:---           |      :---:          |:---:    |:---                  |
| * autoSliding | `{interval: "?s" }` | `false` | Interval between sliding, suffix 's'(seconds)</br>is required, only giving `true` is ineffectual.|
| * circular    | `true \| false`     | `true`  |                      | 
| * duration    | `"?s"`              | `"0.5s"`|                      |

***

* `accEle` <a id="accEle"></a> - accepts an object, to decide whether accessory elements show or not.

| Key           | Value               | Default | Description & Notice |
|:---           |      :---:          |:---:    |:---                  |
| * button      | `true \| false`     | `true`  | You may want to set it to `false` in</br>some situations, e.g., in mobile device viewport.|
| * dots        | `true \| false`     | `true`  |                      |
| * flag        | `true \| false`     | `false` |                      |

***

* `dotsSetting` <a id="dotsSetting"></a> - accepts an object, this prop would be ignored if corresponding value of `dots` is set to `false` in prop `accEle`.

| Key           | Value                   | Default      | Description & Notice |
|:---           |      :---:              |:---:         |:---                  |
| * placeOn     | `top`</br>\| `bottom`</br>\| `beneath` | |Only options in column **Value** are</br>available, fine-tune the position with `margin-`</br>property in `style` below.|
| * style       | `{}`                    |              |                      |

***

Available keys and expected values in object which `dotsSetting.style` accepts.

| Key             | Value                            | Default      | Description & Notice                |
|      :---       |      :---:                       |   :---:      |         :---                        |
| * dotSpace      |     `<length>`                   |  `"5px"`     | Space between dots.                 |
| * dotSize       |     `<length>`                   |  `"10px"`    | For width and height of dot.        |
| * dotColor      | `rgb()` \| `rgba()` \| hex value |  `"#dbdbdb"` |                                     |
| * currDotSize   |    `<length>`                    |  `"12px"`    | For width and height of current dot.|
| * currDotColor  | `rgb()` \| `rgba()` \| hex value |  `"#3897f0"` |                                     |
| * marginTop     |     `<length>`                   |  `"15px"`    | To fine-tune the vertical position</br>when `placeOn` is set to `top`.|
| * marginBottom  |     `<length>`                   |  `"15px"`    | To fine-tune the vertical position</br>when `placeOn` is set to `bottom`.|

***

* `buttonSetting` <a id="buttonSetting"></a> - accepts an object, this prop would be ignored if corresponding value of `button` is set to `false` in prop `accEle`. We use `content: '\003c'`, `content: '\003e'` to present buttons, you may want to design your own by utilizing  props [`lBtnCpnt` and `rBtnCpnt`](#btnCpnts).

| Key           | Value                   | Default      | Description & Notice |
|:---           |      :---:              |:---:         |:---                  |
| * placeOn     | `top-left`</br>`\| top-right`</br>`\| middle-inside`</br>`\| middle-outside`</br>`\| bottom-left`</br>`\| bottom-right`</br>`\| bottom-beneath`     | `"top-left"` | Only options in column **Value** are</br>available, fine-tune the position with `margin`</br>property in `style.left` / `style.right`.</br>Notice about option `middle-outside`:</br>- If your sliderBox width is narrow,</br>maybe you neet parent element like:</br>`<div style={{ width: "?px",`</br>`margin: "0 auto",`</br>`position: "relative" }}>`</br>`</div>`</br>to confine the `absolute` positioned button.</br>- This option would not function with</br>hoverEvent property below.|
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
| fontSize        |    `<length>`                    |  `"20px"`    |                      |
| borderRadius    | `<length>` \| `<percentage>`     |  `"2px"`     |                      |
| border          | [All border property](https://developer.mozilla.org/en-US/docs/Web/CSS/border) | `"none"` | |

***

* `lBtnCpnt`, `rBtnCpnt` <a id="btnCpnts"></a> - Both accepts a regular React element. Use these props to give our own designed button, `style` property in `buttonSetting` would be ignored. See the example in [Demo](http://carr1005.github.io/react-carousel-slider/index.html#trickyUsage).

***

* `sliderBoxStyle` <a id="sliderBoxStyle"></a> - accepts an object.

| Key             | Value                            | Default      | Description & Notice |
|      :---       |             :---:                |   :---:      |    :---              |
| height          | `<length>` \| `<percentage>`     | `"400px"`    |                      |
| width           | `<length>` \| `<percentage>`     | `"90%"`      |                      |
| background      | `rgb()` \| `rgba()` \| hex value | `"#EEEEEE"`  |                      |
| border          | [All available properties](https://developer.mozilla.org/en-US/docs/Web/CSS/border) | `none` | | 

***

* `itemsStyle` <a id="itemsStyle"></a> - accepts an object.

| Key             | Value                              | Default      | Description & Notice |
|      :---       |        :---:                       |  :---:       |  :---                |
| height          | `<length>` \| `<percentage>`       | `"80%"`      |                      |
| padding         | `<length>` \| `<percentage>`       | `"3px"`      |                      |
| background      | `rgb()` \| `rgba()` \| hex value   | `"#EEEEEE"`  |                      |
| margin          | `0px ?px`                          | `"0px 40px"` | To give the space between slides</br>, only accept value in form `0px ?px` now. |
|minWidth         | `<length>` \| `<percentage>`       | `100px`      | For the situation that the source</br>of image is not provided, and maybe</br>you want to let your slide still have room.</br>See more explaination in the [Demo](http://carr1005.github.io/react-carousel-slider/index.html#trickyUsage).|

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
| top             | `<length>` \| `<percentage>`     | `"80%"`                     | To adjust vertical position.</br>`50%` for centering.|
| fontSize        | `<length>`                       |                             |                      |
| fontWeight      | [All available properties](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)|                             |                      |

## Additional Know How - Loading Local Images <a id="loadingLocalImage"></a>

While testing this component with local images, some problems may appear because we are just new to develop in React with webpack.

If we have a directory structure like:

```
- app
    |___ demo
    |      |___ images
    |      |        |___ yourImage1.jpg
    |      |        |___ yourImage2.jpg
    |      |
    |      |___index.js
    |
    |
    |___ src
    | 
    ...
```

In `/app/demo/index.js`, provide image sources with relative paths such as:

```jsx
    let data = [
        {
            des: "1",
            imgSrc: "./images/yourImage1.jpg"
        },
        {
            des: "2",
            imgSrc: "./images/yourImage2.jpg"
        }
    ];

    return <CarouselSlider slideItems = {data} />;
```

The images certainly won't be rendered. This is not caused by the practice in our component, it caused by the bundling mechanism that webpack works. We could have more tests:

```jsx

    let data = [
        {
            des: "1",
            imgSrc: "./images/yourImage1.jpg"
        },
        {
            des: "2",
            imgSrc: "./images/yourImage2.jpg"
        }
    ];
    
    let imgOne = (<img src = {data[0].imgSrc}></img>);
    let imgTwo = (<img src = {require(data[0].imgSrc)}></img>);
    return (<div>
        {imgOne}
        {imgTwo}
    </div>);

```
Neither of image elements above can load and render the image succesfully.  

Here are some points that we need to know:

* Webpack needs to know what files to bundle at compile time, but dynamic image path in expression would only know in runtime.

* In fact, there is a tricky way that gives concatenated string containing expression to `require()` to include the images for bundling. But to properly render the images, it still need to do something on `loaders` in `webpack.config.js`. We are not going this way in this component behind.

* To get the proper image sources from local and pass to our carousel slider component, here is a good way with [reqiure.context](https://webpack.js.org/guides/dependency-management/#require-context):

```jsx
/* In the directory structure we assume above*/

let data = [
        {
            des: "1",
            imgSrc: "yourImage1.jpg"
        },
        {
            des: "2",
            imgSrc: "yourImage2.jpg"
        }
    ];
    
    let assetsPath = require.context('./images', false, /\.(png|jpe?g|svg)$/);
    
    // Substituting the imgSrc from file name in ./images to their corresponding path after they are bundled.
    data.map((item, index) => {
        // console.log(assetsPath.keys(), assetsPath.id);
        item.imgSrc = assetsPath('./' + item.imgSrc);
    });
    
    return <CarouselSlider slideItems = {data} />;
```
## License

MIT Licensed. Copyright (c) Carr.W 2018.
    
[npm-badge]: https://img.shields.io/npm/v/react-carousel-slider.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-carousel-slider
