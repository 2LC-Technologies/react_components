import "./Alert.scss";
const AlertWarning = (props) =>{
	return(
		<div className={"Alert "+(props.className)+" "+(props.active && 'active')} onClick={props.onClick}>
			<span className={"icon material-icons-round"}>{props.icon}</span>
			<div className={"content"}>
				<h5>{props.title}</h5>
				<p>
					{props.description}&nbsp;
					<span className="link_here d-inline-box" onClick={props.linkOnClick}>{props.link}</span>
				</p>
			</div>
		</div>
	)
}
export default AlertWarning;