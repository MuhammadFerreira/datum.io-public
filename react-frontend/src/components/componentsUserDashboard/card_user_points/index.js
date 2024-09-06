import React, { useState, useEffect } from 'react';
import UserService from '../../../services/user.services';
import AuthService from '../../../services/auth.service';

const NewResponses = () => {

  const [userPoints, setPoints] = useState();

    useEffect(() => {
        const getSurvey = async () => {
          try {
            
            const userInfo = await AuthService.getUserInfo();
            const userRankInfo = await UserService.getUserRankInfo(userInfo.id);
            setPoints(userRankInfo.points);   
          } catch (err) {
            console.error(err);
          }
        };   
        getSurvey();
      }, []);

    return (
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card h-100">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">Number of Points</p>
                    <h5 className="font-weight-bolder">
                      {userPoints?userPoints :
                    <div id="content">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ color:"grey" }}></span>
                    </div>}
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-warning shadow-success text-center rounded-circle" style={{ backgroundColor: 'red'}}>
                    <i className="ni ni-trophy text-lg opacity-10" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default NewResponses;