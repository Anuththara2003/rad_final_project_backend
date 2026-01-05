# 🎁 Giftify - Backend API

> This is the server-side application for **Giftify**, a smart gift recommendation platform. Built with Node.js, Express, and TypeScript, it handles secure authentication, product management, order processing, and user wishlists.

## 🚀 Live Demo
- **Backend URL:** [Link to your Render/Railway Deployment]
- **Frontend Repository:** [[Link to your Frontend GitHub Repo](https://github.com/Anuththara2003/rad_final_project_frontend)]

---

## 🛠️ Technologies & Tools Used

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Language:** TypeScript
*   **Database:** MongoDB (via Mongoose)
*   **Authentication:** JSON Web Tokens (JWT) & Google OAuth
*   **Email Service:** Nodemailer (Mailtrap for testing)
*   **Security:** Bcrypt.js (Password Hashing), CORS, Protected Routes

---

## ✨ Key Features

*   **🔐 Secure Authentication:**
    *   User Registration & Login (JWT-based).
    *   **Google OAuth 2.0** integration for one-click sign-in.
    *   **Forgot Password & Reset Password** flow using secure email tokens.
    *   Role-based access control (Admin vs User).

*   **🛍️ E-commerce Logic:**
    *   **Product Management:** Admin can Create, Read, Update, and Delete (CRUD) gift items.
    *   **Recommendation Engine:** Filter products based on tags (Age, Occasion, Budget).
    *   **Order Processing:** Handle customer orders with gift-wrap and custom message options.
    *   **Wishlist Management:** Users can add/remove items to their personalized wishlist.

*   **🛡️ Admin Dashboard API:**
    *   **Analytics:** Fetch total revenue, active users, and pending orders.
    *   **User Management:** View registered users and manage their access.
    *   **Order Status:** Update order status (Pending -> Shipped -> Delivered).

---

## ⚙️ Environment Variables

To run this project locally, you will need to add the following environment variables to your `.env` file in the root directory.

| Variable | Description |
| :--- | :--- |
| `PORT` | Port number (e.g., 5000) |
| `MONGO_URI` | MongoDB Connection String |
| `JWT_SECRET` | Secret key for generating tokens |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `EMAIL_HOST` | SMTP Host (e.g., sandbox.smtp.mailtrap.io) |
| `EMAIL_PORT` | SMTP Port (e.g., 2525) |
| `EMAIL_USER` | SMTP Username |
| `EMAIL_PASS` | SMTP Password |

---

## 💻 Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/giftify-backend.git
    cd giftify-backend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    *   Create a `.env` file in the root directory.
    *   Copy the variables from the table above and fill in your keys.

4.  **Run the Server**
    *   **Development Mode:**
        ```bash
        npm run dev
        ```
    *   **Production Build:**
        ```bash
        npm run build
        npm start
        ```
    *   *Server runs on `http://localhost:5000` by default.*

---

## 📂 Project Structure

```bash
src/
├── config/         # Database configuration (db.ts)
├── controller/     # Business logic for API endpoints
│   ├── auth.Controller.ts
│   ├── product.Controller.ts
│   ├── order.Controller.ts
│   ├── userdashboard.Controller.ts
│   └── admindashboard.Controller.ts
├── middleware/     # Auth & Admin verification middleware
│   ├── authenticate.ts
│   └── isAdmin.ts
├── model/          # Mongoose Schemas (User, Product, Order)
├── routes/         # API Route definitions
├── utils/          # Helpers (Email Sender, Token Generator)
└── index.ts        # Application entry point
```
## 🔗 API Endpoints Overview
---
### Auth
*   `POST /api/v1/auth/signup` - Register New User
*   `POST /api/v1/auth/login` - User Login
*   `POST /api/v1/auth/google` - Google OAuth Login
*   `POST /api/v1/auth/forgot-password` - Send Reset Link
*   `PUT /api/v1/auth/resetpassword/:token` - Reset Password

### Products
*   `GET /api/v1/products` - Fetch All Products
*   `POST /api/v1/products` - Add New Product (Admin)
*   `POST /api/v1/products/recommend` - Get AI Recommendations
*   `PUT /api/v1/products/:id` - Update Product Details
*   `DELETE /api/v1/products/:id` - Remove Product

### Orders
*   `POST /api/v1/orders` - Place New Order
*   `GET /api/v1/orders` - Fetch All Orders (Admin)
*   `GET /api/v1/orders/user/:email` - Fetch User Order History
*   `PUT /api/v1/orders/:id` - Update Order Status
*   `DELETE /api/v1/orders/:id` - Delete Order

### Users & Stats
*   `GET /api/v1/users` - Get All Registered Users (Admin)
*   `DELETE /api/v1/users/:id` - Remove User (Admin)
*   `GET /api/v1/users/wishlist/:email` - Fetch User Wishlist
*   `PUT /api/v1/users/wishlist` - Toggle Wishlist Item
*   `GET /api/v1/stats` - Admin Dashboard Statistics
  ---
## 👨‍💻 Author
*   *Sandaru Perera* - [GitHub Profile](https://github.com/Anuththara2003)





