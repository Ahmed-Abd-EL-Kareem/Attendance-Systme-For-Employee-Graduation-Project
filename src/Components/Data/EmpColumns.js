import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useState } from "react";

export const columns = [
  {
    Header: "#",
    accessor: (row, rowIndex) => rowIndex + 1,
  },
  {
    Header: "ID",
    accessor: "emId",
  },
  {
    Header: "Image",
    accessor: "image",
    Cell: ({ cell: { value } }) => (
      <img
        src={value}
        alt="profile"
        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
      />
    ),
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Department",
    accessor: (row) =>
      row.department && row.department.name ? row.department.name : "Unset",
  },
  {
    Header: "Shift",
    accessor: (row) =>
      row.shift
        ? `${row.shift.startTime12h} - ${row.shift.endTime12h}`
        : "Unset",
    Cell: ({ cell: { value } }) => {
      const formattedShift = value.replace(
        /(Am|Pm)/gi,
        (match) => `<span>${match}</span>`
      );
      return <div dangerouslySetInnerHTML={{ __html: formattedShift }} />;
    },
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  // {
  //   Header: "DOF",
  //   accessor: "formattedDof",
  // },
  {
    Header: "Hire Date",
    accessor: "formattedDate",
  },
  {
    Header: "Actions",
    Cell: ({ row }) => {
      const { id } = useParams();
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

      const handleDelete = (employeeId) => {
        // console.log("employeeId", employeeId);
        setIsDeleteModalOpen(true);
      };

      const deleteEmployee = async (employeeId) => {
        try {
          const response = await axios.delete(
            // `https://attendancesystem-back-end-production.up.railway.app/api/v1/employees/${employeeId}`,
            `https://90-attendance-system-back-end.vercel.app/api/v1/employees/${employeeId}`,
            {
              withCredentials: true,
            }
          );

          if (
            response.data.status === "success" ||
            response.data.status === undefined
          ) {
            toast.success("The Employee Has Been Deleted Successfully", {
              theme: "colored",
            });
            window.location.reload();
          }
        } catch (error) {
          if (error.response) {
            toast.error(
              error.response.data.message || "Error Deleting Employee",
              {
                theme: "colored",
              }
            );
          } else {
            toast.error("Error Connecting To The Server", {
              theme: "colored",
            });
          }
        }
      };
      if (
        row.original.account === undefined ||
        row.original.account === null ||
        row.original.account.role === "user"
      ) {
        return (
          <>
            <Link to={`/admin/${id}/employee/edit/${row.original._id}`}>
              <div className="icon edit">
                <FaUserEdit />
              </div>
            </Link>
            |
            <div className="icon delete">
              <MdDeleteForever
                onClick={() => handleDelete(row.original._id)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <DeleteModal
              isOpen={isDeleteModalOpen}
              message="Are You Sure You Want To Delete This Employee?"
              onConfirm={() => {
                deleteEmployee(row.original._id);
                setIsDeleteModalOpen(false);
              }}
              onCancel={() => setIsDeleteModalOpen(false)}
            />
          </>
        );
      } else {
        if (row.original.account.role === "admin") {
          return (
            <>
              <Link to={`/admin/${id}/employee/edit/${row.original._id}`}>
                <div className="icon edit">
                  <FaUserEdit />
                </div>
              </Link>
            </>
          );
        }
      }
    },
  },
];
