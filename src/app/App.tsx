import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { LandingPage } from './pages/LandingPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { CartItem } from './types';
import { products } from './data/products';
import { toast, Toaster } from 'sonner';

type Page = 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.product.id === productId);

    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      toast.success(`Added another ${product.name} to cart!`);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCart(cart.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const handleRemoveItem = (productId: number) => {
    const item = cart.find(i => i.product.id === productId);
    setCart(cart.filter(item => item.product.id !== productId));
    if (item) {
      toast.success(`${item.product.name} removed from cart`);
    }
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <LandingPage
            onNavigate={handleNavigate}
            onProductClick={handleProductClick}
          />
        );
      case 'shop':
        return <ShopPage onProductClick={handleProductClick} />;
      case 'product':
        return selectedProductId ? (
          <ProductDetailPage
            productId={selectedProductId}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        ) : null;
      case 'cart':
        return (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigate={handleNavigate}
          />
        );
      case 'checkout':
        return <CheckoutPage cart={cart} onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen font-['Inter'] transition-colors duration-700">
        <Navigation onNavigate={handleNavigate} cartCount={totalCartItems} />
        {renderPage()}
        <Toaster position="bottom-right" richColors />
      </div>
    </ThemeProvider>
  );
}