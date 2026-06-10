import PDFDocument from "pdfkit";

const generateInvoicePDF = (payment) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 0,
        info: {
          Title: `Invoice ${payment.invoiceNumber}`,
          Author: "ChartWiz Academy",
          Subject: "Course Enrollment Invoice",
        },
      });

      const buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      const W = doc.page.width;   // 595
      const H = doc.page.height;  // 842
      const MARGIN = 50;
      const GREEN = "#10B981";
      const DARK = "#0F172A";
      const MID = "#374151";
      const LIGHT = "#6B7280";
      const BORDER = "#E2E8F0";
      const BG_LIGHT = "#F8FAFC";

      // ─────────────────────────────────────────────
      // HEADER BAND
      // ─────────────────────────────────────────────
      doc.rect(0, 0, W, 110).fill(DARK);

      // Vertical green accent bar
      doc.rect(0, 0, 6, 110).fill(GREEN);

      // Brand name
      doc
        .fillColor("#FFFFFF")
        .fontSize(22)
        .font("Helvetica-Bold")
        .text("CHARTWIZ ACADEMY", MARGIN + 10, 28);

      // Tagline
      doc
        .fillColor(GREEN)
        .fontSize(9)
        .font("Helvetica")
        .text("Professional Trading Education Platform  •  www.chartwizacademy.com", MARGIN + 10, 56);

      // INVOICE label (right side)
      doc
        .fillColor("#FFFFFF")
        .fontSize(28)
        .font("Helvetica-Bold")
        .text("INVOICE", W - 170, 25, { width: 130, align: "right" });

      // Invoice number (right side, smaller)
      doc
        .fillColor(GREEN)
        .fontSize(10)
        .font("Helvetica")
        .text(`# ${payment.invoiceNumber}`, W - 170, 62, { width: 130, align: "right" });

      // ─────────────────────────────────────────────
      // PAID BADGE
      // ─────────────────────────────────────────────
      doc.roundedRect(W - 125, 74, 75, 24, 12).fill(GREEN);
      doc
        .fillColor("#FFFFFF")
        .fontSize(9)
        .font("Helvetica-Bold")
        .text("✓  PAID", W - 113, 82, { width: 55, align: "center" });

      // ─────────────────────────────────────────────
      // META ROW (date + status strip under header)
      // ─────────────────────────────────────────────
      doc.rect(0, 110, W, 32).fill("#1E293B");
      doc
        .fillColor("#94A3B8")
        .fontSize(9)
        .font("Helvetica")
        .text(
          `Issue Date: ${new Date(payment.paidAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}`,
          MARGIN + 10, 120
        )
        .text(`Payment Status: ${payment.paymentStatus?.toUpperCase()}`, 260, 120)
        .text(`Method: ${payment.paymentMethod || "N/A"}`, 430, 120);

      // ─────────────────────────────────────────────
      // BILL TO / INVOICE DETAILS  (two-column cards)
      // ─────────────────────────────────────────────
      const cardY = 160;
      const cardH = 115;

      // Left card — Bill To
      doc.roundedRect(MARGIN, cardY, 235, cardH, 6).fill(BG_LIGHT);
      doc.roundedRect(MARGIN, cardY, 235, cardH, 6).stroke(BORDER);

      doc
        .fillColor(GREEN)
        .fontSize(8)
        .font("Helvetica-Bold")
        .text("BILLED TO", MARGIN + 16, cardY + 14);

      doc.moveTo(MARGIN + 16, cardY + 26).lineTo(MARGIN + 80, cardY + 26).stroke(GREEN);

      doc
        .fillColor(DARK)
        .fontSize(13)
        .font("Helvetica-Bold")
        .text(payment.studentName, MARGIN + 16, cardY + 33);

      doc
        .fillColor(MID)
        .fontSize(9.5)
        .font("Helvetica")
        .text(payment.email, MARGIN + 16, cardY + 54)
        .text(`Student ID: ${payment.studentId}`, MARGIN + 16, cardY + 72);

      // Right card — Invoice Details
      const rightX = MARGIN + 260;
      doc.roundedRect(rightX, cardY, 235, cardH, 6).fill(BG_LIGHT);
      doc.roundedRect(rightX, cardY, 235, cardH, 6).stroke(BORDER);

      doc
        .fillColor(GREEN)
        .fontSize(8)
        .font("Helvetica-Bold")
        .text("INVOICE DETAILS", rightX + 16, cardY + 14);

      doc.moveTo(rightX + 16, cardY + 26).lineTo(rightX + 100, cardY + 26).stroke(GREEN);

      const detailRows = [
        ["Invoice No.", payment.invoiceNumber],
        ["Issue Date", new Date(payment.paidAt).toLocaleDateString("en-IN")],
        ["Payment Status", payment.paymentStatus],
      ];

      detailRows.forEach(([label, val], i) => {
        const rowY = cardY + 33 + i * 19;
        doc.fillColor(LIGHT).fontSize(9).font("Helvetica").text(label, rightX + 16, rowY);
        doc.fillColor(DARK).fontSize(9).font("Helvetica-Bold").text(val, rightX + 110, rowY);
      });

      // ─────────────────────────────────────────────
      // LINE ITEMS TABLE
      // ─────────────────────────────────────────────
      const tY = cardY + cardH + 28;

      // Table header
      doc.rect(MARGIN, tY, W - MARGIN * 2, 30).fill(DARK);

      const cols = {
        desc:   { x: MARGIN + 14,  w: 200, label: "DESCRIPTION" },
        method: { x: MARGIN + 220, w: 100, label: "PAYMENT METHOD" },
        ref:    { x: MARGIN + 330, w: 110, label: "REFERENCE NO." },
        amount: { x: MARGIN + 445, w:  55, label: "AMOUNT" },
      };

      Object.values(cols).forEach(({ x, label, w }) => {
        doc
          .fillColor("#CBD5E1")
          .fontSize(8)
          .font("Helvetica-Bold")
          .text(label, x, tY + 11, { width: w });
      });

      // Single data row
      const rowY = tY + 30;
      doc.rect(MARGIN, rowY, W - MARGIN * 2, 46).fill("#FFFFFF");
      doc.rect(MARGIN, rowY, W - MARGIN * 2, 46).stroke(BORDER);

      // Subtle row zebra line
      doc.rect(MARGIN, rowY, 4, 46).fill(GREEN);

      doc
        .fillColor(DARK)
        .fontSize(10.5)
        .font("Helvetica-Bold")
        .text("Course Enrollment", cols.desc.x, rowY + 10);
      doc
        .fillColor(LIGHT)
        .fontSize(8.5)
        .font("Helvetica")
        .text("ChartWiz Academy Trading Program", cols.desc.x, rowY + 27);

      doc
        .fillColor(MID)
        .fontSize(10)
        .font("Helvetica")
        .text(payment.paymentMethod || "N/A", cols.method.x, rowY + 16, { width: cols.method.w });

      doc
        .fillColor(MID)
        .fontSize(10)
        .font("Helvetica")
        .text(payment.referenceNumber || "N/A", cols.ref.x, rowY + 16, { width: cols.ref.w });

      doc
        .fillColor(DARK)
        .fontSize(10.5)
        .font("Helvetica-Bold")
        .text(
          `Rs${Number(payment.amount).toLocaleString("en-IN")}`,
          cols.amount.x, rowY + 16,
          { width: cols.amount.w }
        );

      // ─────────────────────────────────────────────
      // TOTALS BLOCK
      // ─────────────────────────────────────────────
      const totY = rowY + 46 + 12;

      // Remarks (left side)
      doc
        .fillColor(LIGHT)
        .fontSize(8.5)
        .font("Helvetica-Bold")
        .text("REMARKS", MARGIN, totY + 6);
      doc
        .fillColor(MID)
        .fontSize(9.5)
        .font("Helvetica")
        .text(payment.remarks || "No remarks provided.", MARGIN, totY + 20, { width: 240 });

      // Totals (right side)
      const totX = W - MARGIN - 220;
      const totW = 220;

      const drawTotRow = (label, val, yOff, highlight = false) => {
        if (highlight) {
          doc.rect(totX, totY + yOff, totW, 34).fill(DARK);
          doc.fillColor("#FFFFFF").fontSize(11).font("Helvetica-Bold")
            .text(label, totX + 14, totY + yOff + 11, { width: 100 });
          doc.fillColor(GREEN).fontSize(15).font("Helvetica-Bold")
            .text(val, totX + 110, totY + yOff + 8, { width: 96, align: "right" });
        } else {
          doc.rect(totX, totY + yOff, totW, 26).fill(BG_LIGHT);
          doc.rect(totX, totY + yOff, totW, 26).stroke(BORDER);
          doc.fillColor(LIGHT).fontSize(9).font("Helvetica")
            .text(label, totX + 14, totY + yOff + 8, { width: 100 });
          doc.fillColor(DARK).fontSize(9.5).font("Helvetica-Bold")
            .text(val, totX + 110, totY + yOff + 8, { width: 96, align: "right" });
        }
      };

      const amt = Number(payment.amount);
      drawTotRow("Subtotal", `Rs${amt.toLocaleString("en-IN")}`, 0);
      drawTotRow("Tax / GST", "Included", 26);
      drawTotRow("Discount", "—", 52);
      drawTotRow("TOTAL PAID", `Rs${amt.toLocaleString("en-IN")}`, 78, true);

      // ─────────────────────────────────────────────
      // DIVIDER
      // ─────────────────────────────────────────────
      const divY = totY + 78 + 34 + 28;
      doc.rect(MARGIN, divY, W - MARGIN * 2, 1).fill(BORDER);

      // ─────────────────────────────────────────────
      // FOOTER
      // ─────────────────────────────────────────────
      const footY = divY + 16;

      // Green accent strip
      doc.rect(0, H - 40, W, 40).fill(DARK);
      doc.rect(0, H - 40, W, 3).fill(GREEN);

      doc
        .fillColor("#94A3B8")
        .fontSize(8.5)
        .font("Helvetica")
        .text(
          "This is a computer-generated invoice and does not require a physical signature.",
          MARGIN,
          H - 28,
          { width: W - MARGIN * 2, align: "center" }
        );

      // Thank-you note above footer
      doc
        .fillColor(LIGHT)
        .fontSize(9)
        .font("Helvetica")
        .text(
          "Thank you for choosing ChartWiz Academy. For support, contact us at www.chartwizacademy.com",
          MARGIN,
          footY,
          { width: W - MARGIN * 2, align: "center" }
        );

      // Decorative dots pattern (bottom-right corner)
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          doc
            .circle(W - 60 + col * 10, footY + 30 + row * 10, 1.5)
            .fill(row === 0 && col === 0 ? GREEN : BORDER);
        }
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

export default generateInvoicePDF;