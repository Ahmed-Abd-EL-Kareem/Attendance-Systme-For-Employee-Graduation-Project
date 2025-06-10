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
    Header: "Employee ID",
    accessor: "emId",
  },
  {
    Header: "Employee Name",
    accessor: "name",
  },
  {
    Header: "Department ID",
    accessor: (row) =>
      row.department && row.department.depId ? row.department.depId : "Unset",
  },
  {
    Header: "UserName",
    Cell: ({ row }) => {
      const { id } = useParams();
      return row.original.account === undefined ||
        row.original.account === null ? (
        <Link to={`/admin/${id}/users/add/${row.original._id}`}>
          <button className="Btn">
            <span>Create Account</span>
          </button>
        </Link>
      ) : (
        row.original.account.userName
      );
    },
  },
  {
    Header: "Actions",
    Cell: ({ row }) => {
      const { id } = useParams();
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

      if (row.original.account === undefined || row.original.account === null) {
        return null;
      } else {
        if (row.original.account.role === "admin") {
          return (
            <>
              <Link to={`/admin/${id}/users/edit/${row.original.account._id}`}>
                <div className="icon edit">
                  <FaUserEdit />
                </div>
              </Link>
            </>
          );
        } else {
          const handleDelete = (userId) => {
            // console.log("userId", userId);
            setIsDeleteModalOpen(true);
          };

          const deleteUser = async (userId) => {
            try {
              const response = await axios.delete(
                // `https://attendancesystem-back-end-production.up.railway.app/api/v1/accounts/${userId}`,
                // {
                //   withCredentials: true,
                // }
                `https://90-attendance-system-back-end.vercel.app/api/v1/accounts/${userId}`,
                {
                  withCredentials: true,
                }
              );

              if (
                response.data.status === "success" ||
                response.data.status === undefined
              ) {
                toast.success("User deleted successfully", {
                  theme: "colored",
                });
                window.location.reload();
              }
            } catch (error) {
              if (error.response) {
                toast.error(
                  error.response.data.message || "Error deleting user",
                  {
                    theme: "colored",
                  }
                );
              } else {
                toast.error("Error connecting to the server", {
                  theme: "colored",
                });
              }
            }
          };

          return (
            <>
              <Link to={`/admin/${id}/users/edit/${row.original.account._id}`}>
                <div className="icon edit">
                  <FaUserEdit />
                </div>
              </Link>
              |
              <div className="icon delete">
                <MdDeleteForever
                  onClick={() => handleDelete(row.original.account._id)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <DeleteModal
                isOpen={isDeleteModalOpen}
                message="Are You Sure You Want To Delete This User Account?"
                onConfirm={() => {
                  deleteUser(row.original.account._id);
                  setIsDeleteModalOpen(false);
                }}
                onCancel={() => setIsDeleteModalOpen(false)}
              />
            </>
          );
        }
      }
    },
  },
];
