import React, { useState } from "react";
import Head from "../../Head";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
// import DData from "../../Data/DepartData.json";
// import SData from "../../Data/ShiftData.json";
import axios from "axios";
import SmallLoad from "../../SmallLoad";

const AddEmp = ({ departments, shifts, onUpdateSuccess, id }) => {
  const [loading, setLoading] = useState(false);
  const [empName, setEmpName] = useState("");
  const [img, setImg] = useState("");
  const [gender, setGender] = useState("");
  const [dof, setDof] = useState("");
  const [shift, setShift] = useState("");
  const [date, setDate] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  // const notify = () =>
  //   toast.success("New Employee Added!!", {
  //     theme: "colored",
  //   });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من إدخال جميع الحقول
    const missingFields = [];
    if (!empName.trim()) missingFields.push("Employee Name");
    if (!gender) missingFields.push("Gender");
    if (!dof) missingFields.push("Date of Birth");
    if (!shift) missingFields.push("Shift");
    if (!date) missingFields.push("Hire Date");
    if (!department) missingFields.push("Department");
    if (!img) missingFields.push("Employee Image");

    if (missingFields.length > 0) {
      toast.error(`Please enter: ${missingFields.join(", ")}`, {
        theme: "colored",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", empName);
      formData.append("gender", gender);
      formData.append("dof", dof);
      formData.append("shift", shift);
      formData.append("date", date);
      const departmentId = departments.find((d) => d.name === department)._id;
      formData.append("department", departmentId);

      if (img && img.startsWith("data:image")) {
        const response = await fetch(img);
        const blob = await response.blob();
        formData.append("image", blob, "image.jpg");
      }

      await axios.post(
        // "https://90-attendance-system-back-end.vercel.app/api/v1/employees",
        `https://90-attendance-system-back-end.vercel.app/api/v1/employees`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Employee added successfully!", {
        theme: "colored",
      });
      setLoading(false);
      setTimeout(() => {
        navigate(`/admin/${id}/employee`);
      }, 5000);
      // تحديث البيانات في جميع المسارات
      if (onUpdateSuccess) {
        await onUpdateSuccess();
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Failed to add employee", {
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // التحقق من حجم الصورة (أقصى 5 ميجابايت)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB", {
          theme: "colored",
        });
        e.target.value = ""; // مسح قيمة الإدخال
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Unsupported file type. Please select a JPEG, PNG, or JPG image",
          {
            theme: "colored",
          }
        );
        e.target.value = ""; // مسح قيمة الإدخال
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="add mt-6 w-100">
        <div className="container">
          <Head title="Employee" />
          <div className="back_button mb-2">
            <Link to={`/admin/${id}/employee`}>
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
              <h3>Add New Employee</h3>
              <form onSubmit={handleSubmit} className="form mt-4 px-3 row">
                <div className="img d-flex flex-column align-items-center justify-content-center mb-4">
                  <img
                    src={
                      img ||
                      "https://ui-avatars.com/api/?name=Employee&background=0D8ABC&color=fff"
                    }
                    alt="Employee"
                    className="rounded-circle mb-4"
                    style={{
                      width: "170px",
                      height: "170px",
                      objectFit: "cover",
                      background: "#eee",
                      borderRadius: "50%",
                      border: "2px solid #ccc",
                    }}
                  />
                  <div className="d-flex justify-content-between w-100">
                    <label htmlFor="image">Employee Image:</label>
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
                    <label htmlFor="eName">Employee Name:</label>
                    <input
                      type="text"
                      name="eName"
                      id="eName"
                      value={empName}
                      onChange={(e) => setEmpName(e.target.value)}
                    />
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      value={dof}
                      onChange={(e) => setDof(e.target.value)}
                    />
                    <label htmlFor="shift">Shift:</label>
                    <select
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
                    <label htmlFor="hire">Hire Date:</label>
                    <input
                      type="date"
                      name="hire"
                      id="hire"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <label htmlFor="department">Department:</label>
                    <select
                      name="department"
                      id="department"
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
                    <label htmlFor="gender">Gender:</label>
                    <div
                      className="gender d-flex justify-content-evenly align-items-baseline"
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
                      <label htmlFor="male">Male</label>
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={() => setGender("Female")}
                      />
                      <label htmlFor="female">Female</label>
                    </div>
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
                        Save
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddEmp;
