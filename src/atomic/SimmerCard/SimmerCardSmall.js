import { Skeleton } from 'antd';
import { Component } from 'react';
import { Col } from 'react-bootstrap';

class SimmerCardSmall extends Component {
	render() {
		return (
			<Col className="companyCard pl-0" xl={this.props.xl} lg={this.props.lg} md={this.props.md}>
				<div className="card companyCardBox h-100 w-100">
					<div className="first-row d-flex justify-content-center">
						<Skeleton.Avatar active={true} style={{width:'120px',height:'120px'}}  shape={'circle'} />
					</div>
					<Skeleton.Input style={{ width: '100%',height:25,marginTop:'20px' }} active={true} />
					<div className="w-100 text-center">
						<Skeleton.Input style={{ width: '150px',height:20,marginTop:'10px'}} active={true} />
					</div>
					<div className="mt-auto w-100 text-center">
						<Skeleton.Input style={{ width: '100px',height:35 }} active={true} />
					</div>
				</div>
			</Col>
		);
	}
}

export default SimmerCardSmall;