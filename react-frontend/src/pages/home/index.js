import React, { useEffect } from 'react';
import styled from "styled-components";
import Typical from 'react-typical';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Col, Container, Row } from 'react-bootstrap';
import Spline from '@splinetool/react-spline';
import { useNavigate } from "react-router-dom";
import { XContext } from '../../App';
import AuthService from "../../services/auth.service";


const Home = () => {

  const [setIsLoading] = React.useState(true);

  let userConfig = [
    {
      position: "top_first",
      componentId: 0,
    },
    {
      position: "top_second",
      componentId: 1,
    },
    {
      position: "top_third",
      componentId: 2,
    },
    {
      position: "top_fourth",
      componentId: 3,
    },
    {
      position: "mid_left",
      componentId: 5,
    },
    {
      position: "mid_right",
      componentId: 7,
    },
    {
      position: "bottom_left",
      componentId: 8,
    },
    {
      position: "bottom_right",
      componentId: 11,
    },
  ];

  const handleLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    window.addEventListener("load", handleLoading);
    return () => window.removeEventListener("load", handleLoading);
  }, []);

  const navigate = useNavigate();
  const { setX } = React.useContext(XContext);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login().then(
        () => {

          setX(true);
          localStorage.setItem("userConfig", JSON.stringify(userConfig));

          if (location.state?.from) {
            navigate(location.state.from.pathname);
          }

          //Redirect to dashboard via a tag
          window.location.href = "/user/dashboard";
        }
      );
    } catch (err) {
      console.log(err);
    }
  };


  return (
    // eslint-disable-next-line
    true ? (
      <div style={{/*background: 'url("design.jpg")', */backgroundPosition: '0 -60px', background: 'rgb(0,0,0)', width: 'auto' }}>
        <Navbar />
        <section className="bg-cover relative p-0 overflow-visible bg-center" style={{marginTop: "100px", marginBottom: "100px"}}>
          <Container className="align-items-center relative" style={{ height: "50vh", justifyContent: "center", display: "flex" }}>
            <Row className='justify-content-center'>
              <Col xs={5} md={5} className='d-flex align-items-center justify-content-center' style={{ zIndex: '10',}}>
                <Spline scene="assets/img/homeLogo.splinecode" width={"100vw"} height={"100vw"} className='d-flex align-items-center justify-content-center' />
              </Col>
              <Col xs={10} md={7} className='d-flex align-items-center justify-content-center' style={{ fontWeight: 'bold', color: "white", zIndex: "1" }}>
                <Content>
                  <h1>Real People, <br />  <Typical
                    steps={['Real Data.']}
                    loop={1} wrapper='a1' /></h1>
                  <p className="lead fw-normal text-muted mb-5">Join the data craze! <br /><br />
                  <a onClick={handleLogin} style={{backgroundColor: "#0d6efd"}} className="btn btn-secondary shadow" role="button">VIEW DEMO!</a>
                  </p>
                </Content>
              </Col>
            </Row>
          </Container>
        </section>

          <section>
            <div className="container py-5">
              <div className="row">
                <div className="col-md-8 col-xl-6 text-center mx-auto" style={{}}>
                  <p className="fw-bold text-success mb-2" style={{ color: 'rgb(255,199,0)' }}>Our Services</p>
                  <h2 className="fw-bold"><strong>What we can do for you</strong></h2>
                </div>
              </div>
              <div className="py-5 p-lg-5">
                <div className="row row-cols-1 row-cols-md-2 mx-auto" style={{ maxWidth: '900px' }}>
                  <div className="col mb-5">
                    <div className="card shadow-sm" style={{ backgroundColor: "#333232" }}>
                      <div className="card-body px-4 py-5 px-md-5">
                        <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{ top: '1rem', right: '1rem', position: 'absolute' }}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-bell text-success">
                          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                        </svg></div>
                        <h5 className="fw-bold card-title">Notifications&nbsp;</h5>
                        <p className="text-white card-text mb-4">With Datum.io, you can stay up-to-date with the latest studies and surveys that are available in your field!</p>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-5">
                    <div className="card shadow-sm" style={{ backgroundColor: "#333232" }}>
                      <div className="card-body px-4 py-5 px-md-5">
                        <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{ top: '1rem', right: '1rem', position: 'absolute' }}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-bezier text-success">
                          <path fillRule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
                          <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z" />
                        </svg></div>
                        <h5 className="fw-bold card-title">Leaderboard&nbsp;</h5>
                        <p className="text-white card-text mb-4">Gamified experience with survey points and leaderboards to show how you compare with the rest!</p>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-4">
                    <div className="card shadow-sm" style={{ backgroundColor: "#333232" }}>
                      <div className="card-body px-4 py-5 px-md-5">
                        <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{ top: '1rem', right: '1rem', position: 'absolute' }}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-pin-angle text-success">
                          <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146zm.122 2.112v-.002.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a4.507 4.507 0 0 0-.288-.076 4.922 4.922 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a4.924 4.924 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034.114 0 .23-.011.343-.04L9.927 2.028c-.029.113-.04.23-.04.343a1.779 1.779 0 0 0 .062.46z" />
                        </svg></div>
                        <h5 className="fw-bold card-title">Pin&nbsp;</h5>
                        <p className="text-white card-text mb-4">Pin your favourite researchers to see their latest work and follow up with any involvement opportunities!</p>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-4">
                    <div className="card shadow-sm" style={{ backgroundColor: "#333232" }}>
                      <div className="card-body px-4 py-5 px-md-5">
                        <div className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon" style={{ top: '1rem', right: '1rem', position: 'absolute' }}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-chat-quote text-success">
                          <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                          <path d="M7.066 6.76A1.665 1.665 0 0 0 4 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
                        </svg></div>
                        <h5 className="fw-bold card-title">Communicate&nbsp;</h5>
                        <p className="text-white card-text mb-4">Have questions, concerns, or are intrigued by a particular survey? Easily reach out to researchers with a message!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section />
          <section className="py-5 mt-5">
            <div className="container py-5">
              <div className="row mb-5">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                  <p className="fw-bold text-success mb-2">Testimonials</p>
                  <h2 className="fw-bold"><strong>What People Say About us</strong></h2>
                  <h8 className="text-primary w-lg-50 fw-bold">See what others are saying about Datum.io.&nbsp;</h8>
                </div>
              </div>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 d-sm-flex justify-content-sm-center">
                <div className="col mb-4"> 
                  <div className="d-flex flex-column align-items-center align-items-sm-start">
                    <p className="rounded p-4" style={{ backgroundColor: "#333232" }}>As a student with a passion for biology, I can see related surveys in my field!</p>
                    <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover" width={90} height={100} src="assets/img/team/avatar2.jpg" />
                      <div>
                        <p className="fw-bold text-primary mb-0">John Smith</p>
                        <p className="text-white mb-0">Biology student</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col mb-4">
                  <div className="d-flex flex-column align-items-center align-items-sm-start">
                    <p className="rounded p-4" style={{ backgroundColor: "#333232" }}>Finding participants for my research was always difficult. Datum.io makes things so easy!</p>
                    <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover" width={90} height={100} src="assets/img/team/avatar4.jpg" />
                      <div>
                        <p className="fw-bold text-primary mb-0">Idris Umeir</p>
                        <p className="text-white mb-0">Neuroscience researcher</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col mb-4">
                  <div className="d-flex flex-column align-items-center align-items-sm-start">
                    <p className="rounded p-4" style={{ backgroundColor: "#333232" }}>As an admin of a research journal, Datum.io makes our content visible and available!</p>
                    <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover" width={90} height={100} src="assets/img/team/avatar5.jpg" />
                      <div>
                        <p className="fw-bold text-primary mb-0">Ari Board</p>
                        <p className="text-white mb-0">Director of research, Nature Journal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-5">
            <div className="container">
              <div className="row mb-5">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                  <p className="fw-bold text-success mb-2">Contacts</p>
                  <h2 className="fw-bold"><strong>How you can reach us</strong></h2>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-xl-4">
                  <div>
                    <form className="p-3 p-xl-4" method="post">
                      <div className="mb-3"><input disabled className="form-control" type="text" id="name-1" name="name" placeholder="Disabled" /></div>
                      <div className="mb-3"><input disabled className="form-control" type="email" id="email-1" name="email" placeholder="Disabled" /></div>
                      <div className="mb-3"><textarea disabled className="form-control" id="message-1" name="message" rows={6} placeholder="Disabled" defaultValue={""} /></div>
                      <div><button disabled className="btn btn-primary shadow d-block w-100" type="submit">Send </button></div>
                    </form>
                  </div>
                </div>
                <div className="col-md-4 col-xl-4 d-flex justify-content-center justify-content-xl-start">
                  <div className="d-flex flex-wrap flex-md-column justify-content-md-start align-items-md-start h-100">
                    <div className="d-flex align-items-center p-3">
                      <div className="bs-icon-md bs-icon-circle shadow d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon bs-icon-md"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-telephone">
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                      </svg></div>
                      <div className="px-2">
                        <h6 className="fw-bold mb-0">Phone</h6>
                        <p className="text-muted mb-0">(514)-123-4567</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center p-3">
                      <div className="bs-icon-md bs-icon-circle shadow d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon bs-icon-md"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-envelope">
                        <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                      </svg></div>
                      <div className="px-2">
                        <h6 className="fw-bold mb-0">Email</h6>
                        <p className="text-muted mb-0">info@datum.com</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center p-3">
                      <div className="bs-icon-md bs-icon-circle shadow d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon bs-icon-md"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-pin">
                        <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z" />
                      </svg></div>
                      <div className="px-2">
                        <h6 className="fw-bold mb-0">Location</h6>
                        <p className="text-muted mb-0">12 Data Street, Montreal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-5">
            <div className="container">
              <div className="rounded border-dark d-flex flex-column justify-content-between align-items-center flex-lg-row p-4 p-lg-5">
                <div className="text-center text-lg-start py-3 py-lg-1">
                  <h2 className="fw-bold mb-2">Subscribe to our newsletter</h2>
                  <p className="mb-0">Receive newsletters about the latest work in your field of interest!</p>
                </div>
                <form className="d-flex justify-content-center flex-wrap flex-lg-nowrap" method="post">
                  <div className="my-2"><input disabled className="rounded-pill shadow-sm form-control" type="email" name="email" placeholder="Disabled" /></div>
                  <div className="my-2"><button disabled className="btn btn-primary shadow ms-2" type="submit">Subscribe </button></div>
                </form>
              </div>
            </div>
          </section>
          <Footer />
      </div>
    ) : (<div>WAIT</div>)
  );
};

const Content = styled.div`

  text-align: left;

  h1, a1{
    font-family: 'Spline Sans Mono', monospace;
    padding-top: 60px;
    font-weight: bold;
    font-size: calc(35px + 1vh);
    margin: 0;
    text-shadow: -1px -1px 0 #000, 2px -1px 0 #000, -1px 2px 0 #000, 2px 2px 0 #000;
    z-index: 100;
  }
  z-index: 100;
`;

export default Home;