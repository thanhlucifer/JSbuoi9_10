let arrNhanVien = getLocalStorage();
renderarrNhanVien();


function getValueNhanVien() {
    // Sử dụng querySelectorAll
    let arrField = document.querySelectorAll('#formQLNV input, #formQLNV select');
    let nhanVien = new NhanVien();
    let isValid = true;

    for (let field of arrField) {
        let { id, value } = field;
        let dataValidation = field.getAttribute('data-validation');
        nhanVien[id] = value;

        let thecha = field.parentElement.parentElement; 
        let thespanthongbao = thecha.querySelector('span'); 
        let isEmty = checkEmtyValue(value, thespanthongbao);

        isValid &= isEmty;
        if (!isEmty) {
            continue;
        }

        if (dataValidation === 'doDai') {
            isValid &= checkAccountFormat(value, thespanthongbao);
        } else if (dataValidation === 'email') {
            isValid &= checkEmail(value, thespanthongbao);
        } else if (dataValidation === 'password') {
            isValid &= checkPassword(value, thespanthongbao);
        } else if (dataValidation === 'date') {
            isValid &= checkDate(value, thespanthongbao);
        } else if (dataValidation === 'rangeLuong') {
            isValid &= checkRangeValue(value, thespanthongbao, 1000000, 20000000);
            isValid &= checkNumericInput(value); // Kiểm tra nhập vào phải là số
        } else if (dataValidation === 'name') {
            isValid &= checkName(value, thespanthongbao);
        } else if (dataValidation === 'position') {
            isValid &= checkPosition(value, thespanthongbao);
        } else if (dataValidation === 'rangeGioLam') {
            isValid &= checkRangeValue(value, thespanthongbao, 80, 200);
        }
    }

    if (!isValid) {
        return;
    }
    return nhanVien;
}

let formQLNV = document.getElementById("formQLNV");

document.getElementById('btnThemNV').onclick = function (event) {
    event.preventDefault();
    let nhanVien = getValueNhanVien();
    if (!nhanVien) {
        return;
    }
    arrNhanVien.push(nhanVien);
    saveLocalStorage()
    renderarrNhanVien(arrNhanVien);
    hienthiThongbao('Đã thêm Nhân viên thành công', 2000, 'bg-success')
    formQLNV.reset();

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

function getinfoNhanVien(tknv) {
    let nhanVien = arrNhanVien.find((item, index) => {
        return item.tknv === tknv;
    });
    if (nhanVien) {
        $(`#myModal`).modal('show');
        let arrField = document.querySelectorAll('#formQLNV input, #formQLNV select');
        for (let item of arrField) {
            let { id } = item;
            item.value = nhanVien[id];
        }
        document.getElementById('tknv').readOnly = true;
        formQLNV.setAttribute('data-tknv', tknv);
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

document.getElementById('btnCapNhat').onclick = function (event) {
    event.preventDefault();
    let nhanVien = getValueNhanVien();
    if (!nhanVien) {
        return;
    }
    let tknv = formQLNV.getAttribute('data-tknv');
    let index = arrNhanVien.findIndex(nv => nv.tknv === tknv);
    if (index !== -1) {
        // Kiểm tra validation cho từng trường
        let isValid = true;
        let arrField = document.querySelectorAll('#formQLNV input, #formQLNV select');
        
        for (let field of arrField) {
            let { id, value } = field;
            let dataValidation = field.getAttribute('data-validation');
            
            if (dataValidation === 'email') {
                let thecha = field.parentElement.parentElement;
                let thespanthongbao = thecha.querySelector('span');
                isValid &= checkEmail(value, thespanthongbao);
            } else if (dataValidation === 'password') {
                let thecha = field.parentElement.parentElement;
                let thespanthongbao = thecha.querySelector('span');
                isValid &= checkPassword(value, thespanthongbao);
            } else if (dataValidation === 'date') {
                let thecha = field.parentElement.parentElement;
                let thespanthongbao = thecha.querySelector('span');
                isValid &= checkDate(value, thespanthongbao);
            } else if (dataValidation === 'rangeLuong') {
                let thecha = field.parentElement.parentElement;
                let thespanthongbao = thecha.querySelector('span');
                isValid &= checkRangeValue(value, thespanthongbao, 1000000, 20000000);
                isValid &= checkNumericInput(value);
            } else if (dataValidation === 'name') {
                let thecha = field.parentElement.parentElement;
                let thespanthongbao = thecha.querySelector('span');
                isValid &= checkName(value, thespanthongbao);
            } else if (dataValidation === 'position') {
                let thecha = field.parentElement.parentElement;
                let thespanthongbao = thecha.querySelector('span');
                isValid &= checkPosition(value, thespanthongbao);
            } else if (dataValidation === 'rangeGioLam') {
                let thecha = field.parentElement.parentElement;
                let thespanthongbao = thecha.querySelector('span');
                isValid &= checkRangeValue(value, thespanthongbao, 80, 200);
            }
        }
        
        if (!isValid) {
            return;
        }
        
        // Cập nhật thông tin nhân viên trong mảng
        arrNhanVien[index] = nhanVien;
        saveLocalStorage();
        renderarrNhanVien(arrNhanVien);
        hienthiThongbao('Đã cập nhật Nhân viên thành công', 2000, 'bg-success');
    }
    
    formQLNV.removeAttribute('data-tknv');
    formQLNV.reset();
};
