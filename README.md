# Test Frontend Dibuiltadi

A modern React frontend application built with Vite, Redux Toolkit, and Tailwind CSS for managing customer transactions and summaries.

## 🚀 Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **SweetAlert2** - Beautiful alerts and modals
- **JWT Decode** - JWT token handling

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/adi94958/test-frontend-dibuiltadi.git
cd test-frontend-dibuiltadi
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/           # Basic UI components
│   ├── molecules/       # Composite UI components
│   └── organisms/       # Complex UI components
├── constants/           # Application constants
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── messages/           # Message constants
├── pages/              # Page components
├── redux/              # Redux store, slices, and reducers
├── services/           # API services
├── styles/             # CSS and styling
├── templates/          # Page templates
├── utils/              # Utility functions
└── validation/         # Form validation schemas
```

## 🔐 Authentication

The application supports user authentication with the following features:

### Login

- **Method**: POST
- **Path**: `/api/v1/auth/login`
- **Body**: `{ phone, password }`

### Register (Optional)

- **Method**: POST
- **Path**: `/api/v1/auth/register`
- **Body**: `{ name, phone, email, address, password }`

### Logout

- **Method**: POST
- **Path**: `/api/v1/auth/logout`

### Get Profile

- **Method**: GET
- **Path**: `/api/v1/auth/profile`

## 📊 API Endpoints Guide

### 1. Authentication Endpoints

| Method | Path                    | Description        | Body                                                        |
| ------ | ----------------------- | ------------------ | ----------------------------------------------------------- |
| POST   | `/api/v1/auth/register` | Create new account | `name`, `phone`, `email`, `address`, `password`             |
| POST   | `/api/v1/auth/login`    | User login         | `phone`, `password`                                         |
| POST   | `/api/v1/auth/logout`   | User logout        | -                                                           |
| GET    | `/api/v1/auth/profile`  | Get user profile   | -                                                           |
| PUT    | `/api/v1/auth/password` | Update password    | `currentPassword`, `newPassword`, `newPasswordConfirmation` |

### 2. Master Data Endpoints

| Method | Path                     | Description        |
| ------ | ------------------------ | ------------------ |
| GET    | `/api/v1/provinces/list` | Get provinces list |
| GET    | `/api/v1/cities/list`    | Get cities list    |
| GET    | `/api/v1/sales/list`     | Get sales list     |
| GET    | `/api/v1/customers/list` | Get customers list |

### 3. Customer Management

| Method | Path                       | Description                       | Parameters/Body                                                                                                      |
| ------ | -------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v1/customers`        | Get all customers with pagination | `page`, `perPage`, `sortBy`, `sortDirection`, `startDate`, `endDate`, `search`, `provinceCode`, `cityCode`           |
| POST   | `/api/v1/customers`        | Create new customer               | `name`, `identityNo`, `npwp`, `email`, `phone`, `mobile_phone`, `provinceCode`, `cityCode`, `address`, `companyType` |
| GET    | `/api/v1/customers/{code}` | Get customer detail               | -                                                                                                                    |
| PUT    | `/api/v1/customers/{code}` | Update customer                   | `name`, `identityNo`, `npwp`, `email`, `phone`, `mobile_phone`                                                       |

### 4. Transaction Management

| Method | Path                                 | Description                          | Parameters                                                                                                  |
| ------ | ------------------------------------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| GET    | `/api/v1/transactions`               | Get all transactions with pagination | `page`, `perPage`, `sortBy`, `sortDirection`, `startDate`, `endDate`, `search`, `customerCode`, `salesCode` |
| GET    | `/api/v1/transactions/{referenceNo}` | Get transaction detail               | -                                                                                                           |

### 5. Summary Reports

| Method | Path                                    | Description                  | Parameters                            |
| ------ | --------------------------------------- | ---------------------------- | ------------------------------------- |
| GET    | `/api/v1/summaries/daily-transactions`  | Daily transactions summary   | `startDate`, `endDate`, `salesCode`   |
| GET    | `/api/v1/summaries/montly-transactions` | Monthly transactions summary | `startMonth`, `endMonth`, `salesCode` |
| GET    | `/api/v1/summaries/yearly-transactions` | Yearly transactions summary  | `year`, `salesCode`                   |
| GET    | `/api/v1/summaries/top-customers`       | Top customers summary        | `startDate`, `endDate`, `limit`       |

## 🔧 Development Features

### State Management

- **Redux Toolkit** for centralized state management
- Async thunks for API calls
- Separate slices for different domains (auth, customers, transactions, summary)

### Routing & Protection

- **React Router** for navigation
- **PrivateRoute** component for authentication protection
- Lazy loading for better performance

### UI Components

- **Atomic Design** pattern (Atoms, Molecules, Organisms)
- **Tailwind CSS** for styling
- Responsive design for mobile and desktop

### Pagination & Filtering

- Custom pagination hooks
- Advanced filtering capabilities
- Search functionality

### Error Handling

- Centralized API error handling
- User-friendly error messages
- SweetAlert2 for notifications

## 🎯 Usage Examples

### Making API Calls

```javascript
import { customerService } from "../services/apis/customerService";

// Get customers with pagination
const customers = await customerService.getCustomers({
  page: 1,
  perPage: 10,
  search: "john",
});

// Get customer detail
const customer = await customerService.getCustomerDetail("CUST001");
```

### Using Redux

```javascript
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from "../redux/slices/customerSlice";

const Component = () => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getAllCustomers({ page: 1, perPage: 10 }));
  }, [dispatch]);
};
```

### Using Pagination Hook

```javascript
import { useCustomerPagination } from "../hooks/usePagination";

const CustomerPage = () => {
  const {
    filters,
    pagination,
    handleFilterChange,
    handlePageChange,
    resetFilters,
  } = useCustomerPagination();
};
```

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=Test Frontend Dibuiltadi
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Frontend Developer**: Adi94958
- **Repository**: [test-frontend-dibuiltadi](https://github.com/adi94958/test-frontend-dibuiltadi)
