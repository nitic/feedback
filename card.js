
const API_URL = 'https://script.google.com/macros/s/AKfycbxaDbmxOXM6F-P8bkpNij2pMefGIKIpsv_SLj0sEzVfzfV3NgwMo5MMn2yXlOR8Kxcs/exec';
const postIdInput = document.getElementById('post-username');
const searchParams = new URLSearchParams(window.location.search);

// Bootstrap form validation
(function () {
    'use strict';
    
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.preventDefault(); // Prevent default form submission

                    
                    Swal.fire({
                        title: 'ส่งข้อมูล...',
                        text: 'กรุณารอสักครู่กำลังส่งข้อมูลของคุณ.',
                        allowOutsideClick: false,
                        didOpen: () => {
                          Swal.showLoading();
                        }
                      });

                    // Create an Object
                    const postData = {};

                    // Add Properties
                    postData.name = postIdInput.value;
                    postData.type = document.getElementById('type').value;
                    postData.speed = document.querySelector('input[name="speed"]:checked').value;
                    postData.accuracy = document.querySelector('input[name="accuracy"]:checked').value;
                    postData.service = document.querySelector('input[name="service"]:checked').value;
                    postData.comment = document.getElementById('comment').value;

                    // ฟังก์ชันเพื่อส่งข้อมูล
                    axios.post(API_URL, JSON.stringify(postData), {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    })
                        .then(response => {
                            //console.log('POST Response:', response.data.status);
                            Swal.fire({
                                title: 'บันทึกข้อมูลสำเร็จ!',
                                text: 'ข้อมูลผลประเมินได้ถูกส่งเรียบร้อยแล้ว ขอบคุณที่ประเมิน.',
                                icon: 'success',
                                confirmButtonText: 'OK'
                              });
                              document.getElementById("dataForm").reset();
                        })
                        .catch(error => {
                            //console.error('POST Error:', error);
                            Swal.fire({
                                title: 'Error!',
                                text:  error,
                                icon: 'error',
                                confirmButtonText: 'OK'
                              });
                        });

                }

                form.classList.add('was-validated');
            }, false);
        });

        fetchData();
})();

function fetchData() {

    // ฟังก์ชันเพื่อดึงข้อมูล
              if(searchParams.has('id')){

                Swal.fire({
                    title: 'กรุณารอสักครู่...',
                    text: 'ระบบกำลังดึงข้อมูลผู้ประเมิน',
                    allowOutsideClick: false,
                    didOpen: () => {
                      Swal.showLoading();
                    }
                  });

                    let sheetParam = 'Users';
                    let idParam = searchParams.get('id');
                    axios.get(`${API_URL}?sheet=${sheetParam}&id=${idParam}`, {
                        headers: {
                            "Content-Type": "application/json"
                           },
                        })
                        .then(response => {
                            //console.log('GET Response:', response.data);
                            displayData(response.data);
                            Swal.close()

                        })
                        .catch(error => {
                            //console.error('GET Error:', error);
                            Swal.fire({
                                title: 'Error!',
                                text:  error,
                                icon: 'error',
                                confirmButtonText: 'OK'
                              });
                        });
            }else{
                //alert("กรุณาระบุ ID ผู้ถูกประเมิน");
                document.getElementById("dataForm").style.display="none";
                Swal.fire({
                    title: 'Error!',
                    text:  'กรุณาระบุ ID ผู้ถูกประเมิน',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });
                return false;
            }
}

// ฟังก์ชันในการแสดงข้อมูลใน HTML
function displayData(posts) {
    const container = document.getElementById('data-container');
    const postImage = document.getElementById('post-image');


    // ใช้ข้อมูลของ post แรก (หรือเลือก post ใดก็ได้)
    const post = posts[0];

    // กำหนดค่าให้กับ image tag
    postImage.src = post.image;
    postImage.alt = post.title;

    // กำหนดค่าให้กับ hidden input tag
    postIdInput.value = post.fullname;

    // หากต้องการแสดงข้อมูลอื่นๆ เช่น title และ body
    container.insertAdjacentHTML('beforeend', `
        <span class="fs-5 fw-bold">${post.fullname}</span>
        <p class="fs-6 text-black-50">${post.position}</p>
    `);
}

