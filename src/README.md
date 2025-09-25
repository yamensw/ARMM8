# ARM - Premium Art & Sculptures E-commerce

A modern, elegant e-commerce website for statues, decorations, and custom art pieces built with React, TypeScript, and Tailwind CSS.

## 🎨 Features

- **Product Browsing**: Browse through categories of statues, sculptures, decorations, and custom art
- **Search & Filter**: Advanced search functionality with real-time filtering
- **Shopping Cart**: Full cart management with quantity updates and item removal
- **Wishlist**: Save favorite items for later (requires sign-in)
- **Product Details**: Detailed product pages with image galleries and specifications
- **User Authentication**: Sign-in system for buyers and sellers
- **Seller Dashboard**: Complete dashboard for artists to manage their listings
- **Custom Commissions**: Special section for custom art orders
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Modern UI**: Clean, professional interface with smooth animations

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Animations**: Motion (formerly Framer Motion)
- **Notifications**: Sonner
- **Forms**: React Hook Form

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/arm-ecommerce.git
   cd arm-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── figma/           # Figma-specific components
│   ├── Header.tsx       # Main navigation header
│   ├── Hero.tsx         # Landing page hero section
│   ├── ProductCard.tsx  # Product display card
│   ├── CartDrawer.tsx   # Shopping cart drawer
│   └── ...             # Other components
├── styles/
│   └── globals.css     # Global styles and Tailwind configuration
├── guidelines/
│   └── Guidelines.md   # Development guidelines
└── App.tsx            # Main application component
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Components

### Shopping Features
- **ProductCard**: Displays product information with add to cart and wishlist functionality
- **CartDrawer**: Slide-out cart with quantity management
- **WishlistDrawer**: Save and manage favorite products
- **ProductDetailPage**: Full product view with detailed specifications

### User Experience
- **Header**: Navigation with search, cart, and user account access
- **Categories**: Browse products by category
- **SearchFiltering**: Real-time product search and filtering
- **Responsive Design**: Mobile-optimized interface

### Seller Tools
- **SellerDashboard**: Complete seller management interface
- **ProductListingForm**: Add and edit product listings
- **Profile Management**: User and seller profile management

## 🌟 Design Philosophy

ARM focuses on showcasing beautiful art pieces with:
- Clean, minimalist design that highlights the artwork
- Professional photography presentation
- Intuitive shopping experience
- Premium feel appropriate for high-value art purchases
- Smooth animations and micro-interactions

## 🔮 Future Enhancements

- Backend integration with Supabase
- Payment processing
- Order management system
- Advanced search filters
- Artist profiles and portfolios
- Customer reviews and ratings
- Email notifications
- Inventory management

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for artists and art lovers worldwide.