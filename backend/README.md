# AkinoxBackend - Akinox Watches E-Commerce API

## Overview
AkinoxBackend is the **Node.js & Express.js backend** for the Akinox Watches E-Commerce Platform. It provides a secure and efficient API for user authentication, product management, order processing, and admin functionalities.

## Features
- **User Authentication** (JWT-based login/register)
- **Product Management** (CRUD operations for watches)
- **Order Management** (Cart, checkout, and payment handling)
- **Admin Panel API** (Manage users, orders, and products)
- **Payment Integration** (Stripe/Razorpay support)

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Tokens), bcrypt
- **API Handling:** RESTful API, Axios
- **Payment Gateway:** Stripe/Razorpay

## Installation & Setup
### Prerequisites
- Node.js & npm installed
- MongoDB database connection

### Clone the Repository
```sh
git clone https://github.com/KGD2417/AkinoxBackend.git
cd AkinoxBackend
```

### Install Dependencies
```sh
npm install
```

### Environment Variables
Create a `.env` file and configure the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET=your_stripe_api_key
```

### Run the Server
```sh
npm start
```

## Folder Structure
```
src/
│── controllers/       # API route controllers
│── models/           # Mongoose schemas/models
│── routes/           # Express routes
│── middleware/       # Authentication & security middleware
│── config/           # Database & environment config
│── utils/            # Helper functions
```

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Open a Pull Request.

## License
This project is licensed under the MIT License.

## Contact
For any queries, contact kshitijdesai179@gmail.com.

