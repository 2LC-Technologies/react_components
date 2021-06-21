import React, {Component} from "react";
import Select from "react-select";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import Input from "./Input";

class DropDownSelect extends Component{
    static defaultProps = {
        noDataMessage: 'No Options',
        required: false,
        addInputProps: {}
    }

    constructor(props) {
        super(props);

        this.state = {
            options: props.options ? props.options : [],
            value: props.value || null,
            isInvalid: false,
            error: null,
            required: props.required,
            noDataMessage: props.noDataMessage,
            placeholder: props.placeholder,
            isAdding: false,
            addValue: '',
        }
        this.select = React.createRef();
    }
    findByValue = (value)=>{
        if (this.state.options)
        for (const o of this.state.options){
            if (o.value===value){
                return o;
            }
        }
        return null;
    }
    setData = (options)=>{
        let newOptions = [];
        options.forEach(function (v) {
            if (typeof v === "string")
                newOptions.push({
                    value:v,
                    label:v
                });
            else
                newOptions.push(v)
        })
        this.setState({
            options: newOptions
        })
    }
    setValue = (value)=>{
        if (this.select && this.select.select)
        this.select.select.setValue(this.findByValue(value));
    }
    update = (e)=>{
        this.setState({
            error: e,
            isInvalid: e && true
        })
    }
    handleAdd = ()=>{
        if (this.state.isAdding){
            if (this.props.onAdd)
                this.props.onAdd(this.state.addValue);
            this.setState({
                isAdding: false
            })
        }else{
            this.setState({
                isAdding: true
            });
        }
    }

    render() {
        const style = {
            control: (base) => ({
                ...base,
                '&:hover': { borderColor: "var(--theme-primary)" },
                '&:focus': { borderColor: "var(--theme-primary)" },
                boxShadow: "none"
            }),
            container: (style)=>({
                ...style,
                flex: 1
            })
        };
        let selectProps = {}
        if (!this.props.noDefault){
            selectProps['defaultValue'] = this.findByValue(this.props.value);
        }else{
            selectProps['defaultValue'] = undefined;
        }
        return(
            <div className={this.props.className}>
                <label className="font-mont-light ml-1 mb-2 text-dark">
                    {this.props.title}&nbsp;
                    {
                        this.state.required ?
                            <span style={{color:'red'}}>*</span>
                            :null
                    }
                </label>
                {
                    this.props.static ? this.state.value :
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {
                                this.props.addable && this.state.isAdding ?
                                    <Input noTitle
                                           value={this.state.addValue}
                                           onChange={(e) => {
                                               this.setState({
                                                   addValue: e.target.value
                                               })
                                           }}
                                        {...this.props.addInputProps}
                                    />
                                    :
                                    <Select styles={style}
                                        {...selectProps}
                                        key={this.state.noDataMessage}
                                        noOptionsMessage={()=>this.state.noDataMessage}
                                        placeholder= {this.props.placeholder}
                                        options= {this.state.options}
                                        ref={(r)=>this.select = r}
                                        onInputChange={this.props.onInputChange}
                                        onChange={this.props.onChange}
                                    />
                            }
                            {
                                !this.props.addable ? null :
                                    <Button style={{padding: '5px'}} classList="ml-2" onClick={this.handleAdd}>
                                        <span className={"material-icons"}>{this.state.isAdding?'check':'add'}</span>
                                    </Button>
                            }
                        </div>
                }
                {
                    this.state.isInvalid &&
                    <div key={Math.random()} className={"error-row"}>
                        {this.state.isInvalid && <label><FontAwesomeIcon size="1x" icon={faExclamationCircle}/>  {this.state.error}</label> }
                        {this.state.showErrorResolver && <Button key={Math.random()} disabled={this.state.disableResolveButton} onClick={this.props.resolve} classList={"btn-alas btn-previous-small"}>{this.props.buttonText}</Button> }
                    </div>
                }
            </div>
        );
    }
}

export default DropDownSelect;