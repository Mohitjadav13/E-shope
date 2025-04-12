# Modern E-commerce Store

A fully responsive React e-commerce application with product filtering, cart management, and user authentication.

## Features

- 🔐 User Authentication
- 🛍️ Product Listing & Filtering
- 🔍 Search Functionality
- 🛒 Cart Management
- 📱 Responsive Design
- 🎯 Category Filtering
- 💳 Checkout Process
- 🎨 Modern UI/UX

## Live Demo

Access the application:
- Production: [View Live Demo](https://my-ecommerce-mohit.netlify.app/)


## Getting Started

1. Clone the repository:
```bash
https://github.com/Mohitjadav13/E-shope.git
```

2. Install dependencies:
```bash
cd my-ecommerce
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Test Account

Use these credentials to test the application:
- Username: `mor_2314`
- Password: `83r5^_`

## Project Structure

```
src/
├── components/              # All components
│   ├── Cart.jsx            # Shopping cart functionality
│   ├── Cart.css            # Cart styles
│   ├── Header.jsx          # Navigation component
│   ├── Header.css          # Header styles
│   ├── Login.jsx           # Authentication
│   ├── Login.css           # Login styles
│   ├── Products.jsx        # Product listing
│   ├── Products.css        # Products styles
│   ├── ProductDetail.jsx   # Single product view
│   └── ProductDetail.css   # Product detail styles
│
├── App.jsx                 # Root component
├── App.css                 # App styles
├── index.css               # Global styles
└── main.jsx               # Entry point
```

The project follows a modular component-based architecture:

- `components/` - Reusable UI components with their styles
  - `Cart.jsx` - Shopping cart functionality
  - `Header.jsx` - Navigation and search interface
  - `Login.jsx` - Authentication system
  - `Products.jsx` - Product listing and filtering
  - `ProductDetail.jsx` - Individual product view

- Root level files:
  - `App.jsx` - Main application component
  - `index.css` - Global styles

## Features in Detail

### Authentication
- Secure login system
- Protected routes
- Session management

### Products
- Category filtering
- Search functionality
- Responsive product cards
- Quick add to cart

### Shopping Cart
- Add/Remove items
- Quantity adjustment
- Price calculation
- Checkout process
- Order confirmation

### UI/UX
- Responsive design
- Modern animations
- Loading states
- Error handling
- User feedback

## API Integration

This project uses the [FakeStore API](https://fakestoreapi.com/) for:
- Product data
- Categories
- Authentication
- Cart management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [FakeStore API](https://fakestoreapi.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
