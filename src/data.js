const { Building, ArrowRightLeft } = require("lucide-react");
const { FaUsers } = require("react-icons/fa");
const { FaClipboardUser } = require("react-icons/fa6");

export const adminDashBoard = [
  {
    icon: <Building />,
    text: "Department",
    count: 6,
  },
  {
    icon: <ArrowRightLeft />,
    text: "Shift",
    count: 10,
  },
  {
    icon: <FaClipboardUser />,
    text: "Employee",
    count: 23,
  },
  {
    icon: <FaUsers />,
    text: "Users",
    count: 29,
  },
];

export const emTable = [
  {
    depart: "IT",
    numEmployees: 3,
  },
  {
    depart: "HR",
    numEmployees: 6,
  },
  {
    depart: "AI",
    numEmployees: 8,
  },
  {
    depart: "FR",
    numEmployees: 2,
  },
  {
    depart: "CS",
    numEmployees: 7,
  },
  {
    depart: "ACD",
    numEmployees: 4,
  },
];

export const shTable = [
  {
    shift: "Shift 1",
    time: "(8:00 AM - 3:00 PM)",
    numEmployees: 7,
  },
  {
    shift: "Shift 2",
    time: "(9:30 AM - 3:45 PM)",
    numEmployees: 13,
  },
  {
    shift: "Shift 3",
    time: "(1:00 PM - 8:30 PM)",
    numEmployees: 8,
  },
];
