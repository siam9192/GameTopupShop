# TopUp Shop - E-commerce Platform

A modern and secure **E-commerce TopUp Shop** that allows customers to buy top-ups, offers, and manage their wallet. Includes a robust admin panel for managing users, products, and application settings.

---

## 🚀 Features

### 👤 User Roles & Access
- **Roles:**  
  - **SuperAdmin** – Full control over the application, manage all users, settings, and administrators  
  - **Admin** – Manage products, offers, and customers  
  - **Moderator** – Moderate content, manage orders  
  - **Customer** – Browse products, manage wallet, place orders
- Role-based access control ensures secure authorization and limited access based on role

### 🔐 Authentication
- Secure authentication with **email/password**  
- OAuth login with **Google** and **Facebook**  
- Password encryption and secure session management

### 🛒 Products & Offers
- Products: Top-ups (mobile, gaming, vouchers)  
- Special offers and discounts  
- Product categorization for easy browsing  
- Admins can **add, edit, delete** products and offers

### 💰 Wallet & Payments
- Each customer has a **wallet**  
- Add money via **live payment gateway** (Stripe, PayPal, etc.)  
- Manual payment option (admin verified)  
- Wallet balance used to place orders instantly

### 🛍️ Orders
- Customers can place orders using wallet or direct payment  
- Order history with status updates  
- Admin panel for managing orders

### ⚙️ Application Settings
- **Only SuperAdmin** can:  
  - Manage all users (customers & admins)  
  - Create new administrators  
  - Configure app settings  
- Customizable application options

### 🎨 UI & UX
- Fully **responsive design** for mobile, tablet, and desktop  
- **Light/Dark mode** support  
- Modern and intuitive interface

### 📊 Analytics & Reporting
- Dashboard for admins to view user activity  
- Track wallet transactions  
- Product and order analytics

---

## 🏗️ Tech Stack

### Frontend
-  Next.js  
- MUI + TailwindCSS 
- Tansartack Query 

### Backend
- Node.js + Express 
- JWT Authentication  
- OAuth for Google & Facebook  
- Role-based access control

### Database
- MongoDB

### Payment
- Live payment gateway integration (Stripe, PayPal)  
- Manual payment verification

---


### Project Installation 
#### Client
```bash
git clone https://github.com/siam9192/GameTopupShop-Client.git
npm install
```
#### Backend
```bash
git clone https://github.com/siam9192/GameTopupShop-Backend.git
npm install
```

### How to run backend ?

``
cd backend
npm install
``
- Create a .env file inside the backend/ folder (not the project root unless specified).
- Copy the variables from .env.local (if provided) and paste them into your .env file.
- Set appropriate values for each environment variable 

### 🔧 Start the Backend Server

``
npm run dev 
``
Once the command runs successfully, backend server should be up and running (typically on http://localhost:5000 or whichever port is set in .env).

