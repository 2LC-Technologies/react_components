import {fadeIn, fadeOut} from "../../assets/js/commons";
import './ContextMenu.css';
import React,{Component} from "react";

class ContextMenu extends Component{
    __isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            top:-1000,
            left:-1000
        }
        this.menu = React.createRef();
    }
    componentDidMount() {
        this.__isMounted = true;

        document.addEventListener('contextmenu', (e)=>{
            if (!this.__isMounted)
                return;
            fadeIn(this.menu);
            this.setState({
                left: e.screenX - 260,
                top: e.screenY + window.scrollY - 305
            });
            e.preventDefault();
        }, false);

        this.menu.onmousedown = e=>{
            e.stopPropagation();
        }
        document.onkeydown = document.onmousewheel = document.onmousedown = window.onblur = () => {
            fadeOut(this.menu);
        };
    }
    componentWillUnmount() {
        this.__isMounted = false;
    }

    render() {
        return(
            <ul className="context-menu" ref={r => this.menu =r} style={{
                top: this.state.top+'px',
                left: this.state.left+'px',
            }}>
                {
                    this.props.items.map((o,i)=> {
                        if (o.innerHTML)
                            return (
                                <li key={i}>
                                    {o.innerHTML}
                                </li>
                            )
                        else
                        return (
                            <li key={i} onClick={e => {
                                fadeOut(this.menu);
                                o.click(e);
                            }}><i className="material-icons">{o.icon}</i> {o.title}</li>
                        )
                    })
                }
            </ul>
        );
    }
}
export default ContextMenu;