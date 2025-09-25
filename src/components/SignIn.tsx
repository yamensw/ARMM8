import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone,
  ArrowLeft,
  Palette,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SignInProps {
  onSignIn: (userData: { email: string; name: string; type: 'buyer' | 'seller' }) => void;
  onBack: () => void;
}

export function SignIn({ onSignIn, onBack }: SignInProps) {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    accountType: 'buyer' as 'buyer' | 'seller',
    agreeToTerms: false,
    subscribeNewsletter: true
  });

  const handleSignInInputChange = (field: string, value: any) => {
    setSignInData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUpInputChange = (field: string, value: any) => {
    setSignUpData(prev => ({ ...prev, [field]: value }));
  };

  const validateSignIn = () => {
    if (!signInData.email) {
      toast.error('Please enter your email address');
      return false;
    }
    if (!signInData.password) {
      toast.error('Please enter your password');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(signInData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateSignUp = () => {
    if (!signUpData.firstName || !signUpData.lastName) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!signUpData.email) {
      toast.error('Please enter your email address');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!signUpData.password) {
      toast.error('Please enter a password');
      return false;
    }
    if (signUpData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (!signUpData.agreeToTerms) {
      toast.error('Please agree to the Terms & Conditions');
      return false;
    }
    return true;
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignIn()) return;

    // Simulate sign in process
    toast.success('Welcome back!');
    onSignIn({
      email: signInData.email,
      name: 'User', // In a real app, this would come from the backend
      type: 'buyer'
    });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignUp()) return;

    // Simulate sign up process
    toast.success('Account created successfully! Welcome to Artisan Gallery!');
    onSignIn({
      email: signUpData.email,
      name: `${signUpData.firstName} ${signUpData.lastName}`,
      type: signUpData.accountType
    });
  };

  const handleGoogleSignIn = () => {
    toast.success('Google sign-in would be implemented here');
    onSignIn({
      email: 'user@gmail.com',
      name: 'Google User',
      type: 'buyer'
    });
  };

  const handleForgotPassword = () => {
    if (!signInData.email) {
      toast.error('Please enter your email address first');
      return;
    }
    toast.success('Password reset link sent to your email');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Gallery
        </Button>

        {/* Main Card */}
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Palette className="h-8 w-8 text-primary" />
              <h1 className="text-2xl">ARM</h1>
            </div>
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one to start collecting beautiful art
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signInData.email}
                        onChange={(e) => handleSignInInputChange('email', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={signInData.password}
                        onChange={(e) => handleSignInInputChange('password', e.target.value)}
                        className="pl-10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={signInData.rememberMe}
                        onCheckedChange={(checked) => handleSignInInputChange('rememberMe', checked)}
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      className="px-0"
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </Button>
                  </div>

                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        placeholder="John"
                        value={signUpData.firstName}
                        onChange={(e) => handleSignUpInputChange('firstName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        value={signUpData.lastName}
                        onChange={(e) => handleSignUpInputChange('lastName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={signUpData.email}
                        onChange={(e) => handleSignUpInputChange('email', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={signUpData.phone}
                        onChange={(e) => handleSignUpInputChange('phone', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={signUpData.accountType === 'buyer' ? 'default' : 'outline'}
                        onClick={() => handleSignUpInputChange('accountType', 'buyer')}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Art Collector
                      </Button>
                      <Button
                        type="button"
                        variant={signUpData.accountType === 'seller' ? 'default' : 'outline'}
                        onClick={() => handleSignUpInputChange('accountType', 'seller')}
                        className="flex items-center gap-2"
                      >
                        <Palette className="h-4 w-4" />
                        Artist/Seller
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={signUpData.password}
                        onChange={(e) => handleSignUpInputChange('password', e.target.value)}
                        className="pl-10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters long
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={signUpData.confirmPassword}
                        onChange={(e) => handleSignUpInputChange('confirmPassword', e.target.value)}
                        className="pl-10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={signUpData.agreeToTerms}
                        onCheckedChange={(checked) => handleSignUpInputChange('agreeToTerms', checked)}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{' '}
                        <Button variant="link" size="sm" className="px-0 h-auto">
                          Terms & Conditions
                        </Button>{' '}
                        and{' '}
                        <Button variant="link" size="sm" className="px-0 h-auto">
                          Privacy Policy
                        </Button>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={signUpData.subscribeNewsletter}
                        onCheckedChange={(checked) => handleSignUpInputChange('subscribeNewsletter', checked)}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Subscribe to our newsletter for art collections and exclusive offers
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>
            By signing in, you're joining a community of art lovers and creators.
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </div>
            <div className="flex items-center gap-1">
              <ShoppingBag className="h-4 w-4" />
              <span>Easy Checkout</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Artist Profiles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}