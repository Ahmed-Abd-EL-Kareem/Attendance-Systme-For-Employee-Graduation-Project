import React from "react";
import Head from "./Head";
import { adminDashBoard, emTable, shTable } from "../data";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard mt-6 w-100">
        <div className="container">
          <Head title="Dashboard" />
          <div className="cards">
            {adminDashBoard.map((val, i) => {
              return (
                <div
                  className="card d-flex flex-row align-items-stretch justify-content-between p-3"
                  key={i}
                  style={
                    i === 0
                      ? { borderLeft: "4px solid #d22828" }
                      : i === 1
                      ? { borderLeft: "4px solid #0abf45" }
                      : i === 2
                      ? { borderLeft: "4px solid #0a21bf" }
                      : { borderLeft: "4px solid #e0a80d" }
                  }
                >
                  <h3>{val.text}</h3>
                  <p className="num">
                    <sub>{val.count}</sub>
                    {val.icon}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="tables d-flex gap-3">
            <div className="table bg-light ">
              <div className="text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
                <p className="mt-3">Employee's Department</p>
              </div>
              <div className="tab p-2 bg-white">
                <table className="table table-striped table-hover table-bordered text-center">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Department</th>
                      <th scope="col">Employees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emTable.map((val, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>{val.depart}</td>
                          <td>{val.numEmployees}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="table bg-light ">
              <div className="text bg-body-secondary bg-gradient text-center border-bottom border-black fw-semibold text-secondary-emphasis p-1">
                <p className="mt-3">Employee's Per Shift</p>
              </div>
              <div className="tab p-2 bg-white">
                <table className="table table-striped table-hover table-bordered text-center">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Shift</th>
                      <th scope="col">Employees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shTable.map((val, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>
                            {val.shift}
                            <span className="fs-6 text-secondary">
                              {val.time}
                            </span>
                          </td>
                          <td>{val.numEmployees}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
