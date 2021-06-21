import React,{Component} from 'react';
import { fadeOut, fadeIn } from '../../assets/js/commons';
import './Model.scss';

class SuccessModel extends Component{
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
        this.props.visible ? this.modelOpen() : this.modelClose();
	}
	modelClose = () => {
		fadeOut(this.model.current, 300);
	}
	modelOpen = () => {
		fadeIn(this.model.current, 300, 'flex');
	}
	render() {
		return (
			<div className="model-show success" ref={this.model}>
				<div className={"model-container shadow-lg "+this.props.className} style={{ maxWidth: this.props.width + 'px' }}>
                    <span className="material-icons-round close-icon" onClick={()=>{
						if (this.props.onClose) {
                            this.props.onClose();
                        } else this.modelClose();
                    }}>close</span>
                    <div className="model-container-row">
                        <span className="material-icons-round sucess-icon">
                            done
                        </span>
                        <h4 className="title">Awesome!</h4>
                        <p className="desciption">
                            You are ready to go E-sign click button to see view
							You are all set to send offer
                        </p>
                    </div>
                    <div className="model-container-row1">
                        <a href={this.props.link} target={"_blank"} rel={"noreferrer"} className="btn-alas hvr-pop">See preview</a>
                    </div>
				</div>
			</div>
		);
	}
}
export default SuccessModel;