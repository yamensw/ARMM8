import { Search, ShoppingCart, Menu, User, Heart, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

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

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onSellClick?: () => void;
  user?: User | null;
  onSignInClick?: () => void;
  onSignOutClick?: () => void;
  onProfileClick?: () => void;
}

export function Header({ 
  cartCount, 
  wishlistCount, 
  onCartClick, 
  onWishlistClick, 
  onSearchChange, 
  searchQuery, 
  onSellClick,
  user,
  onSignInClick,
  onSignOutClick,
  onProfileClick
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-xl tracking-tight">ARM</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-primary transition-colors">Statues</a>
            <a href="#" className="hover:text-primary transition-colors">Decorations</a>
            <a href="#" className="hover:text-primary transition-colors">Custom Art</a>
            <a href="#" className="hover:text-primary transition-colors">Collections</a>
            {onSellClick && (
              <Button variant="outline" size="sm" onClick={onSellClick}>
                Sell Your Art
              </Button>
            )}
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search for art pieces..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* User Account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profilePicture} />
                      <AvatarFallback className="text-xs">
                        {user.firstName[0]}{user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm">{user.firstName} {user.lastName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onProfileClick}>
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onWishlistClick}>
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist ({wishlistCount})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onCartClick}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cart ({cartCount})
                  </DropdownMenuItem>
                  {user.type === 'seller' && onSellClick && (
                    <DropdownMenuItem onClick={onSellClick}>
                      <User className="mr-2 h-4 w-4" />
                      Seller Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onSignOutClick}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" onClick={onSignInClick} className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Sign In</span>
              </Button>
            )}
            
            {/* Wishlist - only show when user is signed in */}
            {user && (
              <Button variant="ghost" size="icon" onClick={onWishlistClick} className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            )}
            
            {/* Cart */}
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}