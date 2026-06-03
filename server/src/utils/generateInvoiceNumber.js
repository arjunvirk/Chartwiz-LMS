import crypto from "crypto";

const generateInvoiceNumber = () => {
  return `INV-${Date.now()}-${crypto.randomInt(1000, 9999)}`;
};

export default generateInvoiceNumber;
