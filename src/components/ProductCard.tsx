import { useState } from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  artist?: string;
  material?: string;
  dimensions?: string;
  isCustom?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductCard({ product, onAddToCart, onProductClick, onToggleWishlist, isInWishlist }: ProductCardProps) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddedToCart(true);
    onAddToCart(product);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddedToWishlist(true);
    onToggleWishlist(product);
    setTimeout(() => setIsAddedToWishlist(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative overflow-hidden" onClick={() => onProductClick(product)}>
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.isCustom && (
              <Badge className="absolute top-2 left-2 bg-primary">Custom</Badge>
            )}
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="absolute top-2 right-2"
            >
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/80 hover:bg-white relative"
                onClick={handleToggleWishlist}
              >
                <AnimatePresence mode="wait">
                  {isAddedToWishlist ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -180 }}
                      transition={{ duration: 0.3 }}
                      className="text-green-500"
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="heart"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
          <div className="p-4">
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h3 className="mb-1 line-clamp-1">{product.name}</h3>
            {product.artist && (
              <p className="text-sm text-muted-foreground mb-2">by {product.artist}</p>
            )}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg">${product.price.toLocaleString()}</span>
              <motion.div
                whileTap={{ scale: 0.95 }}
                animate={isAddedToCart ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 relative overflow-hidden"
                  disabled={isAddedToCart}
                >
                  <AnimatePresence mode="wait">
                    {isAddedToCart ? (
                      <motion.div
                        key="success"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-4 w-4" />
                        Added!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}