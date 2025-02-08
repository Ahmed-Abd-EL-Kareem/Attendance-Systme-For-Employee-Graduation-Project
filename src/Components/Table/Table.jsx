import React, { useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { LuArrowDown, LuArrowUp, LuArrowUpDown } from "react-icons/lu";
const Table = ({ columns, data, search }) => {
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
  } = useTable(
    {
      columns,
      data: filteredData,
    },
    useSortBy,
    usePagination
  );
  return (
    <>
      <table
        data-aos="zoom-in"
        data-aos-duration="1500"
        className="table table-striped table-hover table-bordered text-center shadow p-3 mb-0 bg-body-tertiary"
        {...getTableProps()}
      >
        <thead className="table-dark">
          {headerGroups.map((headerGroup) => {
            const { key: headerKey, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps(); // Extract key for headerGroup
            return (
              <tr
                // data-aos="fade-right"
                // data-aos-duration="1500"
                // data-aos-delay="1000"
                key={headerKey}
                {...restHeaderGroupProps}
              >
                {headerGroup.headers.map((column) => {
                  const { key: columnKey, ...restColumnProps } =
                    column.getHeaderProps(column.getSortByToggleProps()); // Extract key for <th>
                  return (
                    <th key={columnKey} {...restColumnProps}>
                      {column.render("Header")}
                      {(column.isSorted &&
                        (column.isSortedDesc ? (
                          <LuArrowDown className="ms-3" />
                        ) : (
                          <LuArrowUp className="ms-3" />
                        ))) || <LuArrowUpDown className="ms-3" />}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps(); // Extract key for <tr>
            return (
              <tr
                // data-aos={
                //   key.split("_")[1] % 2 === 0 ? "fade-right" : "fade-left"
                // }
                // data-aos-duration="1500"
                key={key}
                {...restRowProps}
              >
                {row.cells.map((cell) => {
                  const { key: cellKey, ...restCellProps } =
                    cell.getCellProps(); // Extract key for <td>
                  return (
                    <td key={cellKey} {...restCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <div className="pagination d-flex align-items-center justify-content-around pt-3">
          <button
            className={!canPreviousPage ? "disabled" : "button"}
            disabled={!canPreviousPage}
            onClick={previousPage}
          >
            Previous
          </button>
          <span className="focus">
            {pageIndex + 1} of {pageCount}
          </span>
          <button
            className={!canNextPage ? "disabled" : "button"}
            disabled={!canNextPage}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
