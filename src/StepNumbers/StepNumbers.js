import {Component} from "react";
import './StepNumbers.scss';

class StepNumbers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			count: this.props.count,
			current: this.props.current
		}
	}
	generateStep = (o,i)=>{
		let comps = [];
		let isDone = i<this.state.current;
		let isCurrent = this.state.current === i;
		let classNm = isDone?"done":(isCurrent?"active":"");

		if(i>0){
			comps.push(<span key="step-line" className={"step-line "+classNm}/>);
		}

		let inner = i+1;
		if (this.state.current>i){
			inner = <i className={"material-icons"}>done</i>
		}

		comps.push(<span key="step-circle" className={"step-circle "+classNm}>{inner}</span>);
		return comps;
	}

	render() {
        return (
            <div {...this.props} className={"step-numbers-root"}>
				{
					[...Array(this.state.count)].map(this.generateStep)
				}
            </div>
        );
    }
}

export default StepNumbers;