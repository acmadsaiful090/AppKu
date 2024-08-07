const generatePaycheckHtml = (paycheck) => {
  const monthMapping = {
    'Januari': 0,
    'Februari': 1,
    'Maret': 2,
    'April': 3,
    'Mei': 4,
    'Juni': 5,
    'Juli': 6,
    'Agustus': 7,
    'September': 8,
    'Oktober': 9,
    'November': 10,
    'Desember': 11
  };
  
 
  const getPeriodText = (month) => {
    const [monthName, year] = month.split(' ');
    const monthIndex = monthMapping[monthName]; 
    
    const startDate = new Date(year, monthIndex, 5); 
    const endDate = new Date(year, monthIndex + 1, 5); 
    const startFormatted = startDate.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const endFormatted = endDate.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
    return `Periode ${startFormatted} - ${endFormatted}`;
  };

  const periodText = getPeriodText(paycheck.month);

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .header { text-align: center; margin-bottom: 20px; }
          .section { margin-bottom: 15px; }
          .info { display: flex; justify-content: space-between; }
          .divider { border-bottom: 1px solid #ccc; margin: 10px 0; }
          .footer { text-align: center; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Slip Gaji Karyawan</h1>
          <p>${periodText}</p>
        </div>
        <div class="section">
          <div class="info"><strong>Nama:</strong> ${paycheck.name}</div>
          <div class="info"><strong>NIK:</strong> ${paycheck.nik}</div>
          <div class="info"><strong>Jabatan:</strong> ${paycheck.position}</div>
          <div class="info"><strong>Alamat:</strong> ${paycheck.address}</div>
        </div>
        <div class="divider"></div>
        <div class="section">
          <div class="info"><strong>Gaji Pokok:</strong> ${paycheck.basicSalary}</div>
          <div class="info"><strong>Uang Lembur:</strong> ${paycheck.overtimePay}</div>
          <div class="info"><strong>Potongan:</strong> ${paycheck.deductions}</div>
          <div class="info"><strong>Gaji Bersih:</strong> ${paycheck.netSalary}</div>
        </div>
        <div class="footer">
          <p>Mengetahui</p>
          <p>JC CORPORATE</p>
        </div>
      </body>
    </html>
  `;
};

export default generatePaycheckHtml;
