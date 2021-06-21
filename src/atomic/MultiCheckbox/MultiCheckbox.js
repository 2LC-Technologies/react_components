import React, {Component} from "react";
import {clone, deepEqual} from "../../../assets/js/commons";
import {Checkbox} from "antd";

class MultiCheckbox extends Component {
	static defaultProps = {
		selected: [],
		options: [],
		allLabel: 'All',
		checkboxProps: {},
	}
	constructor(props) {
		super(props);

		this.state = {
			options: this.props.options,
			selected: this.props.selected,
		}
	}
	handleCheckboxClick = (o)=>{
		let {selected} = this.state;
		if (selected.includes(o)) {
			selected.splice(selected.indexOf(o),1);
		}else{
			selected.push(o);
		}
		if (this.props.onChange)
			this.props.onChange(selected);
		this.setState({selected})
	}
	toggleAll = ()=>{
		if (this.state.selected.length === 0){
			this.setState({
				selected: clone(this.state.options),
			})
		}else{
			this.setState({
				selected: []
			})
		}
	}

	render() {
		let list = clone(this.state.options);
        return (
            <div>
				{
					list.map((o,i)=>(
						<div key={i} className={"d-flex align-items-center"}>
							<Checkbox value={o}
									  onClick={()=>{
										  this.handleCheckboxClick(o);
									  }}
									  checked={this.state.selected.includes(o)}
									  {...this.props.checkboxProps}>
								{o}
							</Checkbox>
						</div>
					))
				}
				<div className={"d-flex align-items-center"}>
					<Checkbox onClick={this.toggleAll}
							  checked={deepEqual(this.state.options,this.state.selected)}
							  {...this.props.checkboxProps}>
						{this.props.allLabel}
					</Checkbox>
				</div>
            </div>
        );
    }
}

export default MultiCheckbox;