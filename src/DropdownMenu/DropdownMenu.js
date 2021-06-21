import React,{Component} from "react";
import {fadeIn, fadeOut,isDescendant} from "../../assets/js/commons";
import './DropdownMenu.scss';
import {onDocumentClick} from "../../assets/js/events";

class DropdownMenu extends Component {
    static defaultProps = {
        direction: 'bottom-right', // bottom-left,top-left,bottom-right,top-right
        offset: {
            left: 0,
            top: 0,
        }
    }
    constructor(props) {
        super(props);

        this.clickableDiv = React.createRef();
        this.dropdown = React.createRef();

        this.state = {
            showing: false,
            direction: props.direction
        }
    }
    getPosition = (e)=>{
        const {left,top,width,height} = e.getBoundingClientRect();
        let offset = this.props.offset;
        offset.left = offset.left || 0;
        offset.top = offset.top || 0;
        return {
            left: left + offset.left,
            top: top + offset.top,
            right: left+width + offset.left,
            bottom: top+height + offset.top,
        }
    }
    setDirection = (pos)=>{
        if (this.state.direction === 'bottom-left'){
            this.dropdown.style.top = pos.bottom +'px';
            this.dropdown.style.left = pos.left +'px';
        } else if (this.state.direction === 'top-left'){
            this.dropdown.style.bottom = (window.innerHeight - pos.top)+'px';
            this.dropdown.style.left = pos.left +'px';
        } else if (this.state.direction === 'bottom-right'){
            this.dropdown.style.top = pos.bottom +'px';
            this.dropdown.style.right = (window.innerWidth - pos.right) +'px';
        } else if (this.state.direction === 'top-right'){
            this.dropdown.style.bottom = (window.innerHeight - pos.top)+'px';
            this.dropdown.style.right = (window.innerWidth - pos.right) +'px';
        } else if (this.state.direction === 'left-top'){
            this.dropdown.style.right = (window.innerWidth - pos.left)+'px';
            this.dropdown.style.top = pos.top +'px';
        } else if (this.state.direction === 'left-bottom'){
            this.dropdown.style.right = (window.innerWidth - pos.left)+'px';
            this.dropdown.style.bottom = (window.innerHeight - pos.bottom)+'px';
        } else if (this.state.direction === 'right-bottom'){
            this.dropdown.style.left = pos.right+'px';
            this.dropdown.style.bottom = (window.innerHeight - pos.bottom)+'px';
        } else if (this.state.direction === 'right-top'){
            this.dropdown.style.left = pos.right+'px';
            this.dropdown.style.top = pos.top +'px';
        }
    }
    show = ()=>{
        let dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(d=>{
            if(d!==this.dropdown){
                fadeOut(d);
            }
        })
        let pos = this.getPosition(this.clickableDiv);
        this.setDirection(pos);
        fadeIn(this.dropdown,100);
    }
    hide = ()=>{
        fadeOut(this.dropdown,100);
    }
    toggle = ()=>{
        let showing = this.state.showing;
        this.setState({
            showing: !this.state.showing
        })
        if (showing)
            this.hide()
        else
            this.show()
    }
    componentDidMount() {
        this.clickableDiv.onclick = (e)=>{
            this.toggle();
            e.stopPropagation();
        }
        onDocumentClick((e)=>{
            if(!isDescendant(this.dropdown,e.target))
                this.hide();
        })
    }
    render() {
        return (
            <div className={"dropdown-root"}>
                <div className={"dropdown-opener"}
                     style={this.props.children[0].props.style}
                     ref={r => this.clickableDiv = r}>
                    {this.props.children[0].props.children}
                </div>
                <ul className={"dropdown"}
                    style={this.props.children[1].props.style}
                    ref={r => this.dropdown = r}>
                    <p className={"mb-1 title-show"}><b>{this.props.title || 'Title'}</b></p>
                    {this.props.children[1].props.children}
                </ul>
            </div>
        );
    }
}

export default DropdownMenu;