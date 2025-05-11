export const columns = [
  {
    Header: "#",
    accessor: (row, rowIndex) => rowIndex + 1,
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Employee ID",
    accessor: "employee.emId",
  },
  {
    Header: "Employee Name",
    accessor: "employee.name",
  },
  {
    Header: "Department",
    accessor: (row) =>
      row.employee.department && row.employee.department.name
        ? row.employee.department.name
        : "Unset",
  },
  {
    Header: "Shift",
    accessor: (row) =>
      row.employee.shift
        ? `${row.employee.shift.startTime12h} - ${row.employee.shift.endTime12h}`
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
    Header: "Time In",
    accessor: "timeIn",
    Cell: ({ value }) => {
      if (!value) return "-";
      return value;
    },
  },
  {
    Header: "Time Out",
    accessor: "timeOut",
    Cell: ({ value }) => {
      if (!value) return "-";
      return value;
    },
  },
  // {
  //   Header: "State In",
  //   accessor: "statusIn",
  // },
  // {
  //   Header: "State Out",
  //   accessor: "statusOut",
  // },
];
