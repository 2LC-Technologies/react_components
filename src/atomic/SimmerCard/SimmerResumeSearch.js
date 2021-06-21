import { Skeleton } from 'antd';
import { Component } from 'react';

class SimmerResumeSearch extends Component {
    render() {
        return (
            <div className="card companyCardBox h-100 border-0 SearchResumeRow">
                <div className="d-flex flex-row">
                    <Skeleton.Image className="profile" style={{ width: 55, height: 55, }} />
                    <div className="d-flex flex-column justify-content-center w-100 ml-2">
                        <Skeleton.Input style={{ width: '90%', height: 15, marginBottom: '5px' }} active={true} />
                        <Skeleton.Input style={{ width: '25%', height: 15 }} active={true} />
                    </div>
                </div>
                <div className="mt-auto d-flex w-100 pt-2">
                    <Skeleton.Input style={{ width: '50px', height: 25, marginRight: '10px' }} active={true} />
                    <Skeleton.Input style={{ width: '50px', height: 25, marginRight: '10px' }} active={true} />
                    <Skeleton.Input style={{ width: '50px', height: 25 }} active={true} />
                    <div className="ml-auto">
                        <Skeleton.Input style={{ width: '50px', height: 25 }} active={true} />
                    </div>
                </div>
            </div >
        );
    }
}

export default SimmerResumeSearch;