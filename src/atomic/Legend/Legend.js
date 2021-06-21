import React from "react";
import './legend.scss';
class Legend extends React.Component{
    render() {
        return (
            <div className="legend to-line">
                <span className="line"></span>
                    <span className="title small-heading font-nunito text-muted">{this.props.title}</span>
                <span className="line"></span>
            </div>
        );
    }
}
export default Legend;