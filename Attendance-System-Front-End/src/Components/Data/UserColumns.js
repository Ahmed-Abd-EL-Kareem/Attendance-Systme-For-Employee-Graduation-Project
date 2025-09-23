import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

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

      if (row.original.account === undefined || row.original.account === null) {
        return null;
      } else {
        return (
          <>
            <button
              className="icon edit"
              title="Disabled to protect database"
              disabled
              style={{ cursor: "not-allowed", opacity: 0.5 }}
            >
              <FaUserEdit />
            </button>
            |
            <button
              className="icon delete"
              title="Disabled to protect database"
              disabled
              style={{ cursor: "not-allowed", opacity: 0.5 }}
            >
              <MdDeleteForever />
            </button>
          </>
        );
      }
    },
  },
];
