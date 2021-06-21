import React,{Component} from "react";
import {Editor} from "@tinymce/tinymce-react";
import { Spin } from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import Button from "../atomic/Button/Button";

class CustomEditor extends Component{
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			isInvalid: false,
			error: null,
		}
		this.editorRef = React.createRef();
	}
	update = (e)=>{
		this.setState({
			error: e,
			isInvalid: e && true
		})
	}
	onChange = ()=>{
		let content = this.editorRef.current.getContent();
		if (this.props.onChange){
			this.props.onChange(content);
		}
	}
	insert = (txt)=>{
		this.editorRef.current.insertContent(txt);
	}

	render() {
		return (
			<div>
				{
					this.state.loaded ? null:
						<div className="mt-3 d-flex align-items-center justify-content-center">
							Loading&nbsp;&nbsp;<Spin />
						</div>
				}
				<Editor
					{...this.props}
					onInit={(evt, editor) =>{
						this.editorRef.current = editor;
						this.setState({
							loaded: true
						})
					}}
					onChange={this.onChange}
					apiKey={process.env.REACT_APP_TINYCLOUD}
					init={{
						height: this.props.height,
						width: 'auto',
						menubar: false,
						plugins: [
							'advlist autolink lists link image charmap print preview anchor',
							'searchreplace visualblocks code fullscreen',
							'insertdatetime media table paste code help wordcount'
						],
						images_upload_url:'index.php',
						toolbar: 'undo redo | formatselect | ' +
							'bold italic backcolor | alignleft aligncenter ' +
							'alignright alignjustify | bullist numlist outdent indent | ' +
							'removeformat | help',
						content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
					}}
				/>
				{
					this.state.isInvalid &&
					<div key={Math.random()} className={"error-row"}>
						{this.state.isInvalid && <label><FontAwesomeIcon size="1x" icon={faExclamationCircle}/>  {this.state.error}</label> }
						{this.state.showErrorResolver && <Button key={Math.random()} disabled={this.state.disableResolveButton} onClick={this.props.resolve} classList={"btn-alas btn-previous-small"}>{this.props.buttonText}</Button> }
					</div>
				}
			</div>
		);
	}
}

export default CustomEditor;