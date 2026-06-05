import PDFDocument from "pdfkit";

const generateInvoicePDF = (payment) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
      });

      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));

      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });

      // HEADER

      doc.fontSize(24).fillColor("#111827").text("ChartWiz Academy", {
        align: "center",
      });

      doc
        .fontSize(12)
        .fillColor("#666666")
        .text("Professional Learning Management Platform", {
          align: "center",
        });

      doc.moveDown(2);

      // INVOICE TITLE

      doc.fontSize(20).fillColor("#000000").text("PAYMENT INVOICE");

      doc.moveDown();

      // INVOICE INFO

      doc.fontSize(12);

      doc.text(`Invoice Number: ${payment.invoiceNumber}`);

      doc.text(
        `Invoice Date: ${new Date(payment.paidAt).toLocaleDateString()}`,
      );

      doc.text(`Payment Status: ${payment.paymentStatus}`);

      doc.moveDown(2);

      // STUDENT DETAILS

      doc.fontSize(16).text("Student Information", {
        underline: true,
      });

      doc.moveDown();

      doc.fontSize(12);

      doc.text(`Name: ${payment.studentName}`);

      doc.text(`Email: ${payment.email}`);

      doc.text(`Student ID: ${payment.studentId}`);

      doc.moveDown(2);

      // PAYMENT DETAILS

      doc.fontSize(16).text("Payment Details", {
        underline: true,
      });

      doc.moveDown();

      doc.fontSize(12);

      doc.text(`Amount: Rs .${Number(payment.amount).toLocaleString("en-IN")}`);

      doc.text(`Payment Method: ${payment.paymentMethod}`);

      doc.text(`Reference Number: ${payment.referenceNumber || "N/A"}`);

      doc.text(`Remarks: ${payment.remarks || "N/A"}`);

      doc.moveDown(2);

      // TOTAL

      doc
        .fontSize(18)
        .fillColor("#111827")
        .text(`Total Paid: ${payment.amount}`, {
          align: "right",
        });

      doc.moveDown(3);

      // FOOTER

      doc
        .fontSize(10)
        .fillColor("#666666")
        .text(
          "This invoice confirms that payment has been successfully received.",
          {
            align: "center",
          },
        );

      doc.moveDown();

      doc.text("Thank you for choosing ChartWiz Academy.", {
        align: "center",
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

export default generateInvoicePDF;
