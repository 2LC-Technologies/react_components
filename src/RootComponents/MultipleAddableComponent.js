import React from 'react';
import {Col, Row} from "react-bootstrap";
import Button from "../atomic/button/Button";
import './MultipleAddableComponent.scss';
import BasicComponent from "./BasicComponent";

class MultipleAddableComponent extends BasicComponent{
	constructor(props,list){
		super(props);

		this.state = {
			list: list || [null],
			currentVisible: 0,
			showRemove: false,
			reload: false,
		}
		this.inputRef = React.createRef();
		this.state.showRemove = this.state.list.length > 1;
	}
	vaildateCurrent=()=>{
		if(this.inputRef.current &&
			this.inputRef.current.validateAndGetData &&
			!this.inputRef.current.validateAndGetData())
			return false;
		return true;
	}
	addEntry = ()=>{
		if(this.inputRef.current &&
			this.inputRef.current.validateAndGetData &&
			!this.inputRef.current.validateAndGetData()) return;

		let list = this.state.list;
		list.push(null);
		this.setState({
			currentVisible: list.length - 1,
			list: list,
			showRemove: list.length > 1
		})
	}
	removeEntry = ()=>{
		let list = this.state.list;
		let currentVisible = this.state.currentVisible;
		list.splice(currentVisible,1);

		if(this.state.currentVisible===list.length){
			currentVisible--;
		}
		this.setState({
			currentVisible,
			list,
			showRemove: list.length > 1
		})
	}
	setValue = (o)=>{
		let list = this.state.list;
		list[this.state.currentVisible] = o;
		this.setState({list})
	}
	componentDidMount() {
		super.componentDidMount();
	}

	render(component){
		let Element = component.type;
		return(
			<div className={"multi-add-root"}>
				<div className={"multi-add-circle-root"}>
					{
						this.state.list.map((edu,i)=>(
							<div
								key={i}
								onClick={()=>{
									this.setState({
										currentVisible: i
									})
								}}
								className={"multi-add-circles "+(i===this.state.currentVisible ? "active" : "")}>
								{i+1}
							</div>
						))
					}
					<div onClick={this.addEntry}
						className={"multi-add-circles addIcon"}>
						<span className="material-icons-round">add</span>
					</div>
				</div>
				<Element
					{...component.props}
					key={this.state.reload+""+this.state.currentVisible+''+this.state.list.length}
					onChange={this.setValue}
					ref={this.inputRef}
					data={this.state.list[this.state.currentVisible]}
					position={this.state.currentVisible}/>
				<Row>
					<Col lg={12} className={"d-flex justify-content-center"}>
						{
							this.state.showRemove &&
							<Button classList={"btn-background-less danger-text mr-2"} onClick={this.removeEntry}>
								<span className={"material-icons-round"}>close</span> Remove
							</Button>
						}
						{/* <Button onClick={this.addEntry} classList={"hvr-pop btn-add"}>
							<span className={"material-icons-round"}>add</span>Add new
						</Button> */}
					</Col>
				</Row>
			</div>
		);
	}
}

export default MultipleAddableComponent;