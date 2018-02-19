import React, {Component} from 'react'
import './CarouselSlider.css';

class CarouselSlider extends Component {

    constructor(props) {

        super(props);
        
        this.state = {
            currentSlide: 1
        };

        this.slidingManner = {
            //currentSlide: 1,
            slidesTotalWidth: 0,
            initialMovement: 0,
            movement: 0,
            direction: 1,
            cycle: 0,
            sliding: false,
            slideOrders:[[], [], []]
        }

        this.dragEvent = {
            startPoint:0,
            dragging: false,
            deltaX: 0,
            thrershold: 0,
            disableDragImage: (() => {
                    let transparent = new Image();
                    transparent.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                    return transparent;
                }
            )()
        }

        this.calculateSlidesOrder = this.calculateSlidesOrder.bind(this);
        this.itemsReorder = this.itemsReorder.bind(this);
        this.movementReset = this.movementReset.bind(this);
        this.loadedCnt = 0;
        this.imgsWidth = {};
        
        this.mannerSetting = {
            autoSliding: false, //{interval: }
            circular: true,
            duration: "0.5s"
        };

        this.mannerSetting = this.handleMannerSetting();

        this.accEleSetting = {
            flag: false,
            button: true,
            dots: true
        }

        this.accEleSetting = this.handleAccEleSetting();
        
        this.defaultDotStyle = {
            display: "inline-block", 
            verticalAlign: "middle", 
            margin: "0 5px", 
            background: "#dbdbdb",  
            height: "10px", 
            width: "10px", 
            borderRadius: "50%"
        }

        this.defaultCurrDotStyle = {
            display: "inline-block", 
            verticalAlign: "middle", 
            margin: "0 5px", 
            background: "#3897f0",  
            height: "12px", 
            width: "12px", 
            borderRadius: "50%"
        }
        
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

            // ,minWidth: "100px" 
        };

        this.buttonManner = {
            hoverEvent: false
        };

        this.defaultButtonSetStyle = {
            //no style
        };

        this.defaultDotsSetStyle = {
            margin: "15px auto"
        };

        this.defaultButtonIconStyle = {
            color: "white",
            background: "#757575",
            height: "30px",
            width: "30px",
            margin: "10px",
            fontSize: "20px",
            borderRadius: "2px",
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

        this.defaultDotsPosition = {
            "beneath": true,
            "top": false,  /**/    
            "bottom": false
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
            beingTouched: false
        };

        this.imgLoaded = this.imgLoaded.bind(this);
        this.nonImgLoaded = this.nonImgLoaded.bind(this);
        this.slideItemHandler = this.slideItemHandler.bind(this);
        this.initialSlideCon =  this.initialSlideCon.bind(this);
        this.calMovement = this.calMovement.bind(this);
        this.autoSliding = this.autoSliding.bind(this);
        this.handleMannerSetting = this.handleMannerSetting.bind(this);
        this.handleAccEleSetting = this.handleAccEleSetting.bind(this);

        // this.handleBubbling = this.handleBubbling.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleButtonClick  = this.handleButtonClick.bind(this);

        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragStop = this.handleDragStop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);

        this.setSliderBoxStyles = this.setSliderBoxStyles.bind(this);
        this.setItemsStyle = this.setItemsStyle.bind(this);
        this.setSlideConHeight = this.setSlideConHeight.bind(this);
        this.setDotStyle = this.setDotStyle.bind(this);
        this.setCurrentDotStyle = this.setCurrentDotStyle.bind(this);

        this.detectButtonPosition = this.detectButtonPosition.bind(this);
        this.detectDotsPosition = this.detectDotsPosition.bind(this);
        this.allocateDotsSet = this.allocateDotsSet.bind(this);
        this.allocateButtonSet = this.allocateButtonSet.bind(this);
        this.setLeftButtonStyle = this.setLeftButtonStyle.bind(this);
        this.setHoverEvent = this.setHoverEvent.bind(this);
        
        this.calculateSlidesOrder();
    }

    componentDidMount() {
        this.dragEvent.threshold = (this.refs.sliderBox.offsetWidth > 100) ? (this.refs.sliderBox.offsetWidth / 5) : 50;
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

    handleAccEleSetting() {
        if (this.props.accEle) {
            return Object.assign({}, this.accEleSetting, this.props.accEle);
        } else {
            return this.accEleSetting;
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
    }
    
    mobileDetect() {
        if (/Mobi|Tablet|iPad|iPhone/.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }   
    }

    nonImgLoaded(index) {
        let refIndex = 'ref'+index ;
        if (this.refs[refIndex]) {
            let customStyle = this.setItemsStyle();
            let targetItem = this.refs[refIndex];

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

    imgLoaded(index) {
        let refIndex = 'ref'+index ;
        if (this.refs[refIndex]) { 
            
            let ratio = 0;
            let adjustWidth = 0;
            let adjustHeight = 0;
            let customStyle = this.setItemsStyle();
            let targetItem = this.refs[refIndex];
            
            
            if (targetItem.offsetWidth >= this.refs.sliderBox.offsetWidth) {
                ratio = targetItem.offsetHeight / targetItem.offsetWidth;
                // if (targetItem.offsetWidth > targetItem.offsetHeight) {
                adjustWidth = (this.refs.sliderBox.offsetWidth - this.itemsMargin * 2);
                adjustHeight = adjustWidth * ratio;
                // }
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
                let imgElement = slideEl.imgSrc ? (<img src = {slideEl.imgSrc} ></img>) : (<img src = {slideEl.imgSrc} ></img>);
                let desElement = slideEl.des ? (<p style = {this.setTextBoxStyle()} >{slideEl.des}</p>) : null;

                return (
                    <div className = 'itemWrapper' style = {{order: index}} onError = {() => this.nonImgLoaded(index)} onLoad = {() => this.imgLoaded(index)} onClick = {this.handleBubbling} ref = {'ref'+index} key = {'ref'+index}>
                        {imgElement}
                        {desElement}
                    </div>
                );

            break;
            case 'cpnt':
                return (<div className = 'itemWrapper' style = {{order: index}} onError = {() => this.nonImgLoaded(index)} onLoad = {() => this.imgLoaded(index)} onClick = {this.handleBubbling} ref = {"ref"+index} key = {"ref"+index} >{slideEl}</div>);
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

        // slideCon.style.transition = 'transform ' + this.mannerSetting.duration + ' ease';
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

                        if (this.state.currentSlide === (this.slideCnt)) {
                            if (!this.slidingManner.sliding) {
                                this.slidingManner.direction = -1;
                                this.moveSlide(this.slidingManner.direction);
                            }
                        } else if (this.state.currentSlide === 1) {
                            if (!this.slidingManner.sliding) {
                                this.slidingManner.direction = 1;
                                this.moveSlide(this.slidingManner.direction);
                            }
                        } else {
                            if (!this.slidingManner.sliding) {
                                this.moveSlide(this.slidingManner.direction);
                            }
                        }
                    
                }, milliseconds);
            }
        }
    }

    itemsReorder() {
        for (let i = 0; i < this.slideCnt * 3; i++) {
            if (i  < this.slideCnt) {
                this.refs['ref' + (i - this.slideCnt)].style.order = this.slidingManner.slideOrders[this.slidingManner.cycle][i];
            } else {
                this.refs['ref' + (i - this.slideCnt + 1)].style.order = this.slidingManner.slideOrders[this.slidingManner.cycle][i];
            }                
        }
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
            
                    if (this.state.currentSlide === this.slideCnt) {
    
                        this.setState((prevState) => ({
                            currentSlide: 1
                        }), () => {

                            slideCon.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
                            this.slidingManner.cycle = (this.slidingManner.cycle === 2) ? 0 : this.slidingManner.cycle + 1;
                            this.itemsReorder();
                            this.movementReset(direction);

                        });

                    } else {

                        this.setState((prevState) => ({
                            currentSlide: prevState.currentSlide + 1
                        }), () => {
                            slideCon.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
                        });

                    }
 
                } else if (direction === -1) {
                    singleMovement = this.calMovement(direction);
                    this.slidingManner.movement = this.slidingManner.movement - singleMovement;
                    //slideCon.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
                    //this.slidingManner.currentSlide = (this.slidingManner.currentSlide === 1) ? -1 : this.slidingManner.currentSlide - 1;
                    if (this.state.currentSlide === 1){

                        this.setState((prevState) => ({
                            currentSlide: this.slideCnt
                        }), () => {
                            slideCon.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
                            this.slidingManner.cycle = (this.slidingManner.cycle === 0) ? 2 : this.slidingManner.cycle - 1;
                            this.itemsReorder();
                            this.movementReset(direction);
                        });
                    
                    } else {
                        
                        this.setState((prevState) => ({
                            currentSlide: prevState.currentSlide - 1
                        }), () => {
                            slideCon.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
                        });

                    }
                }

            } else {

                slideCon.style.transition = 'transform ' + this.mannerSetting.duration + ' ease'; // for after dragging
                
                if (direction === 1 && (this.state.currentSlide < this.slideCnt)) {	
                    
                    this.slidingManner.sliding = true;
                    singleMovement = this.calMovement(direction);
                    this.slidingManner.movement = this.slidingManner.movement + singleMovement;
                    
                    this.setState((prevState) => ({
                        currentSlide: prevState.currentSlide + 1
                    }), () => {
                        slideCon.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
                    });
                    
                } else if (direction === -1 && (this.state.currentSlide > 1)) {
                    
                    this.slidingManner.sliding = true;
                    singleMovement = this.calMovement(direction);
                    this.slidingManner.movement = this.slidingManner.movement - singleMovement;

                    this.setState((prevState) => ({
                        currentSlide: prevState.currentSlide - 1
                    }), () => {
                        slideCon.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
                    });
                } else {
                    return false; //for dragging
                }
            }
        }
    }

    calMovement(direction){
        let count = (direction === 1) ? 1 : ((this.state.currentSlide === 1) ? -2 : -1);
        let movement = this.imgsWidth[this.state.currentSlide] / 2 + (this.itemsMargin * 2) + this.imgsWidth[this.state.currentSlide + count] / 2;
        return movement;
    }

    handleTouchStart(e) {
        if (this.slidingManner.sliding === false) {
            this.slidingManner.sliding = true;
            this.touchEvent.touchStartX = e.targetTouches[0].clientX;
            this.touchEvent.beingTouched = true;
        }
    }

    handleTouchMove(e) {
        if (this.touchEvent.beingTouched) {
            this.slidingManner.sliding = true;
            this.touchEvent.touchMovement = this.touchEvent.touchStartX - e.targetTouches[0].clientX;         
            let dragMovement = this.slidingManner.movement + this.touchEvent.touchMovement;
            e.currentTarget.style.transform = 'translateX(-' + dragMovement + 'px)';
        }
    }

    handleTouchEnd(e) {

        if (this.touchEvent.beingTouched) {
            if (Math.abs(this.touchEvent.touchStartX - e.changedTouches[0].clientX) > 20) {     
                this.slidingManner.sliding = false;
                if (!this.slidingManner.sliding) {
                    if (Math.abs(this.touchEvent.touchMovement) > this.dragEvent.threshold) {
                        let direction = (this.touchEvent.touchMovement > 0) ? 1 : -1;
                        let draggable = this.moveSlide(direction);
                        if(draggable === false) {
                            e.currentTarget.style.transition = 'transform 0.5s ease';
                            e.currentTarget.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
                        }

                    } else {
                        e.currentTarget.style.transition = 'transform 0.5s ease';
                        e.currentTarget.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
                    }
                }
                this.touchEvent.touchStartX = 0;
                this.touchEvent.beingTouched = false;
            }
        }
    }

    handleButtonClick(direction) {
        if (!this.slidingManner.sliding) {
            this.moveSlide(direction);
        }
    }

    handleDragStart(e) {
        
        if (this.slidingManner.sliding === false && this.dragEvent.dragging === false) {
            this.slidingManner.sliding = true;  //prevent auto sliding
            this.dragEvent.dragging = true;
            e.currentTarget.style.transition = 'none';
            this.dragEvent.startPoint = e.clientX;
            e.dataTransfer.setDragImage(this.dragEvent.disableDragImage, 1, 1);
        }

    }

    handleDragOver(e) {
        
        e.dataTransfer.dropEffect = 'none'; // To eliminate green add button on chrome.
        e.dataTransfer.effectAllowed = 'none';
        e.preventDefault();
        if (this.dragEvent.dragging === true) {
            this.dragEvent.deltaX = this.dragEvent.startPoint - e.clientX ;
            let dragMovement = this.slidingManner.movement + this.dragEvent.deltaX;
            e.currentTarget.style.transform = 'translateX(-' + dragMovement + 'px)';
        }
    }

    handleDragStop(e) {
        
        if (this.dragEvent.dragging === true) {
            if (Math.abs(this.dragEvent.deltaX) > this.dragEvent.threshold) {
                this.slidingManner.sliding = false;
                if (!this.slidingManner.sliding) {
                    let direction = (this.dragEvent.deltaX > 0) ? 1 : -1;
                    let draggable = this.moveSlide(direction);
                    if (draggable === false) {
                        e.currentTarget.style.transition = 'transform 0.5s ease';
                        e.currentTarget.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
                    }
                }

            } else {
                e.currentTarget.style.transition = 'transform 0.5s ease';
                e.currentTarget.style.transform = 'translateX(-' + this.slidingManner.movement + 'px)';
            }
            this.dragEvent.startPoint = 0;
            this.dragEvent.deltaX = 0;
            this.dragEvent.dragging = false;
        }
    }

    setTextBoxStyle() {
        if (this.props.textBoxStyle) {
            return this.props.textBoxStyle;     
        }
    }

    setItemsStyle() {
        if (this.props.itemsStyle) {
            let cloneStyle = JSON.parse(JSON.stringify(this.props.itemsStyle));
            delete cloneStyle.height; /* height for slideCon */
            return Object.assign({}, this.defaultItemsStyle, cloneStyle);
        } else {
            return JSON.parse(JSON.stringify(this.defaultItemsStyle));
        }
    }
    
    setSlideConHeight() {
        if (this.props.itemsStyle) {
            return this.props.itemsStyle.height ? {height: this.props.itemsStyle.height} : {height: this.defaultSlideConStyle.height};
        } else {
            return {height: this.defaultSlideConStyle.height};
        }
    }

    setDotStyle() {
        let dotStyle = {};
        if (this.props.dotsSetting) {
            if (this.props.dotsSetting.style) {
                if (this.props.dotsSetting.style.dotSpace) {
                    dotStyle.margin = "0px " + this.props.dotsSetting.style.dotSpace;
                }

                if (this.props.dotsSetting.style.dotSize) {
                    dotStyle.height = this.props.dotsSetting.style.dotSize;
                    dotStyle.width = this.props.dotsSetting.style.dotSize;
                }

                if (this.props.dotsSetting.style.dotColor) {
                    dotStyle.background = this.props.dotsSetting.style.dotColor;
                }

                return Object.assign({}, this.defaultDotStyle, dotStyle);

            } else {
                return this.defaultDotStyle;
            }
        } else {
            return this.defaultDotStyle;
        }
    }

    setCurrentDotStyle() {
        let currDotStyle = {};
        if (this.props.dotsSetting) {
            if (this.props.dotsSetting.style) {
                if (this.props.dotsSetting.style.dotSpace) {
                    currDotStyle.margin = "0px " + this.props.dotsSetting.style.dotSpace;
                }

                if (this.props.dotsSetting.style.currDotSize) {
                    currDotStyle.height = this.props.dotsSetting.style.currDotSize;
                    currDotStyle.width = this.props.dotsSetting.style.currDotSize;
                }

                if (this.props.dotsSetting.style.currDotColor) {
                    currDotStyle.background = this.props.dotsSetting.style.currDotColor;
                }

                return Object.assign({}, this.defaultCurrDotStyle, currDotStyle);

            } else {
                return this.defaultCurrDotStyle;
            }
        } else {
            return this.defaultCurrDotStyle;
        }
    }

    detectDotsPosition() {
        let position;
        // let customDotsPosition = {};
        let dotsPosition = this.defaultDotsPosition;
        if (this.props.dotsSetting) {
            if (this.props.dotsSetting.placeOn) {
                if (dotsPosition[this.props.dotsSetting.placeOn] === false) {
                    dotsPosition[this.props.dotsSetting.placeOn] = true;
                }
            }
        }

        for (let key in dotsPosition) {
            if (dotsPosition[key] === true) {
                position = key;
            }
        }

        
        if (position === 'beneath') {    
            return {
                vertical: "beneath"
                // ,outOfBox: true
            };
        } else {
            if (position === 'top') {
                return {
                    vertical: "top"
                    // ,outOfBox: false
                };
            } else {
                return {
                    vertical: "bottom"
                    // ,outOfBox: false
                };
            }
        }
    }

    allocateDotsSet(setting) {
        let style = {};
        style = Object.assign({}, this.defaultDotsSetStyle);
        if (this.props.dotsSetting) {
            if (this.props.dotsSetting.style) {
                for (let key in this.props.dotsSetting.style) {
                    
                    if (key.includes('margin')) {
                        style[key] = this.props.dotsSetting.style[key];
                    }
                }
            }
        }

        switch (setting.vertical) {
            case 'top':
                style['position'] = 'absolute';
                style['right'] = '0px';
                style['left'] = '0px';
                style['top'] = '0px';
            break;

            case 'bottom':
                style['position'] = 'absolute';
                style['right'] = '0px';
                style['left'] = '0px';
                style['bottom'] = '0px';
            break;  
            case 'beneath':
            break;
            
        }
        return style;
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
        
        let renderSlideItems, items, sflag, eflag, slideCon, buttons, leftButton, rightButton, lButtonIcon, rButtonIcon, buttonSetting, dotsSet, dotsSetting;
        
        if (this.slideCnt) {
            
            if (this.accEleSetting.button) {
                
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

            if (this.mannerSetting.circular && this.slideCnt > 1) { // Ignore this.accEleSetting.flag in this scope.

                items = this.slideEls.map((slideEl, index) => this.slideItemHandler(slideEl, index - this.slideCnt));
                items = items.concat(this.slideEls.map((slideEl, index) => this.slideItemHandler(slideEl, index + 1)));
                items = items.concat(this.slideEls.map((slideEl, index) => this.slideItemHandler(slideEl, index + 1 + this.slideCnt)));

            } else {

                if (this.accEleSetting.flag) {
                    sflag = (<div className = 'flag' ref = 'sflag' style = {{order: 0}} key = {'sflag'} ></div>) 
                    eflag = (<div className = 'flag' ref = 'eflag' style = {{order: this.slideCnt + 1}} key = {'eflag'} ></div>); 
                } else {
                    sflag = (<div className = 'flag' ref = 'sflag' style = {{background: "transparent", order: 0}} key = {'sflag'} ></div>) 
                    eflag = (<div className = 'flag' ref = 'eflag' style = {{background: "transparent", order: this.slideCnt + 1}} key = {'eflag'} ></div>); 
                }
                items = this.slideEls.map((slideEl, index) => this.slideItemHandler(slideEl, index + 1));
                items.unshift(sflag);
                items.push(eflag);
            }


            /*Use margin to tune the button position*/
            slideCon = this.mobileDetect() ? (<div className = "slideCon" ref = "slideCon" 
                style = {this.setSlideConHeight()} 
                onTouchStart = {e => this.handleTouchStart(e)}
                onTouchMove = {e => this.handleTouchMove(e)}
                onTouchEnd = {e => this.handleTouchEnd(e)} >
                    {items}
            </div>) : (<div className = 'slideCon' ref = 'slideCon' 
                onDragStart = {e => this.handleDragStart(e)} 
                onDragEnd = {e => this.handleDragStop(e)} 
                onDragOver = {e => this.handleDragOver(e)}
                style = {this.setSlideConHeight()} >
                {items}
            </div>);

            if (this.accEleSetting.dots) {
                dotsSetting = this.detectDotsPosition();    
                let dots = [];
                for (let i = 0; i < this.slideCnt; i++) {
                    let dot; 
                    if ((i + 1) === this.state.currentSlide) {
                        dot = (<div style = {this.setCurrentDotStyle()}></div>);
                    } else {
                        dot = (<div style = {this.setDotStyle()}></div>);
                    }
                    dots.push(dot);
                } 
                dotsSet = (<div className = 'dotsSet' style = {this.allocateDotsSet(dotsSetting)}>{dots}</div>);
            }
    
            if (this.accEleSetting.button) {
                if (this.accEleSetting.dots) {
                    renderSlideItems = (<div className = 'sliderSet'>
                        {buttonSetting.outOfBox ? (buttonSetting.separate ? leftButton : null) : null}
                        <div className = "sliderBox" ref = 'sliderBox' style = {this.setSliderBoxStyles()} >
                            {buttonSetting.outOfBox ? null : (buttonSetting.separate ? leftButton : buttons)}
                            {(dotsSetting.vertical !== 'beneath') ? dotsSet : null}  
                            {slideCon}
                            {buttonSetting.outOfBox ? null : (buttonSetting.separate ? rightButton : null)}
                        </div>
                        {(dotsSetting.vertical === 'beneath') ? dotsSet : null}
                        {buttonSetting.outOfBox ? (buttonSetting.separate ? rightButton : buttons) : null}
                    </div>);
                } else {
                    renderSlideItems = (<div className = 'sliderSet'>
                        {buttonSetting.outOfBox ? (buttonSetting.separate ? leftButton : null) : null}
                        <div className = "sliderBox" ref = 'sliderBox' style = {this.setSliderBoxStyles()} >
                            {buttonSetting.outOfBox ? null : (buttonSetting.separate ? leftButton : buttons)}  
                            {slideCon}
                            {buttonSetting.outOfBox ? null : (buttonSetting.separate ? rightButton : null)}
                        </div>
                        {buttonSetting.outOfBox ? (buttonSetting.separate ? rightButton : buttons) : null}
                    </div>);
                }
            } else {
                if (this.accEleSetting.dots) {
                    renderSlideItems = (<div className = 'sliderSet' >
                        <div className = "sliderBox" ref = 'sliderBox' style = {this.setSliderBoxStyles()} >
                            {slideCon}
                        </div>
                    </div>);
                } else {
                    renderSlideItems = (<div className = 'sliderSet' >
                        <div className = "sliderBox" ref = 'sliderBox' style = {this.setSliderBoxStyles()} >
                            {(dotsSetting.vertical !== 'beneath') ? dotsSet : null}  
                            {slideCon}
                        </div>
                        {(dotsSetting.vertical === 'beneath') ? dotsSet : null}
                    </div>);
                }
            }
        }
        return renderSlideItems;
    }
}

export default CarouselSlider;