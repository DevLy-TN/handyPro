import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Edit } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Switch, Dropdown, Tooltip } from "antd";
import { rankItem } from "@tanstack/match-sorter-utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Column Filter
const Filter = ({ column }) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <>
      <DebouncedInput
        type="text"
        value={columnFilterValue ?? ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder="Search..."
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
};

// Global Filter
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const TableContainer = ({
  type,
  columns,
  data,
  tableclassName,
  theadclassName,
  divclassName,
  trclassName,
  thclassName,
  tdclassName,
  tbodyclassName,
  isTfoot,
  isSelect,
  isPagination,
  customPageSize,
  isGlobalFilter,
  PaginationClassName,
  SearchPlaceholder,
  setCount,
}) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
  };

  const table = useReactTable({
    columns,
    data,
    filterFns: { fuzzy: fuzzyFilter },
    state: { columnFilters, globalFilter },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const [counter,setCounter]=useState(0)
  const {
    getHeaderGroups,
    getFooterGroups,
    getRowModel,
    getPageOptions,
    setPageIndex,
    setPageSize,
    getState,
    getCanPreviousPage,
    getCanNextPage,
    nextPage,
    previousPage,
  } = table;
  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/users/delete/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSwitchChange=(id, checked) =>{
    // Handle switch change logic here
    console.log(`User ID: ${id}, Switch Value: ${checked}`);
  }
  useEffect(() => {
    if (Number(customPageSize)) setPageSize(Number(customPageSize));
  }, [customPageSize, setPageSize,counter]);

  return (
    <Fragment>
      <div className="grid grid-cols-12 lg:grid-cols-12 gap-3">
        {isSelect && (
          <div className="self-center col-span-12 lg:col-span-6">
            <label>
              Show
              <select
                name="basic_tables_length"
                aria-controls="basic_tables"
                className="px-3 py-2 form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 inline-block w-auto"
                onClick={(event) => setPageSize(event.target.value)}
              >
                {type !== "clients" && <option value="10">10</option>}
                {type !== "clients" && <option value="25">25</option>}
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </label>
          </div>
        )}
        <div className="self-center col-span-12 lg:col-span-6 lg:place-self-end">
          {isGlobalFilter && (
            <label>
              Search:
              <DebouncedInput
                value={globalFilter ?? ""}
                onChange={(value) => setGlobalFilter(String(value))}
                className="py-2 pr-4 text-sm text-topbar-item bg-topbar border border-topbar-border rounded pl-2 placeholder:text-slate-400 form-control focus-visible:outline-0 min-w-[200px] focus:border-blue-400 group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:border-topbar-border-dark group-data-[topbar=dark]:placeholder:text-slate-500 group-data-[topbar=dark]:text-topbar-item-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:border-topbar-border-brand group-data-[topbar=brand]:placeholder:text-blue-300 group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=dark]:dark:border-zink-500 group-data-[topbar=dark]:dark:text-zink-100"
                placeholder={SearchPlaceholder}
              />
            </label>
          )}
        </div>
      </div>
      <div className={divclassName}>
        <table className={tableclassName}>
          <thead className={theadclassName}>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={trclassName}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`${header.column.getCanSort()} ${thclassName}`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <React.Fragment>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{ asc: " ", desc: " " }[header.column.getIsSorted()]}
                        {header.column.getCanFilter() && (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        )}
                      </React.Fragment>
                    )}
                  </th>
                ))}
                <th className={thclassName}>Actions</th>
              </tr>
            ))}
          </thead>
          <tbody className={tbodyclassName}>
            {getRowModel().rows.map((row) => (
              <tr key={row.id} className={trclassName}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <>
                      {
                        // (cell.column.id === "isBanned" ? (
                        //   <td>
                        //     <Tooltip
                        //       title={
                        //         flexRender(
                        //           cell.column.columnDef.cell,
                        //           cell.getContext()
                        //         ).props.getValue()
                        //           ? "Unbann user"
                        //           : "Bann user"
                        //       }
                        //     >
                        //       <Switch
                        //         id={cell.id}
                        //         checked={flexRender(
                        //           cell.column.columnDef.cell,
                        //           cell.getContext()
                        //         ).props.getValue()}
                        //         // onChange={()=>handleSwitchChange(cell.id,!flexRender(
                        //         //   cell.column.columnDef.cell,
                        //         //   cell.getContext()
                        //         // ).props.getValue())}
                        //         onChange={(checked) =>{
                        //           flexRender(cell.column.columnDef.cell,cell.getContext()).props.row.original.isBanned=checked
                        //           setCounter(prev=>prev+1)
                        //           console.log(flexRender(cell.column.columnDef.cell,cell.getContext()).props.row.original.isBanned);
                                  
                        //         }}
                        //           // handleSwitchChange(
                        //           //   cell.row.original.id,
                        //           //   checked
                        //           // )
                        //         // }
                        //       />
                        //     </Tooltip>
                        //   </td>
                        // ) :
                         cell.column.id === "profileImage" ? (
                          <td
                            key={cell.id}
                            className={`${tdclassName} text-center`}
                            title={flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            ).props.getValue()}
                          >
                            <img
                              width={50}
                              className="rounded-full"
                              src={flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              ).props.getValue()}
                              alt="profile image"
                            />
                          </td>
                        ) : (
                          <td
                            key={cell.id}
                            className={tdclassName}
                            title={flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            ).props.getValue()}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        )
                      }
                    </>
                  );
                })}
                <td
                  className={`flex justify-center items-center ${trclassName}`}
                >
                  {type === "users" && (
                    <button
                      onClick={() => {
                        handleDeleteUser(row.original._id);
                        setCount((count) => count + 1);
                      }}
                    >
                      <Trash2 className=" h-5 w-5  text-red-500" />
                    </button>
                  )}
                  {type === "cables" && (
                    <div className="flex justify-between items-center gap-4">
                      <button>
                        <Trash2 className=" h-5 w-5 text-red-500" />
                      </button>
                      <button>
                        <Edit className=" h-5 w-5 text-blue-500" />
                      </button>
                    </div>
                  )}
                  {type === "clients" && (
                    <div className="flex justify-between items-center gap-4">
                      <button>
                        <Trash2 className=" h-5 w-5 text-red-500" />
                      </button>
                      <button>
                        <Edit className=" h-5 w-5 text-blue-500" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          {isTfoot && (
            <tfoot>
              {getFooterGroups().map((footer, tfKey) => (
                <tr key={tfKey}>
                  {footer.headers.map((tf, key) => (
                    <th
                      key={key}
                      className="p-3 text-left group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500"
                    >
                      {flexRender(tf.column.columnDef.header, tf.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
      </div>
      {isPagination && (
        <div className={PaginationClassName}>
          <div className="mb-4 grow md:mb-0">
            <div className="text-slate-500 dark:text-zink-200">
              Showing
              <b> {getState().pagination.pageSize}</b> of
              <b> {data.length}</b> Results
            </div>
          </div>
          <ul className="flex flex-wrap items-center gap-2 shrink-0">
            <li>
              <Link
                to="#!"
                className={`inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto ${
                  !getCanPreviousPage() && "disabled"
                }`}
                onClick={previousPage}
              >
                <ChevronLeft className="size-4 mr-1 rtl:rotate-180"></ChevronLeft>{" "}
                Prev
              </Link>
            </li>
            {getPageOptions().map((item, key) => (
              <React.Fragment key={key}>
                <li>
                  <Link
                    to="#"
                    className={`inline-flex items-center justify-center bg-white dark:bg-zink-700 size-8 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-100 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-white dark:[&.active]:text-white [&.active]:bg-custom-500 dark:[&.active]:bg-custom-500 [&.active]:border-custom-500 dark:[&.active]:border-custom-500 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto ${
                      getState().pagination.pageIndex === item && "active"
                    }`}
                    onClick={() => setPageIndex(item)}
                  >
                    {item + 1}
                  </Link>
                </li>
              </React.Fragment>
            ))}
            <li>
              <Link
                to="#!"
                className={`inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto ${
                  !getCanNextPage() && ""
                }`}
                onClick={() => getCanNextPage() && nextPage()}
              >
                Next{" "}
                <ChevronRight className="size-4 ml-1 rtl:rotate-180"></ChevronRight>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default TableContainer;
