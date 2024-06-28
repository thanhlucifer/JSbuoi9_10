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
  
    tinhTongLuong() {
      let tongLuong = 0;
  
      switch (this.chucvu) {
        case "Giám đốc":
          tongLuong = this.luongCB * 3;
          break;
        case "Trưởng phòng":
          tongLuong = this.luongCB * 2;
          break;
        case "Nhân viên":
          tongLuong = this.luongCB;
          break;
        default:
          console.error("Chức vụ không hợp lệ!");
      }
  
      return tongLuong;
    }

    xepLoai() {
        if (this.giolam >= 192) {
          return "Xuất sắc";
        } else if (this.giolam >= 176) {
          return "Giỏi";
        } else if (this.giolam >= 160) {
          return "Khá";
        } else {
          return "Trung bình";
        }
      }
  }
  
