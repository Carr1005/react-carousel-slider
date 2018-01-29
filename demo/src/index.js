import React, {Component} from 'react'
import {render} from 'react-dom'

import CarouselSlider from '../../src'

class Demo extends Component {
    render() {
        
        let jsonData = require('./slidesExample.json');
        
        const textBoxStyle = {
            width: "50%",
            background: "rgba(155, 97, 1, 0.5)",
            top: "80%",
            textAlign: "right",
            color: "white"
        };
        let items = jsonData.items.map((item, index) => 
            <div>
                <img src = {item.imgSrc} ></img>
                <p style = {textBoxStyle} >{item.des}</p>
            </div>
        );

        let defautDemo = <CarouselSlider slideItems = {jsonData.items} />;

        return (<div style = {{background: "#fafafa", padding: "50px 0px"}} >
            <h1 style = {{textAlign: "center", color: "#00897b"}} >react-carousel-slider</h1>
            {defautDemo}
        </div>);
    }
}

render(<Demo/>, document.querySelector('#demo'))
