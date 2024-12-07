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
    Header: "Image",
    accessor: "img",
    Cell: ({ cell: { value } }) => (
      <img
        src={value}
        alt="profile"
        style={{ width: "40px", borderRadius: "50%" }}
      />
    ),
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Shift",
    accessor: "shift",
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
  {
    Header: "DOF",
    accessor: "dof",
  },
  {
    Header: "Hire Date",
    accessor: "date",
  },
  {
    Header: "Actions",
    Cell: ({ row }) => (
      <>
        <Link to={`/employee/edit/${row.original.id}`}>
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
