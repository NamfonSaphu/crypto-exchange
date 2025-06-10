# Crypto Exchange Backend API

ระบบจำลอง Backend สำหรับการซื้อขายคริปโต สร้างด้วย:

- Node.js + Express  
- Sequelize ORM  
- MySQL (ผ่าน Docker)  
- Docker Compose  
- Seed Data สำหรับทดสอบระบบ  

---

## 📦 Tech Stack

- Node.js  
- Express.js  
- Sequelize ORM  
- MySQL 8  
- mysql2 (MySQL driver สำหรับ Node.js)  
- Docker & Docker Compose  

---

## 🚀 วิธีใช้งาน (Run with Docker)

### สิ่งที่ต้องติดตั้งก่อน

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (สำหรับ Windows/Mac)
- Git
- Node.js (เวอร์ชัน 16+ แนะนำ)

---

### คำสั่งทั้งหมดรวมในสคริปต์เดียว

```bash
# 1. Clone โปรเจกต์
git clone https://github.com/NamfonSaphu/crypto-exchange.git
cd crypto-exchange

# 2. รัน Docker services (MySQL + phpMyAdmin)
docker compose up -d

# 3. ติดตั้ง dependencies Node.js
npm install

# 4. รัน seed ข้อมูลตัวอย่าง
node seed/seed.js
```

### 🧪 Usage
#### 1. เข้าใช้งาน phpMyAdmin
เปิดเว็บเบราว์เซอร์และเข้า URL: http://localhost:8080
#### 2. Login ด้วย
Server: db
Username: root
Password: root
#### 3. ตรวจสอบฐานข้อมูลและตาราง
ตรวจสอบ database ชื่อ tutorial และตารางต่าง ๆ เพื่อดูข้อมูลที่ seed ไว้

---
### 🔄 Stop and Reset (ถ้าต้องการล้างข้อมูลและเริ่มใหม่)
```bash
docker compose down -v
docker compose up -d
node seed/seed.js
```




