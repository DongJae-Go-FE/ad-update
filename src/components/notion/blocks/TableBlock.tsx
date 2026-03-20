import { NotionBlock } from "@/types/notion";
import { RichText } from "../RichText";

interface TableBlockProps {
  block: NotionBlock;
}

export function TableBlock({ block }: TableBlockProps) {
  if (!block.children || !block.table) return null;

  const { has_column_header, has_row_header } = block.table;

  return (
    <div className="my-2 overflow-x-auto">
      <table className="w-full border-collapse border border-notion-border text-sm">
        <tbody>
          {block.children.map((row, rowIndex) => {
            if (!row.table_row) return null;
            const isHeader = has_column_header && rowIndex === 0;

            return (
              <tr key={row.id}>
                {row.table_row.cells.map((cell, cellIndex) => {
                  const isCellHeader = isHeader || (has_row_header && cellIndex === 0);
                  const Tag = isCellHeader ? "th" : "td";

                  return (
                    <Tag
                      key={cellIndex}
                      className={`border border-notion-border px-2.5 py-7 text-left align-top ${
                        isCellHeader ? "bg-gray-50 font-medium" : ""
                      }`}
                    >
                      <RichText richText={cell} />
                    </Tag>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
