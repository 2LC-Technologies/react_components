import React,{Component} from 'react';

import {clone} from "../../../assets/js/commons";
import {Spinner} from "react-bootstrap";
import './SearchInput.scss';

class SearchInput extends Component{
	static defaultProps = {
		waitTime: 2000
	}
	constructor(props){
		super(props);

		this.state = {
			value: '',
			loading: false
		}

		this.timer = 0;
		this.inputRef = React.createRef();
	}
	handleOnChange = (e)=>{
		this.setState({
			loading: true,
			value: e.target.value
		})
		clearTimeout(this.timer);
		this.timer = setTimeout(this.onSearch,this.props.waitTime);
	}
	onSearch = ()=>{
		if (this.props.onSearch) {
			this.props.onSearch(this.state.value);
		}
		this.setState({
			loading: false
		})
	}
	render(){
		let newProps = clone(this.props);
		delete newProps.waitTime;
		delete newProps.onSearch;

		let Element;
		if (this.state.loading){
			Element = <Spinner animation={"border"} style={{
				width: '20px',
				height: '20px',
				borderWidth: '2px',
			}}/>
		}else{
			Element = <span className="material-icons-round">search</span>
		}

		return(
			<div className={"search-box mb-0"}>
				{Element}
				<input
					type={"search"}
					ref={this.inputRef}
					onChange={this.handleOnChange}
					{...newProps}
					className={"Input-search "+newProps.className}
				/>
			</div>
		);
	}
}

export default SearchInput;