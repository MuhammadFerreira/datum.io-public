import SideNavbar from '../../components/sideNavbar';
import TopNavbar from '../../components/topNavbar';
import UserService from "../../services/user.services";
import AuthService from "../../services/auth.service";
import { BallTriangle } from 'react-loading-icons';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Leaderboard = () => {

    require("../../assets/dashboardAssets/css/nucleo-icons.css");
    require("../../assets/dashboardAssets/css/nucleo-svg.css");
    require("../../assets/dashboardAssets/css/dashboard.css");

    //define variable we want data in
    const [top30Users, setTop30Users] = useState([""]);
    const [currentUser, setCurrentUser] = useState();


    useEffect(() => {
        async function fetchData() {
            try {
                // This retrieves the top 30 users based of points
                const userRank = await UserService.getTop30UserPoints();
                setTop30Users(userRank);
                // This retrieves the info of the current user and his rank
                const userInfo = await AuthService.getUserInfo();
                const userRankInfo = await UserService.getUserRankInfo(userInfo.id);
                setCurrentUser(userRankInfo);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    // loading animation while retrieving necessary data
    if (!top30Users.length || !currentUser) {
        return <div>
            <SideNavbar />
            <main className="main-content position-relative border-radius-lg ">
                <TopNavbar />
                <div id="content">
                    <div style={{ justifyContent: 'center', textAlign: 'center', marginLeft: '2rem', marginRight: '2rem', marginBottom: "2rem", marginTop: "30vh" }}>
                        <BallTriangle />
                    </div>
                </div>
            </main>
        </div>;
    }

    return (
        <div>
            <div>
                <SideNavbar />

                <main className="main-content position-relative border-radius-lg ">

                    <TopNavbar />
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content" style={{ background: '#000000', transform: 'perspective(0px)' }}>
                            <div className="container-fluid py-3">
                                <div className="card shadow-lg mx-4 sticky-sm-top" style={{ marginBottom: "20px", marginTop: "10px", marginLeft: "0", marginRight: "0" }}>
                                    <div className="card-body p-3">
                                        <div className="row gx-4">
                                            <div className="col-auto">
                                                <div className="avatarhttps://media.licdn.com/dms/image/C5603AQFYsd-0pax_Gg/profile-displayphoto-shrink_800_800/0/1641935802735?e=2147483647&v=beta&t=FqTa53YfbuL0wxHJhmNe3VUFV96ObCO6MzMtfqA3YKw avatar-xxl position-relative">
                                                    <img src={currentUser.profilePic} alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
                                                </div>
                                            </div>
                                            <div className="col-auto my-auto">
                                                <div className="h-100">
                                                    <h2 className="mb-1">
                                                        {currentUser.firstName} {currentUser.lastName}
                                                    </h2>
                                                    <p className="mb-0 font-weight-bold text-md">
                                                        User
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                                                <div className="h-100">
                                                    <p className="mb-0 font-weight-bold text-sm">
                                                        Current Rank:
                                                    </p>
                                                    <h2 className="mb-1">
                                                        #{currentUser.rank}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mx-4" style={{ marginTop: "20px" }}>
                                    <div className="card">
                                        <div className="card-header pb-0">
                                            <div className="row" style={{ marginBottom: "30px" }}>
                                                <div className="col-lg-6 col-7 text-wrap">
                                                    <h4 className='text-wrap'>Top 30 Leaderboard</h4>
                                                </div>
                                                <div className="col-lg-6 col-5 my-auto text-end">
                                                    <div className="dropdown float-lg-end pe-4">
                                                        <Link className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="fa fa-ellipsis-v text-secondary" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body p-3">
                                            <div className="table-responsive">
                                                <table className="table align-items-center justify-content-center mb-0" >
                                                    <thead>
                                                        <tr className=''>
                                                            <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-10">Rank</th>
                                                            <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-10">Name</th>
                                                            <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-10">Points</th>
                                                            <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-10">Submissions</th>

                                                            <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-10"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {top30Users?.map((user, index) => (
                                                            <tr key={user.id} className='text-secondary text-sm font-weight-bolder opacity-10 ps-1'>
                                                                <td className=''>
                                                                    <div className="d-flex px-2 py-1 w-25">
                                                                        &nbsp;&nbsp;&nbsp;{index + 1}
                                                                    </div>
                                                                </td>
                                                                <td className=''>
                                                                    <div className="d-flex px-2 py-1 w-25">
                                                                        &nbsp;&nbsp;&nbsp;
                                                                        <div>
                                                                            <Link className="avatar avatar-sm me-3 rounded-circle">
                                                                                <img src={user.profilePic ? user.profilePic : "../../assets/img/Datum.io%20(2).png"} alt="" style={{ maxHeight: "50px", minHeight: "50px", minWidth: "50px", maxWidth: "50px" }} />
                                                                            </Link>
                                                                        </div>
                                                                        <div className="d-flex flex-column justify-content-center my-auto">
                                                                            <h6 className="mb-0 text-mb">{user.firstName + " " + user.lastName}</h6>
                                                                            {user.country}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className=''>
                                                                    <div className="d-flex px-2 py-1 w-25">
                                                                        <div className="d-flex flex-column justify-content-center my-auto">
                                                                            <h6 className="mb-0 text-mb">&nbsp;&nbsp;&nbsp;{user.points}</h6>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className=''>
                                                                    <div className="d-flex px-2 py-1 w-25">
                                                                        <div className="d-flex flex-column justify-content-center my-auto">
                                                                            <h6 className="mb-0 text-mb">&nbsp;&nbsp;&nbsp;{user.finishedSurveysCount}</h6>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="avatar-group mt-2 text-center">
                                                                    <span className="font-weight-bold text-mb"><Link to={`/user/profile/${user.id}`} className="btn btn-primary shadow" role="button">View</Link></span>
                                                                </td>
                                                            </tr>
                                                        ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </div>
    );
};

export default Leaderboard;