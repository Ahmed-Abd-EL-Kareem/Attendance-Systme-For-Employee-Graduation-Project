import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Head from "../../ui/Head";
import Loading from "../../ui/Loading";
import SmallLoad from "../../ui/SmallLoad";

const EditEmp = ({ EmpDepartments, EmpShifts, onUpdateSuccess, id1 }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [img, setImg] = useState("");
  const [gender, setGender] = useState("");
  const [dof, setDof] = useState("");
  const [shift, setShift] = useState("");
  const [date, setDate] = useState("");
  const [department, setDepartment] = useState("");

  // تحويل التاريخ من ISO إلى YYYY-MM-DD
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // تحميل البيانات الأساسية
  useEffect(() => {
    const fetchData = async () => {
      try {
        // تحميل بيانات الموظف
        const employeeResponse = await axios.get(
          `https://90-attendance-system-back-end.vercel.app/api/v1/employees/${id}`,
          { withCredentials: true }
        );
        const employeeData = employeeResponse.data.data.employee;

        // تحميل بيانات الورديات
        // const shiftsResponse = await axios.get(
        //   "http://127.0.0.1:8000/api/v1/shifts",
        //   { withCredentials: true }
        // );
        const shiftsData = EmpShifts;

        // تحميل بيانات الأقسام
        // const departmentsResponse = await axios.get(
        //   "http://127.0.0.1:8000/api/v1/departments",
        //   { withCredentials: true }
        // );
        const departmentsData = EmpDepartments;

        setEmployeeData(employeeData);
        setShifts(shiftsData);
        setDepartments(departmentsData);

        // تعيين بيانات النموذج
        setEmpId(employeeData.emId);
        setEmpName(employeeData.name);
        setImg(employeeData.image);
        setGender(employeeData.gender);
        setDof(formatDate(employeeData.dof));
        if (employeeData.shift !== null) {
          setShift(employeeData.shift.id);
        }
        setDate(formatDate(employeeData.date));
        if (employeeData.department !== null) {
          setDepartment(employeeData.department.name);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data", {
          theme: "colored",
        });
        navigate("/employee");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, navigate, EmpDepartments, EmpShifts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", empName);
      formData.append("gender", gender);
      formData.append("dof", dof);
      formData.append("shift", shift);
      formData.append("date", date);
      const departmentId = departments.find((d) => d.name === department)._id;
      console.log(departmentId);
      formData.append("department", departmentId);

      if (img && img.startsWith("data:image")) {
        const response = await fetch(img);
        const blob = await response.blob();
        formData.append("image", blob, "image.jpg");
      }

      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }

      await axios.patch(
        `https://90-attendance-system-back-end.vercel.app/api/v1/employees/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Employee updated successfully!", {
        theme: "colored",
      });

      // تحديث البيانات في جميع المسارات
      if (onUpdateSuccess) {
        await onUpdateSuccess();
      }

      // الانتقال إلى صفحة الموظفين
      // navigate("/admin/employee");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee data", {
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Unsupported file type. Please select a JPEG, PNG, or JPG image",
          {
            theme: "colored",
          }
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="add mt-6 w-100">
        <div className="container">
          <Head title="Employee" />

          <div className="back_button mb-2">
            <Link to={`/admin/${id1}/employee`}>
              <button className="pushable">
                <span className="shadow" />
                <span className="edge" />
                <span className="front">
                  <span className="pe-2 me-2 border-end">
                    <MdArrowBackIos />
                  </span>
                  Back
                </span>
              </button>
            </Link>
          </div>

          <div className="card col-lg-10 col-xl-9 col-xxl-8 bg-light mt-3 ms-1 mb-3">
            <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p className="mt-3">Employee Data</p>
            </div>
            <div className="box mt-3 p-3 px-4">
              <h3>Edit Employee</h3>
              <form onSubmit={handleSubmit} className="form mt-4 px-3 row">
                <div className="img d-flex flex-column align-items-center justify-content-center mb-4">
                  <img
                    src={img.startsWith("../") ? `../../${img}` : img}
                    alt=""
                    className="rounded-circle mb-4 img-circle"
                  />
                  <div className="d-flex justify-content-between w-100">
                    <label htmlFor="image">Change Employee Image:</label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="buttonDownload"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 d-flex flex-column">
                    <label htmlFor="eId" className="">
                      Employee ID:
                    </label>
                    <input
                      className="me-4"
                      type="text"
                      name="eId"
                      id="eId"
                      disabled
                      value={empId}
                      // onChange={(e) => setEmpId(e.target.value)}
                    />
                    <label htmlFor="dob" className="w-auto">
                      Date of Birth:
                    </label>
                    <input
                      className="w-auto"
                      type="date"
                      name="dob"
                      id="dob"
                      value={dof}
                      onChange={(e) => setDof(e.target.value)}
                    />
                    <label htmlFor="shift" className="w-auto">
                      Shift:
                    </label>
                    <select
                      className=""
                      name="shift"
                      id="shift"
                      value={shift}
                      onChange={(e) => setShift(e.target.value)}
                    >
                      <option value="">Select Shift</option>
                      {shifts.map((item) => (
                        <option key={item._id} value={item._id}>
                          {`${item.startTime12h} - ${item.endTime12h}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 d-flex flex-column">
                    <label htmlFor="eName" className="">
                      Employee Name:
                    </label>
                    <input
                      className=""
                      name="eName"
                      id="eName"
                      value={empName}
                      onChange={(e) => setEmpName(e.target.value)}
                    />
                    <label htmlFor="hire" className="w-auto">
                      Hire Date:
                    </label>
                    <input
                      className="w-auto"
                      type="date"
                      name="hire"
                      id="hire"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <label htmlFor="department" className=" w-auto">
                      Department :
                    </label>
                    <select
                      name="department"
                      id="department"
                      className=" "
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="">Select Department</option>
                      {departments.map((item) => (
                        <option key={item._id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="d-flex align-items-baseline justify-content-center mt-2">
                  <label htmlFor="gender" className="w-auto">
                    Gender:
                  </label>
                  <div
                    className="gender d-flex justify-content-evenly align-items-baseline col-md-4 w-75"
                    id="gender"
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={() => setGender("Male")}
                    />
                    <label htmlFor="male" className="fs-6">
                      Male
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={() => setGender("Female")}
                    />
                    <label htmlFor="female" className="fs-6">
                      Female
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    type="submit"
                    className="button d-flex"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <SmallLoad /> Saving...
                      </>
                    ) : (
                      <>
                        <span className="pe-1 me-1">
                          <BsPlusCircleFill
                            style={{ transform: "translateY(-1px)" }}
                          />
                        </span>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmp;
