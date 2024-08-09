const leaveTypes = [
    { id: '1', type: 'Casual leave', days: 3, expDays: 5, 
      details: [
      { description: 5, date: '2024-08-03', qty: 2 },
      { description: 'ambil cuti 2', date: '2024-08-01', qty: -1 },
     
    ] },
    { id: '2', type: 'Cuti Tahunan', days: 12, expDays: 0, 
      details: [
      { description: 5, date: '2024-08-05', qty: -1 },
      { description: 5, date: '2024-08-08', qty: 2 },
    ]
    },
    { id: '3', type: 'Cuti Sakit', days: 14, expDays: 3, 
      details: [
      { description: 5, date: '2024-08-01', qty: -1 },
      { description: 5, date: '2024-08-03', qty: 2 },
    ]
    },
    { id: '4', type: 'Cuti Melahirkan', days: 90, expDays: 0, 
      details: [
      { description: 5, date: '2024-08-01', qty: -1 },
      { description: 5, date: '2024-08-04', qty: 2 },
    ]
    },
    { id: '5', type: 'Cuti Paternity', days: 7, expDays: 0, 
      details: [
      { description: 5, date: '2024-08-02', qty: -1 },
      { description: 5, date: '2024-08-07', qty: 2 },
      ]
    },
    { id: '6', type: 'Cuti Besar', days: 60, expDays: 0, 
      details: [
      { description: 5, date: '2024-08-03', qty: -1 },
      { description: 5, date: '2024-08-06', qty: 2 },
      ]
    },
  ];
  
  export default leaveTypes;
  