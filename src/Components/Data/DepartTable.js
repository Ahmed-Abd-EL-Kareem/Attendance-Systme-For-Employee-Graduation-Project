import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

export const columns = [
  {
    Header: "#",
    accessor: (row, rowIndex) => rowIndex + 1,
  },
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Department Name",
    accessor: "name",
  },
  {
    Header: "Actions",
    Cell: ({ row }) => (
      <>
        <Link to={`/department/edit/${row.original.id}`}>
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
