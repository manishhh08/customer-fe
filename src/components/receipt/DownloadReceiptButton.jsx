import React from "react";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/logo.png"; // ✅ your logo

const logoImg = new Image();
logoImg.src = logo;

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

// Customer helpers (your structure)
const getCustomerName = (c) => {
  if (!c) return "";
  return [c.fname, c.lname].filter(Boolean).join(" ");
};

const getCustomerEmail = (c) => {
  if (!c) return "";
  return c.email;
};

const DownloadReceiptButton = ({
  order,
  customer,
  variant = "primary",
  size = "sm",
  className = "",
}) => {
  if (!order) return null;

  const generatePdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // ===== Logo top-left =====
    // x, y, width, height – tweak size if you want
    doc.addImage(logoImg, "PNG", 14, 16, 12, 12);

    // ===== Brand name "ElectraHub" next to logo =====
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    // Slightly to the right of the logo (14 + 12 + a bit of padding)
    doc.text("ElectraHub", 30, 24);
    doc.setFont(undefined, "normal");

    // ===== Title under logo/brand =====
    doc.setFontSize(16);
    doc.text("Order Receipt", 14, 42);

    // ===== Order ID + Date on the RIGHT side =====
    doc.setFontSize(10);
    doc.text(`Order ID: ${order._id.slice(-6)}`, pageWidth - 14, 18, {
      align: "right",
    });
    if (order.createdAt) {
      doc.text(
        `Date: ${new Date(order.createdAt).toLocaleString()}`,
        pageWidth - 14,
        24,
        { align: "right" }
      );
    }

    // ===== Customer info =====
    const customerName = getCustomerName(customer);
    const customerEmail = getCustomerEmail(customer);

    let lineY = 50; // below title

    if (customerName) {
      // name bold
      doc.setFont(undefined, "bold");
      doc.text(customerName, 14, lineY);
      lineY += 6;
      doc.setFont(undefined, "normal");
    }

    if (customerEmail) {
      doc.text(customerEmail, 14, lineY);
      lineY += 6;
    }

    // ===== Shipping address =====
    let currentY = Math.max(lineY + 4, 64);
    if (order.address) {
      doc.text("Address:", 14, currentY);
      currentY += 6;
      const addressLines = doc.splitTextToSize(order.address, 180);
      doc.text(addressLines, 14, currentY);
      currentY += addressLines.length * 6 + 4;
    }

    // ===== Items table + summary rows =====
    const items = order.items || [];

    // Regular item rows
    const itemRows = items.map((item) => {
      const name = item.productName || item.name || "Item";
      const qty = item.quantity || 1;
      const price = item.price || 0;
      const lineTotal = price * qty;

      return [
        name,
        String(qty),
        formatCurrency(price),
        formatCurrency(lineTotal),
      ];
    });

    // Subtotal
    const subtotalFromItems = items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );

    const subtotal =
      typeof order.subtotal === "number" ? order.subtotal : subtotalFromItems;

    // Total
    const total = typeof order.total === "number" ? order.total : subtotal;

    // Shipping (if you have it on the order)
    const shipping = typeof order.shipping === "number" ? order.shipping : 0;

    // Tax amount – prefer explicit fields, otherwise infer from total
    let taxAmount = 0;
    if (typeof order.tax === "number") {
      taxAmount = order.tax;
    } else if (typeof order.taxAmount === "number") {
      taxAmount = order.taxAmount;
    } else {
      // Infer: total = subtotal + tax + shipping
      const diff = total - subtotal - shipping;
      taxAmount = diff > 0 ? diff : 0;
    }

    // Tax rate (%)
    const taxRate =
      subtotal > 0 && taxAmount > 0 ? (taxAmount / subtotal) * 100 : 0;

    // Summary rows appended to the same table
    const summaryRows = [];

    summaryRows.push(["", "", "Subtotal", formatCurrency(subtotal)]);

    if (taxAmount > 0) {
      const taxLabel = taxRate > 0 ? `Tax (${taxRate.toFixed(2)}%)` : "Tax";
      summaryRows.push(["", "", taxLabel, formatCurrency(taxAmount)]);
    }

    if (shipping > 0) {
      summaryRows.push(["", "", "Shipping", formatCurrency(shipping)]);
    }

    summaryRows.push(["", "", "Total", formatCurrency(total)]);

    // Final body for the table: items + summary
    const tableBody = [...itemRows, ...summaryRows];

    autoTable(doc, {
      startY: currentY,
      head: [["Product", "Qty", "Price", "Line Total"]],
      body: tableBody,
      styles: {
        fontSize: 10,
      },
      columnStyles: {
        1: { halign: "right" },
        2: { halign: "right" },
        3: { halign: "right" },
      },
      didParseCell: (data) => {
        const { row, column } = data;
        const isSummaryRow = row.index >= itemRows.length;
        if (isSummaryRow) {
          if (column.index === 2 || column.index === 3) {
            data.cell.styles.fontStyle = "bold";
          }
        }
      },
    });

    // ===== Footer =====
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.text(
      "Thank you for shopping with ElectraHub",
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );

    const filename = `order-${String(order._id).slice(-6)}.pdf`;
    doc.save(filename);
  };

  const handleDownload = () => {
    // ensure logo is loaded before generating
    if (!logoImg.complete) {
      logoImg.onload = generatePdf;
    } else {
      generatePdf();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`mt-2 ${className}`}
      onClick={handleDownload}
    >
      Download receipt
    </Button>
  );
};

export default DownloadReceiptButton;
