import { MdDeleteForever } from "react-icons/md";
import { BiSolidCommentEdit } from "react-icons/bi";
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
    accessor: "depId",
  },
  {
    Header: "Department Name",
    accessor: "name",
  },
  {
    Header: "Actions",
    Cell: ({ row }) => {
      const { id } = useParams();
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

      const handleDelete = (departmentId) => {
        setIsDeleteModalOpen(true);
      };

      const deleteDepartment = async (departmentId) => {
        try {
          const response = await axios.delete(
            // `https://attendancesystem-back-end-production.up.railway.app/api/v1/departments/${departmentId}`,
            `https://90-attendance-system-back-end.vercel.app/api/v1/departments/${departmentId}`,
            {
              withCredentials: true,
            }
          );
          // console.log(response.data.status);
          if (response.data.status === undefined) {
            toast.success("The Department Has Been Deleted Successfully", {
              theme: "colored",
            });
            window.location.reload();
          }
        } catch (error) {
          if (error.response) {
            toast.error(
              error.response.data.message || "Error Deleting Department",
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

      return (
        <>
          <Link to={`/admin/${id}/department/edit/${row.original._id}`}>
            <div className="icon edit">
              <BiSolidCommentEdit />
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
            message="Are You Sure You Want To Delete This Department?"
            onConfirm={() => {
              deleteDepartment(row.original._id);
              setIsDeleteModalOpen(false);
            }}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        </>
      );
    },
  },
];
