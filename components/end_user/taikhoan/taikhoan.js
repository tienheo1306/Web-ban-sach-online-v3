
// Lấy các phần tử
const btnTTCN = document.querySelectorAll('.menu button')[0];
const bthSDC = document.querySelectorAll('.menu button')[1];
const bthDH = document.querySelectorAll('.menu button')[2];

const btnTDC = document.getElementById('addAD'); //nút thêm địa chỉ
const btnEdit = document.getElementById('edit-address');

const formTTCN = document.querySelector('.form-container');  // Thông tin cá nhân
const formSDC = document.querySelector('.sodiachi');         // Sổ địa chỉ
const formDH = document.querySelector('.donhang');           // Đơn hàng
const formTDC = document.querySelector('.themdiachi');       // Thêm địa chỉ
const formOVL = document.querySelector(".overlay");          // Overlay
const formEdit = document.querySelector('.edit-address-popup');

// Ẩn tất cả các phần
function hideAllSections() {
    formTTCN.style.display = 'none';
    formSDC.style.display = 'none';
    formDH.style.display = 'none';
    formTDC.style.display = 'none'; 
    formOVL.style.display = 'none';
    formEdit.style.display = 'none';
}

// Sự kiện nhấn vào 'Thông tin cá nhân'
document.addEventListener('DOMContentLoaded', function() {
    hideAllSections();  // Ẩn tất cả các phần
    formTTCN.style.display = 'block';  // Hiển thị thông tin cá nhân
});

btnTTCN.addEventListener('click', function() {
    hideAllSections();  // Ẩn tất cả các phần
    formTTCN.style.display = 'block';  // Hiển thị sổ địa chỉ
});

// Sự kiện nhấn vào 'Sổ địa chỉ'
bthSDC.addEventListener('click', function() {
    hideAllSections();  // Ẩn tất cả các phần
    formSDC.style.display = 'block';  // Hiển thị sổ địa chỉ
});

// Sự kiện nhấn vào 'Đơn hàng'
bthDH.addEventListener('click', function() {
    hideAllSections();  // Ẩn tất cả các phần
    formDH.style.display = 'block';  // Hiển thị đơn hàng
    
});

// Sự kiện nhấn vào 'Thêm địa chỉ'
btnTDC.addEventListener("click", function() {
    hideAllSections();  // Ẩn tất cả các phần
    formTDC.style.display = "block";  // Hiển thị form thêm địa chỉ
    formOVL.style.display = "block";  // Hiển thị overlay
    formSDC.style.display = 'block';  // Hiển thị sổ địa chỉ
});

document.getElementById("huyboAD").addEventListener("click", function() {
    formTDC.style.display = "none";
    formOVL.style.display = "none";
});

// Sự kiện nhấn vào overlay để đóng form thêm địa chỉ
formOVL.addEventListener("click", function() {
    hideAllSections();  // Ẩn tất cả các phần
    formSDC.style.display = 'block';
});

btnEdit.addEventListener("click", function() {
    hideAllSections();  // Ẩn tất cả các phần
    formEdit.style.display = "block";  // Hiển thị form thêm địa chỉ
    formOVL.style.display = "block";  // Hiển thị overlay
    formSDC.style.display = 'block';  // Hiển thị sổ địa chỉ
});

// Đóng popup khi nhấn ra ngoài form
// formOVL.addEventListener("click", function(e) {
//     if (e.target === formOVL) {  // Kiểm tra nếu click là overlay chứ không phải bên trong form
//         formTDC.style.display = "none";
//         formOVL.style.display = "none";
//     }
// });

// Thay doi thong tin
function changeInformation() {
    // Lấy các giá trị trong form
    const name = document.getElementById('infoname').value;
    const email = document.getElementById('infoemail').value;
    const phone = document.getElementById('infophone').value;

    // Kiểm tra xem các trường có giá trị hợp lệ không
    if (!name || !email || !phone) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return; // Dừng hàm nếu có trường rỗng
    }

    // Kiểm tra số điện thoại phải đủ 10 số
    if (phone.length !== 10) {
        alert("Số điện thoại phải đủ 10 số");
        return;
    }

    // Kiểm tra email có chứa ký tự '@'
    if (!email.includes('@')) {
        alert("Vui lòng nhập lại email hợp lệ (có chứa @)");
        return;
    }

    // Nếu tất cả đều hợp lệ, hiển thị thông báo thành công
    alert("Lưu thành công!");
}
  
  function changePassword() {
    // Lấy các giá trị trong form
    const passwordCur = document.getElementById('current-password').value;
    const passwordNew = document.getElementById('new-password').value;
    const passwordConfirm = document.getElementById('confirm-password').value;
    const passwordStored = "123456";  // Mật khẩu hiện tại giả lập

    // Kiểm tra xem các trường có giá trị hợp lệ không
    if (passwordCur !== passwordStored) {
        alert("Mật khẩu hiện tại không chính xác");
        return;
    }

    // Kiểm tra mật khẩu mới
    if (passwordNew.length < 8) {
        alert("Mật khẩu mới phải có ít nhất 8 ký tự");
        return;
    }

    // Kiểm tra mật khẩu nhập lại
    if (passwordNew !== passwordConfirm) {
        alert("Mật khẩu nhập lại không khớp với mật khẩu mới");
        return;
    }

    // Nếu tất cả đều hợp lệ, hiển thị thông báo thành công
    alert("Mật khẩu đã thay đổi thành công!");
}


// Hàm để thêm địa chỉ mới vào Danh sách
function addAddress() {
    const name = document.getElementById('ten').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('diachi').value;
    const isDefault = document.getElementById('dcmacdinh').checked;

    if (name && phone && address) {
        const newAddress = document.createElement('div');
        newAddress.classList.add('sodiachi-info');

        newAddress.innerHTML = `
            <div class="sizechu">
                <h3>${name}</h3>
                <p>${address}</p>
                <p>${phone}</p>
                ${isDefault ? '<span style="color: green;">Địa chỉ mặc định</span>' : ''}
            </div>
            <div>
                <button class="btn"><i class="fas fa-edit"></i> Edit </button>
                <br>      
                <button class="btn-delete"><i class="fas fa-trash"></i> Delete</button>
            </div>`
        ;


       const addressContainer = document.querySelector('.sodiachi');
       const addButtonContainer = document.getElementById('addAD').parentNode;
        addressContainer.insertBefore(newAddress, addButtonContainer);


        newAddress.querySelector('.btn-delete').addEventListener('click', function() {
            addressContainer.removeChild(newAddress);
        });

        newAddress.querySelector('.btn').addEventListener('click', function () {
            const addressElement = this.closest('.sodiachi-info');
            editAddress(addressElement);
        });

        closeForm();


    } else {
        alert("Vui lòng điền đầy đủ thông tin!");
    }
}

// Hàm xóa địa chỉ (sử dụng Event Delegation)
function removeAddress(event) {
    if (event.target.classList.contains('btn-delete')) {
        const addressElement = event.target.closest('.sodiachi-info'); // Lấy phần tử cha của nút Delete
        if (addressElement) {
            addressElement.remove(); // Xóa phần tử khỏi DOM
        }
    }
}
function removeItem(itemId) {
    const item = document.getElementById(itemId);
    if (item) {
      item.remove(); // Xóa phần tử khỏi DOM
    }
  }

// Hàm để đóng form "
function closeForm() {
    document.getElementById('ten').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('diachi').value = '';
    document.getElementById('dcmacdinh').checked = false;

    document.querySelector('.themdiachi').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}

// Hàm để hiển thị form 
function openForm() {
    document.querySelector('.themdiachi').style.display = 'block';
    document.querySelector('.themdiachi-overlay').style.display = 'block';
}

document.querySelector('.sodiachi').addEventListener('click', removeAddress);


document.getElementById('luuAD').addEventListener('click', addAddress);


document.getElementById('huyboAD').addEventListener('click', closeForm);


// Biến để lưu trữ phần tử địa chỉ đang được chỉnh sửa
let currentEditAddress = null;

// Hàm để mở form chỉnh sửa địa chỉ hiện có
function editAddress(addressElement) {
    // Lưu trữ phần tử địa chỉ đang được chỉnh sửa
    currentEditAddress = addressElement;

    // Lấy thông tin hiện tại từ địa chỉ
    const name = addressElement.querySelector('h3').innerText;
    const address = addressElement.querySelector('p:nth-of-type(1)').innerText;
    const phone = addressElement.querySelector('p:nth-of-type(2)').innerText;

    // Điền thông tin vào form chỉnh sửa
    document.getElementById('editUserName').value = name;
    document.getElementById('editPhoneNumber').value = phone;
    document.getElementById('editShippingAddress').value = address;

    // Mở form chỉnh sửa
    document.querySelector('.edit-address-popup').style.display = 'block';
    document.getElementById('edit-address-overlay').style.display = 'block';
}

// Thêm sự kiện cho tất cả các nút Edit hiện có
document.querySelectorAll('.btn').forEach(button => {
    if (button.innerText.trim().toLowerCase() === 'edit') {
        button.addEventListener('click', function () {
            const addressElement = this.closest('.sodiachi-info');
            if (addressElement) {
                editAddress(addressElement);
            }
        });
    }
});

// Sự kiện để đóng form chỉnh sửa khi nhấn vào overlay
document.getElementById('edit-address-overlay').addEventListener('click', function (e) {
    if (e.target === this) {
        document.querySelector('.edit-address-popup').style.display = 'none';
        this.style.display = 'none';
    }
});

function saveEditAddress() {
    if (currentEditAddress) {
        // Lấy thông tin từ các input trong form chỉnh sửa
        const updatedName = document.getElementById('editUserName').value;
        const updatedPhone = document.getElementById('editPhoneNumber').value;
        const updatedAddress = document.getElementById('editShippingAddress').value;

        // Cập nhật thông tin địa chỉ hiện tại
        currentEditAddress.querySelector('h3').innerText = updatedName;
        currentEditAddress.querySelector('p:nth-of-type(1)').innerText = updatedAddress;
        currentEditAddress.querySelector('p:nth-of-type(2)').innerText = updatedPhone;

        // Đóng form chỉnh sửa sau khi lưu thành công
        closeEditForm();
    }
}

function closeEditForm() {
    document.querySelector('.edit-address-popup').style.display = 'none';
    document.getElementById('edit-address-overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    // Thêm sự kiện cho nút "Lưu" trong form chỉnh sửa địa chỉ
    document.getElementById('save-edit-address').addEventListener('click', function() {
        // Thực hiện việc lưu thông tin chỉnh sửa
        saveEditAddress();
    });

    // Thêm sự kiện cho nút "Hủy" trong form chỉnh sửa địa chỉ
    document.getElementById('cancel-edit-address').addEventListener('click', function() {
        closeEditForm();
    });
});