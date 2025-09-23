import { BiSolidCommentEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useParams } from "react-router-dom";

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
      return (
        <>
          <button
            className="icon edit"
            title="Disabled to protect database"
            disabled
            style={{ cursor: "not-allowed", opacity: 0.5 }}
          >
            <BiSolidCommentEdit />
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
