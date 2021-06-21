import React,{Component} from "react";
import './ImagePreview.scss'
import {onKeyDown} from "../../assets/js/events";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {fadeIn, fadeOut} from "../../assets/js/commons";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

class ImagePreview extends Component{
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            main: props.selected,
            images: props.images,
            factor: 0
        }
        this.mainDiv = React.createRef();
    }
    static defaultProps={
        images: [],
        selected: 0,
        hideList: false
    }
    setImages = (ar)=>{
        this.setState({
            images: ar
        })
    }
    reloadFactor = ()=>{
        let div = document.querySelectorAll('.image-box');
        let val = 0;
        if (div)
        for (const d of div){
            if (d.classList.contains('active')){
                val += d.offsetWidth/2;
                break;
            }
            val += d.offsetWidth;
        }
        if (this._isMounted)
        this.setState({
            factor:val
        })
    }
    setActive = (i)=>{
        if (!this.state.images)
            return;
        let val = Math.min(Math.max(0,i),this.state.images.length-1);

        if (this._isMounted) {
            this.setState({
                main: val
            }, () => {
                this.reloadFactor();
            })
        }
    }
    next = ()=>{
        this.setActive(this.state.main+1);
    }
    prev = ()=>{
        this.setActive(this.state.main-1);
    }
    setupControls = ()=>{
        onKeyDown( (e)=>{
            if (e.key === 'ArrowLeft'){
                this.prev();
            }else if (e.key === 'ArrowRight'){
                this.next();
            }
            if (e.key === 'Escape'){
                this.hide();
            }
        })
    }
    setupKeyEvent = ()=>{
        onKeyDown((e)=>{
            if (e.key === 'Escape'){
                this.hide()
            }
        })
    }
    componentDidMount() {
        this._isMounted = true;
        this.setupKeyEvent()
        if (!this.hideList){
            this.reloadFactor();
        }
        this.setupControls();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    show = ()=>{
        fadeIn(this.mainDiv,200,'flex');
    }
    hide = ()=>{
        fadeOut(this.mainDiv,200);
    }

    render() {
        return (
            <div className="image-preview-root" ref={r => this.mainDiv = r}>
                <div className="close-button">
                    <FontAwesomeIcon icon={faPlus} onClick={this.hide}/>
                </div>
                <div className="image-preview-main">
                    <div className="arrows">
                        {
                            this.state.main > 0 &&
                            <div ref={r => this.leftArrow = r} className="arrow arrows-left" onClick={this.prev}>
                                <FontAwesomeIcon size="3x" icon={faChevronLeft} color="#ffffff"/>
                            </div>
                        }
                        {
                            this.state.main < this.state.images.length - 1 &&
                            <div ref={r => this.rightArrow = r} className = "arrow arrows-right" onClick={this.next}>
                                <FontAwesomeIcon size="3x" icon={faChevronRight} color="#ffffff"/>
                            </div>
                        }
                    </div>
                    <img src={this.state.images[this.state.main]} alt="MainLayout Preview"/>
                </div>
                <div className={"image-row "+(this.props.hideList ? 'd-none' : '')}>
                    <div className="image-list" style={{
                        transform:`translateX(-${this.state.factor}px)`
                    }}>
                        {
                            this.state.images.map((e,i)=>(
                                <div key={i}
                                     onClick={()=>{
                                         this.setActive(i)
                                     }}
                                     className={"image-box "+(i===this.state.main ? "active" : "")}>
                                    <img src={e} alt={"preview"}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default ImagePreview;