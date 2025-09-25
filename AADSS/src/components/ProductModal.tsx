import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Heart, ShoppingCart, Ruler, Palette, User, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import type { Product } from './ProductCard';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onViewFullListing: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductModal({ product, isOpen, onOpenChange, onAddToCart, onToggleWishlist, onViewFullListing, isInWishlist }: ProductModalProps) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    setIsAddedToCart(true);
    onAddToCart(product);
    setTimeout(() => {
      setIsAddedToCart(false);
      onOpenChange(false);
    }, 1500);
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    setIsAddedToWishlist(true);
    onToggleWishlist(product);
    setTimeout(() => setIsAddedToWishlist(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product?.name || 'Product Details'}</DialogTitle>
          <DialogDescription>
            {product ? 'View detailed information about this art piece' : 'Loading product information...'}
          </DialogDescription>
        </DialogHeader>
        
        {!product ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : (
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.isCustom && (
                <Badge className="absolute top-4 left-4 bg-primary">Custom</Badge>
              )}
            </div>
          </div>
          
          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-2xl mb-2">{product.name}</h1>
              {product.artist && (
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <User className="h-4 w-4" />
                  <span>by {product.artist}</span>
                </div>
              )}
              <p className="text-3xl mb-4">${product.price.toLocaleString()}</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {(product.material || product.dimensions) && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h3>Specifications</h3>
                  {product.material && (
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Material: {product.material}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Dimensions: {product.dimensions}</span>
                    </div>
                  )}
                </div>
              </>
            )}
            
            <Separator />
            
            <div className="space-y-3">
              <motion.div
                whileTap={{ scale: 0.98 }}
                animate={isAddedToCart ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Button 
                  className="w-full flex items-center gap-2" 
                  size="lg"
                  onClick={handleAddToCart}
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
                        Added to Cart!
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
                        Add to Cart - ${product.price.toLocaleString()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
              
              <div className="grid grid-cols-2 gap-3">
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center gap-2"
                    onClick={handleToggleWishlist}
                    disabled={isAddedToWishlist}
                  >
                    <AnimatePresence mode="wait">
                      {isAddedToWishlist ? (
                        <motion.div
                          key="check-wishlist"
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: -180 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-2 text-green-500"
                        >
                          <Check className="h-4 w-4" />
                          {isInWishlist ? 'Removed!' : 'Added!'}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="heart-wishlist"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-2"
                        >
                          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                          {isInWishlist ? 'Remove' : 'Wishlist'}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
                
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="secondary" 
                    className="w-full flex items-center gap-2"
                    onClick={() => {
                      onViewFullListing(product);
                      onOpenChange(false);
                    }}
                  >
                    <User className="h-4 w-4" />
                    View Full Listing
                  </Button>
                </motion.div>
              </div>
            </div>
            
            {product.isCustom && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="mb-2">Custom Commission</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  This piece can be customized to your specifications. Contact us to discuss your vision.
                </p>
                <Button variant="outline" size="sm">
                  Request Custom Quote
                </Button>
              </div>
            )}
          </div>
        </div>
        )}
      </DialogContent>
    </Dialog>
  );
}