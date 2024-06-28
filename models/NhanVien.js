class NhanVien {
    constructor(tknv, name, email, password, datepicker, luongCB, chucvu, giolam) {
      this.tknv = tknv;
      this.name = name;
      this.email = email;
      this.password = password;
      this.datepicker = datepicker;
      this.luongCB = luongCB;
      this.chucvu = chucvu;
      this.giolam = giolam;
    }
  
    tinhLuong = function() {
      if (this.chucvu === "Sếp") {
        return this.luongCB * 3;
      } else if (this.chucvu === "Trưởng phòng") {
        return this.luongCB * 2;
      } else {
        return this.luongCB;
      }
    }

    xepLoai = function() {
      let giolam = parseFloat(this.giolam); // Ép chuỗi kí tự thành số
  
      if (giolam >= 192) {
          return "Xuất sắc";
      } else if (giolam < 192 && giolam >= 176) {
          return "Giỏi";
      } else if (giolam < 176 && giolam >= 160) {
          return "Khá";
      } else {
          return "Trung bình";
      }
  }
  
  }
  
