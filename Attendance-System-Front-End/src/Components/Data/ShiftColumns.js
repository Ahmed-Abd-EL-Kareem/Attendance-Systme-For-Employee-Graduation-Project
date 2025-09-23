import { LuTimerReset } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { useParams } from "react-router-dom";

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
      return (
        <>
          <button
            className="icon edit"
            title="Disabled to protect database"
            disabled
            style={{ cursor: "not-allowed", opacity: 0.5 }}
          >
            <LuTimerReset />
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
