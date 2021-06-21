import { Empty } from "antd";
import { Component } from "react";
import "./EmptyBox.scss"; 
class EmptyBox extends Component {
    render() {
        return (  
            <div className="d-flex justify-content-center w-100 mt-3">
                <Empty
                    description={
                    <div className="ec-empty-box">
                        <p>{this.props.title?this.props.title:"Sorry! no data found"} </p>
                        <span>{this.props.description?this.props.description:"Try Something else"}</span>
                    </div>
                    }
                />
            </div>
        );
    }
}
 
export default EmptyBox;