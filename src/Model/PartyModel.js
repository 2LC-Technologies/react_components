import React,{Component} from 'react';
import {backInUp, backInDown} from '../../assets/js/commons';
import './Model.scss';

class PartyModel extends Component{
	static defaultProps = {
		width: 500,
	}
	constructor(props) {
		super(props);

		this.state = {
			visible: props.visible,
		}
		this.model = React.createRef();
	}
	componentDidMount() {
		this.model.current.style.display = 'none';
	}
	modelClose = () => {
		backInDown(this.model.current, 300);
		this.setState({
			visible: false
		})
	}
	modelOpen = () => {
		backInUp(this.model.current, 300,'flex');
		this.setState({
			visible: true
		})
	}
	render() {
		return (
			<div className="model-show" ref={this.model}>
				<div className={"model-container shadow-lg d-none "+this.props.className} style={{ maxWidth: this.props.width + 'px' }}>
				<span className="material-icons-round close-icon" onClick={()=>{
					if (this.props.onClose) {
						this.props.onClose()
					} else this.modelClose();
				}}>close</span>
					{this.props.children}
				</div>
			</div>
		);
	}
}
export default PartyModel;