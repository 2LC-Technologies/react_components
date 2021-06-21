import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import React, {Component} from "react";
import Flatpickr from "react-flatpickr";
import '../../../../node_modules/flatpickr/dist/flatpickr.min.css';
import dateFormat from "dateformat"
import Button from "../Button/Button";

class InputDate extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isInvalid: props.error && props.error!=='',
            error: props.error,
            value: props.value,
            showErrorResolver:false,
            placeholder: props.hint,
        }
    }
    update = (e=null)=>{
        this.setState({
            error:e,
            isInvalid:e!=null
        })
    }
    handleChange = (date)=>{
        if (date && date.length>0) {
            date = date[0];
            date = dateFormat(new Date(date), 'yyyy-mm-dd');
            if (this.props.onChange)
                this.props.onChange(date)
            this.setState({
                value: date
            })
        }else if (this.props.onChange){
            this.props.onChange('');
        }
    }
    render() {
        return (
            <div className="input-root" style={this.props.rootStyle}>
				{!this.props.noTitle && 
				<h4 className="input-title">
					{this.props.title?this.props.title:this.props.hint}&nbsp;
					{this.props.required && <span style={{color:'red'}}>*</span>}
				</h4>}
                <div className={"form-group-inline "+this.props.groupInlineClass}>
                    {
                        !this.props.noIcon &&
                        <div className="form-group-prepend">
                            <div className="input-group-text"><span className="material-icons-round input-icon">{this.props.icon}</span></div>
                        </div>
                    }
                    <Flatpickr
                        format="Y-m-d"
                        className="form-group-input form-control-1"
                        placeholder={this.props.hint}
                        value={this.state.value}
                        options={this.props.options}
                        style={{
                            height:this.props.noIcon ? '50px' : 'auto'
                        }}
                        onChange={this.handleChange}
                    />
                </div>
                <div className={"error-row"}>
                    {this.state.isInvalid && <label><FontAwesomeIcon size="1x" icon={faExclamationCircle}/>  {this.state.error}</label> }
                    {this.state.showErrorResolver && <Button onClick={this.props.resolve} classList={"btn-alas btn-previous-small"}>{this.props.buttonText}</Button> }
                </div>
            </div>
        );
    }
}
export default InputDate;