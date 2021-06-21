import { Skeleton } from 'antd';
import { Component } from 'react';
import { Col } from 'react-bootstrap';

class SimmerCard extends Component {
    render() {
        return (
            <Col className="companyCard" xl={this.props.xl} lg={this.props.lg} md={this.props.md}>
				<div className="card companyCardBox h-100">
					<div className="first-row">
                        {this.props.image && <Skeleton.Image className="company_logo" />}
                        <div className="d-flex flex-column justify-content-center w-100">
                            <Skeleton.Input style={{ width: '50%', height: 15, marginBottom: '5px' }} active={true} />
                            <Skeleton.Input style={{ width: '25%', height: 15 }} active={true} />
                        </div>
                    </div>
                    <Skeleton.Input style={{ width: '100%',height:15,marginTop:'10px' }} active={true} />
                    <Skeleton.Input style={{ width: '100%',height:15,marginTop:'10px' }} active={true} />
                    {this.props.extraTop && <Skeleton.Input style={{ width: '75%',height:15,marginTop:'15px' }} active={true} />}
                    <div className="mt-auto d-flex w-100 pt-2">
                        <Skeleton.Input style={{ width: '50px',height:25,marginRight:'10px'}} active={true} />
                        <Skeleton.Input style={{ width: '50px',height:25,marginRight:'10px'}} active={true} />
                        <Skeleton.Input style={{ width: '50px',height:25}} active={true} />
                    </div>
                    {this.props.extraBottom && <Skeleton.Input style={{ width: '75%',height:15,marginTop:'15px' }} active={true} />}
                    <Skeleton.Input style={{ width: '100%',height:25,marginTop:'15px' }} active={true} />
                </div>
            </Col>
        );
    }
}
 
export default SimmerCard;