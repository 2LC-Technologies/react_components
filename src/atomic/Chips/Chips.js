import './Chips.scss';
import React, {Component} from "react";

class Chips extends Component{
    constructor(props) {
        super(props);

        let data = [];
        let i=0;
        if (props.data)
        props.data.forEach(function (obj) {
            if (typeof obj==="string")
                data.push({
                    id:i++,
                    value:obj
                });
            else {
                if (!obj.id){
                    obj.id = i++;
                }
                data.push(obj);
            }
        });
        this.state = {
            active:-1,
            data:data
        }
    }
    right = ()=>{
        let oldPos = this.findById(this.state.active,true);
        let newVal = oldPos === this.state.data.length -1 ? 0 : oldPos+1
        newVal = this.state.data[newVal].id;
        this.setState({
            active: newVal
        })
    }
    left = ()=>{
        let oldPos = this.findById(this.state.active,true);
        let newVal = oldPos === 0 ? this.state.data.length -1 : oldPos-1
        newVal = this.state.data[newVal].id;
        this.setState({
            active: newVal
        })
    }
    setData = (data)=>{
        this.setState({
            data:data
        })
    }
    getPosition = (e)=>{
        const {left,top} = e.getBoundingClientRect();
        return {
            left:left,
            top:top
        }
    }
    setSelected = (id)=>{
        this.setState({
            active:id
        })
    }
    getSelected = ()=>{
        const activeDiv = document.querySelector('.Chips.active');
        if (activeDiv===null){
            return null;
        }
        const activeDivId = activeDiv.getAttribute('data-chip-id');
        return this.findById(activeDivId);
    }
    findById = (id,getIndex = false)=>{
        let list = this.state.data;
        for (let i=0;i<list.length;i++){
            let d = list[i];
            if ((''+d.id)===(''+id)){
                if (getIndex)
                    return i;
                return d;
            }
        }
        return null;
    }
    up = ()=>{
        const activeDiv = document.querySelector('.Chips.active');
        if (!activeDiv)
            return;
        const activePosition = this.getPosition(activeDiv);
        let elements = document.querySelectorAll('.Chips:not(.active)');
        let selectedDiv = null;
        for (const e of elements){
            const position = this.getPosition(e);
            if (position.top < activePosition.top){
                if (selectedDiv === null)
                    selectedDiv = e;
                else{
                    let selectedPosition = this.getPosition(selectedDiv);
                    if (this.distance(selectedPosition,activePosition) > this.distance(position,activePosition)){
                        selectedDiv = e;
                    }
                }
            }
        }
        if (selectedDiv!=null){
            let newVal = parseInt(selectedDiv.getAttribute('data-chip-id'));
            this.setState({
                active: newVal
            });
        }
    }
    down = ()=>{
        const activePosition = this.getPosition(document.querySelector('.Chips.active'));
        let elements = document.querySelectorAll('.Chips:not(.active)');
        let selectedDiv = null;
        for (const e of elements){
            const position = this.getPosition(e);
            if (position.top > activePosition.top){
                if (selectedDiv === null)
                    selectedDiv = e;
                else {
                    let selectedPosition = this.getPosition(selectedDiv);
                    if (this.distance(selectedPosition,activePosition) > this.distance(position,activePosition)){
                        selectedDiv = e;
                    }
                }
            }
        }
        if (selectedDiv!=null){
            let newVal = parseInt(selectedDiv.getAttribute('data-chip-id'));
            this.setState({
                active: newVal
            });
        }
    }
    distance = (a,b)=>{
        let dx = a.left - b.left;
        let dy = a.top - b.top;
        return Math.sqrt(dx*dx + dy*dy);
    }
    handleClick = (a)=>{
        this.setState({active:a.id},()=>{
            if (this.props.onSelect)
                this.props.onSelect(a);
        })
    }
    remove = (object)=>{
        let data = this.state.data;
        let newData = [];

        let isActive = JSON.stringify(object)===JSON.stringify(this.findById(this.state.active));
        data.forEach(o=>{
            if (o.id!==object.id)
                newData.push(o);
        })

        this.setState({
            data: newData,
            active: isActive? -1 : this.state.active
        })
    }
    render() {
        return (
            <div className={"Chips-list"}>
                {
                    this.state.data.map((a) =>
                        <div className={"Chips " + (a.id === this.state.active ? "active" : "")}
                             onClick={() => this.handleClick(a)}
                             key={a.id} data-chip-id={a.id}>
                            {a.value}
                        </div>
                    )
                }
            </div>
        );
    }
}
export default  Chips;