import './Divider.scss';

const Divider = (props)=>{
	return <div {...props} className={"divider "+props.className}>
		<span className="line"/>
		<span className="content">
			{props.children}
		</span>
		<span className="line"/>
	</div>
}
export default Divider;