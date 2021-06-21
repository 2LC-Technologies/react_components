import React from 'react';
import Tags from "@yaireo/tagify/dist/react.tagify"
import "@yaireo/tagify/dist/tagify.css"
import "./tagify.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {Tooltip} from "antd";

class Tagify extends React.Component {
    static defaultProps = {
        list: []
    }
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            isInvalid: false,
        }
        if (props.value){
            this.state.value = props.value;
        }
        this.tags = React.createRef();
    }
    setList = (list)=>{
        if (this.tags.current){
            this.tags.current.settings.whitelist = list;
        }
    }
    update = (e=null)=>{
        this.setState({
            isInvalid: e!==null,
            error: e
        })
    }
    handleChange = (e)=>{
        let v;
        try {
            v = JSON.parse(e.detail.value);
        }catch (e) {
            v = [];
        }
        this.setState({
            value: v
        },()=>{
            if(this.props.onChange)
                this.props.onChange(v);
        })
    }
    render() {
        return(
            <div>
                {!this.props.noTitle &&
                <h4 className="input-title">
                    {this.props.title?this.props.title:this.props.hint}&nbsp;
                    {this.props.required && <span style={{color:'red'}}>*</span>}
                    {this.props.tooltip && <Tooltip title={this.props.tooltip}><span className="material-icons-round input-help-icon">help</span></Tooltip>}
                </h4>}
                <Tags tagifyRef={this.tags}
                      settings={{
                          dropdown:{
                              enabled: 1
                          },
                          whitelist: this.props.list
                      }}
                      {...this.props}/>
                {
                    this.state.isInvalid &&
                    <div key={this.state.isInvalid} className={"error-row"}>
                        <label>
                            <FontAwesomeIcon size="1x" icon={faExclamationCircle}/>
                            {this.state.error}
                        </label>
                    </div>
                }
            </div>

        );
    }
}
export default Tagify;