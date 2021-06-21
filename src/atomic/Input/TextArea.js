import './Input.css';
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAt, faExclamationCircle, faLock} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons/faEyeSlash";

class TextArea extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			isInvalid: props.error && props.error!=='',
			error: props.error,
			value: props.value,
			showErrorResolver: props.showErrorResolver,
			type: props.type,
			readonly: false,
			disableResolveButton: false
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
			error:e,
			isInvalid:e!=null
		})
	}
	togglePasswordView = ()=>{
		this.setState({
			type: this.state.type==='password'?'text':'password'
		})
	}

	render() {
		return(
			<div className="input-root">
				<div className={"form-group-inline " + this.props.classList}>
					<div className="form-group-prepend">
						<div className="input-group-text">{this.props.icon? <FontAwesomeIcon size="1x" color={'#9ea1ba'} icon={faAt} />:<FontAwesomeIcon size="1x" color={'#9ea1ba'} icon={faLock} />}</div>
					</div>
					<textarea type={this.state.type}
						   ref={(inputRef) => this.inputRef = inputRef}
						   className="form-group-input form-control-1"
						   readOnly={this.state.readonly}
						   defaultValue={this.state.value}
						   placeholder={this.props.hint}
						   onChange={this.props.onChange}></textarea>

					{
						this.props.type && this.props.type==='password' &&
						<FontAwesomeIcon onClick={this.togglePasswordView} className={"password-eye"} icon={this.state.type==='password'?faEye:faEyeSlash}/>
					}
				</div>
				<div className={"error-row"}>
					{this.state.isInvalid && <label><FontAwesomeIcon size="1x" icon={faExclamationCircle}/>  {this.state.error}</label> }
					{this.state.showErrorResolver && <Button key={Math.random()} disabled={this.state.disableResolveButton} onClick={this.props.resolve} classList={"btn-alas btn-previous-small"}>{this.props.buttonText}</Button> }
				</div>
			</div>
		)
	}
}
export default TextArea;