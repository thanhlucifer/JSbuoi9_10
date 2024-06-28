
function checkEmtyValue(value, span) {
    if (value) {
        //tham so span dai dien cho mot cau lenh DOM thoi the span thong bao
        span.innerHTMl = "";
        return true;
    } else {
        span.innerHTML = "Vui long khong bo trong truong nay";
        return false;
    }   
}

function checkMinMaxValue(value, span, min, max) {
    let dodaikytu = value.length;
    if (dodaikytu >= min && dodaikytu <= max) {
        span.innerHTML = "";
        return true;
    } else {
        span.innerHTML = `Vui long nhap tu ${min} den ${max} ky tu`;
        return false;
    }
}

function checkEmail(value, span) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // let regexFacebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
    if (regexEmail.test(value)) {
        span.innerHTML = "";
        return true;
    } else {
        span.innerHTML = "Email khong hop le";
        return false;
    }
}