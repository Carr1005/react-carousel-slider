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
            autoSliding: {interval: "3s"},
            duration: "2s"      
        };

        if (/Mobi|Tablet|iPad|iPhone/.test(navigator.userAgent)) {
            manner.button = false;
        }

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
                <p style = {{top:"50%", background: item.color}} >{item.buttonLabel}</p>
            </Link>
        );

        let buttonSetting3 = {
            placeOn: "middle-outside",
            style: { 
                left: {
                    background: "rgba(111, 111, 111, 0.8)",
                },
                right: {
                    background: "rgba(111, 111, 111, 0.8)",
                }
            }
        };

        let itemsStyle2 = {
            height: "auto",
            padding: "0px",
            background: "transparent",
            margin:"0 20px",
            border: "none",

            minWidth: "100px" 
        };


        let btnStyle = {
            fontSize: "36px",
            background: "transparent",
        }

        let rBtnCpnt = (<i style = {btnStyle} className = "material-icons" >arrow_forward</i>);
        let lBtnCpnt = (<i style = {btnStyle} className = "material-icons" >arrow_back</i>);
        
        let buttonsUsage = (<Router><CarouselSlider slideCpnts = {buttons} manner = {{circular: false}} sliderBoxStyle = {{width: "80%", background: "transparent"}} buttonSetting = {buttonSetting3} rBtnCpnt = {rBtnCpnt} lBtnCpnt = {lBtnCpnt} itemsStyle = {itemsStyle2} /></Router>);
        
        
        let separaterStyle = {
            width: "80%", 
            margin: "50px auto",
            borderTop: "2px solid #eaecef"
        }

        let codeBlockStyle = {
            width: "80%",
            margin: "0 auto"
        }
        
        let preCodeStyle = {
            width: "100%",
            "white-space": "pre-wrap"
            // display: "inline-block",
            // margin: "0 auto",
            // width: "50%"
        }
        let preJsonStyle = {
            width: "100%",
            "white-space": "pre-wrap"
            // display: "inline-block",
            // margin: "0 auto",
            // width: "50%"
        }
        
        let titleStyle = {
            textAlign: "center",
            color: "rgb(117, 117, 117)",
            fontWeight: "400"
        };

        let seoTitleStyle = {

            position: "absolute",
            visibility: "hidden"
        };

        let desStyle = {
            width: "60%",
            margin: "50px auto"
        };

        let listStyle = {
            display: "block",
            width: "60%",
            margin: "0px auto",
            listStyleType: "none"
        };

        let slistStyle = {
            marginTop: "5px",
            marginBottom: "15px" 
        };

        let githubLink = {
            position: "sticky",
            float: "right",
            top: 0,
            textAlign: "right",
            color: "#fff",
            fontWeight: "400",
            fontSize: "18px",
            display: "block",
            zIndex: 2000000,
            padding: "10px",
            border: "2px",
            background: "rgba(117, 117, 117, 0.5)",
            textDecoration: "none",
        };
        // 

        return (
            
            <div style = {{background: "#fff", paddingBottom: "50px", fontFamily: "Roboto,sans-serif"}} >
                <a  style = {githubLink} href= "https://github.com/Carr1005/react-carousel-slider">Github</a>     
                <br></br>
                <br></br>
                <br></br>
                <h1 style = {titleStyle} >React Carousel Slider</h1>
                <h1 style = {seoTitleStyle} >React Component Carosuel Slider</h1>
                <h1 style = {seoTitleStyle} >Circular Carosuel</h1>
                <h1 style = {seoTitleStyle} >Mobile Swipe</h1>
                <h1 style = {seoTitleStyle} >React Component 幻燈片</h1>
                <h1 style = {seoTitleStyle} >React Component スライド</h1>
                <h1 style = {seoTitleStyle} >React Component 슬라이드</h1>
                <div id = "basic" style = {{height: "auto", padding: "50px 0px"}} >
                    <h2 style = {titleStyle} >Basic</h2>
                    <p style = {desStyle} >
                        This example shows that we could just give an array of objects, let componet render with its default style.
                        When we are uing <code>prop - slideItems</code>, particular name of key is required :
                    </p>
                    <p style = {desStyle} >
                        <code>imgSrc</code> for image source and <code>des</code> for description about image, we could decide to provide <code>des</code> or not, but <code>imgSrc</code> is the must. The require structure of data is shown in the code block below.
                    </p>
                    {defaultDemo}
                </div>  
                <div style = {codeBlockStyle}>   
                    <h4 style = {titleStyle} >.js</h4>
                    <pre style = {preCodeStyle}>{`

                        render() {

                            let data = [

                                {
                                    "des": "1",
                                    "imgSrc": "https://i.imgur.com/7nbAJ0C.jpg"
                                },
                                {
                                    "des": "2",
                                    "imgSrc": "https://i.imgur.com/pgCzueK.jpg"
                                }
                                {
                                    "des": "3",
                                    "imgSrc": "https://i.imgur.com/d5aiXJP.jpg"
                                },
                                {
                                    "des": "4",
                                    "imgSrc": "https://i.imgur.com/L75otV6.jpg"
                                },
                                {
                                    "des": "5",
                                    "imgSrc": "https://i.imgur.com/qkPMr9D.jpg"
                                }
                            ];
                    
                            return  <CarouselSlider slideItems = {data} />;   

                        }

                    `}</pre>
                </div>

                <div className = "separater" style = {separaterStyle} ></div>
                
                <div id = "customCpnt" style = {{height: "auto", padding: "50px 0px"}} >
                    <h2 style = {titleStyle} >Custom Slide Component</h2>
                    <p style = {desStyle} >
                        This example shows:
                    </p>
                    <ul style = {listStyle} >
                        <li style = {slistStyle} > - We could design our own slide componet and pass it by  <code>prop - slideCpnts</code>.</li>
                        <li style = {slistStyle} > - Cooperate to <code>{`<Link>`}</code> of <a href = "https://reacttraining.com/react-router/web" >React Router</a> for client side routing is possible, click the slides to see what happens.</li>
                        <li style = {slistStyle} > - Several features of <code>prop - buttonSetting</code></li>
                    </ul>
                    <h4 style = {titleStyle} >Notice</h4>
                    <ul style = {listStyle} >
                        <li style = {slistStyle} > - <code>img</code> element is required.</li>
                        <li style = {slistStyle} > - Observe the prop <code>itemsStyle</code> and inline-style object <code>textBoxStyle2</code> to see how to properly handle the css property to achieve the slide we want.</li>
                    </ul>
                    {customSlideCpnt}
                </div>
                <div style = {codeBlockStyle}>
                    <h4 style = {titleStyle} >slidesExample.json</h4>
                    <pre style = {preJsonStyle}>{`
                        {
                            "customSlideCpnt": {

                                "items": [
                                    {
                                        "imgSrc": "https://...",
                                        "des1": "Black",
                                        "des2": "White"
                                    },
                                    {
                                        "imgSrc": "https://...",
                                        "des1": "Black",
                                        "des2": "White"
                                    },
                                    {
                                        "imgSrc": "https://...",
                                        "des1": "Black",
                                        "des2": "White"
                                    }
                                ]
                            }
                        }
                    `}</pre>
                    <h4 style = {titleStyle} >.js</h4>
                    <pre style = {preCodeStyle}>{`
                        
                        import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 
                        
                        ...

                        render() {
                            
                            let jsonData = require('./slidesExample.json');

                            let sliderBoxStyle = {
                                width: "60%",
                                background: "transparent",
                                border: "1px solid #e1e4e8"
                            };

                            let itemsStyle = {
                                height: "60%",
                                padding: "20px",
                                background: "transparent",
                                border: "1px solid #e1e4e8",
                                borderRadius: "2px"
                            };

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

                            return  (<Router>
                                <CarouselSlider slideCpnts = {customSlideCpnts} 
                                    manner = {{circular: false}} 
                                    sliderBoxStyle = {sliderBoxStyle} 
                                    buttonSetting = {buttonSetting}  
                                    itemsStyle = {itemsStyle}
                                />
                            </Router>);
                        }
                    `}</pre>
                </div>
                <div className = "separater" style = {separaterStyle} ></div>
                <div id = "autoSliding" style = {{height: "auto", padding: "50px 0px"}} >
                    <h2 style = {titleStyle} >Auto Slidng</h2>
                    <p style = {desStyle} >
                        This example shows:
                    </p>
                    <ul style = {listStyle} >
                        <li style = {slistStyle} > - How properties <code>autoSliding</code> and <code>duration</code> in <code>prop - manner</code> work.</li>
                        <li style = {slistStyle} > - How property <code>hoverEvent</code> in <code>prop - buttonSetting</code> works.</li>
                        <li style = {slistStyle} > - Touch events are supported for mobile device veiwport.</li>
                        <li style = {slistStyle} > - In the carousel below, the buttons for navigating are visible only while cursour is hovering,
                         so it won't function normally if we are using mobile device, but the touch events would be registered when the situation 
                         is detected in our component, so dragging is also available. Try by using web devTool or your mobile device.</li>
                    </ul>
                    {autoSliding}
                </div>
                <div style = {codeBlockStyle}>
                    <h4 style = {titleStyle} >slidesExample.json</h4>
                    <pre style = {preJsonStyle}>{`
                        {
                           "autoSliding": {
                                "items": [
                                    {
                                        "imgSrc": "https: ..."
                                    },
                                    {
                                        "imgSrc": "https: ..."
                                    },
                                    {
                                        "imgSrc": "https: ..."
                                    },
                                    {
                                        "imgSrc": "https: ..."
                                    }
                                ]
                            }
                        }
                    `}</pre>
                    <h4 style = {titleStyle} >.js</h4>
                    <pre style = {preCodeStyle}>{`
                        render() {
                            
                            let manner = {
                                autoSliding: {interval: "3s"},
                                duration: "2s"
                            };
                            
                            let mobileRegx = /Mobi|Tablet|iPad|iPhone/;
                            if (mobileRegx.test(navigator.userAgent)) {
                                manner.button = false;
                            }

                            let buttonSetting = {
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
                            };
        
                            return <CarouselSlider slideItems = {jsonData.autoSliding.items}  
                                manner = {manner} 
                                buttonSetting = {buttonSetting} />;
  
                        }
                    `}</pre>
                </div>

                <div className = "separater" style = {separaterStyle} ></div>

                <div id = "trickyUsage" style = {{height: "auto", padding: "50px 0px"}} >
                    <h2 style = {titleStyle} >Tricky Usage</h2>
                    <p style = {desStyle} >
                        This example shows how we use props <code>lBtnCpnt</code> and <code>rBtnCpnt</code> with <a href = "https://google.github.io/material-design-icons/">Material Icons</a> to have beauties.
                        Also we could have more creative utilization by using this React component.
                    </p>
                    <h4 style = {titleStyle} >Notice</h4>
                    <ul style = {listStyle} >
                        <li style = {slistStyle} > - We have some important comments at code example below.</li>
                    </ul>
                </div>

                <div style = {{height: "auto" , position:"relative", margin: "0 auto", width: "50%", padding: "50px 0px"}} >
                    {buttonsUsage}
                </div>

                <div style = {codeBlockStyle}>
                    <h4 style = {titleStyle} >slidesExample.json</h4>
                    <pre style = {preJsonStyle}>{`
                        
                        /* 
                            While using prop slideCpnts, key 'imgSrc' is required, 
                            even we don't really have images need to render here. The reason is 
                            that we really depend on onLoad and onError eventlistener to drive this
                            component 
                        */

                        {
                            "trickyUsage": {

                                "items": [
                                    {
                                        "imgSrc": "",
                                        "buttonLabel": "button1",
                                        "color": "rgb(149,117,205)"
                                    },
                                    {
                                        "imgSrc": "",
                                        "buttonLabel": "button2",
                                        "color": "rgb(121,134,203)"
                                    },
                                    {
                                        "imgSrc": "",
                                        "buttonLabel": "button3",
                                        "color": "rgb(239,83,80)"
                                    },
                                    {
                                        "imgSrc": "",
                                        "buttonLabel": "button4",
                                        "color": "rgb(230,81,0)"
                                    }
                                ]
                            }
                        }
                    `}</pre>
                    <h4 style = {titleStyle} >.js</h4>
                    <pre style = {preCodeStyle}>{`
                        render() {

                            let slides = jsonData.trickyUsage.items.map((item, index) => 
                                <Link to = {'/' + item.buttonLabel} key = {index} >
                                    <img src = {item.imgSrc} ></img>
                                    <p style = {{top:"50%", background: item.color}} >{item.buttonLabel}</p>
                                </Link>
                            );


                        /*
                            The easy way to integrate material-icons resource into your project is 
                            including the link below into your index.html:
                                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                            or import it in your css file:
                                @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
                        */

                            let btnStyle = {
                                fontSize: "36px",
                                background: "transparent"
                            }

                            let rBtnCpnt = (<i style = {btnStyle} className = "material-icons" >arrow_forward</i>);
                            let lBtnCpnt = (<i style = {btnStyle} className = "material-icons" >arrow_back</i>);
        
                            
                            let itemsStyle = {
                                height: auto,
                                padding: "0px",
                                background: "transparent",
                                margin:"0 20px",
                                minWidth: "100px"  
                            };
                            
                            let buttonSetting = {
                                placeOn: "middle-outside",

                                /* 
                                    Cause that we are passing custom button components, properties 
                                    here won't be applied.
                                */

                                style: {     
                                    left: {
                                        background: "rgba(111, 111, 111, 0.8)",
                                    },
                                    right: {
                                        background: "rgba(111, 111, 111, 0.8)",
                                    }
                                }
                            };

                        /* 
                            We use property 'minWidth' to give the button-like slides width space here. 
                            In common usage, this css property should not be used, because of the mechanism 
                            of this component behind. It let image fit the height of the slider box first 
                            then decide the width value of the slide Item, but we don't have images here, 
                            so we need to give the width by ourselves.
                        */

                            let buttonsUsage = (
                                <div style = {{height: "auto", position:"relative", margin: "0 auto", width: "50%", padding: "50px 0px"}} >
                                    <Router>
                                        <CarouselSlider slideCpnts = {buttons} 
                                            manner = {{circular: false}} 
                                            sliderBoxStyle = {{width: "80%", background: "transparent"}} 
                                            buttonSetting = {buttonSetting} 
                                            rBtnCpnt = {rBtnCpnt} 
                                            lBtnCpnt = {lBtnCpnt} 
                                            itemsStyle = {itemsStyle} />
                                    </Router>
                            </div>);
                        }

                    `}</pre>
                </div>

            </div>
        );
    }
}

render(<Demo/>, document.querySelector('#demo'))
