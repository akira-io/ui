'use client';

"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./chunk-KJRTDCLJ.js";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "./chunk-QJ36FL2X.js";
import {
  Badge,
  EmptyState
} from "./chunk-SSMR2HNC.js";
import "./chunk-IGBMA6PI.js";
import {
  useUiLabels
} from "./chunk-DVCOHMNY.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./chunk-QEUP7ONY.js";
import "./chunk-EXTOGROG.js";
import {
  Input
} from "./chunk-NE2SL5YQ.js";
import {
  Button
} from "./chunk-4MAAVDUX.js";
import {
  elevatedSurface,
  flatSurface
} from "./chunk-TA3IKSIJ.js";
import {
  cn
} from "./chunk-XN5WW7OR.js";

// src/components/ui/data-table-faceted-filter.tsx
import { Check, PlusCircle } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var dataTableFacetedFilterDefaultLabels = {
  noOptionsLabel: "No options."
};
function FilterPopover({
  label,
  options,
  selected,
  onToggle,
  width,
  noOptionsLabel,
  slotName = "data-table-faceted-filter"
}) {
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        className: "h-11 gap-3 has-[>svg]:px-3 rounded-2xl border-dashed border-border",
        slotName,
        children: [
          /* @__PURE__ */ jsx(PlusCircle, { className: "size-4" }),
          label,
          selected.size > 0 && /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "secondary",
              className: "ml-2 px-2 rounded-full tabular-nums",
              children: selected.size
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: cn("p-0", width), align: "start", children: /* @__PURE__ */ jsx(Command, { children: /* @__PURE__ */ jsxs(CommandList, { children: [
      /* @__PURE__ */ jsx(CommandEmpty, { children: noOptionsLabel }),
      /* @__PURE__ */ jsx(CommandGroup, { children: options.map((option) => /* @__PURE__ */ jsxs(
        CommandItem,
        {
          value: option.label,
          onSelect: () => onToggle(option.value),
          className: "h-10 rounded-xl",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "mr-2 size-4 flex items-center justify-center rounded-md border border-border",
                  selected.has(option.value) ? "bg-primary text-primary-foreground" : "opacity-50"
                ),
                children: selected.has(option.value) && /* @__PURE__ */ jsx(Check, { className: "size-3" })
              }
            ),
            option.label
          ]
        },
        option.value
      )) })
    ] }) }) })
  ] });
}
function FacetedFilter({
  column,
  filter,
  noOptionsLabel
}) {
  const labels = useUiLabels(
    "dataTableFacetedFilter",
    dataTableFacetedFilterDefaultLabels,
    { noOptionsLabel }
  );
  const selected = new Set(column?.getFilterValue() ?? []);
  const toggle = (value) => {
    const next = new Set(selected);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    const arr = Array.from(next);
    column?.setFilterValue(arr.length ? arr : void 0);
  };
  return /* @__PURE__ */ jsx(
    FilterPopover,
    {
      label: filter.label,
      options: filter.options,
      selected,
      onToggle: toggle,
      width: "w-[220px]",
      noOptionsLabel: labels.noOptionsLabel
    }
  );
}
function ServerFacetedFilter({
  filter,
  selected,
  onChange,
  noOptionsLabel
}) {
  const labels = useUiLabels(
    "dataTableFacetedFilter",
    dataTableFacetedFilterDefaultLabels,
    { noOptionsLabel }
  );
  const selectedSet = new Set(selected);
  const toggle = (value) => {
    const next = new Set(selectedSet);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    onChange(Array.from(next));
  };
  return /* @__PURE__ */ jsx(
    FilterPopover,
    {
      label: filter.label,
      options: filter.options,
      selected: selectedSet,
      onToggle: toggle,
      width: "w-[240px]",
      noOptionsLabel: labels.noOptionsLabel
    }
  );
}

// src/components/ui/data-table-row-actions.tsx
import { MoreVertical } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function RowActionsMenu({
  row,
  actions,
  slotName = "data-table-row-actions"
}) {
  const visible = actions.filter((action) => !action.hidden?.(row));
  if (visible.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: "flex justify-end",
      onClick: (event) => event.stopPropagation(),
      "data-slot": slotName,
      children: /* @__PURE__ */ jsxs2(DropdownMenu, { children: [
        /* @__PURE__ */ jsx2(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx2(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "size-8 rounded-xl text-muted-foreground hover:text-foreground",
            children: /* @__PURE__ */ jsx2(MoreVertical, { className: "size-4" })
          }
        ) }),
        /* @__PURE__ */ jsx2(DropdownMenuContent, { align: "end", className: "rounded-2xl", children: visible.map((action) => /* @__PURE__ */ jsxs2(
          DropdownMenuItem,
          {
            onClick: () => action.onClick(row),
            className: action.variant === "destructive" ? "rounded-xl text-destructive focus:text-destructive" : "rounded-xl",
            children: [
              action.icon && /* @__PURE__ */ jsx2(action.icon, { className: "size-4" }),
              action.label
            ]
          },
          action.label
        )) })
      ] })
    }
  );
}

// src/components/ui/data-table.tsx
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function pageRange(current, last) {
  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1);
  }
  const pages = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(last - 1, current + 1);
  if (left > 2) pages.push("ellipsis");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < last - 1) pages.push("ellipsis");
  pages.push(last);
  return pages;
}
var dataTableDefaultLabels = {
  searchPlaceholder: "Search...",
  emptyLabel: "No results.",
  createLabel: "New",
  clearFiltersLabel: "Clear filters",
  paginationLabel: (page, pages) => `Page ${page} of ${pages}`,
  noOptionsLabel: "No options.",
  totalLabel: (total) => `${total.toLocaleString("en-US")} records`
};
function DataTable({
  columns,
  data,
  searchKey,
  searchPlaceholder,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  filters,
  serverFilters,
  filterValues,
  onFilterChange,
  canClearFilters,
  onClearFilters,
  toolbarExtra,
  toolbarAction,
  emptyLabel,
  clearFiltersLabel,
  paginationLabel,
  noOptionsLabel,
  totalLabel,
  renderRow,
  onRowClick,
  isRowActive,
  rowActions,
  searchValue,
  onSearchChange,
  manualPagination = false,
  pageCount,
  pageIndex = 0,
  total,
  onPageChange,
  onCreate,
  createLabel,
  flat = false,
  slotName = "data-table"
}) {
  const labels = useUiLabels("dataTable", dataTableDefaultLabels, {
    searchPlaceholder,
    emptyLabel,
    createLabel,
    clearFiltersLabel,
    paginationLabel,
    noOptionsLabel,
    totalLabel
  });
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const serverSearch = onSearchChange !== void 0;
  const tableColumns = useMemo(() => {
    if (!rowActions || rowActions.length === 0) {
      return columns;
    }
    return [
      ...columns,
      {
        id: "__actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => /* @__PURE__ */ jsx3(RowActionsMenu, { row: row.original, actions: rowActions })
      }
    ];
  }, [columns, rowActions]);
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      ...serverSearch ? {} : { globalFilter }
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: serverSearch ? void 0 : setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...manualPagination ? { manualPagination: true, pageCount: pageCount ?? -1 } : { getPaginationRowModel: getPaginationRowModel() },
    initialState: { pagination: { pageSize } }
  });
  const hasServerSelection = serverFilters?.some(
    (filter) => (filterValues?.[filter.paramKey]?.length ?? 0) > 0
  ) ?? false;
  const hasToolbar = searchKey !== void 0 || filters && filters.length > 0 || serverFilters && serverFilters.length > 0 || onCreate !== void 0 || toolbarExtra !== void 0 || toolbarAction !== void 0;
  const showFooter = manualPagination || table.getPageCount() > 1;
  const currentPage = manualPagination ? pageIndex + 1 : table.getState().pagination.pageIndex + 1;
  const lastPage = manualPagination ? Math.max(1, pageCount ?? 1) : table.getPageCount();
  const canPrev = manualPagination ? pageIndex > 0 : table.getCanPreviousPage();
  const canNext = manualPagination ? pageIndex + 1 < (pageCount ?? 1) : table.getCanNextPage();
  const prev = () => manualPagination ? onPageChange?.(pageIndex - 1) : table.previousPage();
  const next = () => manualPagination ? onPageChange?.(pageIndex + 1) : table.nextPage();
  const goTo = (page) => manualPagination ? onPageChange?.(page - 1) : table.setPageIndex(page - 1);
  const activePageSize = manualPagination ? pageSize : table.getState().pagination.pageSize;
  const changePageSize = (size) => onPageSizeChange ? onPageSizeChange(size) : table.setPageSize(size);
  const sizeChoices = [.../* @__PURE__ */ new Set([...pageSizeOptions, activePageSize])].sort(
    (a, b) => a - b
  );
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      "data-flat": flat || void 0,
      className: cn(
        elevatedSurface,
        "space-y-4 p-5 bg-card",
        flat && flatSurface
      ),
      "data-slot": slotName,
      children: [
        hasToolbar && /* @__PURE__ */ jsxs3("div", { className: "gap-2 flex flex-wrap items-center", children: [
          searchKey !== void 0 && /* @__PURE__ */ jsxs3("div", { className: "relative min-w-[200px] flex-1", children: [
            /* @__PURE__ */ jsx3(Search, { className: "left-4 size-4 pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx3(
              Input,
              {
                value: serverSearch ? searchValue ?? "" : globalFilter,
                onChange: (e) => serverSearch ? onSearchChange?.(e.target.value) : setGlobalFilter(e.target.value),
                placeholder: labels.searchPlaceholder,
                className: `h-11 rounded-2xl pl-11 font-medium border-none bg-muted/50 focus:bg-muted`
              }
            )
          ] }),
          filters?.map((filter) => /* @__PURE__ */ jsx3(
            FacetedFilter,
            {
              column: table.getColumn(filter.columnId),
              filter,
              noOptionsLabel: labels.noOptionsLabel
            },
            filter.columnId
          )),
          serverFilters?.map((filter) => /* @__PURE__ */ jsx3(
            ServerFacetedFilter,
            {
              filter,
              selected: filterValues?.[filter.paramKey] ?? [],
              onChange: (values) => onFilterChange?.(filter.paramKey, values),
              noOptionsLabel: labels.noOptionsLabel
            },
            filter.paramKey
          )),
          toolbarExtra,
          (columnFilters.length > 0 || hasServerSelection || canClearFilters && onClearFilters) && /* @__PURE__ */ jsxs3(
            Button,
            {
              variant: "ghost",
              onClick: () => {
                if (columnFilters.length > 0) {
                  table.resetColumnFilters();
                }
                if (hasServerSelection || canClearFilters) {
                  onClearFilters?.();
                }
              },
              className: "h-11 rounded-2xl",
              children: [
                labels.clearFiltersLabel,
                /* @__PURE__ */ jsx3(X, { className: "ml-1 size-4" })
              ]
            }
          ),
          onCreate && /* @__PURE__ */ jsx3(
            Button,
            {
              onClick: onCreate,
              "aria-label": labels.createLabel,
              size: "icon",
              className: "size-11 rounded-2xl shrink-0 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90",
              children: /* @__PURE__ */ jsx3(Plus, { className: "size-5" })
            }
          ),
          toolbarAction && /* @__PURE__ */ jsx3("div", { className: "ml-auto", children: toolbarAction })
        ] }),
        /* @__PURE__ */ jsxs3(Table, { children: [
          /* @__PURE__ */ jsx3(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx3(
            TableRow,
            {
              className: "hover:bg-transparent",
              children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx3(
                TableHead,
                {
                  className: "h-11 px-4 font-medium tracking-wider text-[11px] text-muted-foreground uppercase",
                  children: header.isPlaceholder ? null : header.column.getCanSort() ? /* @__PURE__ */ jsxs3(
                    "button",
                    {
                      type: "button",
                      onClick: header.column.getToggleSortingHandler(),
                      className: "gap-1 inline-flex items-center transition-colors hover:text-foreground",
                      children: [
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ),
                        /* @__PURE__ */ jsx3(ArrowUpDown, { className: "size-3 opacity-50" })
                      ]
                    }
                  ) : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )
                },
                header.id
              ))
            },
            headerGroup.id
          )) }),
          /* @__PURE__ */ jsx3(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map(
            (row) => renderRow ? renderRow(row) : /* @__PURE__ */ jsx3(
              TableRow,
              {
                onClick: onRowClick ? () => onRowClick(row.original) : void 0,
                "data-active": isRowActive?.(row.original) || void 0,
                className: cn(
                  "border-border transition-colors hover:bg-muted/50",
                  onRowClick && "cursor-pointer",
                  "data-[active=true]:bg-primary/5"
                ),
                children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx3(
                  TableCell,
                  {
                    className: "px-4 py-3",
                    children: flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )
                  },
                  cell.id
                ))
              },
              row.id
            )
          ) : /* @__PURE__ */ jsx3(TableRow, { children: /* @__PURE__ */ jsx3(
            TableCell,
            {
              colSpan: tableColumns.length,
              className: "h-24 p-0",
              children: /* @__PURE__ */ jsx3(EmptyState, { compact: true, title: labels.emptyLabel })
            }
          ) }) })
        ] }),
        showFooter && /* @__PURE__ */ jsxs3("div", { className: "gap-3 pt-4 flex flex-wrap items-center justify-between border-t border-border", children: [
          /* @__PURE__ */ jsxs3("div", { className: "gap-3 flex items-center", children: [
            /* @__PURE__ */ jsxs3(
              Select,
              {
                value: String(activePageSize),
                onValueChange: (value) => changePageSize(Number(value)),
                children: [
                  /* @__PURE__ */ jsx3(SelectTrigger, { className: "h-9 rounded-xl w-[74px]", children: /* @__PURE__ */ jsx3("span", { children: activePageSize }) }),
                  /* @__PURE__ */ jsx3(SelectContent, { className: "rounded-xl", children: sizeChoices.map((size) => /* @__PURE__ */ jsx3(
                    SelectItem,
                    {
                      value: String(size),
                      className: "font-medium",
                      children: size
                    },
                    size
                  )) })
                ]
              }
            ),
            /* @__PURE__ */ jsxs3("span", { className: "text-xs font-medium text-muted-foreground", children: [
              labels.paginationLabel(currentPage, lastPage),
              total !== void 0 && ` \xB7 ${labels.totalLabel(total)}`
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "gap-1.5 flex items-center", children: [
            /* @__PURE__ */ jsx3(
              Button,
              {
                variant: "outline",
                size: "icon",
                className: "size-9 rounded-xl",
                onClick: prev,
                disabled: !canPrev,
                children: /* @__PURE__ */ jsx3(ChevronLeft, { className: "size-4" })
              }
            ),
            pageRange(currentPage, lastPage).map(
              (page, index) => page === "ellipsis" ? /* @__PURE__ */ jsx3(
                "span",
                {
                  className: "px-1 text-sm font-medium text-muted-foreground",
                  children: "\u2026"
                },
                `ellipsis-${index}`
              ) : /* @__PURE__ */ jsx3(
                Button,
                {
                  variant: "outline",
                  onClick: () => goTo(page),
                  className: cn(
                    "h-9 min-w-9 rounded-xl px-2.5 tabular-nums",
                    page === currentPage && "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                  ),
                  children: page
                },
                page
              )
            ),
            /* @__PURE__ */ jsx3(
              Button,
              {
                variant: "outline",
                size: "icon",
                className: "size-9 rounded-xl",
                onClick: next,
                disabled: !canNext,
                children: /* @__PURE__ */ jsx3(ChevronRight, { className: "size-4" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  DataTable,
  FacetedFilter,
  RowActionsMenu,
  ServerFacetedFilter,
  dataTableDefaultLabels,
  dataTableFacetedFilterDefaultLabels
};
//# sourceMappingURL=data-table.js.map