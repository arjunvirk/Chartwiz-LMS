import { useEffect } from "react";

// Copies each table's column headings onto its cells as data-label, so that
// on small screens CSS can stack rows into readable cards (see alphira-tokens.css).
export function useTableLabels(dependency) {
  useEffect(() => {
    const label = () => {
      document.querySelectorAll(".ac-app table").forEach((table) => {
        const headings = [...table.querySelectorAll("thead th")].map((th) => th.textContent.trim());
        if (!headings.length) return;
        table.classList.add("ac-stackable");
        table.querySelectorAll("tbody tr").forEach((row) => {
          [...row.children].forEach((cell, index) => {
            const text = headings[index] || "";
            if (cell.getAttribute("data-label") !== text) cell.setAttribute("data-label", text);
          });
        });
      });
    };
    label();
    let frame = 0;
    const observer = new MutationObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(label); });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [dependency]);
}
