import React, {Component} from "react";
import {Col} from "react-bootstrap";
import './Radio.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";

class Radio extends Component{
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            isInvalid: props.error && props.error!=='',
            error: props.error,
        }
        this.inputRef = React.createRef();
    }
    update = (e=null)=>{
        this.setState({
            error:e,
            isInvalid:e!=null
        })
    }
    render() {
        return (
            <Col lg={12} xl={6} className={`flex-wrap ` + this.props.className}>
                <h4 className="input-title mt-3">{this.props.title}</h4>
                <div>
                    {this.props.options.map((v, i) => {
                        return (
                            <p key={i} className="d-inline-block form-group-radio mr-2">
                                <input className="form-control-1" type="radio"
                                       ref={r => this.inputRef = r}
                                       id={this.props.name + i}
                                       name={this.props.name}
                                       placeholder={this.props.title}
                                       defaultChecked={v === this.state.value}
                                       onChange={e => {
                                           this.setState({
                                               value: e.target.value
                                           })
                                           this.props.onChange && this.props.onChange(e.target.value)
                                       }}
                                       value={v}/>
                                <label htmlFor={this.props.name + i}>{v}</label>
                            </p>
                        );
                    })
                    }
                </div>
                <div className={"error-row"}>
                    {this.state.isInvalid && <label><FontAwesomeIcon size="1x" icon={faExclamationCircle}/>  {this.state.error}</label> }
                    {this.state.showErrorResolver && <Button onClick={this.props.resolve} classList={"btn-alas btn-previous-small"}>{this.props.buttonText}</Button> }
                </div>
            </Col>
        );
    }
}
export default Radio;