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
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Shift",
    accessor: "shift",
  },
  { Header: "Notes", accessor: "notes" },
  {
    Header: "Time In",
    accessor: "timeIn",
  },
  {
    Header: "Time Out",
    accessor: "timeOut",
  },
  {
    Header: "State In",
    accessor: "stateIn",
  },
  {
    Header: "State Out",
    accessor: "stateOut",
  },
];
