import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { SellerProduct } from './SellerDashboard';

interface ProductListingFormProps {
  product?: SellerProduct;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ProductListingForm({ product, onSubmit, onCancel }: ProductListingFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    material: product?.material || '',
    dimensions: product?.dimensions || '',
    image: product?.image || '',
    isCustom: product?.isCustom || false,
    tags: product ? [] : [], // Would be extracted from product if editing
    weight: '',
    condition: 'new',
    shipping: {
      domestic: '25',
      international: '65',
      freeShippingThreshold: '1000'
    }
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>(
    product?.image ? [product.image] : []
  );

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server/cloud storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImages(prev => [...prev, result]);
        if (uploadedImages.length === 0) {
          handleInputChange('image', result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    if (index === 0 && uploadedImages.length > 1) {
      handleInputChange('image', uploadedImages[1]);
    } else if (index === 0) {
      handleInputChange('image', '');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (uploadedImages.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    onSubmit({
      ...formData,
      price: parseInt(formData.price.toString()),
      image: uploadedImages[0] // Use first image as primary
    });
    
    toast.success(product ? 'Product updated successfully!' : 'Product listed successfully!');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl mb-4">
            {product ? 'Edit Product' : 'List New Product'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {product ? 'Update your product details' : 'Add your artwork to the marketplace'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Essential details about your artwork
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Classical Venus Statue"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your artwork's inspiration, technique, and unique features..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Statues">Statues</SelectItem>
                      <SelectItem value="Sculptures">Sculptures</SelectItem>
                      <SelectItem value="Decorations">Decorations</SelectItem>
                      <SelectItem value="Custom Art">Custom Art</SelectItem>
                      <SelectItem value="Pottery">Pottery & Ceramics</SelectItem>
                      <SelectItem value="Mixed Media">Mixed Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isCustom"
                  checked={formData.isCustom}
                  onCheckedChange={(checked) => handleInputChange('isCustom', checked)}
                />
                <Label htmlFor="isCustom">This is a custom/commission piece</Label>
              </div>
            </CardContent>
          </Card>

          {/* Physical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Physical Details</CardTitle>
              <CardDescription>
                Specifications about your artwork
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    value={formData.material}
                    onChange={(e) => handleInputChange('material', e.target.value)}
                    placeholder="e.g., Carrara Marble, Bronze, Ceramic"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    placeholder='e.g., 24" H x 12" W x 8" D'
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="Approximate weight"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="very-good">Very Good</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>
                Upload high-quality photos of your artwork (first image will be the main photo)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full aspect-square object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    {index === 0 && (
                      <Badge className="absolute bottom-2 left-2">Main</Badge>
                    )}
                  </div>
                ))}

                {uploadedImages.length < 8 && (
                  <label className="w-full aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      Upload Image
                    </span>
                  </label>
                )}
              </div>

              {uploadedImages.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No images uploaded yet</p>
                  <p className="text-sm">Add at least one image to continue</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shipping */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>
                Set your shipping rates and policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="domestic">Domestic Shipping ($)</Label>
                  <Input
                    id="domestic"
                    type="number"
                    value={formData.shipping.domestic}
                    onChange={(e) => handleInputChange('shipping.domestic', e.target.value)}
                    placeholder="25"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="international">International Shipping ($)</Label>
                  <Input
                    id="international"
                    type="number"
                    value={formData.shipping.international}
                    onChange={(e) => handleInputChange('shipping.international', e.target.value)}
                    placeholder="65"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="freeThreshold">Free Shipping Threshold ($)</Label>
                  <Input
                    id="freeThreshold"
                    type="number"
                    value={formData.shipping.freeShippingThreshold}
                    onChange={(e) => handleInputChange('shipping.freeShippingThreshold', e.target.value)}
                    placeholder="1000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" variant="secondary">
              Save as Draft
            </Button>
            <Button type="submit">
              {product ? 'Update Product' : 'List Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}