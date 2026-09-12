import PDFDocument from "pdfkit";

const BRAND = {
  name: "Alphira Capital",
  website: "www.alphiracapital.com",
  email: "contact.alphiracapital@gmail.com",
  phone: "+91 92172 22356",
};

export default function generateInvoicePDF(payment) {
  return new Promise((resolve, reject) => {
    let doc;
    try {
      const amount = Number(payment.amount);
      if (!Number.isFinite(amount) || amount < 0) {
        throw new Error("Invoice amount must be a valid non-negative number.");
      }
      const value = (input) => input == null || input === "" ? "N/A" : String(input);
      const money = `INR ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      const date = payment.paidAt ? new Date(payment.paidAt) : null;
      const issueDate = date && !Number.isNaN(date.getTime())
        ? date.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }) : "N/A";
      const status = value(payment.paymentStatus).toUpperCase();
      const paid = ["paid", "success", "completed"].includes(String(payment.paymentStatus).toLowerCase());
      doc = new PDFDocument({
        size: "A4", margins: { top: 60, left: 48, right: 48, bottom: 86 }, bufferPages: true,
        info: { Title: `Invoice ${value(payment.invoiceNumber)}`, Author: BRAND.name, Subject: "Course Enrollment Invoice" },
      });
      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("error", reject);
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      const C = { ink: "#20251F", sage: "#66745B", muted: "#697063", border: "#DDE2D6", cream: "#F8F7F3", white: "#FFFFFF" };
      const left = 48;
      const width = doc.page.width - 96;
      const text = (content, x, y, size = 10, color = C.ink, bold = false, options = {}) => {
        doc.font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(size).fillColor(color)
          .text(value(content), x, y, { width, lineGap: 1, ...options });
      };
      const line = (y) => doc.save().strokeColor(C.border).lineWidth(0.7).moveTo(left, y).lineTo(left + width, y).stroke().restore();
      const ensure = (height) => { if (doc.y + height > doc.page.height - 100) doc.addPage(); };
      const label = (content, y) => text(content, left, y, 8, C.sage, true, { characterSpacing: 1.2 });

      // A restrained wordmark, with a vector monogram that needs no image asset.
      doc.roundedRect(left, 45, 36, 39, 7).fill(C.ink);
      text("A", left, 51, 25, C.white, false, { width: 36, align: "center" });
      text("alphira", left + 48, 43, 25, C.ink, true, { width: 180 });
      text("C A P I T A L", left + 49, 72, 7, C.sage, true, { width: 180 });
      text("COURSE ENROLLMENT", left + 280, 49, 8, C.muted, false, { width: width - 280, align: "right" });
      text(BRAND.website, left + 260, 68, 9, C.muted, false, { width: width - 260, align: "right", link: `https://${BRAND.website}` });
      line(109);
      text("Invoice", left, 134, 40, C.ink, true);
      text(`No. ${value(payment.invoiceNumber)}`, left, 186, 10, C.muted);
      let y = doc.y + 16;
      label("BILLED TO", y);
      text(value(payment.studentName), left, y + 20, 17, C.ink, true);
      text(value(payment.email), left, doc.y + 5, 10, C.muted);
      text(`Student ID: ${value(payment.studentId)}`, left, doc.y + 3, 9, C.muted);
      y = doc.y + 16;
      line(y);
      doc.y = y + 18;

      // Flowing rows keep long references and payment methods within the page.
      const detail = (key, content) => {
        ensure(48);
        const rowY = doc.y;
        text(key, left, rowY, 9, C.muted, false, { width: 120 });
        text(content, left + 140, rowY, 10, C.ink, false, { width: width - 140 });
        doc.y = Math.max(doc.y, rowY + 12) + 5;
      };
      detail("Issue date", issueDate);
      detail("Payment status", status);
      detail("Payment method", value(payment.paymentMethod));
      detail("Reference number", value(payment.referenceNumber));
      ensure(166);
      y = doc.y + 12;
      doc.rect(left, y, width, 28).fill(C.cream);
      text("DESCRIPTION", left + 12, y + 9, 8, C.sage, true, { width: 260 });
      text("AMOUNT", left + width - 164, y + 9, 8, C.sage, true, { width: 152, align: "right" });
      text("Course Enrollment", left + 12, y + 43, 12, C.ink, true, { width: width - 190 });
      text("Alphira Capital Trading Program", left + 12, y + 64, 9, C.muted, false, { width: width - 190 });
      text(money, left + width - 180, y + 46, 12, C.ink, true, { width: 168, align: "right" });
      line(y + 91);
      doc.y = y + 108;
      detail("Subtotal", money);
      detail("Tax / GST", "Included");
      detail("Discount", "-");
      ensure(82);
      y = doc.y;
      doc.roundedRect(left, y, width, 64, 8).fill(C.ink);
      text(paid ? "TOTAL PAID" : "INVOICE TOTAL", left + 18, y + 26, 9, "#DCE5D2", true, { width: 170 });
      text(money, left + 190, y + 20, 22, C.white, true, { width: width - 208, align: "right" });
      doc.y = y + 76;
      ensure(66);
      label("REMARKS", doc.y);
      text(payment.remarks || "No remarks provided.", left, doc.y + 10, 10, C.muted);
      doc.y += 12;
      ensure(50);
      text("Thank you for choosing Alphira Capital.", left, doc.y, 11, C.ink, true);
      text("Keep this invoice for your records.", left, doc.y + 4, 9, C.muted);

      // Render footers after pagination, including pages created by long remarks.
      const range = doc.bufferedPageRange();
      for (let i = range.start; i < range.start + range.count; i++) {
        doc.switchToPage(i);
        doc.page.margins.bottom = 0;
        const footerY = doc.page.height - 66;
        line(footerY);
        text(`${BRAND.email}  |  ${BRAND.phone}`, left, footerY + 12, 8, C.muted, false, { lineBreak: false });
        text("Computer-generated invoice. No physical signature required.", left, footerY + 28, 7, C.muted, false, { lineBreak: false });
        text(`${i + 1} / ${range.count}`, left + width - 42, footerY + 28, 8, C.sage, false, { width: 42, align: "right", lineBreak: false });
      }
      doc.end();
    } catch (error) {
      doc?.destroy();
      reject(error);
    }
  });
}
