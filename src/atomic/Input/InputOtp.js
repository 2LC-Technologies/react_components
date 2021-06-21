import React, {Component} from "react";
import OtpInput from "react-otp-input";

class InputOtp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
		}
	}
	update = (s)=>{
		this.setState({
			error: s
		})
	}

	render() {
        return (
            <div>
				<OtpInput {...this.props}/>
				{
					!!this.state.error &&
						<div style={{marginTop:'5px',color:'var(--danger)'}}>
							<span>{this.state.error}</span>
						</div>
				}
            </div>
        );
    }
}

export default InputOtp;