import jsPDF from 'jspdf';
import 'jspdf-autotable';

function downloadPDF(tableData, savePdf) {
    const pdf = new jsPDF({
        orientation: 'landscape',
    });

    const imgData = require('../images/core.png');

    const imgWidth = 50;
    const imgHeight = 30;

    const headerTemplate = () => {
        pdf.addImage(imgData, 'PNG', (pdf.internal.pageSize.width - imgWidth) / 2, 3, imgWidth, imgHeight);

        const currentDate = new Date();
        const formattedDate = `${currentDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })} at ${currentDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        })}`;

        const title = 'Title: Leads';
        const titleX = 10;
        const titleY = 35;

        const dateX = pdf.internal.pageSize.width - 60;
        const dateY = 35;

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(title, titleX, titleY);

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.text(formattedDate, dateX, dateY);
    };

    const headerStyles = {
        fillColor: [174, 185, 195],
        textColor: 0,
        cellPadding: 5,
        fontsize: 15
    };

    const bStyles = {
        cellPadding: 5,
        fontsize: 15
    }

    pdf.autoTable({
        didDrawPage: function () {
            headerTemplate();
        },
        headStyles: headerStyles,
        bodyStyles: bStyles,
        startY: 40,
        head: [['Company', 'First Name', 'Last Name', 'Phone', 'Email']],
        body: tableData.map((row) => {
            return [row.company, row.firstName, row.lastName, row.phone, row.email]
        }),

    });

    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(13);
        pdf.text(`Page ${i} of ${totalPages}`, pdf.internal.pageSize.width - 30, pdf.internal.pageSize.height - 10);
    }

    const pdfDataUri = pdf.output("dataurlstring");

    if (savePdf) {
        pdf.save('table.pdf');
    }
    else {
        return pdfDataUri;
    }

}

export default downloadPDF;