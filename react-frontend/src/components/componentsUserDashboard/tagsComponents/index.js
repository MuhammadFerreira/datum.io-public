import { React, useEffect, useState } from 'react';
import UserService from "../../../services/user.services";
import AuthService from '../../../services/auth.service';


const TopTags= () => {
    const [popularTags, setTags] = useState();

useEffect(() => {
  const getSurveys = async () => {
    try {
      const userInfo = await AuthService.getUserInfo();
      const surveys = await UserService.getSurveys(userInfo.id);

      // create an array of all tags
      const allTags = surveys.reduce((acc, survey) => {
        acc.push(survey.tag1, survey.tag2, survey.tag3);
        return acc;
      }, []);

      // count how many times each tag appears
      const tagCounts = allTags.reduce((acc, tag) => {
        if (tag) { // ignore null or undefined tags
          acc[tag] = (acc[tag] || 0) + 1;
        }
        return acc;
      }, {});

      // sort the tags based on their count and select the top 5
      const topTags = Object.keys(tagCounts)
        .sort((a, b) => tagCounts[b] - tagCounts[a])
        .slice(0, 5);

      setTags(topTags);
      console.log(topTags); // prints an array of the top 5 most used tags
    } catch (err) {
      console.error(err);
    }
  };

  getSurveys();
}, []);


  return (
    <div className="col-lg-6">
        <div className="card">
            <div className="card-header pb-0 p-3" style={{ marginBottom: '24px' }}>
                <h6 className="mb-0" style={{ paddingBottom: '10px' }}>Popular Tags from your surveys!</h6>
            </div>
            <div className="card-body p-3" style={{ height: '305px'}}>
                <ul className="list-group">
                    {popularTags ? popularTags?.map((tag) => (
                        <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                            <div className="d-flex align-items-center">
                                <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                                    <i className="ni ni-bold-right text-white opacity-10" />
                                </div>
                                <div className="d-flex flex-column">
                                    <h6 className="mb-1 text-white">{tag}</h6>
                                    
                                </div>
                            </div>
                            <div className="d-flex">
                                <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"><i className="ni ni-bold-right" aria-hidden="true" /></button>
                            </div>
                        </li>
                    )):
                    <div id="content">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{marginTop:"75px",marginLeft:"350px", height:"100px", width:"100px", color:"#8392AB" }}></span>
                    </div>}
                </ul>
            </div>
        </div>
    </div>
);
};
  export default TopTags;