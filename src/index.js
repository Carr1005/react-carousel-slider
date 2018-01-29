import React, {Component} from 'react'
import './CarouselSlider.css';

class CarouselSlider extends Component {

	constructor(props) {
		
        super(props);      
        this.slidingManner = {
            currentSlide: 1,
            slidesTotalWidth: 0,
            initialMovement: 0,
            movement: 0,
            direction: 1,
            cycle: 0,
            sliding: false,
            slideOrders:[[], [], []]
        }

        this.calculateSlidesOrder = this.calculateSlidesOrder.bind(this);
        this.itemsReorder = this.itemsReorder.bind(this);
        this.movementReset = this.movementReset.bind(this);
        this.loadedCnt = 0;
        this.imgsWidth = {};
        
        this.mannerSetting = {
            autoSliding: false, //{interval: }
            circular: true,
            duration: "0.5s",
            flag: false,
            button: true
        };
        this.mannerSetting = this.handleMannerSetting();

        this.defaultSliderBoxStyle = {
            height: "400px",
            width: "90%",
            background: "#EEEEEE",
            border: "none"
        };

        this.defaultSlideConStyle = {
            height: "80%"
        };

        this.defaultItemsStyle = {
            padding: "3px",
            background: "#FAFAFA",
            margin: "0px 40px"
        };

        this.buttonManner = {
            hoverEvent: false
        };

        this.defaultButtonSetStyle = {
            //no style
        };

        this.defaultButtonIconStyle = {
            color: "white",
            background: "#757575",
            height: "30px",
            width: "30px",
            margin: "10px",
            "font-size": "20px",
            "borderRadius": "2px",
            border: "none"
        }
        
        this.defaultBtnPosition = {
            "top-left": true,  /**/
            "top-right": false,
            "middle-inside": false,
            "middle-outside": false,
            "bottom-right": false,
            "bottom-left": false,
            "bottom-beneath": false
        };

        this.itemsMargin = (this.props.itemsStyle ? 
            (this.props.itemsStyle.margin ? 
                parseInt(this.props.itemsStyle.margin.split(' ')[1].replace('px', '')) 
                : parseInt(this.defaultItemsStyle.margin.split(' ')[1].replace('px', ''))
            ) : parseInt(this.defaultItemsStyle.margin.split(' ')[1].replace('px', '')));

        this.slideType = (this.props.slideItems ? 'prop' : (this.props.slideCpnts ? 'cpnt' : null));
        this.slideCnt = (this.slideType === 'prop') ? this.props.slideItems.length : ((this.slideType === 'cpnt') ? this.props.slideCpnts.length : 0);
        this.slideEls = (this.slideType === 'prop') ? this.props.slideItems : ((this.slideType === 'cpnt') ? this.props.slideCpnts : null);
        
		
        this.touchEvent = {
            touchMovement: 0,
            touchStartX: 0,
            prevTouchX: 0,
            beingTouched: false
        };

        this.imgLoaded = this.imgLoaded.bind(this);
		this.slideItemHandler = this.slideItemHandler.bind(this);
		this.initialSlideCon =  this.initialSlideCon.bind(this);
		this.calMovement = this.calMovement.bind(this);
		this.autoSliding = this.autoSliding.bind(this);
		// this.handleBubbling = this.handleBubbling.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleButtonClick  = this.handleButtonClick.bind(this);

        this.setSliderBoxStyles = this.setSliderBoxStyles.bind(this);
        this.setItemsStyle = this.setItemsStyle.bind(this);
        this.setSlideConHeight = this.setSlideConHeight.bind(this);
        
        this.detectButtonPosition = this.detectButtonPosition.bind(this);
        this.allocateButtonSet = this.allocateButtonSet.bind(this);
        this.setLeftButtonStyle = this.setLeftButtonStyle.bind(this);
        this.setHoverEvent = this.setHoverEvent.bind(this);
        
        this.calculateSlidesOrder();
        
	}
	
	componentWillUnmount() {
    	clearInterval(this.autoSlidingTimer);
  	}

    handleMannerSetting() {
        if (this.props.manner) {
            return Object.assign({}, this.mannerSetting, this.props.manner);
        } else {
            return this.mannerSetting;
        }
    }
	
    handleBubbling(e) {
		e.stopPropagation();
	}

    calculateSlidesOrder() {
        
        let order = [];
        let former = [];
        let latter = [];
        for ( let i = (-1) * this.slideCnt; i <= this.slideCnt * 2; i++) {
            if (i !== 0) {
                order.push(i);
            }
        }
        this.slidingManner.slideOrders[0] = order;

        for ( let i = 0; i < order.length; i++) {
            if (i < this.slideCnt * 2) {
                latter.push(order[i]);
            } else {
                former.push(order[i]);
            }
        }   
        this.slidingManner.slideOrders[1] = former.concat(latter); 
        former = [];
        latter = [];
        for ( let i = 0; i < order.length; i++) {
            if (i < this.slideCnt) {
                latter.push(order[i]);
            } else {
                former.push(order[i]);
            }
        }
        this.slidingManner.slideOrders[2] = former.concat(latter);

        console.log(this.slidingManner.slideOrders);
    }
    
    mobileDetect() {
        if (/Mobi|Tablet|iPad|iPhone/.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }   
    }

	imgLoaded(index) {
        let refIndex = 'ref'+index ;
		if (this.refs[refIndex]) {            
            let customStyle = this.setItemsStyle();
			let targetItem = this.refs[refIndex];
			
            if (targetItem.offsetWidth >= this.refs.sliderBox.offsetWidth) {
                let ratio = targetItem.offsetHeight / targetItem.offsetWidth;
				let adjustWidth = (this.refs.sliderBox.offsetWidth - this.itemsMargin * 2);
				let adjustHeight = adjustWidth * ratio;                
                customStyle.height = adjustHeight + 'px';
                customStyle.width = adjustWidth + 'px';
			}
            
            for (let key in customStyle) {
                targetItem.style[key] = customStyle[key];
            }

            this.loadedCnt += 1;
            this.imgsWidth[index] = targetItem.offsetWidth;

			if ( (!this.mannerSetting.circular && (index === 1)) || (this.mannerSetting.circular && this.slideCnt === 1)) {
                this.initialSlideCon();
			}

            if (this.mannerSetting.circular && (this.loadedCnt === this.slideCnt * 3)) {
                this.initialSlideCon();
            }            
		}
	}

    slideItemHandler(slideEl, index) {
        switch (this.slideType) {
            case 'prop':
                let imgElement = slideEl.imgSrc ? (<img src = {slideEl.imgSrc} ></img>) : (<img></img>);
                let desElement = slideEl.des ? (<p style = {this.setTextBoxStyle()} >{slideEl.des}</p>) : null;
                return (
                    <div className = 'itemWrapper' style = {{order: index}} onLoad = {() => this.imgLoaded(index)} onClick = {this.handleBubbling} ref = {'ref'+index} key = {'ref'+index}>
                        {imgElement}
                        {desElement}
                    </div>
                );
            break;
            case 'cpnt':
                return (<div className = 'itemWrapper' style = {{order: index}} onLoad = {() => this.imgLoaded(index)} onClick = {this.handleBubbling} ref = {"ref"+index} key = {"ref"+index} >{slideEl}</div>);
            break;
        }
	}

	initialSlideCon() {
		let slideCon = this.refs.slideCon;     
        slideCon.addEventListener('transitionend', () => {this.slidingManner.sliding = false});
        if (this.mannerSetting.circular && this.slideCnt !== 1) {
            let sum = 0;
            for (let i = 1; i < this.slideCnt + 1; i++) {
                sum += parseInt(this.imgsWidth[i]);
            }
            this.slidingManner.slidesTotalWidth = sum + this.slideCnt * this.itemsMargin * 2
            this.slidingManner.initialMovement = this.slidingManner.slidesTotalWidth  - (this.refs.sliderBox.offsetWidth - (this.imgsWidth[1] + this.itemsMargin * 2)) / 2;
		} else {
            
            this.refs.sflag.style.flexBasis = this.refs.sliderBox.offsetWidth+ 'px';
            this.refs.eflag.style.flexBasis = this.refs.sliderBox.offsetWidth+ 'px';
            
            slideCon.style.transition = 'transform ' + this.mannerSetting.duration + ' ease';
            this.slidingManner.initialMovement = (this.refs.sliderBox.offsetWidth - this.imgsWidth[1]) / 2 + this.itemsMargin + this.imgsWidth[1];
        }
        slideCon.style.transform = 'translateX(-' + this.slidingManner.initialMovement + 'px)';
        this.slidingManner.movement = this.slidingManner.movement + this.slidingManner.initialMovement;
        this.autoSliding();
	}

	autoSliding() {

		if (this.mannerSetting.autoSliding && this.slideCnt !== 1) {
            let seconds = this.mannerSetting.autoSliding.interval.slice(0, -1);
            let milliseconds = parseInt(seconds) * 1000;
            if (this.mannerSetting.circular) {
                this.autoSlidingTimer = setInterval(() => {
                    if (!this.slidingManner.sliding) {
                        this.moveSlide(this.slidingManner.direction);
                    }
                }, milliseconds);
            } else {
                this.autoSlidingTimer = setInterval(() => {
                    if (this.slidingManner.currentSlide === (this.slideCnt)) {
                        this.slidingManner.direction = -1;
                        this.moveSlide(this.slidingManner.direction);
                    } else if (this.slidingManner.currentSlide === 1) {
                        this.slidingManner.direction = 1;
                        this.moveSlide(this.slidingManner.direction);
                    } else {
                        this.moveSlide(this.slidingManner.direction);
                    }
                    
                }, milliseconds);
            }
        }

	}

    itemsReorder() {
    	console.log(this.slidingManner.cycle);
        for (let i = 0; i < this.slideCnt * 3; i++) {
            if (i  < this.slideCnt) {
                this.refs['ref' + (i - this.slideCnt)].style.order = this.slidingManner.slideOrders[this.slidingManner.cycle][i];
            } else {
                this.refs['ref' + (i - this.slideCnt + 1)].style.order = this.slidingManner.slideOrders[this.slidingManner.cycle][i];
            }                
        }
        
        console.log(this.slidingManner.slideOrders[this.slidingManner.cycle]);
    }

    movementReset(direction) {
        let interval = setInterval(() => {
            if (!this.slidingManner.sliding) {
                
                let slideCon = this.refs.slideCon;
                slideCon.style.transition = 'none';
                if (direction > 0) {
                    slideCon.style.transform = 'translateX(-' + this.slidingManner.initialMovement + 'px)';
                    this.slidingManner.movement = this.slidingManner.initialMovement;
                } else if (direction < 0) {
                    slideCon.style.transform = 'translateX(-' + (this.slidingManner.movement + this.slidingManner.slidesTotalWidth) + 'px)';
                    this.slidingManner.movement = (this.slidingManner.movement + this.slidingManner.slidesTotalWidth);
                }
                clearInterval(interval);
            }
        }, 25);
    }

	moveSlide(direction) {

        let expectLoadedCnt = this.mannerSetting.circular ? this.slideCnt * 3 : this.slideCnt;
        if (this.loadedCnt === expectLoadedCnt) {
            let singleMovement = 0;
    		let slideCon = this.refs.slideCon;

    		if (this.mannerSetting.circular) {
                this.slidingManner.sliding = true;
                slideCon.style.transition = 'transform ' + this.mannerSetting.duration + ' ease';
                if (direction === 1) {
                    singleMovement = this.calMovement(direction);
                    this.slidingManner.movement = this.slidingManner.movement + singleMovement;
                    slideCon.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
                    this.slidingManner.currentSlide = this.slidingManner.currentSlide + 1;
                    
                    if (this.slidingManner.currentSlide === this.slideCnt + 1) {
                        this.slidingManner.currentSlide = 1;
                        this.slidingManner.cycle = (this.slidingManner.cycle === 2) ? 0 : this.slidingManner.cycle + 1;
                        
                        this.itemsReorder();
                        this.movementReset(direction);    
                    }
                } else if (direction === -1) {
                    singleMovement = this.calMovement(direction);
                    this.slidingManner.movement = this.slidingManner.movement - singleMovement;
                    slideCon.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
                    this.slidingManner.currentSlide = (this.slidingManner.currentSlide === 1) ? -1 : this.slidingManner.currentSlide - 1;
                    
                    if (this.slidingManner.currentSlide === -1) {
                        this.slidingManner.currentSlide = this.slideCnt;
                        this.slidingManner.cycle = (this.slidingManner.cycle === 0) ? 2 : this.slidingManner.cycle - 1;
                        
                        this.itemsReorder();
                        this.movementReset(direction);
                    } 
                }

            } else {

                if (direction === 1 && (this.slidingManner.currentSlide < this.slideCnt)) {	
                    this.slidingManner.sliding = true;
                    singleMovement = this.calMovement(direction);
                    this.slidingManner.currentSlide = this.slidingManner.currentSlide + 1;
                    this.slidingManner.movement = this.slidingManner.movement + singleMovement;
                    slideCon.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
        		} else if (direction === -1 && (this.slidingManner.currentSlide > 1)) {
                    this.slidingManner.sliding = true;
        			singleMovement = this.calMovement(direction);
                    this.slidingManner.currentSlide = this.slidingManner.currentSlide - 1;
                    this.slidingManner.movement = this.slidingManner.movement - singleMovement;
                    slideCon.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
        		}
            }
        }
	}

	calMovement(direction){
        let count = (direction === 1) ? 1 : ((this.slidingManner.currentSlide === 1) ? -2 : -1);
        let movement = this.imgsWidth[this.slidingManner.currentSlide] / 2 + (this.itemsMargin * 2) + this.imgsWidth[this.slidingManner.currentSlide + count] / 2;
        return movement;
	}

	handleTouchStart(e) {
        this.touchEvent.touchStartX = e.targetTouches[0].clientX;
        this.touchEvent.beingTouched = true;
	}	

	handleTouchMove(e) {
        if (this.touchEvent.beingTouched) {
            let currentX = e.targetTouches[0].clientX
            let deltaX = currentX - this.touchEvent.touchStartX;
            this.touchEvent.touchMovement = deltaX;
            this.touchEvent.prevTouchX = currentX;
        }
	}

	handleTouchEnd(e) {
        if (this.touchEvent.touchStartX != e.changedTouches[0].clientX) {
			if (!this.slidingManner.sliding) {
                if (this.touchEvent.touchMovement > 0) {
                    this.moveSlide(-1);
                } else {
                    this.moveSlide(1);
                }
            }
            this.touchEvent.touchStartX = 0;
            this.touchEvent.beingTouched = true;
		}
	}

    handleButtonClick(direction) {
        if (!this.slidingManner.sliding) {
            this.moveSlide(direction);
        }
    }

    setTextBoxStyle() {
        if (this.props.textBoxStyle) {
            return this.props.textBoxStyle;     
        }
    }

    setItemsStyle() {
        if (this.props.itemsStyle) {
            let cloneStyle = this.props.itemsStyle;
            delete cloneStyle.height; /* height for slideCon */
            return Object.assign({}, this.defaultItemsStyle, cloneStyle);
        } else {
            return this.defaultItemsStyle;
        }
    }
    
    setSlideConHeight() {
        if (this.props.itemsStyle) {
            return this.props.itemsStyle.height ? this.props.itemsStyle.height : this.defaultSlideConStyle.height;
        } else {
            return this.defaultSlideConStyle.height;
        }
    }

    detectButtonPosition() {
        let position = [];
        let customBtnPosition = {};
        let btnPosition = this.defaultBtnPosition;
        if (this.props.buttonSetting) {
            if (this.props.buttonSetting.placeOn) {
                if (btnPosition[this.props.buttonSetting.placeOn] === false) {
                    btnPosition[this.props.buttonSetting.placeOn] = true;
                }
            }
        }
        for (let key in btnPosition) {
            if (btnPosition[key] === true) {
                position = key.split('-');
            }
        }
        let outOfBox;
        if (position[1] === 'left' || position[1] === 'right' || position[1] === 'inside') {
            outOfBox = false;
        } else {
            outOfBox = true;
        }
        if (position[0] === 'middle') {
            return {
                separate: true,
                outOfBox: outOfBox,
                vertical: position[0],
                horizontal: position[1]
            };
        } else {
            return {
                separate: false,
                outOfBox: outOfBox,
                vertical: position[0],
                horizontal: position[1]
            };
        }
    }

    setRightButtonStyle() {
        let btnStyle;
        btnStyle = this.defaultButtonIconStyle;
        if (this.props.buttonSetting) {
            if (this.props.buttonSetting.style) {
                if (this.props.buttonSetting.style.right) { 
                    btnStyle = Object.assign({}, this.defaultButtonIconStyle, this.props.buttonSetting.style.right);
                }
            }
        }
        return btnStyle;
    }

    setLeftButtonStyle() {
        let btnStyle;
        btnStyle = this.defaultButtonIconStyle;
        if (this.props.buttonSetting) {
            if (this.props.buttonSetting.style) {
                if (this.props.buttonSetting.style.left) { 
                    btnStyle = Object.assign({}, this.defaultButtonIconStyle, this.props.buttonSetting.style.left);
                }
            }
        }
        return btnStyle;
    }

    allocateButtonSet(setting) {
        let style = {};
        style = Object.assign({}, this.defaultButtonSetStyle);
        if (!setting.separate) {
            switch (setting.horizontal) {
                case 'beneath':
                break;
                
                case 'left':
                    style['position'] = 'absolute';
                    style['left'] = '0px';
                break;
                
                case 'right':
                    style['position'] = 'absolute';
                    style['right'] = '0px';
                break;
            };

            switch (setting.vertical) {
                case 'top':
                    style['position'] = 'absolute';
                    style['top'] = '0px';
                break;
                // case 'middle': //in separate case 
                // break;
                case 'bottom':
                    if (setting.horizontal !== 'beneath') {
                        style['position'] = 'absolute';
                        style['bottom'] = '0px';
                    }
                break;
            }
        }
        return style;
    }

    setSliderBoxStyles() {
        if (this.props.sliderBoxStyle) {
            return Object.assign({}, this.defaultSliderBoxStyle, this.props.sliderBoxStyle);
        } else {
            return this.defaultSliderBoxStyle;    
        }
    }

    setHoverEvent() {
        let hoverEffect;
        if (this.props.buttonSetting) {
            hoverEffect = this.props.buttonSetting.hoverEvent ? this.props.buttonSetting.hoverEvent : this.buttonManner.hoverEvent;
            if (hoverEffect) {
                return {
                    opacity: 0
                }
            }
        }
    }

	render() {
		let renderSlideItems, items, sflag, eflag, slideCon, buttons, leftButton, rightButton, lButtonIcon, rButtonIcon, buttonSetting;
        
        if (this.slideCnt) {
            if (this.mannerSetting.button) {
                buttonSetting = this.detectButtonPosition();

                lButtonIcon = this.props.lBtnCpnt ? this.props.lBtnCpnt : (<div className = 'arrowBtn previous' style = {this.setLeftButtonStyle()} ></div>);
                rButtonIcon = this.props.rBtnCpnt ? this.props.rBtnCpnt : (<div className = 'arrowBtn next' style = {this.setRightButtonStyle()} ></div>);
                
                if (buttonSetting.separate) {
                    
                    leftButton = (<div className = 'buttonWrapper left' style = {this.setHoverEvent()} onClick = {() => this.handleButtonClick(-1)} >{lButtonIcon}</div>);
                    rightButton = (<div className = 'buttonWrapper right' style = {this.setHoverEvent()} onClick = {() => this.handleButtonClick(1)} >{rButtonIcon}</div>);

                } else {
                    buttons = (<div className = 'buttonSet' style = {this.allocateButtonSet(buttonSetting)} >
                        <div className = 'buttonWrapper' style = {this.setHoverEvent()} onClick = {() => this.handleButtonClick(-1)} >{lButtonIcon}</div>
                        <div className = 'buttonWrapper' style = {this.setHoverEvent()} onClick = {() => this.handleButtonClick(1)} >{rButtonIcon}</div>
                    </div>);
                }
            }

            if (this.mannerSetting.circular && this.slideCnt > 1) { // Ignore this.mannerSetting.flag in this scope.

                items = this.slideEls.map((slideEl, index) => this.slideItemHandler(slideEl, index - this.slideCnt));
                items = items.concat(this.slideEls.map((slideEl, index) => this.slideItemHandler(slideEl, index + 1)));
                items = items.concat(this.slideEls.map((slideEl, index) => this.slideItemHandler(slideEl, index + 1 + this.slideCnt)));

            } else {

                if (this.mannerSetting.flag) {
                    sflag = (<div className = 'flag' ref = 'sflag' style = {{order: 0}} ></div>) 
                    eflag = (<div className = 'flag' ref = 'eflag' style = {{order: this.slideCnt + 1}} ></div>); 
                } else {
                    sflag = (<div className = 'flag' ref = 'sflag' style = {{background: "transparent", order: 0}} ></div>) 
                    eflag = (<div className = 'flag' ref = 'eflag' style = {{background: "transparent", order: this.slideCnt + 1}} ></div>); 
                }
                items = this.slideEls.map((slideEl, index) => this.slideItemHandler(slideEl, index + 1));
                items.unshift(sflag);
                items.push(eflag);
            }


            /*Use margin to tune the button position*/
            slideCon = this.mobileDetect() ? (<div className = "slideCon" ref = "slideCon" 
                style = {{height: this.setSlideConHeight()}} 
                onTouchStart = {e => this.handleTouchStart(e)}
                onTouchMove = {e => this.handleTouchMove(e)}
                onTouchEnd = {e => this.handleTouchEnd(e)} >
                    {items}
            </div>) : (<div className = 'slideCon' ref = 'slideCon' style = {{height: this.setSlideConHeight()}} >
                {items}
            </div>);
    
            if (buttonSetting.separate) {
                if (buttonSetting.outOfBox) {
                    renderSlideItems = (<div className = 'sliderSet' >
                        {leftButton}
                        <div className = "sliderBox" ref = 'sliderBox' style = {this.setSliderBoxStyles()} >
                            {slideCon}
                        </div>
                        {rightButton}
                    </div>);
                } else {
                    renderSlideItems = (<div className = 'sliderBox' ref = 'sliderBox' style = {this.setSliderBoxStyles()} >
                        {leftButton}
                        {slideCon}
                        {rightButton}
                    </div>);
                }
            } else {
                if (buttonSetting.outOfBox) {
                    renderSlideItems = (<div>
                        <div className = 'sliderBox' ref = 'sliderBox' style = {this.setSliderBoxStyles()} >    
                            {slideCon}
                        </div>
                        {buttons}
                    </div>);
                } else {
                    renderSlideItems = (<div className = 'sliderBox' ref = 'sliderBox' style = {this.setSliderBoxStyles()} >    
                        {buttons}
                        {slideCon}
                    </div>);
                }
            }
		}
        return renderSlideItems;
	}
}

export default CarouselSlider;