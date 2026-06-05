import puppeteer from "puppeteer";

const generateInvoicePDF = async (payment) => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  font-family: Arial, sans-serif;
  background:#f9fafb;
  color:#111827;
  padding:40px;
}

.invoice-container{
  background:white;
  border-radius:16px;
  overflow:hidden;
  border:1px solid #e5e7eb;
}

.header{
  background:#111827;
  color:white;
  padding:40px;
}

.header h1{
  font-size:32px;
  margin-bottom:8px;
}

.header p{
  opacity:.8;
}

.content{
  padding:40px;
}

.top-section{
  display:flex;
  justify-content:space-between;
  margin-bottom:40px;
}

.info-box{
  margin-bottom:30px;
}

.info-box h3{
  margin-bottom:12px;
  color:#6b7280;
  font-size:14px;
  text-transform:uppercase;
}

.info-box p{
  margin-bottom:6px;
}

.paid-badge{
  display:inline-block;
  background:#dcfce7;
  color:#166534;
  padding:8px 18px;
  border-radius:999px;
  font-weight:bold;
}

table{
  width:100%;
  border-collapse:collapse;
  margin-top:25px;
}

th{
  background:#f3f4f6;
  text-align:left;
  padding:14px;
}

td{
  padding:14px;
  border-bottom:1px solid #e5e7eb;
}

.total{
  margin-top:25px;
  text-align:right;
}

.total h2{
  margin-top:10px;
}

.footer{
  margin-top:50px;
  padding-top:20px;
  border-top:1px solid #e5e7eb;
  color:#6b7280;
  font-size:13px;
}

.reference{
  margin-top:30px;
}

.reference p{
  margin-bottom:8px;
}
</style>
</head>

<body>

<div class="invoice-container">

  <div class="header">
    <h1>ChartWiz Academy</h1>
    <p>Professional Learning Management Platform</p>
  </div>

  <div class="content">

    <div class="top-section">

      <div>
        <h2>PAYMENT INVOICE</h2>

        <br/>

        <p><strong>Invoice No:</strong> ${payment.invoiceNumber}</p>

        <p><strong>Invoice Date:</strong>
        ${new Date(payment.paidAt).toLocaleDateString()}
        </p>
      </div>

      <div>
        <span class="paid-badge">
          ${payment.paymentStatus.toUpperCase()}
        </span>
      </div>

    </div>

    <div class="info-box">
      <h3>Student Information</h3>

      <p><strong>Name:</strong> ${payment.studentName}</p>

      <p><strong>Email:</strong> ${payment.email}</p>

      <p><strong>Student ID:</strong> ${payment.studentId}</p>
    </div>

    <table>

      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Course Enrollment Fee</td>
          <td>₹${payment.amount}</td>
        </tr>
      </tbody>

    </table>

    <div class="total">
      <p>Subtotal: ₹${payment.amount}</p>
      <p>Tax: ₹0</p>
      <h2>Total: ₹${payment.amount}</h2>
    </div>

    <div class="reference">

      <h3>Payment Details</h3>

      <p>
        <strong>Payment Method:</strong>
        ${payment.paymentMethod}
      </p>

      <p>
        <strong>Reference Number:</strong>
        ${payment.referenceNumber || "N/A"}
      </p>

      <p>
        <strong>Remarks:</strong>
        ${payment.remarks || "N/A"}
      </p>

    </div>

    <div class="footer">

      <p>
        This invoice confirms that payment has been successfully received.
      </p>

      <br/>

      <p>
        Thank you for choosing ChartWiz Academy.
      </p>

      <br/>

      <p>
        ChartWiz Academy
      </p>

      <p>
        support@chartwizacademy.com
      </p>

      <p>
        www.chartwizacademy.com
      </p>

    </div>

  </div>

</div>

</body>
</html>
`;

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    return pdfBuffer;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export default generateInvoicePDF;
