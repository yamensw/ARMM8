import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { 
  Plus, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Eye, 
  Heart,
  Edit,
  Trash2,
  MoreHorizontal,
  BarChart3,
  Camera,
  Save,
  Lock,
  Bell,
  CreditCard,
  Globe,
  User
} from 'lucide-react';
import { ProductListingForm } from './ProductListingForm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';
import type { Product } from './ProductCard';

interface SellerDashboardProps {
  onBackToMarketplace: () => void;
}

export interface SellerProduct extends Product {
  status: 'active' | 'draft' | 'sold' | 'paused';
  views: number;
  likes: number;
  dateAdded: string;
}

// Mock seller data
const mockSellerData = {
  name: 'Elena Rodriguez',
  artistName: 'Elena Rodriguez Sculpture',
  avatar: '',
  initials: 'ER',
  tier: 'Professional',
  joinDate: 'March 2023',
  totalSales: 28500,
  thisMonthSales: 4200,
  totalProducts: 12,
  activeProducts: 8,
  profileViews: 1240,
  followers: 156
};

const mockSellerProducts: SellerProduct[] = [
  {
    id: 'sp1',
    name: 'Bronze Modern Abstract',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1699437110121-5b1ec9155868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9uemUlMjBzY3VscHR1cmUlMjBhcnR8ZW58MXx8fHwxNzU4ODI5Nzg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Sculptures',
    description: 'Contemporary bronze sculpture with fluid lines representing movement and grace.',
    artist: 'Elena Rodriguez',
    material: 'Patinated Bronze',
    dimensions: '18" H x 10" W x 6" D',
    status: 'active',
    views: 342,
    likes: 28,
    dateAdded: '2024-01-15'
  },
  {
    id: 'sp2',
    name: 'Flowing Forms Series I',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1707578087102-92520fda8f97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBzY3VscHR1cmV8ZW58MXx8fHwxNzU4NzQ3MDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Sculptures',
    description: 'Part of my signature flowing forms series, this piece explores organic movement.',
    artist: 'Elena Rodriguez',
    material: 'Bronze',
    dimensions: '22" H x 14" W x 9" D',
    status: 'active',
    views: 189,
    likes: 15,
    dateAdded: '2024-02-03'
  },
  {
    id: 'sp3',
    name: 'Abstract Harmony',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1707376519357-b53e370384fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwZGVjb3J8ZW58MXx8fHwxNzU4NzUxODE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Sculptures',
    description: 'A contemporary piece that balances form and negative space.',
    artist: 'Elena Rodriguez',
    material: 'Mixed Media',
    dimensions: '28" H x 16" W x 10" D',
    status: 'draft',
    views: 0,
    likes: 0,
    dateAdded: '2024-02-20'
  }
];

export function SellerDashboard({ onBackToMarketplace }: SellerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<SellerProduct[]>(mockSellerProducts);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SellerProduct | null>(null);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    personalInfo: {
      fullName: mockSellerData.name,
      email: 'elena@example.com',
      phone: '+1 (555) 123-4567',
      artistName: mockSellerData.artistName,
      bio: 'Passionate sculptor with over 15 years of experience creating contemporary bronze works. My pieces explore themes of movement, emotion, and the human condition through abstract forms.',
      location: 'San Francisco, CA',
      website: 'https://elenarodriguez.art',
      instagram: '@elena_rodriguez_art'
    },
    business: {
      businessName: 'Elena Rodriguez Studio LLC',
      taxId: '12-3456789',
      businessAddress: '123 Art District St, San Francisco, CA 94103',
      preferredPayment: 'bank-transfer'
    },
    notifications: {
      emailNewOrders: true,
      emailMarketing: false,
      pushNotifications: true,
      weeklyReports: true
    },
    privacy: {
      showEmail: false,
      showPhone: false,
      profileVisibility: 'public'
    }
  });

  const handleAddProduct = (productData: any) => {
    const newProduct: SellerProduct = {
      id: `sp${Date.now()}`,
      ...productData,
      artist: mockSellerData.artistName,
      status: 'draft' as const,
      views: 0,
      likes: 0,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [...prev, newProduct]);
    setShowProductForm(false);
  };

  const handleEditProduct = (product: SellerProduct) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleUpdateProduct = (productData: any) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData }
          : p
      ));
      setEditingProduct(null);
      setShowProductForm(false);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleProfileInputChange = (section: string, field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev] as any,
        [field]: value
      }
    }));
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    toast.success('Password change email sent!');
  };

  const getStatusBadgeVariant = (status: SellerProduct['status']) => {
    switch (status) {
      case 'active': return 'default';
      case 'draft': return 'secondary';
      case 'sold': return 'outline';
      case 'paused': return 'destructive';
      default: return 'secondary';
    }
  };

  if (showProductForm) {
    return (
      <ProductListingForm
        product={editingProduct || undefined}
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        onCancel={() => {
          setShowProductForm(false);
          setEditingProduct(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockSellerData.avatar} />
                <AvatarFallback>{mockSellerData.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl">{mockSellerData.artistName}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Badge variant="secondary">{mockSellerData.tier}</Badge>
                  <span>Member since {mockSellerData.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onBackToMarketplace}>
                View Marketplace
              </Button>
              <Button onClick={() => setShowProductForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Sales</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">${mockSellerData.totalSales.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">This Month</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">${mockSellerData.thisMonthSales.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    3 pieces sold
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Active Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{mockSellerData.activeProducts}</div>
                  <p className="text-xs text-muted-foreground">
                    of {mockSellerData.totalProducts} total
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Profile Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{mockSellerData.profileViews}</div>
                  <p className="text-xs text-muted-foreground">
                    +8% this week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Bronze Modern Abstract received 5 new likes</span>
                    <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Your profile was viewed 23 times today</span>
                    <span className="text-xs text-muted-foreground ml-auto">4 hours ago</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Flowing Forms Series I price updated</span>
                    <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">Your Products</h2>
              <Button onClick={() => setShowProductForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>

            <div className="grid gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg mb-1">{product.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {product.category} • ${product.price.toLocaleString()}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {product.views}
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                {product.likes}
                              </div>
                              <span>Added {new Date(product.dateAdded).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusBadgeVariant(product.status)}>
                              {product.status}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Analytics
                </CardTitle>
                <CardDescription>
                  Track your sales and engagement metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Profile Completion</span>
                      <span className="text-sm">85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Monthly Sales Goal</span>
                      <span className="text-sm">$4,200 / $5,000</span>
                    </div>
                    <Progress value={84} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl">156</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl">3.2k</div>
                      <div className="text-sm text-muted-foreground">Total Views</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Picture & Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your public profile and personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={mockSellerData.avatar} />
                      <AvatarFallback className="text-xl">{mockSellerData.initials}</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload a professional photo that represents you and your work
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Upload New Photo
                      </Button>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileData.personalInfo.fullName}
                      onChange={(e) => handleProfileInputChange('personalInfo', 'fullName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="artistName">Artist/Studio Name</Label>
                    <Input
                      id="artistName"
                      value={profileData.personalInfo.artistName}
                      onChange={(e) => handleProfileInputChange('personalInfo', 'artistName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.personalInfo.email}
                      onChange={(e) => handleProfileInputChange('personalInfo', 'email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.personalInfo.phone}
                      onChange={(e) => handleProfileInputChange('personalInfo', 'phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.personalInfo.location}
                      onChange={(e) => handleProfileInputChange('personalInfo', 'location', e.target.value)}
                      placeholder="City, State/Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.personalInfo.website}
                      onChange={(e) => handleProfileInputChange('personalInfo', 'website', e.target.value)}
                      placeholder="https://your-website.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram Handle</Label>
                  <Input
                    id="instagram"
                    value={profileData.personalInfo.instagram}
                    onChange={(e) => handleProfileInputChange('personalInfo', 'instagram', e.target.value)}
                    placeholder="@your_handle"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Artist Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.personalInfo.bio}
                    onChange={(e) => handleProfileInputChange('personalInfo', 'bio', e.target.value)}
                    placeholder="Tell collectors about your artistic journey, style, and inspiration..."
                    rows={4}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Business Information
                </CardTitle>
                <CardDescription>
                  Manage your business details for tax and payment purposes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={profileData.business.businessName}
                      onChange={(e) => handleProfileInputChange('business', 'businessName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / EIN</Label>
                    <Input
                      id="taxId"
                      value={profileData.business.taxId}
                      onChange={(e) => handleProfileInputChange('business', 'taxId', e.target.value)}
                      placeholder="XX-XXXXXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Textarea
                    id="businessAddress"
                    value={profileData.business.businessAddress}
                    onChange={(e) => handleProfileInputChange('business', 'businessAddress', e.target.value)}
                    placeholder="Full business address for tax purposes"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredPayment">Preferred Payment Method</Label>
                  <Select 
                    value={profileData.business.preferredPayment} 
                    onValueChange={(value) => handleProfileInputChange('business', 'preferredPayment', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Business Info
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about your sales and account activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>New Order Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified immediately when someone purchases your art
                      </div>
                    </div>
                    <Switch
                      checked={profileData.notifications.emailNewOrders}
                      onCheckedChange={(checked) => handleProfileInputChange('notifications', 'emailNewOrders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Marketing Communications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive tips, trends, and promotional opportunities
                      </div>
                    </div>
                    <Switch
                      checked={profileData.notifications.emailMarketing}
                      onCheckedChange={(checked) => handleProfileInputChange('notifications', 'emailMarketing', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Push Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Real-time notifications on your device
                      </div>
                    </div>
                    <Switch
                      checked={profileData.notifications.pushNotifications}
                      onCheckedChange={(checked) => handleProfileInputChange('notifications', 'pushNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Weekly Performance Reports</div>
                      <div className="text-sm text-muted-foreground">
                        Summary of your sales and analytics each week
                      </div>
                    </div>
                    <Switch
                      checked={profileData.notifications.weeklyReports}
                      onCheckedChange={(checked) => handleProfileInputChange('notifications', 'weeklyReports', checked)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Visibility */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Privacy & Visibility
                </CardTitle>
                <CardDescription>
                  Control what information is visible to buyers and visitors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Show Email Address</div>
                      <div className="text-sm text-muted-foreground">
                        Allow buyers to see your email on your profile
                      </div>
                    </div>
                    <Switch
                      checked={profileData.privacy.showEmail}
                      onCheckedChange={(checked) => handleProfileInputChange('privacy', 'showEmail', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div>Show Phone Number</div>
                      <div className="text-sm text-muted-foreground">
                        Display your phone number for direct contact
                      </div>
                    </div>
                    <Switch
                      checked={profileData.privacy.showPhone}
                      onCheckedChange={(checked) => handleProfileInputChange('privacy', 'showPhone', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <Select 
                    value={profileData.privacy.profileVisibility} 
                    onValueChange={(value) => handleProfileInputChange('privacy', 'profileVisibility', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can view</SelectItem>
                      <SelectItem value="buyers-only">Buyers Only - Registered users</SelectItem>
                      <SelectItem value="private">Private - Hidden from search</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Privacy Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security
                </CardTitle>
                <CardDescription>
                  Manage your account security and password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2">Password</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Last changed 3 months ago. We recommend changing your password regularly.
                    </p>
                    <Button variant="outline" onClick={handleChangePassword}>
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">
                      Enable 2FA
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="mb-2">Account Deactivation</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Temporarily disable your seller account while keeping your data
                    </p>
                    <Button variant="destructive" size="sm">
                      Deactivate Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}