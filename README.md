# Expense Tracker - Frontend

A modern, responsive web application for managing personal expenses and budgets, built with React and Vite.

## 🚀 Key Features

-   **Interactive Dashboard**:
    -   Summary cards for total monthly spending.
    -   Visual breakdown of expenses by category using **Recharts (Bar Chart & Spending Chart)**.
    -   Dynamic स्वागत (Greeting) based on logged-in user.
-   **Expense Management**:
    -   View all expenses in a clean, paginated table.
    -   Add, edit, and delete expenses with ease.
-   **Category Organization**:
    -   Customizable categories with color coding.
    -   CRUD operations for categories.
-   **Secure Authentication**:
    -   JWT-based Login and Registration.
    -   **Forgot Password** UI flow.
    -   Automatic token attachment via **Axios Interceptors**.
-   **Responsive Design**: Built with **Tailwind CSS** for a premium look and feel on all devices.

## 🛠️ Tech Stack

-   **Framework**: React (using Vite)
-   **Styling**: Tailwind CSS
-   **Charts**: Recharts
-   **API Client**: Axios
-   **Routing**: React Router DOM

## 💻 Getting Started (Frontend)

### Prerequisites
- **Node.js** (v18+)
- **npm** or **yarn**

### Setup Instructions
1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd expense-tracker-frontend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    - Create a `.env` file in the root directory.
    - Add the backend API URL:
    ```env
    VITE_BACKEND_URL=http://localhost:8080/api
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 🏗️ Project Structure
- `src/components`: Reusable UI components (Navbar, CategoryForm, etc.)
- `src/pages`: Main application pages (Dashboard, Expenses, Login, etc.)
- `src/services`: API configuration and service calls.
- `src/assets`: Static assets and global styles.