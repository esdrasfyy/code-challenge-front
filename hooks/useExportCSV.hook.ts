import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

declare var document: Document;

export function useExportCSV<T>() {
  function exportCSV(data: T, filename = "export.csv") {
    if (!data) return;
    if (typeof document === "undefined") return;
    const headers = Object.keys(data);
    const values = Object.values(data).map((v) => {
      if (v instanceof Date) {
        return format(v, "HH:mm - dd/MM/yy", { locale: ptBR });
      }
      return v;
    });

    const csvContent = [headers, values].map((row) => row.map((v) => `"${v}"`).join(";")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return { exportCSV };
}
