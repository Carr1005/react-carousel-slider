import React, {Component} from 'react'
import {render} from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './demo.css';
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
    
    
    componentDidMount() {
        // window.onhashchange = this.handleHashURL;
    }

    handleClick(e) {
        e.preventDefault();
        let target = e.currentTarget.href.split("#")[1];
        let targetComp = document.getElementById(target);
        if (targetComp) {
            targetComp.scrollIntoView({behavior: "smooth", block: "start"});
        }
    }

    handleHashURL() {

    }

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

        let dotsSetting = {
            placeOn: 'top',
            style: {
                dotSize: "5px",
                currDotColor: "rgba(155, 108, 27, 0.5)",
                marginTop: "2px"
            }
        }
        
        let customSlideCpnts = jsonData.customSlideCpnt.items.map((item, index) => 
            <Link to = {'/page' + index} key = {index} >
                <img src = {item.imgSrc} ></img>
                <p style = {textBoxStyle} >{item.des1}</p>
                <p style = {textBoxStyle2} >{item.des2}</p>
            </Link>
        );

        let customSlideCpnt = (<Router><CarouselSlider dotsSetting = {dotsSetting} slideCpnts = {customSlideCpnts} manner = {{circular: false}} sliderBoxStyle = {sliderBoxStyle} buttonSetting = {buttonSetting}  itemsStyle = {itemsStyle}/></Router>);

        let manner = {
            autoSliding: {interval: "3s"},
            duration: "2s"      
        };

        let accEleSetting = {};
        
        if (/Mobi|Tablet|iPad|iPhone/.test(navigator.userAgent)) {
            accEleSetting.button = false;
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
        
        let autoSliding = <CarouselSlider accEle = {accEleSetting}  dotsSetting = {{placeOn: 'beneath', style: {marginTop: "30px"}}} slideItems = {jsonData.autoSliding.items}  manner = {manner} buttonSetting = {buttonSetting2} />;
   
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
        let buttonsUsage = (<Router><CarouselSlider slideCpnts = {buttons} accEle = {{dots: false}} manner = {{circular: false}} sliderBoxStyle = {{width: "80%", background: "transparent"}} buttonSetting = {buttonSetting3} rBtnCpnt = {rBtnCpnt} lBtnCpnt = {lBtnCpnt} itemsStyle = {itemsStyle2} /></Router>);
        
        


        let pItemsStyle = {
            padding: "0px",
            background: "white",
            margin:"0 30px",
            boxShadow: "1px 1px 1px 1px #9E9E9E",
            borderRadius: "4px"
        };

        let imgStyle = {
            height: "70%",
            borderBottom: "1px solid #9E9E9E"
        };
        
        let textBoxStyle5 = {
            width: "40%",
            top: "290px",
            color: "black",
            background: "transparent",
            fontSize: "14px",
            fontFamily: "Times New Roman"
        };

        let textBoxStyle6 = {
            width: "70%",
            top: "330px",
            color: "black",
            background: "transparent",
            fontSize: "12px",
            fontStyle: "italic"
        };

        let scientists = jsonData.scientists.items.map((item, index) => 
            <div key = {index} >
                <img style = {imgStyle} src = {item.imgSrc} ></img>
                <p style = {textBoxStyle5} >{item.name}</p>
                <p style = {textBoxStyle6} >{item.des}</p>
            </div>
        );
        
        let btnShell = {
            position: "relative",
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            boxShadow: "1px 1px 1px 1px #9E9E9E",
            textAlign: "center"
        }

        let gbtnStyle = {
            display: "inline-block",
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "36px"
        }

        let grBtnCpnt = (<div style = {btnShell} ><div style = {gbtnStyle} className = "material-icons" >chevron_right</div></div>);
        let glBtnCpnt = (<div style = {btnShell} ><div style = {gbtnStyle} className = "material-icons" >chevron_left</div></div>);        
        
        let scientistsCard = (<CarouselSlider 
            sliderBoxStyle = {{height: "450px", width: "80%", background: "transparent"}} 
            accEle = {{dots: false}}
            slideCpnts = {scientists} 
            itemsStyle = {pItemsStyle} 
            buttonSetting = {{placeOn: 'middle-outside'}}
            rBtnCpnt = {grBtnCpnt}
            lBtnCpnt = {glBtnCpnt}
        />);

        let iconItemsStyle = {
            padding: "0px",
            background: "transparent",
            margin:"0 30px",
            height: "50%"
        };

        let circleIcon = {
            borderRadius: "50%"
        }
        
        let iconsSlides = jsonData.icons.items.map((item, index) => 
            <div key = {index} >
                <img style = {circleIcon} src = {item.imgSrc} ></img>
                <p style = {{width: "60%", top: "70%",fontSize: "10px"}} >{item.des}</p>
            </div>
        );

        let icons = (<CarouselSlider 
            sliderBoxStyle = {{height: "250px", width: "80%", background: "transparent"}} 
            accEle = {{dots: false}}
            slideCpnts = {iconsSlides} 
            itemsStyle = {iconItemsStyle}
            buttonSetting = {{placeOn: 'middle-outside'}}
        />);

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
            whiteSpace: "pre-wrap"
            ,color: "#607D8B"
        }

        let preJsonStyle = {
            width: "100%",
            whiteSpace: "pre-wrap",
            color: "#607D8B"
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

        let inlineCodeStyle = {
            color: "#607D8B"
        }

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
        
        let chapterlistStyle = {
            display: "block",
            width: "60%",
            margin: "0px auto",
            listStyleType: "none",
            textAlign: "center",
            padding: "0px"
        };

        let anchorStyle = {
            display: "inline-block",
            textDecoration: "none",
            color: "#3F51B5",
            margin: "8px 0px"
        } 

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
                <ul style = {chapterlistStyle} >
                    <li><a onClick = {this.handleClick} style = {anchorStyle} href = '#basic' >Basic</a></li>
                    <li><a onClick = {this.handleClick} style = {anchorStyle} href = '#customCpnt' >Custom Slide Component</a></li>
                    <li><a onClick = {this.handleClick} style = {anchorStyle} href = '#autoSliding' >Auto Slidng</a></li>
                    <li><a onClick = {this.handleClick} style = {anchorStyle} href = '#trickyUsage' >Tricky Usage</a></li>
                    <li><a onClick = {this.handleClick} style = {anchorStyle} href = '#moreExample' >More Examples</a></li>
                </ul>
                <div id = "basic" style = {{height: "auto", padding: "50px 0px"}} >
                    <h2 style = {titleStyle} >Basic</h2>
                    <p style = {desStyle} >
                        This example shows that we could just give an array of objects, let componet render with its default style.
                        When we are uing <code style={inlineCodeStyle} >prop - slideItems</code>, particular name of key is required :
                    </p>
                    <p style = {desStyle} >
                        <code style={inlineCodeStyle} >imgSrc</code> for image source and <code style={inlineCodeStyle} >des</code> for description about image, we could decide to provide <code style={inlineCodeStyle} >des</code> or not, but <code style={inlineCodeStyle} >imgSrc</code> is the must. The require structure of data is shown in the code block below.
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
                        <li style = {slistStyle} > - We could design our own slide componet and pass it by  <code style={inlineCodeStyle}>prop - slideCpnts</code>.</li>
                        <li style = {slistStyle} > - Cooperate to <code style={inlineCodeStyle} >{`<Link>`}</code> of <a href = "https://reacttraining.com/react-router/web" >React Router</a> for client side routing is possible, click the slides to see what happens in adress bar.</li>
                        <li style = {slistStyle} > - Several features of <code style={inlineCodeStyle} >prop - buttonSetting</code>.</li>
                        
                    </ul>
                    <h4 style = {titleStyle} >Notice</h4>
                    <ul style = {listStyle} >
                        <li style = {slistStyle} > - <code style={inlineCodeStyle} >img</code> element is required.</li>
                        <li style = {slistStyle} > - Observe the prop <code style={inlineCodeStyle} >itemsStyle</code> and inline-style object <code style={inlineCodeStyle}>textBoxStyle2</code> to see how to properly handle the css property to achieve the slide in our own design.</li>
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

                            let dotsSetting = {
                                placeOn: 'top',
                                style: {
                                    dotSize: "5px",
                                    currDotColor: "rgba(155, 108, 27, 0.5)",
                                    marginTop: "2px"
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
                                    dotsSetting = {dotsSetting}
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
                        <li style = {slistStyle} > - How properties <code style={inlineCodeStyle} >autoSliding</code> and <code style={inlineCodeStyle} >duration</code> in <code style={inlineCodeStyle} >prop - manner</code> work.</li>
                        <li style = {slistStyle} > - How property <code style={inlineCodeStyle} >hoverEvent</code> in <code style={inlineCodeStyle} >prop - buttonSetting</code> works.</li>
                        <li style = {slistStyle} > - Touch events are supported for mobile device veiwport.</li>
                        <li style = {slistStyle} > - In the carousel below, the buttons for navigating are visible only while cursour is hovering,
                         so it won't function normally if we are using mobile device, but the touch events would be registered when the situation 
                         is detected in our component, so dragging is also available, we could hide the buttons by setting <code style={inlineCodeStyle} >button</code> to <b>false</b> in <code style={inlineCodeStyle} >prop - accEle</code>. Try by using web devTool or your mobile device.</li>
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
                            
                            let accEleSetting;

                            let mobileRegx = /Mobi|Tablet|iPad|iPhone/;
                            if (mobileRegx.test(navigator.userAgent)) {
                                accEleSetting.button = false;
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
                        This example shows:
                    </p>
                    <ul style = {listStyle} >
                        <li style = {slistStyle} > - How we use props <code style={inlineCodeStyle} >lBtnCpnt</code> and <code style={inlineCodeStyle} >rBtnCpnt</code> with <a href = "https://google.github.io/material-design-icons/">Material Icons</a> to have delicate navigation buttons.</li>
                       <li style = {slistStyle} > - Hide dots by setting <code style={inlineCodeStyle} >dots</code> to <b>false</b> in <code style={inlineCodeStyle} >prop - accEle</code>.</li>
                    </ul>
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
                                    below won't be applied.
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
                            then decide the width value of the slide item, but we don't have images here, 
                            so we need to give the width by ourselves.
                        */

                            let buttonsUsage = (
                                <div style = {{height: "auto", position:"relative", margin: "0 auto", width: "50%", padding: "50px 0px"}} >
                                    <Router>
                                        <CarouselSlider slideCpnts = {buttons} 
                                            accEle = {{dots: false}}
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

                <div className = "separater" style = {separaterStyle} ></div>

                <div id = "moreExample" style = {{height: "auto", padding: "50px 0px"}} >
                    <h2 style = {titleStyle} >More Examples</h2>
                </div>
                <div style = {{position:"relative", margin: "0 auto", width: "80%"}} >
                    {scientistsCard}
                </div>
                <div style = {codeBlockStyle}>
                    <h4 style = {titleStyle} >slidesExample.json</h4>
                    <pre style = {preJsonStyle}>{`
                        {
                            "Scientists": {

                                "items": [
                                    {
                                        "imgSrc": "https://...",
                                        "name": "Niklas Koppernigk",
                                        "des": "19 February 1473 – 24 May 1543"
                                    },
                                    {
                                        "imgSrc": "https://...",
                                        "name": "Galileo Galilei",
                                        "des": "15 February 1564 – 8 January 1642"
                                    },
                                    {
                                        "imgSrc": "https://...",
                                        "name": "Michael Faraday",
                                        "des": "22 September 1791 – 25 August 1867"
                                    },
                                    {
                                        "imgSrc": "https://...",
                                        "name": "Marie Curie",
                                        "des": "7 November 1867 – 4 July 1934"
                                    },
                                    {
                                        "imgSrc": "https://...",
                                        "name": "Albert Einstein",
                                        "des": "14 March 1879 – 18 April 1955"
                                    }
                                ]
                            }
                        }
                    `}</pre>
                    <h4 style = {titleStyle} >.js</h4>
                    <pre style = {preCodeStyle}>{`
                        render() {

                            let itemsStyle = {
                                padding: "0px",
                                background: "white",
                                margin:"0 30px",
                                boxShadow: "1px 1px 1px 1px #9E9E9E",
                                borderRadius: "4px"
                            };

                            let imgStyle = {
                                height: "70%",
                                borderBottom: "1px solid #9E9E9E"
                            };
                            
                            let textBoxStyle = {
                                width: "40%",
                                top: "290px",
                                color: "black",
                                background: "transparent",
                                fontSize: "14px",
                                fontFamily: "Times New Roman"
                            };

                            let textBoxStyle2 = {
                                width: "70%",
                                top: "330px",
                                color: "black",
                                background: "transparent",
                                fontSize: "12px",
                                fontStyle: "italic"
                            };

                            let scientists = jsonData.Scientists.items.map((item, index) => 
                                <div key = {index} >
                                    <img style = {imgStyle} src = {item.imgSrc} ></img>
                                    <p style = {textBoxStyle} >{item.name}</p>
                                    <p style = {textBoxStyle2} >{item.des}</p>
                                </div>
                            );

                            let btnWrapperStyle = {
                                position: "relative",
                                borderRadius: "50%",
                                height: "50px",
                                width: "50px",
                                boxShadow: "1px 1px 1px 1px #9E9E9E",
                                textAlign: "center"
                            }

                            let btnStyle = {
                                display: "inline-block",
                                position: "relative",
                                top: "50%",
                                transform: "translateY(-50%)",
                                fontSize: "36px"
                            }

                            let rBtnCpnt = (<div style = {btnWrapperStyle} >
                                <div style = {btnStyle} className = "material-icons" >chevron_right</div>
                            </div>);

                            let lBtnCpnt = (<div style = {btnWrapperStyle} >
                                <div style = {btnStyle} className = "material-icons" >chevron_left</div>
                            </div>);        
                            
                            let scientistsCard = (<CarouselSlider 
                                sliderBoxStyle = {{height: "450px", width: "80%", background: "transparent"}} 
                                accEle = {{dots: false}}
                                slideCpnts = {scientists} 
                                itemsStyle = {itemsStyle} 
                                buttonSetting = {{placeOn: 'middle-outside'}}
                                rBtnCpnt = {rBtnCpnt}
                                lBtnCpnt = {lBtnCpnt}
                            />);

                            return (<div style = {{position:"relative", margin: "0 auto", width: "80%"}} >
                                {scientistsCard}
                            </div>);
                        }

                    `}</pre>
                </div>
                <div style = {{position:"relative", margin: "0 auto", width: "80%"}} >
                    {icons}
                </div>
                <div style = {codeBlockStyle}>
                    <h4 style = {titleStyle} >.js</h4>
                    <pre style = {preCodeStyle}>{`
                        render() {

                            let iconItemsStyle = {
                                padding: "0px",
                                background: "transparent",
                                margin:"0 30px",
                                height: "50%"
                            };

                            let circleIcon = {
                                borderRadius: "50%"
                            }
                            
                            let iconsSlides = jsonData.icons.items.map((item, index) => 
                                <div key = {index} >
                                    <img style = {circleIcon} src = {item.imgSrc} ></img>
                                    <p style = {{width: "60%", top: "70%",fontSize: "10px"}} >{item.des}</p>
                                </div>
                            );

                            let icons = (<CarouselSlider 
                                sliderBoxStyle = {{height: "250px", width: "80%", background: "transparent"}} 
                                accEle = {{dots: false}}
                                slideCpnts = {iconsSlides} 
                                itemsStyle = {iconItemsStyle}
                                buttonSetting = {{placeOn: 'middle-outside'}}
                            />);
                            
                            return (<div style = {{position:"relative", margin: "0 auto", width: "80%"}} >
                                {icons}
                            </div>);
                        }
                    `}</pre>
                </div>
            </div>
        );
    }
}

render(<Demo/>, document.querySelector('#demo'))
