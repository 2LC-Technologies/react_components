import React, {Component} from 'react';
import './Button.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

class Button extends Component{
	constructor(props) {
		super(props);

		this.cls = "btn-alas ";
		if (props.classList)
			this.cls += props.classList;
		if (props.disabled)
			this.cls += ' disabled';

		this.newProps = {};
		Object.keys(this.props).forEach((key) => {
			this.newProps[key] = this.props[key];
		});
		delete this.newProps.loading;
		delete this.newProps.classList;
		delete this.newProps.icon;
		delete this.newProps.loading;
	}

	render() {
		return(
			<button {...this.newProps} 
				className={this.cls +' '+(this.props.loading ?' loading-btn':'')}
				disabled={this.props.loading?'disabled':''}
			>
				{
					this.props.loading
					?[
						<span key={"icon"} className="spinner-border spinner-border-sm mr-2"/>,
						<span key={"text"} className="">Loading...</span>
					]:[
						this.props.children,
						this.props.icon ? <FontAwesomeIcon key={"icon"} className={'ml-1'} size="1x" icon={faChevronRight}/>:null
					]
				}
			</button>
		)
	}
}
export default Button;