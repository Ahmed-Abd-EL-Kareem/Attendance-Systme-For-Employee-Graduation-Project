import React, { useState } from "react";
import Head from "../../Head";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import DData from "../../Data/DepartData.json";
import SData from "../../Data/ShiftData.json";
import axios from "axios";

const AddEmp = () => {
  const notify = () =>
    toast.success("New Employee Added!!", {
      theme: "colored",
    });
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const uploadedImage = await uploadImage(file);
      setImageUrl(uploadedImage.secure_url);
      console.log(uploadedImage.secure_url);
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "attendance");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dctocnh6f/image/upload",
      data
    );

    return response.data;
  };

  const picture = async (file) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "my-uploads");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dctocnh6f/image/upload",
        data
      );

      console.log(response.data); // Log the actual response data
      return response.data; // Return the response data
    } catch (error) {
      console.error("Image upload error:", error);
      throw error; // Re-throw to allow caller to handle the error
    }
  };
  return (
    <>
      <div className="add mt-6 w-100">
        <div className="container ">
          <Head title="Employee" />
          <div className="back_button mb-2">
            <Link to="/employee">
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
          <div className="card col-lg-8 col-xl-8 col-xxl-8 bg-light mt-3 ms-1 mb-3">
            <div className="d-flex align-items-center justify-content-between px-4 text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
              <p className="mt-3">Employee Data</p>
            </div>
            <div className="box mt-3 p-3 px-4">
              <h3>Add New Employee</h3>
              <div className="form mt-4 px-3 row">
                <div className="col-md-6 d-flex flex-column">
                  <label htmlFor="eName">Employee Name :</label>
                  <input type="text" name="eName" id="eName" />
                  <label htmlFor="dName">Department Name :</label>
                  <select name="dName" id="dName">
                    {DData.data.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="eEmail">Email Address :</label>
                  <input type="email" name="eEmail" id="eEmail" />
                  <label htmlFor="gender">Gender :</label>
                  <div
                    className="gender d-flex justify-content-evenly align-items-baseline  "
                    id="gender"
                  >
                    <input type="radio" name="gender" id="male" value="male" />
                    <label htmlFor="male">Male</label>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
                <div className="col-md-6 d-flex flex-column">
                  <label htmlFor="image">Employee Image :</label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="buttonDownload"
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  <label htmlFor="shift">Shift :</label>
                  <select name="shift" id="shift">
                    {SData.data.map((item) => (
                      <option
                        key={item.id}
                        value={`${item.start} - ${item.end}`}
                      >
                        {`${item.start} - ${item.end}`}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="dob">Employee D.O.B :</label>
                  <input type="date" name="dob" id="dob" />
                  <label htmlFor="hire">Hire Date :</label>
                  <input type="date" name="hire" id="hire" />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button className="button" onClick={notify}>
                  <span className="pe-1 me-1 ">
                    <BsPlusCircleFill
                      style={{ transform: "translateY(-1px)" }}
                    />
                  </span>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddEmp;
