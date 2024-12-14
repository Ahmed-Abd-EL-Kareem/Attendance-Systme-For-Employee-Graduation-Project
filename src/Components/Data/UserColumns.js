import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

export const columns = [
  {
    Header: "#",
    accessor: (row, rowIndex) => rowIndex + 1,
  },
  {
    Header: "Employee ID",
    accessor: "id",
  },
  {
    Header: "Employee Name",
    accessor: "name",
  },
  {
    Header: "Department ID",
    accessor: "depId",
  },
  {
    Header: "UserName",
    Cell: ({ row }) =>
      row.original.user ? (
        row.original.user
      ) : (
        <Link to="/users/add">
          <button class="Btn">
            <div class="sign">+</div>

            <div class="text">Create Account</div>
          </button>
        </Link>
      ),
  },
  {
    Header: "Actions",
    Cell: ({ row }) => (
      <>
        <Link to={`/users/edit/${row.original.id}`}>
          <FaRegEdit
            className="icon edit"
            onClick={() => row.original.onEdit(row.original)}
          />
        </Link>
        |
        <MdDeleteForever className="icon delete" />
      </>
    ),
  },
];
