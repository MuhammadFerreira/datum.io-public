import React from 'react';

const CategoryComponent = () => {

    return (
        <div className="col-lg-6">
            <div className="card">
                <div className="card-header pb-0 p-3" style={{ marginBottom: '24px' }}>
                    <h6 className="mb-0" style={{ paddingBottom: '10px' }}>Categories of Interest</h6>
                </div>
                <div className="card-body p-3">
                    <ul className="list-group">
                        <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                            <div className="d-flex align-items-center">
                                <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                    <i className="ni ni-mobile-button text-white opacity-10" />
                                </div>
                                <div className="d-flex flex-column">
                                    <h6 className="mb-1 text-white">School</h6>
                                    <span className="text-xs">250 Surveys, <span className="font-weight-bold">123 active</span></span>
                                </div>
                            </div>
                            <div className="d-flex">
                                <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"><i className="ni ni-bold-right" aria-hidden="true" /></button>
                            </div>
                        </li>
                        <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                            <div className="d-flex align-items-center">
                                <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                    <i className="fas fa-hockey-puck" />
                                </div>
                                <div className="d-flex flex-column">
                                    <h6 className="mb-1 text-white">Hockey</h6>
                                    <span className="text-xs">233 Surveys, <span className="font-weight-bold">15 active</span></span>
                                </div>
                            </div>
                            <div className="d-flex">
                                <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"><i className="ni ni-bold-right" aria-hidden="true" /></button>
                            </div>
                        </li>
                        <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                            <div className="d-flex align-items-center">
                                <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                    <i className="fas fa-vote-yea" />
                                </div>
                                <div className="d-flex flex-column">
                                    <h6 className="mb-1 text-white">Politics</h6>
                                    <span className="text-xs">123 Surveys, <span className="font-weight-bold">12 active</span></span>
                                </div>
                            </div>
                            <div className="d-flex">
                                <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"><i className="ni ni-bold-right" aria-hidden="true" /></button>
                            </div>
                        </li>
                        <li className="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                            <div className="d-flex align-items-center">
                                <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                    <i className="ni ni-satisfied text-white opacity-10" />
                                </div>
                                <div className="d-flex flex-column">
                                    <h6 className="mb-1 text-white">UX Design</h6>
                                    <span className="text-xs">123 Surveys, <span className="font-weight-bold">12 active</span></span>
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

export default CategoryComponent;