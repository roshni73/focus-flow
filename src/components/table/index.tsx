import * as React from "react";

type TableProps = React.ComponentProps<"table">

function Table({ className, ...props }: TableProps) {
  const tableClass = `w-full caption-bottom text-sm ${className || ""}`.trim();

  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={tableClass}
        {...props}
      />
    </div>
  );
}

type TableHeaderProps = React.ComponentProps<"thead">

function TableHeader({ className, ...props }: TableHeaderProps) {
  const headerClass = `[&_tr]:border-b ${className || ""}`.trim();

  return (
    <thead
      data-slot="table-header"
      className={headerClass}
      {...props}
    />
  );
}

type TableBodyProps = React.ComponentProps<"tbody">

function TableBody({ className, ...props }: TableBodyProps) {
  const bodyClass = `[&_tr:last-child]:border-0 ${className || ""}`.trim();

  return (
    <tbody
      data-slot="table-body"
      className={bodyClass}
      {...props}
    />
  );
}

type TableFooterProps = React.ComponentProps<"tfoot">

function TableFooter({ className, ...props }: TableFooterProps) {
  const footerClass = `bg-muted/50 border-t font-medium [&>tr]:last:border-b-0 ${className || ""}`.trim();

  return (
    <tfoot
      data-slot="table-footer"
      className={footerClass}
      {...props}
    />
  );
}

type TableRowProps = React.ComponentProps<"tr">

function TableRow({ className, ...props }: TableRowProps) {
  const rowClass = `hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors ${className || ""}`.trim();

  return (
    <tr
      data-slot="table-row"
      className={rowClass}
      {...props}
    />
  );
}

type TableHeadProps = React.ComponentProps<"th">

function TableHead({ className, ...props }: TableHeadProps) {
  const headClass = `text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ${className || ""}`.trim();

  return (
    <th
      data-slot="table-head"
      className={headClass}
      {...props}
    />
  );
}

type TableCellProps = React.ComponentProps<"td">

function TableCell({ className, ...props }: TableCellProps) {
  const cellClass = `p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ${className || ""}`.trim();

  return (
    <td
      data-slot="table-cell"
      className={cellClass}
      {...props}
    />
  );
}

type TableCaptionProps = React.ComponentProps<"caption">

function TableCaption({ className, ...props }: TableCaptionProps) {
  const captionClass = `text-muted-foreground mt-4 text-sm ${className || ""}`.trim();

  return (
    <caption
      data-slot="table-caption"
      className={captionClass}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};