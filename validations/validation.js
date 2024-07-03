// Kiểm tra giá trị rỗng
function checkEmtyValue(value, element) {
    if (value.trim() === "") {
        element.innerHTML = "Không được để trống";
        return false;
    }
    element.innerHTML = "";
    return true;
}

function checkAccountFormat(value, element) {
    let isValid = true;
    let regex = /^\d{4,6}$/; 

    if (!regex.test(value)) {
        element.textContent = "Tài khoản phải là 4 - 6 ký số";
        isValid = false;
    } else {
        element.textContent = "";
    }

    return isValid;
}


// Kiểm tra email
function checkEmail(value, element) {
    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(value)) {
        element.innerHTML = "Email không hợp lệ";
        return false;
    }
    element.innerHTML = "";
    return true;
}

// Kiểm tra định dạng mật khẩu
function checkPassword(value, element) {
    let regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,10}$/;
    if (!regexPassword.test(value)) {
        element.innerHTML = "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
        return false;
    }
    element.innerHTML = "";
    return true;
}

// Kiểm tra định dạng ngày
function checkDate(value, element) {
    let regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[01])\/\d{4}$/;
    if (!regexDate.test(value)) {
        element.innerHTML = "Ngày làm không hợp lệ, định dạng mm/dd/yyyy";
        return false;
    }
    element.innerHTML = "";
    return true;
}

// Kiểm tra khoảng giá trị
function checkRangeValue(value, element, min, max) {
    let isValid = true;
    let numberValue = parseFloat(value.replace(/\./g, '').replace(/,/g, ''));
    if (isNaN(numberValue) || numberValue < min || numberValue > max) {
        element.innerText = `NGT ${min.toLocaleString()} đến ${max.toLocaleString()}`;
        isValid = false;
    } else {
        element.innerText = '';
    }
    return isValid;
}

function checkNumericInput(input) {
    return /^\d+$/.test(input);
}


// Kiểm tra chữ cái
function checkName(value, element) {
    let regexName = /^[a-zA-Z\s]+$/;
    if (!regexName.test(value)) {
        element.innerHTML = "Tên nhân viên phải là chữ";
        return false;
    }
    element.innerHTML = "";
    return true;
}

// Kiểm tra chức vụ hợp lệ
function checkPosition(value, element) {
    const validPositions = ["Sếp", "Trưởng Phòng", "Nhân Viên"];
    if (!validPositions.includes(value)) {
        element.innerHTML = "Chức vụ không hợp lệ";
        return false;
    }
    element.innerHTML = "";
    return true;
}


