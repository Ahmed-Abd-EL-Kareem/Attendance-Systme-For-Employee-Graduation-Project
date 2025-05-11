import { LuTimerReset } from "react-icons/lu";
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
    Header: "Shift Start Time",
    accessor: "startTime12h",
    Cell: ({ cell: { value } }) => {
      const formattedShift = value.replace(
        /(Am|Pm|PM|AM)/gi,
        (match) => `<span>${match}</span>`
      );
      return <div dangerouslySetInnerHTML={{ __html: formattedShift }} />;
    },
  },
  {
    Header: "Shift End Time",
    accessor: "endTime12h",
    Cell: ({ cell: { value } }) => {
      const formattedShift = value.replace(
        /(PM|AM)/gi,
        (match) => `<span>${match}</span>`
      );
      return <div dangerouslySetInnerHTML={{ __html: formattedShift }} />;
    },
  },
  {
    Header: "Actions",
    Cell: ({ row }) => {
      const { id } = useParams();
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

      const handleDelete = (shiftId) => {
        setIsDeleteModalOpen(true);
      };

      const deleteShift = async (shiftId) => {
        try {
          const response = await axios.delete(
            `https://attendancesystem-back-end-production.up.railway.app/api/v1/shifts/${shiftId}`,
            {
              withCredentials: true,
            }
          );

          if (
            response.data.status === "success" ||
            response.data.status === undefined
          ) {
            toast.success("The Shift Has Been Deleted Successfully", {
              theme: "colored",
            });
            window.location.reload();
          }
        } catch (error) {
          if (error.response) {
            toast.error(error.response.data.message || "Error Deleting Shift", {
              theme: "colored",
            });
          } else {
            toast.error("Error Connecting To The Server", {
              theme: "colored",
            });
          }
        }
      };

      return (
        <>
          <Link to={`/admin/${id}/shift/edit/${row.original._id}`}>
            <div className="icon edit">
              <LuTimerReset />
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
            message="Are You Sure You Want To Delete This Shift?"
            onConfirm={() => {
              deleteShift(row.original._id);
              setIsDeleteModalOpen(false);
            }}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        </>
      );
    },
  },
];
