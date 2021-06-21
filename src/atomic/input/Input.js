import './Input.scss';
import React from "react";
import Button from "../button/Button";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'antd';

class Input extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			error: props.error,
			value: props.value,
			showErrorResolver: props.showErrorResolver,
			type: props.type,
			readonly: false,
			disableResolveButton: false,
			placeholder: props.placeholder?props.placeholder:props.hint
		}
		this.inputRef = React.createRef();
	}
	focus = ()=>{
		this.inputRef.focus();
	}
	readonly = (val)=>{
		this.setState({
			readonly:val
		})
	}
	static defaultProps = {
		type:'text',
		showErrorResolver: false,
		value: ''
	}
	update = (e=null)=>{
		this.setState({
			error:e
		})
	}
	togglePasswordView = ()=>{
		this.setState({
			type: this.state.type==='password'?'text':'password'
		})
	}

	render() {
		return(
			<div className={"input-root "+this.props.inputClassName + (this.props.static?" input-static":"")}>
				{!this.props.noTitle && 
				<h4 className="input-title">
					{this.props.title?this.props.title:this.props.hint}&nbsp;
					{this.props.required && <span style={{color:'red'}}>*</span>}
					{this.props.tooltip && <Tooltip title={this.props.tooltip}><span className="material-icons-round input-help-icon">help</span></Tooltip>}
				</h4>}
				<div className={"form-group-inline " + this.props.classList}>
					<div className="form-group-prepend">
						<div className="input-group-text"><span className="material-icons-round input-icon">{this.props.icon}</span></div>
					</div>
					<input type={this.state.type}
						   disabled={this.props.static || this.props.disabled}
						   style={this.props.style}
						   ref={(inputRef) => this.inputRef = inputRef}
						   className="form-group-input form-control-1"
						   readOnly={this.state.readonly}
						   defaultValue={this.state.value}
						   placeholder={this.props.placeholder?this.props.placeholder:this.props.hint}
						   onChange={this.props.onChange}
						   min={this.props.min}
						   max={this.props}
					/>

					{
						this.props.type && this.props.type==='password' &&
						<FontAwesomeIcon onClick={this.togglePasswordView} className={"password-eye"} icon={this.state.type==='password'?faEye:faEyeSlash}/>
					}
				</div>
				<div className={"error-row"}>
					{
						!this.state.error ? null :
							<label>
								<FontAwesomeIcon size="1x" icon={faExclamationCircle}/>  {this.state.error}
							</label>
					}
					{this.state.showErrorResolver && <Button key={Math.random()} disabled={this.state.disableResolveButton} onClick={this.props.resolve} classList={"btn-alas hvr-pop btn-previous-small"}>{this.props.buttonText}</Button> }
				</div>
			</div>
		)
	}
}
export default Input;