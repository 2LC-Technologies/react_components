import React, {Component} from "react";

class Steps extends Component{
	constructor(props) {
		super(props);

		let initialStep = 0;
		this.stepIds = {};

		if (!Array.isArray(this.props.children)){
			throw new Error('Steps require more than one children');
		}

		this.props.children.forEach((child,i)=>{
			if (child.props['data-step-id']){
				let id = child.props['data-step-id'];
				this.stepIds[id] = i;

				if (this.props.initialStep && this.props.initialStep === id){
					initialStep = i;
				}
			}
		});
		if (typeof props.currentStep === "number")
			initialStep = props.currentStep;

		this.state = {
			current: initialStep
		}
		this.current = React.createRef();
	}
	validateAndGetData = ()=>{
		if (this.current && this.current.validateAndGetData)
			return this.current.validateAndGetData();
		return {}
	}

	setStepById = (id)=>{
		this.setState({
			current: this.stepIds[id]
		});
	}
	next = ()=>{
		let oldVal = this.state.current;
		let newVal = Math.min( oldVal + 1,this.props.children.length-1);

		this.setState({
			current: newVal
		})
		return oldVal === this.props.children.length-1;
	}
	prev = ()=>{
		let newVal = Math.max(this.state.current - 1,0);

		this.setState({
			current: newVal
		})
	}
	goto = (i)=>{
		let newVal = Math.max(Math.min(i,this.props.children.length - 1),0);

		this.setState({
			current: newVal
		})
	}

	render() {
		let DynamicComponent = this.props.children[this.state.current].type;
		let DynamicProps = this.props.children[this.state.current].props;
		return (
			<DynamicComponent ref={r => this.current = r} {...DynamicProps}/>
		);
	}
}
export default Steps;