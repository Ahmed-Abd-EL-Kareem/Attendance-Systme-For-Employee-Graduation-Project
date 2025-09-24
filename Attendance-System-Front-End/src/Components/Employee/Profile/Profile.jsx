import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Head from "../../ui/Head";
import Loading from "../../ui/Loading";
import { useParams } from "react-router-dom";
import { useEmployee } from "../../../hooks/useApiQueries";

const Profile = () => {
  const { employeeId: idFromRoute } = useParams();
  const {
    data: employee,
    isLoading,
    error,
  } = useEmployee(
    idFromRoute || JSON.parse(localStorage.getItem("employeeId"))
  );
  // const [loading, setLoading] = useState(true);
  // const [employee, setEmployee] = useState(null);

  // useEffect(() => {

  // }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  if (isLoading) return <Loading />;
  if (error || !employee) {
    return (
      <div className="profile mt-6 w-100">
        <div className="container">
          <Head title="Profile" />
          <div className="alert alert-danger" role="alert">
            Failed to load employee data
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="profile mt-6 w-100 mb-3">
        <div className="container">
          <Head title="Profile" />
          <div className="card col-lg-10 col-xl-9 col-xxl-8 bg-light mt-3 ms-1 mb-3">
            <div className="px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p
                className="mt-3 text-center"
                data-aos="zoom-in"
                data-aos-duration="1500"
              >
                {employee.department.depId}
              </p>
            </div>
            <div className="box mt-3 p-3 px-4">
              <h3 data-aos="fade-right" data-aos-duration="1500">
                {employee.name}
              </h3>
              <div className="form mt-4 px-3 row">
                <div
                  className="img d-flex flex-column align-items-center justify-content-center mb-4"
                  data-aos="flip-down"
                  data-aos-duration="1500"
                >
                  <img
                    src={employee.image}
                    alt=""
                    className=" rounded-circle mb-4 img-circle"
                  />
                </div>
                <div className="d-flex align-items-baseline justify-content-center mt-2">
                  <div className="emCard col-12">
                    <p
                      className="d-flex align-items-baseline justify-content-between"
                      data-aos="fade-right"
                      data-aos-duration="1500"
                    >
                      <p className="w-75">Employee ID:</p>
                      <p className="info">{employee.emId}</p>
                    </p>
                    <p
                      className="d-flex align-items-baseline justify-content-between"
                      data-aos="fade-left"
                      data-aos-duration="1500"
                    >
                      <p className="w-75">Gender:</p>
                      <p className="info">{employee.gender}</p>
                    </p>
                    <p
                      className="d-flex align-items-baseline justify-content-between"
                      data-aos="fade-right"
                      data-aos-duration="1500"
                    >
                      <p className="w-75">Department:</p>
                      <p className="info">{employee.department.name}</p>
                    </p>
                    <p
                      className="d-flex align-items-baseline justify-content-between"
                      data-aos="fade-left"
                      data-aos-duration="1500"
                    >
                      <p className="w-75">BirthDate:</p>
                      <p className="info">
                        {new Date(employee.dof).toLocaleDateString()}
                      </p>
                    </p>
                    <p
                      className="d-flex align-items-baseline justify-content-between"
                      data-aos="fade-right"
                      data-aos-duration="1500"
                    >
                      <p className="w-75">Joined On:</p>
                      <p className="info">
                        {new Date(employee.date).toLocaleDateString()}
                      </p>
                    </p>
                  </div>
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
