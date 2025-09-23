import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useParams } from "react-router-dom";

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
    },
  },
];
