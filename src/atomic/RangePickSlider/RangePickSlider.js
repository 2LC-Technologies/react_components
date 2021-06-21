import React, {Component} from 'react';
import './RangePickSlider.scss';
import {Slider} from "antd";
import {fadeIn, fadeOut} from "../../../assets/js/commons";
class RangePickSlider extends Component{
	constructor(props){
		super(props);
		this.state={
			range:''
		}
		this.input = React.createRef();
		this.slider = React.createRef();
	}
	onChange = (value) => {
		let val = value[0]+' - '+value[1]
		this.setState({
			range: val
		},()=>{
			if (this.props.onChange)
				this.props.onChange(value[0],value[1])
		})
	}
	componentDidMount() {
		this.input.onmouseenter = ()=>{
			fadeIn(this.slider,200,'block');
		}
		this.input.onmouseleave = ()=>{
			fadeOut(this.slider,200);
		}
	}
	render(){
		const marks = {
			0: '1k',
			10000: {
				style: {
					color: '#f50',
					marginLeft:'-15px'
				},
				label: <strong>100k</strong>,
			},
		};
		return (
			<div className={"rangePickerSlider " + this.props.className}
				 ref={r => this.input = r}>
				<input className={'rangepicker-custom-input'}
					   defaultValue={this.state.range}
					   placeholder={this.props.placeholder}/>
				<div className={"rangepicker-custom shadow"}
					 style={{display:'none'}}
					 ref={r => this.slider = r}>
					<Slider range defaultValue={[20, 1000]}
							onChange={this.onChange}
							marks={marks}  max={10000} />
				</div>
			</div>
		);
	}
}
export default RangePickSlider;