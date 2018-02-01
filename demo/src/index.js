import React, {Component} from 'react'
import {render} from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CarouselSlider from '../../src'

/*
basic usage - o
custom slide component - o
btn component - 
auto sliding - o
non circular - o
buttonSetting - 

itemsStlye as slide button
local image

*/




class Demo extends Component {
    
    render() {
        
        let jsonData = require('./slidesExample.json');
        


        let defaultDemo = <CarouselSlider slideItems = {jsonData.basic.items} />;


        let sliderBoxStyle = {
            width: "60%",
            background: "transparent",
            border: "1px solid #e1e4e8"
        }

        let itemsStyle = {
            height: "60%",
            padding: "20px",
            background: "transparent",
            border: "1px solid #e1e4e8",
            borderRadius: "2px"
        }

        let textBoxStyle = {
            width: "60%",
            background: "rgba(155, 108, 27, 0.5)",
            top: "80%",
            textAlign: "right",
            color: "#ffffff"
        };

        let textBoxStyle2 = {
            width: "30%",
            top: "30%",
            color: "#ffffff",
            marginRight: "0%"
        };
        // margin to tune the textbox
        let buttonSetting = {
            placeOn: "bottom-beneath",
            style: {
                left: {
                    color: "#929393",
                    background: "transparent",
                    border: "1px solid #e1e4e8",
                    borderRadius: "50%"
                },
                right: {
                    color: "#929393",
                    background: "transparent",
                    border: "1px solid #e1e4e8",
                    borderRadius: "50%"
                }
            }
        }

        
        let customSlideCpnts = jsonData.customSlideCpnt.items.map((item, index) => 
            <Link to = {'/page' + index} key = {index} >
                <img src = {item.imgSrc} ></img>
                <p style = {textBoxStyle} >{item.des1}</p>
                <p style = {textBoxStyle2} >{item.des2}</p>
            </Link>
        );

        let customSlideCpnt = (<Router><CarouselSlider slideCpnts = {customSlideCpnts} manner = {{circular: false}} sliderBoxStyle = {sliderBoxStyle} buttonSetting = {buttonSetting}  itemsStyle = {itemsStyle}/></Router>);

        let manner = {
            autoSliding: {interval: "3s"}
        };
        let buttonSetting2 = {
            placeOn: "middle-inside",
            hoverEvent: true,
            style: {
                left: {
                    height: "50px",
                    width: "50px",
                    color: "#929393",
                    background: "rgba(225, 228, 232, 0.8)",
                    borderRadius: "50%"
                },
                right: {
                    height: "50px",
                    width: "50px",
                    color: "#929393",
                    background: "rgba(225, 228, 232, 0.8)",
                    borderRadius: "50%"
                }
            }
        }
        
        let autoSliding = <CarouselSlider slideItems = {jsonData.autoSliding.items}  manner = {manner} buttonSetting = {buttonSetting2} />;
        
        let buttons = jsonData.buttonsUsage.items.map((item, index) => 
            <Link to = {'/' + item.buttonLabel} key = {index} >
                <img src = {item.imgSrc} ></img>
                <p>{item.buttonLabel}</p>
            </Link>
        );

        let itemsStyle2 = {
            height: "30%",
            padding: "0px",
            background: "black",
            borderRadius: "2px",
            minWidth: "100px"
        }
        
        let buttonsUsage = (<Router><CarouselSlider slideCpnts = {buttons} manner = {{circular: false}} itemsStyle = {itemsStyle2} /></Router>);
        


        return (
            <div style = {{background: "#fafafa", padding: "50px 0px"}} >
                <h1 style = {{textAlign: "center", color: "#00897b"}} >react-carousel-slider</h1>
                <div style = {{height: "auto", padding: "50px 0px"}} >
                    {defaultDemo}
                </div>
                <div style = {{height: "auto", padding: "50px 0px"}} >
                    {customSlideCpnt}
                </div>
                <div style = {{height: "auto", padding: "50px 0px"}} >
                    {autoSliding}
                </div>
                <div style = {{height: "auto", padding: "50px 0px"}} >
                    {buttonsUsage}
                </div>
            </div>
        );
    }
}

render(<Demo/>, document.querySelector('#demo'))
