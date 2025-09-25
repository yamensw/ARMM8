import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from './ProductCard';

interface WishlistDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function WishlistDrawer({ 
  isOpen, 
  onOpenChange, 
  wishlistItems, 
  onRemoveFromWishlist,
  onAddToCart,
  onProductClick
}: WishlistDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Wishlist ({wishlistItems.length})
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full mt-6">
          {wishlistItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground">Save your favorite art pieces for later</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto space-y-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded cursor-pointer"
                    onClick={() => {
                      onProductClick(item);
                      onOpenChange(false);
                    }}
                  />
                  <div className="flex-1">
                    <h4 
                      className="line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                      onClick={() => {
                        onProductClick(item);
                        onOpenChange(false);
                      }}
                    >
                      {item.name}
                    </h4>
                    <Badge variant="secondary" className="text-xs mb-2">
                      {item.category}
                    </Badge>
                    {item.artist && (
                      <p className="text-xs text-muted-foreground mb-2">by {item.artist}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm">${item.price.toLocaleString()}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAddToCart(item)}
                          className="flex items-center gap-1"
                        >
                          <ShoppingCart className="h-3 w-3" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => onRemoveFromWishlist(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}