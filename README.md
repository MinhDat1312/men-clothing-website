# 👔 **Website Thời Trang Nam**

> Một dự án thương mại điện tử học tập chuyên về **thời trang nam**, phát triển trong khuôn khổ môn _Lập trình Web_ tại **Đại học Công nghiệp TP.HCM (IUH)**.

---

## 📌 Mục lục

- [📋 Giới thiệu dự án](#-giới-thiệu-dự-án)
- [🛍️ Danh mục sản phẩm](#️-danh-mục-sản-phẩm)
- [✨ Tính năng chính](#-tính-năng-chính)
- [🏗️ Cấu trúc thư mục](#️-cấu-trúc-thư-mục)
- [🚀 Hướng dẫn chạy dự án](#-hướng-dẫn-chạy-dự-án)
- [🎯 Hướng dẫn sử dụng](#-hướng-dẫn-sử-dụng)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [🌟 Tính năng nổi bật](#-tính-năng-nổi-bật)
- [👥 Thông tin nhóm](#-thông-tin-nhóm)
- [📄 Tài liệu báo cáo](#-tài-liệu-báo-cáo)
- [📞 Liên hệ](#-liên-hệ)

---

## 📋 Giới thiệu dự án

Dự án xây dựng một **website thương mại điện tử** bán thời trang nam với đầy đủ tính năng từ đăng ký tài khoản, xem sản phẩm, mua sắm đến thanh toán. Giao diện responsive hiện đại, trải nghiệm người dùng thân thiện và dễ sử dụng.

---

## 🛍️ Danh mục sản phẩm

- 👔 **Áo sơ mi** – Công sở, lịch sự, thường ngày
- 👕 **Áo thun** – Đa dạng phong cách: basic đến premium
- 👖 **Quần dài** – Quần âu, jeans, kaki
- 🩳 **Quần short** – Thể thao, đi chơi
- ⚽ **Đồ thể thao** – Thoải mái, năng động

---

## ✨ Tính năng chính

### 🔐 Người dùng

- Đăng ký / Đăng nhập
- Quản lý thông tin cá nhân
- Xem lịch sử đơn hàng

### 🛒 Mua sắm

- Xem sản phẩm theo danh mục
- Chi tiết sản phẩm
- Thêm/Xóa sản phẩm trong giỏ hàng
- Danh sách yêu thích
- Tìm kiếm, sắp xếp sản phẩm

### 💳 Thanh toán

- Cập nhật số lượng sản phẩm trong giỏ
- Form thanh toán đầy đủ
- Xác nhận đơn hàng

### 📱 Giao diện

- **Responsive**: Tương thích Mobile, Tablet, Desktop
- **UI/UX**: Giao diện trực quan, hiện đại
- **Framework**: Bootstrap 5

---

## 🏗️ Cấu trúc thư mục

```
├── index.html                      # Trang đăng nhập/đăng ký chính
├── assets/
│   ├── css/                        # Stylesheets
│   │   ├── bootstrap.min.css       # Bootstrap framework
│   │   ├── base.css               # CSS cơ bản
│   │   ├── main.css               # CSS chính
│   │   ├── responsive.css         # CSS responsive
│   │   ├── login.css              # CSS đăng nhập
│   │   ├── products.css           # CSS trang sản phẩm
│   │   ├── detail.css             # CSS chi tiết sản phẩm
│   │   ├── payment.css            # CSS thanh toán
│   │   ├── favourite.css          # CSS yêu thích
│   │   └── myaccount.css          # CSS tài khoản
│   ├── html/                      # Các trang HTML
│   │   ├── home.html              # Trang chủ
│   │   ├── products.html          # Trang danh sách sản phẩm
│   │   ├── aoSoMi.html           # Trang áo sơ mi
│   │   ├── aoThun.html           # Trang áo thun
│   │   ├── quanDai.html          # Trang quần dài
│   │   ├── quanShort.html        # Trang quần short
│   │   ├── theThao.html          # Trang thể thao
│   │   ├── detailProduct.html     # Trang chi tiết sản phẩm
│   │   ├── searchProduct.html     # Trang tìm kiếm
│   │   ├── favourite.html         # Trang yêu thích
│   │   ├── payment.html           # Trang thanh toán
│   │   ├── myaccount.html         # Trang tài khoản
│   │   ├── boughtProduct.html     # Trang sản phẩm đã mua
│   │   └── introduce.html         # Trang giới thiệu
│   ├── js/                        # JavaScript files
│   │   ├── jquery-3.7.1.min.js   # jQuery library
│   │   ├── bootstrap.min.js       # Bootstrap JS
│   │   ├── main.js                # JavaScript chính
│   │   ├── login.js               # JS đăng nhập
│   │   ├── product.js             # JS sản phẩm
│   │   ├── products.js            # JS danh sách sản phẩm
│   │   ├── cart.js                # JS giỏ hàng
│   │   ├── payment.js             # JS thanh toán
│   │   ├── searchProduct.js       # JS tìm kiếm
│   │   └── sort.js                # JS sắp xếp
│   ├── img/                       # Hình ảnh
│   │   ├── Logo1.png              # Logo chính
│   │   ├── Logo2.png              # Logo phụ
│   │   ├── carousel/              # Hình slider
│   │   ├── aoSoMi/               # Hình áo sơ mi
│   │   ├── aoThun/               # Hình áo thun
│   │   ├── quanDai/              # Hình quần dài
│   │   ├── quanShort/            # Hình quần short
│   │   └── sport/                # Hình thể thao
│   └── font/                      # Fonts và icons
│       ├── roboto.css
│       └── fontawesome-free-6.5.1-web/
```

---

## 🚀 Hướng dẫn chạy dự án

### ⚙️ Yêu cầu hệ thống

- Trình duyệt hiện đại (Chrome, Firefox, Edge, Safari)
- Web server: **Live Server** (VS Code) hoặc **XAMPP**

### ▶️ Cách chạy

1. **Clone dự án**:

   ```bash
   git clone https://github.com/MinhDat1312/men-clothing-website.git
   ```

2. **Mở bằng VS Code**:

   - `File → Open Folder` → chọn thư mục dự án

3. **Chạy bằng Live Server** _(khuyến nghị)_:

   - Cài extension Live Server
   - Chuột phải `index.html` → "Open with Live Server"

4. **Hoặc chạy bằng XAMPP**:
   - Copy vào thư mục `htdocs`
   - Mở `http://localhost/[tên-thư-mục]`

---

## 🎯 Hướng dẫn sử dụng

| 📍 Bước | Mô tả                                     |
| ------- | ----------------------------------------- |
| 1️⃣      | Mở `index.html` để đăng nhập hoặc đăng ký |
| 2️⃣      | Duyệt danh mục tại `home.html`            |
| 3️⃣      | Xem sản phẩm, thêm vào giỏ, yêu thích     |
| 4️⃣      | Kiểm tra và thanh toán đơn hàng           |
| 5️⃣      | Xem đơn hàng đã mua, cập nhật tài khoản   |

---

## 🛠️ Công nghệ sử dụng

| Thành phần    | Công nghệ                                  |
| ------------- | ------------------------------------------ |
| **Ngôn ngữ**  | HTML5, CSS3, JavaScript (ES6)              |
| **Thư viện**  | jQuery 3.7.1, Font Awesome 6.5.1, IMask.js |
| **Framework** | Bootstrap 5                                |
| **Thiết kế**  | Mobile-first, responsive                   |
| **Font chữ**  | Roboto                                     |

---

## 🌟 Tính năng nổi bật

✅ Giao diện hoàn toàn responsive  
✅ Hệ thống đăng nhập/đăng ký và quản lý người dùng  
✅ Giỏ hàng với **LocalStorage**  
✅ Tìm kiếm, lọc và sắp xếp sản phẩm  
✅ Yêu thích sản phẩm  
✅ Thanh toán đơn giản, dễ dùng  
✅ Giao diện hiện đại, dễ tương tác

---

## 👥 Thông tin nhóm

- 👤 **Nguyễn Thắng Minh Đạt** – _22697101_
- 🏫 **Trường**: Đại học Công nghiệp TP.HCM (IUH)
- 📘 **Môn học**: Lập trình Web

---

## 📄 Tài liệu báo cáo

- 📄 `STT04_22697101_NguyenThangMinhDat_04.docx` – Điểm báo cáo
- 📄 `STT04_22697101_NguyenThangMinhDat_ThoiTrangNam.docx` – Báo cáo chi tiết

---

## 📞 Liên hệ

- 📧 Email: [nguyenthangdat84@gmail.com](mailto:nguyenthangdat84@gmail.com)
- 🐙 GitHub: [github.com/MinhDat1312](https://github.com/MinhDat1312)

---

> ⚠️ **Lưu ý**: Dự án chỉ phục vụ mục đích học tập, không sử dụng cho thương mại thực tế.
