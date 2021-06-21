import {Component} from "react";

class BasicComponent extends Component {
	_isMounted = false;
	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
        return <div/>;
    }
}

export default BasicComponent;