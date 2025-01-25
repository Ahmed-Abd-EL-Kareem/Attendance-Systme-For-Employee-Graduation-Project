import React from "react";
import Head from "../../Head";
const Profile = () => {
  return (
    <>
      <div className="profile mt-6 w-100">
        <div className="container">
          <Head title="Profile" />
          <div className="card  col-lg-10 col-xl-9 col-xxl-8 bg-light mt-3 ms-1 mb-3">
            <div className=" px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p className="mt-3 text-center">HR</p>
            </div>
            <div className="box mt-3 p-3 px-4">
              <h3>Ahmed Abd ELKareem Ali</h3>
              <div className="form mt-4 px-3 row">
                <div className="img d-flex flex-column align-items-center justify-content-center mb-4">
                  <img
                    src="./img/team-1.png"
                    alt=""
                    className="w-25 rounded-circle mb-4"
                  />
                </div>
                <div className="d-flex align-items-baseline justify-content-center mt-2">
                  <div className="emCard col-12 ">
                    <p className="d-flex  align-items-baseline justify-content-between ">
                      <p className="w-75">Employee ID :</p>
                      <p className="info">123</p>
                    </p>
                    <p className="d-flex  align-items-baseline justify-content-between ">
                      <p className="w-75">Gender :</p>
                      <p className="info">Male</p>
                    </p>
                    <p className="d-flex  align-items-baseline justify-content-between ">
                      <p className="w-75">Department :</p>
                      <p className="info">Human Resource</p>
                    </p>
                    <p className="d-flex  align-items-baseline justify-content-between ">
                      <p className="w-75">BirthDate :</p>
                      <p className="info">01/01/1990</p>
                    </p>
                    <p className="d-flex  align-items-baseline justify-content-between ">
                      <p className="w-75">Joined On :</p>
                      <p className="info">01/01/2021</p>
                    </p>
                  </div>

                  {/* <div className="col-4 d-flex flex-column">
                    <p className="info">123</p>
                    <p className="info">Male</p>
                    <p className="info">Human Resource</p>
                    <p className="info">01/01/1990</p>
                    <p className="info">01/01/2021</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
