import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingCart, 
  Ruler, 
  Palette, 
  User,
  Check,
  Share2,
  Star,
  MapPin,
  Calendar,
  Eye,
  Shield,
  Truck
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import type { Product } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductDetailPage({ 
  product, 
  onBack, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist 
}: ProductDetailPageProps) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Mock additional images for the gallery
  const productImages = [
    product.image,
    product.image, // In a real app, these would be different angles
    product.image,
    product.image
  ];

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    onAddToCart(product);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleToggleWishlist = () => {
    setIsAddedToWishlist(true);
    onToggleWishlist(product);
    setTimeout(() => setIsAddedToWishlist(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Product link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Gallery
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl bg-muted">
              <ImageWithFallback
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-[600px] object-cover"
              />
              {product.isCustom && (
                <Badge className="absolute top-4 left-4 bg-primary">
                  Custom Order
                </Badge>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge variant="secondary" className="bg-black/50 text-white">
                  <Eye className="h-3 w-3 mr-1" />
                  247 views
                </Badge>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8 (24 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-4xl">{product.name}</h1>
              
              <div className="flex items-center gap-4">
                <span className="text-3xl">${product.price.toLocaleString()}</span>
                <Badge variant="outline" className="text-green-600">
                  <Shield className="h-3 w-3 mr-1" />
                  Authenticity Guaranteed
                </Badge>
              </div>

              {/* Artist Info */}
              {product.artist && (
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {product.artist.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">Created by</p>
                      <p className="font-medium">{product.artist}</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto">
                      View Profile
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Actions */}
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
                        {isInWishlist ? 'Removed from Wishlist!' : 'Added to Wishlist!'}
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
                        {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>

            {/* Shipping Info */}
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm">Free shipping on orders over $2,000</p>
                  <p className="text-xs text-muted-foreground">
                    Estimated delivery: 5-7 business days
                  </p>
                </div>
              </div>
            </Card>

            <Separator />

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This exceptional piece represents the pinnacle of artistic craftsmanship, 
                combining traditional techniques with contemporary sensibilities. Each detail 
                has been carefully considered to create a work that will enhance any space 
                while serving as a conversation piece for years to come.
              </p>
            </div>

            <Separator />

            {/* Specifications */}
            {(product.material || product.dimensions) && (
              <div className="space-y-4">
                <h3 className="text-xl">Specifications</h3>
                <div className="grid gap-3">
                  {product.material && (
                    <div className="flex items-center gap-3">
                      <Palette className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-sm text-muted-foreground">Material:</span>
                        <span className="ml-2">{product.material}</span>
                      </div>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex items-center gap-3">
                      <Ruler className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-sm text-muted-foreground">Dimensions:</span>
                        <span className="ml-2">{product.dimensions}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <span className="text-sm text-muted-foreground">Created:</span>
                      <span className="ml-2">2024</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <span className="text-sm text-muted-foreground">Origin:</span>
                      <span className="ml-2">Studio Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Separator />

            {/* Additional Info */}
            <div className="space-y-4">
              <h3 className="text-xl">Purchase Details</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Certificate of authenticity included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Professional packaging & white-glove delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Insurance coverage during transit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}