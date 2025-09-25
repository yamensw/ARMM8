import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { ProductCard, type Product } from './components/ProductCard';
import { CartDrawer, type CartItem } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductModal } from './components/ProductModal';
import { Footer } from './components/Footer';
import { SellWithUs } from './components/SellWithUs';
import { SellerDashboard } from './components/SellerDashboard';
import { SignIn } from './components/SignIn';
import { Profile } from './components/Profile';
import { ProductDetailPage } from './components/ProductDetailPage';
import { Button } from './components/ui/button';
import { toast } from 'sonner@2.0.3';

interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profilePicture?: string;
  type: 'buyer' | 'seller';
  joinedDate: string;
  bio?: string;
}

// Mock product data
const products: Product[] = [
  {
    id: '1',
    name: 'Classical Venus Statue',
    price: 2450,
    image: 'https://images.unsplash.com/photo-1683918891762-ed43ae8d0da4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjBzdGF0dWUlMjBzY3VscHR1cmV8ZW58MXx8fHwxNzU4ODI5Nzg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Statues',
    description: 'Hand-carved marble statue inspired by classical Roman art. Perfect centerpiece for gardens or elegant interiors.',
    artist: 'Marco Venetian',
    material: 'Carrara Marble',
    dimensions: '24" H x 12" W x 8" D'
  },
  {
    id: '2',
    name: 'Bronze Modern Abstract',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1699437110121-5b1ec9155868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9uemUlMjBzY3VscHR1cmUlMjBhcnR8ZW58MXx8fHwxNzU4ODI5Nzg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Sculptures',
    description: 'Contemporary bronze sculpture with fluid lines representing movement and grace.',
    artist: 'Elena Rodriguez',
    material: 'Patinated Bronze',
    dimensions: '18" H x 10" W x 6" D'
  },
  {
    id: '3',
    name: 'Ceramic Vase Collection',
    price: 185,
    image: 'https://images.unsplash.com/photo-1628685374755-3a293a37aa92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3JhdGlvbnMlMjB2YXNlc3xlbnwxfHx8fDE3NTg4Mjk3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Decorations',
    description: 'Set of three handmade ceramic vases with unique glazing techniques.',
    artist: 'Pottery Studio Co.',
    material: 'Glazed Ceramic',
    dimensions: 'Various sizes: 8"-12" H'
  },
  {
    id: '4',
    name: 'Custom Portrait Commission',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1707578087102-92520fda8f97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBzY3VscHR1cmV8ZW58MXx8fHwxNzU4NzQ3MDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Custom Art',
    description: 'Personalized sculpture portrait created from your specifications and photos.',
    artist: 'Various Artists',
    material: 'Clay/Bronze Options',
    dimensions: 'Custom sizing available',
    isCustom: true
  },
  {
    id: '5',
    name: 'Decorative Pottery Set',
    price: 320,
    image: 'https://images.unsplash.com/photo-1758708536088-46c7acab863e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGRlY29yYXRpdmV8ZW58MXx8fHwxNzU4ODI5Nzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Decorations',
    description: 'Artisanal pottery pieces with traditional craftsmanship and modern appeal.',
    artist: 'Terra Collective',
    material: 'Earthenware',
    dimensions: '6"-10" H various'
  },
  {
    id: '6',
    name: 'Luxury Home Sculpture',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1707376519357-b53e370384fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwZGVjb3J8ZW58MXx8fHwxNzU4NzUxODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Sculptures',
    description: 'Elegant contemporary sculpture designed for luxury interiors and sophisticated spaces.',
    artist: 'Atelier Modern',
    material: 'Mixed Media',
    dimensions: '36" H x 18" W x 12" D'
  }
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'marketplace' | 'sell' | 'dashboard' | 'signin' | 'profile' | 'product-detail'>('marketplace');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artist?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleToggleWishlist = (product: Product) => {
    if (!user) {
      toast.error('Please sign in to add items to your wishlist');
      setCurrentView('signin');
      return;
    }
    
    setWishlistItems(prev => {
      const isInWishlist = prev.some(item => item.id === product.id);
      if (isInWishlist) {
        toast.success(`${product.name} removed from wishlist`);
        return prev.filter(item => item.id !== product.id);
      } else {
        toast.success(`${product.name} added to wishlist`);
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (id: string) => {
    const product = wishlistItems.find(item => item.id === id);
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    if (product) {
      toast.success(`${product.name} removed from wishlist`);
    }
  };

  const handleSignIn = (userData: { email: string; name: string; type: 'buyer' | 'seller' }) => {
    // Convert the sign-in data to our enhanced User interface
    const enhancedUser: User = {
      id: Date.now().toString(), // In a real app, this would come from the backend
      email: userData.email,
      name: userData.name,
      firstName: userData.name.split(' ')[0] || 'User',
      lastName: userData.name.split(' ').slice(1).join(' ') || '',
      type: userData.type,
      joinedDate: new Date().toISOString(),
    };
    
    setUser(enhancedUser);
    setCurrentView('marketplace');
    toast.success(`Welcome back, ${enhancedUser.firstName}!`);
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleSignOut = () => {
    setUser(null);
    setCartItems([]);
    setWishlistItems([]);
    setCurrentView('marketplace');
    toast.success('You have been signed out');
  };

  const handleSignInClick = () => {
    setCurrentView('signin');
  };

  const handleProfileClick = () => {
    setCurrentView('profile');
  };

  const handleViewFullListing = (product: Product) => {
    setSelectedProductForDetail(product);
    setCurrentView('product-detail');
  };

  if (currentView === 'signin') {
    return (
      <SignIn 
        onSignIn={handleSignIn}
        onBack={() => setCurrentView('marketplace')}
      />
    );
  }

  if (currentView === 'profile' && user) {
    return (
      <Profile 
        user={user}
        onBack={() => setCurrentView('marketplace')}
        onUserUpdate={handleUserUpdate}
      />
    );
  }

  if (currentView === 'product-detail' && selectedProductForDetail) {
    return (
      <ProductDetailPage 
        product={selectedProductForDetail}
        onBack={() => setCurrentView('marketplace')}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={wishlistItems.some(item => item.id === selectedProductForDetail.id)}
      />
    );
  }

  if (currentView === 'sell') {
    return (
      <SellWithUs 
        onStartSelling={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'dashboard') {
    return (
      <SellerDashboard 
        onBackToMarketplace={() => setCurrentView('marketplace')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        onSellClick={() => setCurrentView('sell')}
        user={user}
        onSignInClick={handleSignInClick}
        onSignOutClick={handleSignOut}
        onProfileClick={handleProfileClick}
      />
      
      <main>
        <Hero />
        <Categories />
        
        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Collection'}
              </h2>
              <p className="text-lg text-muted-foreground">
                {searchQuery 
                  ? `Found ${filteredProducts.length} piece${filteredProducts.length !== 1 ? 's' : ''}`
                  : 'Handpicked masterpieces from our curated collection'
                }
              </p>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or browse our categories
                </p>
                <Button onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onProductClick={handleProductClick}
                    onToggleWishlist={handleToggleWishlist}
                    isInWishlist={wishlistItems.some(item => item.id === product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      
      <CartDrawer
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onOpenChange={setIsWishlistOpen}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
        onProductClick={handleProductClick}
      />
      
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onOpenChange={setIsProductModalOpen}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onViewFullListing={handleViewFullListing}
        isInWishlist={selectedProduct ? wishlistItems.some(item => item.id === selectedProduct.id) : false}
      />
    </div>
  );
}