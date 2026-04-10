# AkinoxAdmin - Akinox Watches Admin Panel

## Overview
AkinoxAdmin is the **React.js-based admin dashboard** for the Akinox Watches E-Commerce Platform. It provides a centralized interface for managing products, orders, users, and other crucial aspects of the e-commerce platform.

## Features
- **Admin Authentication** (Secure login with JWT authentication)
- **Dashboard Overview** (Insights on orders, users, and sales)
- **Product Management** (Add, edit, delete watches)
- **Order Management** (Track & update order status)
- **User Management** (View and manage customers & admins)

## Tech Stack
- **Frontend:** React.js, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js (Connected to AkinoxBackend API)
- **State Management:** Redux Toolkit
- **Authentication:** JWT (JSON Web Tokens)
- **API Handling:** Axios
- **Data Visualization:** Chart.js

## Installation & Setup
### Prerequisites
- Node.js & npm installed
- Backend API running ([AkinoxBackend](https://github.com/KGD2417/AkinoxBackend))

### Clone the Repository
```sh
git clone https://github.com/KGD2417/AkinoxAdmin.git
cd AkinoxAdmin
```

### Install Dependencies
```sh
npm install
```

### Run the Admin Panel
```sh
npm start
```

## Folder Structure
```
src/
│── components/       # Reusable UI components
│── pages/           # Main pages (Dashboard, Products, Orders, Users)
│── redux/           # State management (slices, store)
│── api/             # API request handlers
│── assets/          # Images and icons
│── styles/          # Tailwind and custom styles
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
For any queries, contact [your email or GitHub profile link].

