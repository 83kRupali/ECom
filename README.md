
# 🛒 E-Commerce Web Application

A full-stack e-commerce web application built using **React, Node.js, and Firebase**, with **User and Admin dashboards** and secure payment integration using **Cashfree Payment Gateway**.

## 🚀 Features
- User authentication (Login/Signup)  
- Product browsing and cart management  
- Secure online payment integration  
- User dashboard for order tracking  
- Admin dashboard for managing products and orders  

## ⚙️ Tech Stack
- React.js, Redux Toolkit  
- Node.js, Express.js  
- Firebase (Auth & Firestore)  
- Cashfree Payment Gateway


## 📁 Project Structure
```bash
Ecommerce/
│
├── backend/
│ ├── server.js
│ ├── firebaseAdmin.js
│ └── package.json
│
├── ecommerce/ (frontend)
│ ├── src/
│ ├── components/
│ ├── pages/
│ └── package.json

```

## 🔹 1. High-Level Design
```bash
Client (React App)
        ↓
API Layer (Node.js / Express)
        ↓
Database (Firebase Firestore)
        ↓
External Service (Cashfree Payment Gateway)

```

## 🔹 1. Data Flow 🛒 Order Flow
```bash
User → Add to Cart
     ↓
Frontend → Send Order Data
     ↓
Backend → Create Order (status: CREATED)
     ↓
Cashfree → Payment Page
     ↓
User Pays
     ↓
Cashfree → Redirect
     ↓
Frontend → Call /verify
     ↓
Backend → Update Order (PAID)

```


<img width="960" height="504" alt="1" src="https://github.com/user-attachments/assets/8ac8bc3f-67d5-4373-9491-b847e3854ba0" />
<img width="960" height="504" alt="2" src="https://github.com/user-attachments/assets/b237f348-4a63-46d1-b678-5a931f0fec9d" />
<img width="960" height="504" alt="3" src="https://github.com/user-attachments/assets/990ddcb7-e020-4760-8460-a7b8c8cff156" />
<img width="960" height="504" alt="4" src="https://github.com/user-attachments/assets/abf98568-f9ab-42b8-a0fb-61c2d6b13565" />
<img width="960" height="504" alt="5" src="https://github.com/user-attachments/assets/3538a23c-8dbe-424d-bbd4-2a87cb506bf4" />
<img width="960" height="504" alt="6" src="https://github.com/user-attachments/assets/6d93375f-e903-4bbb-9203-5df043bc5458" />
<img width="960" height="504" alt="7" src="https://github.com/user-attachments/assets/21aca91b-8a13-42d2-8dfb-c6d42754d09b" />




