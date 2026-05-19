import { Section, Text } from "react-email";
import { emailStyles as ts } from "../style/styles";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export interface PackageRow {
  packageId?: string;
  trackingNumber?: string;
  carrier?: string;
  dimensions?: string;
  qty?: string | number;
}

export interface PackageColumn {
  key: keyof PackageRow;
  label: string;
  width?: string;
  render?: (row: PackageRow) => React.ReactNode;
}

interface PackageTableProps {
  rows?: PackageRow[];
  title?: string;
  columns?: PackageColumn[];
}

// ─────────────────────────────────────────────────────────────
// Default Columns
// ─────────────────────────────────────────────────────────────

const DEFAULT_COLUMNS: PackageColumn[] = [
  {
    key: "packageId",
    label: "Package ID",
    width: "22%",
  },
  {
    key: "trackingNumber",
    label: "Tracking No.",
    width: "28%",
  },
  {
    key: "carrier",
    label: "Carrier",
    width: "18%",
  },
  {
    key: "dimensions",
    label: "Dimensions",
    width: "22%",
  },
  {
    key: "qty",
    label: "Qty",
    width: "10%",
  },
];

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export const PackageTable = ({
  rows = [],
  title = "Package Details",
  columns = DEFAULT_COLUMNS,
}: PackageTableProps) => {
  const displayRows: PackageRow[] =
    rows.length > 0
      ? rows
      : [
          {
            packageId: "—",
            trackingNumber: "—",
            carrier: "—",
            dimensions: "—",
            qty: "—",
          },
        ];

  const totalItems = displayRows.reduce((acc, r) => {
    const qty = Number(r.qty) || 0;
    return acc + qty;
  }, 0);

  return (
    <Section style={ts.wrapper}>
      {/* TITLE */}
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td style={ts.titleBar} valign="middle">
            <Text style={ts.titleText}>{title}</Text>
          </td>
        </tr>
      </table>

      {/* TABLE */}
      <table width="100%" cellPadding="0" cellSpacing="0">
        {/* HEAD */}
        <tr style={ts.headRow}>
          {columns.map((col) => (
            <td
              key={String(col.key)}
              style={{
                ...ts.headCell,
                width: col.width,
              }}
            >
              {col.label}
            </td>
          ))}
        </tr>

        {/* ROWS */}
        {displayRows.map((row, i) => {
          const rowStyle = i % 2 === 1 ? ts.dataRowAlt : ts.dataRow;

          return (
            <tr key={i} style={rowStyle}>
              {columns.map((col) => {
                const value = col.render ? col.render(row) : row[col.key];

                const isEmpty = value === undefined || value === null || value === "" || value === "—";

                return (
                  <td key={String(col.key)} style={isEmpty ? ts.emptyCell : ts.dataCell}>
                    {isEmpty ? "—" : value}
                  </td>
                );
              })}
            </tr>
          );
        })}

        {/* FOOTER */}
        {totalItems > 0 && (
          <tr style={ts.footerRow}>
            <td colSpan={columns.length} style={ts.footerCell}>
              {displayRows.length} package
              {displayRows.length > 1 ? "s" : ""}
            </td>
          </tr>
        )}
      </table>
    </Section>
  );
};
