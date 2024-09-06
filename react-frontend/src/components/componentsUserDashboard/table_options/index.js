import React from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import BugReportIcon from '@mui/icons-material/BugReport';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Options = () => {

    return (
        <div className="col-lg-6 mb-lg-0 mb-4">
            <div className="card">
                <div className="card-header pb-0 p-3" style={{ marginBottom: '24px', height:"110px" }}>
                    <h6 className="mb-0">Other Options</h6>
                </div>
                <div className="card-body p-3">
                    <ul className="list-group">
                        <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                            <div className="d-flex align-items-center">
                                <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                    <BarChartIcon sx={{color:'white'}} />
                                </div>
                                <div className="d-flex flex-column">
                                    <h6 className="mb-1 text-white">View Personal Stats</h6>
                                </div>
                            </div>
                            <div className="d-flex">
                                <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"><i className="ni ni-bold-right" aria-hidden="true" /></button>
                            </div>
                        </li>
                        <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                            <div className="d-flex align-items-center">
                                <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                    <ContactSupportIcon sx={{color:'white'}} />
                                </div>
                                <div className="d-flex flex-column">
                                    <h6 className="mb-1 text-white">User Support</h6>
                                </div>
                            </div>
                            <div className="d-flex">
                                <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"><i className="ni ni-bold-right" aria-hidden="true" /></button>
                            </div>
                        </li>
                        <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                            <div className="d-flex align-items-center">
                                <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                    <BugReportIcon sx={{color:'white'}} />
                                </div>
                                <div className="d-flex flex-column">
                                    <h6 className="mb-1 text-white">Report a Bug</h6>
                                </div>
                            </div>
                            <div className="d-flex">
                                <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"><i className="ni ni-bold-right" aria-hidden="true" /></button>
                            </div>
                        </li>
                        <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                                <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                    <ThumbUpIcon sx={{color:'white'}} />
                                </div>
                                <div className="d-flex flex-column">
                                    <h6 className="mb-1 text-white">Submit Feedback</h6>
                                </div>
                            </div>
                            <div className="d-flex">
                                <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"><i className="ni ni-bold-right" aria-hidden="true" /></button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Options;