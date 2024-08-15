(function () {
  //fetchData();
})();

function fetchData() {
    // const startDate = document.getElementById('startDate').value;
    // const endDate = document.getElementById('endDate').value;
    // const filterName = document.getElementById('filterName').value;

    const API_URL = 'https://script.google.com/macros/s/AKfycbzJhvskEg4qxFjfZIOLNXrvLaWcnpmwTODJG7f7vCiVpC16W_9VoDVlnCcVuIV1C10W/exec';

    // ฟังก์ชันเพื่อดึงข้อมูล
                    let sheetParam = 'Data';
                    let startParam = '2024-08-01';
                    let endParam = '2024-08-30';
                    let NameParam = 'นิติ โชติแก้ว';
                    let TypeParam = ['นักศึกษา', 'อาจารย์','บุคลากรโรงพยาบาล'];
                    axios.get(`${API_URL}?sheet=${sheetParam}&startDate=${startParam}&endDate=${endParam}&filterName=${NameParam}&filterType=${TypeParam}`, {
                        headers: {
                            "Content-Type": "application/json"
                           },
                        })
                        .then(response => {
                            console.log('GET Response:', response.data);
                            
                           
                            let data = response.data;
                            let stat_type = [];
                            let stat_speed = [];
                            let stat_accuracy = [];
                            let stat_service = [];
                            let stat_comment = [];

                            data.forEach(row => {
                               stat_type.push(row.type);
                               stat_speed.push(parseFloat(row.speed));
                               stat_accuracy.push(parseFloat(row.accuracy));
                               stat_service.push(parseFloat(row.service));
                               stat_comment.push(row.comment);

                            });
                         // console.log(stat_type.filter(c => c === 'อาจารย์').length);
                         // console.log(getMean(stat_speed));
                         // console.log(getSD(stat_speed));
                         console.log(stat_comment);

                        })
                        .catch(error => {
                            console.error('GET Error:', error);
                        });
}

function displayData(data) {
    const tbody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // ล้างข้อมูลเก่า

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.datetime}</td>
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.score}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Arithmetic mean คำนวณหาค่าเฉลี่ยกลาง
function getMean(data) {
    return data.reduce(function (a, b) {
        return Number(a) + Number(b);
    }) / data.length;
  }
  
  // Standard deviation คำนวณหาค่า SD
  function getSD(data) {
    let m = getMean(data);
    return Math.sqrt(data.reduce(function (sq, n) {
            return sq + Math.pow(n - m, 2);
        }, 0) / (data.length - 1));
  }
