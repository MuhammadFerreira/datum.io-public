import React from 'react';
import './style.css';

const RecentActivities = () => {

  return (


    <div className="col-lg-6 mb-lg-0 mb-4" >
      <div className="card card-carousel overflow-hidden h-100 p-0">
        <div id="carouselExampleCaptions1" className="carousel slide h-100" data-bs-ride="carousel" data-bs-interval="true">
          <div className="carousel-inner border-radius-lg h-100">
            <div className="carousel-item h-100 active" data-bs-interval="7000" style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0) 200px),url("https://media.tenor.com/VswaV-DuDfsAAAAd/sonic-cd-sonic-the-hedgehog.gif")', backgroundSize: 'cover', backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
              <div className="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                <div className="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                  <i className="ni ni-camera-compact text-dark opacity-10" />
                </div>
                <h5 className="text-white mb-1 stuff">Do you still play video games? 🎮</h5>
                <p className='stuff'>Let us know in today's featured surveys!</p>
              </div>
            </div>
            <div className="carousel-item h-100" data-bs-interval="7000" style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0) 200px),url("https://img.wattpad.com/31e021c709f78eb83a9ca7a12295752d34529109/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f52637934713476716437766444413d3d2d3936323934373730302e313633623336343430343531633031363633353431343830303431362e676966")', backgroundSize: 'cover', backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
              <div className="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                <div className="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                  <i className="ni ni-bulb-61 text-dark opacity-10" />
                </div>
                <h5 className="text-white mb-1 stuff">Is Connor McDavid the 🐐!?!</h5>
                <p className='stuff'>Share your opinion on the generational talent!</p>
              </div>
            </div>
            <div className="carousel-item h-100" data-bs-interval="7000" style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0) 200px), url("https://media0.giphy.com/media/GgSXZ91pwkW8P1s8Uz/giphy.gif ")', backgroundSize: 'cover', backgroundPosition: "center", backgroundRepeat: "no-repeat", background: "linear-gradient(red, yellow);" }}>
              <div className="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5" >
                <div className="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                  <i className="ni ni-trophy text-dark opacity-10" />
                </div>
                <h5 className="text-white mb-1 stuff" style={{ fontSize: "26px" }} >Has the 👑 reign ended?!</h5>
                <p className='stuff'>We would love to hear your opinion on his legacy!</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev w-5 me-3" type="button" data-bs-target="#carouselExampleCaptions1" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next w-5 me-3" type="button" data-bs-target="#carouselExampleCaptions1" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;