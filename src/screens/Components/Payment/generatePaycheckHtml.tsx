const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
const generatePaycheckHtml = ({ name, nik, position, address, date, basicSalary, overtimePay, deductions, netSalary }) => {
  const getPeriodText = (date) => {
    const [day, monthIndex, year] = date.split('-').map(Number);
    const monthName = monthNames[monthIndex - 1]; // monthIndex is 1-based

    const startDate = new Date(year, monthIndex - 1, 1); // Month is 0-based
    const endDate = new Date(year, monthIndex, 0); // Last day of the month

    const formatDate = date => date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });

    return `Periode ${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const periodText = getPeriodText(date);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Slip Gaji</title>
        <style>
          @page {
            size: A4;
            margin: 20mm;
          }
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 210mm; 
            margin: auto;
            padding: 20mm;
            background: #fff;
            border-radius: 8px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .period-text {
            font-style: italic;
            margin-bottom: 20px;
            display: block;
            text-align: center;
          }
          .info-container {
            margin-bottom: 10px;
          }
          .info-label {
            font-weight: bold;
          }
          .info-value {
            margin-left: 10px;
          }
          .divider {
            height: 1px;
            background-color: #ddd;
            margin: 20px 0;
          }
          .salary-row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }
          .salary-label {
            font-weight: bold;
          }
          .salary-value {
            font-weight: bold;
          }
          .acknowledgement {
            text-align: center;
            margin-top: 20px;
          }
          .company {
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Slip Gaji Karyawan</h1>
            <span class="period-text">${periodText}</span>
          </div>
          
          <div class="info-container">
            <span class="info-label">Nama:</span>
            <span class="info-value">${name || 'N/A'}</span>
          </div>
          <div class="info-container">
            <span class="info-label">NIK:</span>
            <span class="info-value">${nik || 'N/A'}</span>
          </div>
          <div class="info-container">
            <span class="info-label">Jabatan:</span>
            <span class="info-value">${position || 'N/A'}</span>
          </div>
          <div class="info-container">
            <span class="info-label">Alamat:</span>
            <span class="info-value">${address || 'N/A'}</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="salary-row">
            <span class="salary-label">Gaji Pokok:</span>
            <span class="salary-value">${basicSalary || '0'}</span>
          </div>
          <div class="salary-row">
            <span class="salary-label">Uang Lembur:</span>
            <span class="salary-value">${overtimePay || '0'}</span>
          </div>
          <div class="salary-row">
            <span class="salary-label">Potongan:</span>
            <span class="salary-value">${deductions || '0'}</span>
          </div>
          <div class="salary-row">
            <span class="salary-label">Gaji Bersih:</span>
            <span class="salary-value">${netSalary || '0'}</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="acknowledgement">
            <p>Mengetahui</p>
            <p class="company">JC CORPORATE</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default generatePaycheckHtml;
