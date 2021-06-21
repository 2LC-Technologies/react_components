import React,{Component} from 'react';
import { fadeOut, fadeIn } from '../../assets/js/commons';
import './Model.scss';

class Model extends Component{
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
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.visible !== this.state.visible)
		this.props.visible ? this.modelOpen() : this.modelClose();
	}
	modelClose = () => {
		fadeOut(this.model.current, 300);
		this.setState({
			visible: false
		})
	}
	modelOpen = () => {
		fadeIn(this.model.current, 300, 'flex');
		this.setState({
			visible: true
		})
	}
	render() {
		return (
			<div className="model-show" ref={this.model}>
				<div className={"model-container shadow-lg "+this.props.className} style={{ maxWidth: this.props.width + 'px' }}>
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
export default Model;
