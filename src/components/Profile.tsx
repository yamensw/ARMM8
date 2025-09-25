import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Camera, 
  Save, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Shield,
  Palette,
  ShoppingBag,
  Upload,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

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

interface ProfileProps {
  user: User;
  onBack: () => void;
  onUserUpdate: (updatedUser: User) => void;
}

export function Profile({ user, onBack, onUserUpdate }: ProfileProps) {
  const [profileData, setProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || '',
    bio: user.bio || '',
    profilePicture: user.profilePicture || ''
  });
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        setProfileData(prev => ({ ...prev, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Validate required fields
    if (!profileData.firstName.trim() || !profileData.lastName.trim()) {
      toast.error('First name and last name are required');
      setIsSaving(false);
      return;
    }
    
    if (!profileData.email.trim()) {
      toast.error('Email is required');
      setIsSaving(false);
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      toast.error('Please enter a valid email address');
      setIsSaving(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const updatedUser: User = {
        ...user,
        firstName: profileData.firstName.trim(),
        lastName: profileData.lastName.trim(),
        name: `${profileData.firstName.trim()} ${profileData.lastName.trim()}`,
        email: profileData.email.trim(),
        phone: profileData.phone.trim() || undefined,
        bio: profileData.bio.trim() || undefined,
        profilePicture: profileData.profilePicture || undefined
      };
      
      onUserUpdate(updatedUser);
      setIsEditing(false);
      setIsSaving(false);
      setPreviewImage(null);
      toast.success('Profile updated successfully!');
    }, 1000);
  };

  const handleCancel = () => {
    setProfileData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      bio: user.bio || '',
      profilePicture: user.profilePicture || ''
    });
    setPreviewImage(null);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Button>
          <div>
            <h1 className="text-3xl">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage src={previewImage || profileData.profilePicture} />
                    <AvatarFallback className="text-xl">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardTitle>{user.firstName} {user.lastName}</CardTitle>
                <CardDescription className="flex items-center gap-2 justify-center">
                  {user.type === 'seller' ? (
                    <>
                      <Palette className="h-4 w-4" />
                      Artist & Seller
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      Art Collector
                    </>
                  )}
                </CardDescription>
                <Badge variant="secondary" className="mt-2">
                  Member since {formatDate(user.joinedDate)}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.bio && (
                  <div className="space-y-2">
                    <h4 className="text-sm">Bio</h4>
                    <p className="text-sm text-muted-foreground">{user.bio}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and profile information
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving}>
                          {isSaving ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                            />
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)}>
                        <User className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg">Basic Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Bio Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg">Bio</h3>
                    {user.type === 'seller' && (
                      <Badge variant="secondary" className="text-xs">
                        Artist Profile
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">
                      {user.type === 'seller' ? 'Artist Bio' : 'About You'}
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder={
                        user.type === 'seller' 
                          ? "Tell visitors about your artistic journey, style, and inspiration..."
                          : "Share a bit about yourself and your interest in art..."
                      }
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      className="min-h-[100px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      {profileData.bio.length}/500 characters
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Account Information */}
                <div className="space-y-4">
                  <h3 className="text-lg">Account Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Account Type</Label>
                      <div className="flex items-center gap-2">
                        {user.type === 'seller' ? (
                          <>
                            <Palette className="h-4 w-4" />
                            <span>Artist & Seller</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-4 w-4" />
                            <span>Art Collector</span>
                          </>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {user.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Member Since</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(user.joinedDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="text-sm">Security & Privacy</h4>
                      <p className="text-sm text-muted-foreground">
                        Your personal information is encrypted and secure. We never share your data with third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}