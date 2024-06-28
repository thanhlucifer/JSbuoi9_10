let arrNhanVien = getLocalStorage();
renderarrNhanVien();

function getValueNhanVien() {
    //su dung querySelectorAll
    let arrField = document.querySelectorAll('#formQLNV input, #formQLNV select');
    //console.log(arrField);
    let nhanVien = new NhanVien();
    let isValid = true;
    //phep toan nhi phan
    
    for (let field of arrField) {
        //console.log(field.id);
        let { id, value } = field;
        //thuc hien lay data actribuite cua input
        let dataValidation = field.getAttribute('data-validation');
        console.log(dataValidation);
        nhanVien[id] = value;

        //thuc hien validation
        //thuc hien tu lenh DOM dang co toi cac input va select, se su dung parentElement de DOM toi the cha gan nhat
        let thecha = field.parentElement;
        let thespanthongbao = thecha.querySelector('span');
        let isEmty = checkEmtyValue(value, thespanthongbao);
        isValid &= isEmty
        if (!isEmty) {
            continue;
        }
        // if (id === 'txtMaSV') {
        //     isValid &= checkMinMaxValue(value, thespanthongbao, 0, 10);
        // }
        // else if (id ==='txtEmail'){
        //     isValid &= checkEmail(value, thespanthongbao);
        // }
        if (dataValidation == 'doDai') {
            isValid &= checkMinMaxValue(value, thespanthongbao, 0, 10);
        }
        else if (dataValidation == 'email') {
            isValid &= checkEmail(value, thespanthongbao);
        }
    }
    //neu chua nhap du lieu thi khong thuc hien
    if (!isValid) {
        return;
    }
    return nhanVien;
}



document.getElementById('btnThemNV').onclick = function (event) {
    event.preventDefault();
    //thuc hien lay thong tin sinh vien
    let nhanVien = getValueNhanVien();
    if (!nhanVien) {
        return;
    }
    //console.log(sinhVien);
    arrNhanVien.push(nhanVien);
    //luu tru vao localStorage
    saveLocalStorage()
    //hien thi du lieu
    renderarrNhanVien(arrNhanVien);
    hienthiThongbao('Đã thêm Nhan viên thành công', 2000, 'bg-success')
    //phuong thuc reset
    formQLSV.reset();

}


function getLocalStorage(key = 'arrNhanVien') {
    let dataLocal = localStorage.getItem(key);
    let newDatalocal = JSON.parse(dataLocal);
    console.log(newDatalocal);
    return newDatalocal ? newDatalocal : [];
}

function saveLocalStorage(key = 'arrNhanVien', value = arrNhanVien) {
    let stringJson = JSON.stringify(value);
    localStorage.setItem(key, stringJson);
}

function renderarrNhanVien(arr = arrNhanVien) {
    let content = '';
    for (let nhanVien of arr) {
        //destructuring
        let newNhanVien = new NhanVien();
        Object.assign(newNhanVien, nhanVien);
        let { tknv, name, email, datepicker, chucvu } = newNhanVien;
        let tongLuong = newNhanVien.tinhLuong();
        let xepLoai = newNhanVien.xepLoai();
        content += `
            <tr>
                <td>${tknv}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${datepicker}</td>
                <td>${chucvu}</td>
                <td>${tongLuong}</td>
                <td>${xepLoai}</td>
                <td class="d-flex justify-content-center">
                    <button class="btn btn-danger mx-2" onclick="deleteNhanVien('${tknv}')">Xoá</button>
                    <button class="btn btn-warning" onclick="getinfoNhanVien('${tknv}')">Sửa</button>
                </td>
            </tr>
        `
    }
    document.getElementById('tableDanhSach').innerHTML = content;
}

function hienthiThongbao(text, duration, className) {
    Toastify({
        text,
        duration,
        className,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "orange"
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

function deleteNhanVien(tknv) {
    let index = arrNhanVien.findIndex(function (nhanVien) {
        return nhanVien.tknv === tknv;
    });
    if (index !== -1) {
        arrNhanVien.splice(index, 1);
        saveLocalStorage();
        renderarrNhanVien();
        hienthiThongbao('Đã xóa Nhân viên thành công', 2000, 'bg-danger')
    }
}

document.getElementById('btnTimNV').onclick = function () {
    let searchType = document.getElementById('searchName').value.trim();
    let searchTypeNormalized = removeVietnameseTones(searchType).toLowerCase();
    
    let filteredNhanVien = arrNhanVien.filter(function (nhanVien) {
        let newNhanVien = new NhanVien();
        Object.assign(newNhanVien, nhanVien);
        let xepLoaiNormalized = removeVietnameseTones(newNhanVien.xepLoai()).toLowerCase();
        return xepLoaiNormalized === searchTypeNormalized;
    });
    
    renderarrNhanVien(filteredNhanVien);
}
