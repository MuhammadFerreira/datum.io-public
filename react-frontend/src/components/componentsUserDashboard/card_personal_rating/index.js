import React from 'react';

const PersonalRating = () => {

    return (
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
            <div className="card h-100">
                <div className="card-body p-3">
                    <div className="row">
                        <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Personal Rating<br /></p>
                                <h5 className="font-weight-bolder">
                                    4.7/5
                                </h5>
                            </div>
                        </div>
                        <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-rating shadow-danger text-center rounded-circle">
                                <i className="ni ni-like-2 text-lg opacity-10" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalRating;