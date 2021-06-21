import {Row} from "react-bootstrap";
import React, {useState} from "react";
import './ToggleButton.css';
const ToggleButton =(props) => {

	const [postActive,setPostActive] = useState(props.defaultOn);
	const onChange = (e)=>{
		let value = e.target.checked;
		if (props.onChange)
			props.onChange(value);
		setPostActive(value);
	}

	return(
		<Row>
			{!props.onlyToggle && [
			<div key={"title"} className="col-9 col-lg-6 d-flex align-items-center">
				<label className="font-medium mb-0">{props.title}</label>
			</div>,
			<div key={"pre"} className="col-1 d-flex justify-content-end">
				<div className={"pre-switch-label switch-labels"}>{props.pre}</div>
			</div>
			]}
			<div className="col-1 d-flex justify-content-center switch-parent">
				<span className={"switch switch-icon "+(props.small?'switch-sm':'switch-lg')}>
                   <label>
                       <input type="checkbox"
							  onChange={onChange}
							  defaultChecked={props.defaultOn}
							  id={props.name}
							  name={props.name}/>
                       <span/>
                   </label>
               </span>
			</div>
			{!props.onlyToggle && 
			<div className="col-1 d-flex justify-content-start">
				<div className={"post-switch-label switch-labels "+(postActive && "active")}>{props.post}</div>
			</div>
			}
		</Row>
	)
}
export default ToggleButton;