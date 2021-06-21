import React,{Component} from "react";
import './Typer.scss';

class Typer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			speed: 100,
			text: '',
			currentPosition: 0,
			currentEvent: -1,
		}
		this.events = props.events;
		this.intervalID = null;
		this.caret = React.createRef();
	}
	move = (n,direction)=>{
		let count = 0;
		let interval = setInterval(()=>{
			let pos = this.state.currentPosition;
			if (direction)
				pos += 1;
			else
				pos -= 1;

			if (this._isMounted)
			this.setState({
				currentPosition: pos
			})

			count++;
			if (count>=n){
				clearInterval(interval);
				this.startNextEvent();
			}
		},this.state.speed);
	}
	write = (text)=>{
		let currentChar = 0;
		this.intervalID = setInterval(()=>{
			let pos = this.state.currentPosition;
			let txt = this.state.text;

			let pre = txt.slice(0,pos);
			let post = txt.slice(pos);

			txt = pre+text[currentChar]+post;
			pos += 1;

			if (this._isMounted)
			this.setState({
				text: txt,
				currentPosition: pos,
			})

			currentChar++;
			if (currentChar >= text.length){
				clearInterval(this.intervalID);
				this.startNextEvent();
			}
		},this.state.speed);
	}
	erase = (n)=>{
		let i=0;
		this.intervalID = setInterval(()=>{
			let pos = this.state.currentPosition;
			let txt = this.state.text;

			let pre = txt.slice(0,pos);
			let post = txt.slice(pos);

			txt = pre.substr(0,pre.length-1)+post;
			pos -= 1;

			if (this._isMounted)
			this.setState({
				text: txt,
				currentPosition: pos,
			})

			i++;
			if (i >= n){
				clearInterval(this.intervalID);
				this.startNextEvent();
			}
		},this.state.speed);
	}
	startNextEvent = ()=>{
		let event = this.state.currentEvent + 1;
		if (event>=this.events.length){

			this.caret.classList.add('blink');

			if (this.onWritingDone)
				this.onWritingDone();
			return;
		}
		if (this._isMounted)
		this.setState({
			currentEvent: event
		})
		let eventObject = this.events[event];
		if (eventObject.type === 'write')
			this.write(eventObject.text);
		else if (eventObject.type === 'move')
			this.move(eventObject.count,eventObject.direction);
		else if (eventObject.type === 'erase')
			this.erase(eventObject.count);
	}
	_isMounted = false;
	componentDidMount() {
		this._isMounted = true;
		this.caret.classList.remove('blink');
		this.startNextEvent();
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	setEvents = (events)=>{
		this.events = events;
		if (this._isMounted)
		this.setState({
			text: '',
			currentPosition: 0,
			currentEvent: -1
		},()=>{
			this.startNextEvent()
		})
	}

	render() {
		let preText = this.state.text.substr(0,this.state.currentPosition);
		let postText = this.state.text.substr(this.state.currentPosition);
        return (
			<span className={"mt-3 typer-span " + this.props.className}>
				<span>{preText}</span>
				<span style={this.props.style} className={"caret"} ref={r => this.caret = r}/>
				<span>{postText}</span>
            </span>
        );
    }
}

export default Typer;