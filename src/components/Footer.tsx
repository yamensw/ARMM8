import { Separator } from './ui/separator';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl">ARM</h3>
            <p className="text-muted-foreground">
              Bringing exceptional art and craftsmanship to your home since 1985.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>
          
          {/* Categories */}
          <div className="space-y-4">
            <h4>Categories</h4>
            <div className="space-y-2 text-muted-foreground">
              <div className="hover:text-primary cursor-pointer">Statues & Sculptures</div>
              <div className="hover:text-primary cursor-pointer">Home Decorations</div>
              <div className="hover:text-primary cursor-pointer">Custom Art</div>
              <div className="hover:text-primary cursor-pointer">Vintage Collections</div>
              <div className="hover:text-primary cursor-pointer">Modern Art</div>
            </div>
          </div>
          
          {/* Customer Service */}
          <div className="space-y-4">
            <h4>Customer Service</h4>
            <div className="space-y-2 text-muted-foreground">
              <div className="hover:text-primary cursor-pointer">Contact Us</div>
              <div className="hover:text-primary cursor-pointer">Shipping Info</div>
              <div className="hover:text-primary cursor-pointer">Returns & Exchanges</div>
              <div className="hover:text-primary cursor-pointer">Size Guide</div>
              <div className="hover:text-primary cursor-pointer">Care Instructions</div>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h4>Contact Info</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">123 Art District, NY 10001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@arm.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div>© 2024 ARM. All rights reserved.</div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-primary cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}