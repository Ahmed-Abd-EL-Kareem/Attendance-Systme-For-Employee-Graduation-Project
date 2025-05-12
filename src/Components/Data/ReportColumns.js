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
    accessor: "timeIn12h",
    Cell: ({ row, value }) => {
      if (!value || value === "N/A") return <div className="null">-</div>;

      const shiftStartTime = row.original.employee.shift?.startTime;
      const timeIn = row.original.timeIn;

      // تحويل الأوقات إلى دقائق للمقارنة
      const convertTimeToMinutes = (timeStr) => {
        if (!timeStr) return null;
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
      };
      const shiftStartMinutes = convertTimeToMinutes(shiftStartTime);
      const timeInMinutes = convertTimeToMinutes(timeIn);
      // إضافة 15 دقيقة لوقت بدء الوردية
      const shiftStartPlus15 = shiftStartMinutes
        ? shiftStartMinutes + 15
        : null;
      const isLate =
        shiftStartPlus15 && timeInMinutes && timeInMinutes > shiftStartPlus15;
      const formattedTimeIn = value.replace(
        /(Am|Pm)/gi,
        (match) => `<span>${match}</span>`
      );

      return (
        <div
          className={isLate ? "warm" : ""}
          dangerouslySetInnerHTML={{ __html: formattedTimeIn }}
        />
      );
    },
  },
  {
    Header: "Time Out",
    accessor: "timeOut12h",
    Cell: ({ row, value }) => {
      if (!value || value === "N/A") return <div className="null">-</div>;

      const shiftEndTime = row.original.employee.shift?.endTime;
      const timeOut = row.original.timeOut;

      // تحويل الأوقات إلى دقائق للمقارنة
      const convertTimeToMinutes = (timeStr) => {
        if (!timeStr) return null;
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
      };

      const shiftEndMinutes = convertTimeToMinutes(shiftEndTime);
      const timeOutMinutes = convertTimeToMinutes(timeOut);

      // إضافة 15 دقيقة لوقت نهاية الوردية
      const shiftEndPlus15 = shiftEndMinutes ? shiftEndMinutes - 15 : null;

      const isLate =
        shiftEndPlus15 && timeOutMinutes && timeOutMinutes < shiftEndPlus15;

      const formattedTimeOut = value.replace(
        /(Am|Pm)/gi,
        (match) => `<span>${match}</span>`
      );

      return (
        <div
          className={isLate ? "warm" : ""}
          dangerouslySetInnerHTML={{ __html: formattedTimeOut }}
        />
      );
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
