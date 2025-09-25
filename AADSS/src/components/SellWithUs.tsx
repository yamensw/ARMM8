import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import {
  Check,
  Star,
  Users,
  TrendingUp,
  Shield,
  Camera,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface SellWithUsProps {
  onStartSelling: () => void;
}

export function SellWithUs({
  onStartSelling,
}: SellWithUsProps) {
  const [isApplicationOpen, setIsApplicationOpen] =
    useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    artistName: "",
    specialty: "",
    experience: "",
    portfolio: "",
    description: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Application submitted successfully! We'll review and contact you within 2-3 business days.",
    );
    setIsApplicationOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      artistName: "",
      specialty: "",
      experience: "",
      portfolio: "",
      description: "",
    });
  };

  const benefits = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Global Reach",
      description:
        "Access thousands of art collectors and enthusiasts worldwide",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Premium Marketplace",
      description:
        "Showcase your work in a curated, high-end environment",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Transactions",
      description:
        "Protected payments and verified buyer authentication",
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Professional Photography",
      description:
        "Free professional product photography for featured pieces",
    },
  ];

  const testimonials = [
    {
      name: "Elena Rodriguez",
      specialty: "Bronze Sculptor",
      rating: 5,
      comment:
        "ARM transformed my art business. I've connected with collectors I never would have reached otherwise.",
    },
    {
      name: "Marco Venetian",
      specialty: "Marble Artist",
      rating: 5,
      comment:
        "The platform is elegant and professional. It perfectly represents the quality of work I create.",
    },
    {
      name: "Terra Collective",
      specialty: "Ceramic Studio",
      rating: 5,
      comment:
        "Amazing support team and the commission structure is very fair. Highly recommend to fellow artists.",
    },
  ];

  if (isApplicationOpen) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl mb-4">
              Artist Application
            </h1>
            <p className="text-lg text-muted-foreground">
              Join our community of talented artists and start
              selling your work
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tell us about yourself</CardTitle>
              <CardDescription>
                Help us understand your artistic background and
                specialties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmitApplication}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange(
                          "name",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange(
                          "email",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange(
                          "phone",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="artistName">
                      Artist/Studio Name
                    </Label>
                    <Input
                      id="artistName"
                      value={formData.artistName}
                      onChange={(e) =>
                        handleInputChange(
                          "artistName",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">
                      Primary Specialty
                    </Label>
                    <Select
                      value={formData.specialty}
                      onValueChange={(value) =>
                        handleInputChange("specialty", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sculptures">
                          Sculptures
                        </SelectItem>
                        <SelectItem value="statues">
                          Statues
                        </SelectItem>
                        <SelectItem value="pottery">
                          Pottery & Ceramics
                        </SelectItem>
                        <SelectItem value="mixed-media">
                          Mixed Media
                        </SelectItem>
                        <SelectItem value="bronze">
                          Bronze Work
                        </SelectItem>
                        <SelectItem value="marble">
                          Marble Carving
                        </SelectItem>
                        <SelectItem value="custom">
                          Custom Art
                        </SelectItem>
                        <SelectItem value="other">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">
                      Years of Experience
                    </Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) =>
                        handleInputChange("experience", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">
                          1-2 years
                        </SelectItem>
                        <SelectItem value="3-5">
                          3-5 years
                        </SelectItem>
                        <SelectItem value="6-10">
                          6-10 years
                        </SelectItem>
                        <SelectItem value="10+">
                          10+ years
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio">
                    Portfolio Website/Instagram
                  </Label>
                  <Input
                    id="portfolio"
                    placeholder="https://..."
                    value={formData.portfolio}
                    onChange={(e) =>
                      handleInputChange(
                        "portfolio",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Tell us about your work
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your artistic style, inspirations, and what makes your work unique..."
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange(
                        "description",
                        e.target.value,
                      )
                    }
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Submit Application
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsApplicationOpen(false)}
                  >
                    Back
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl mb-6">
            Share Your Art With The World
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Artisan Gallery's curated marketplace and
            connect with collectors who appreciate fine
            craftsmanship
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setIsApplicationOpen(true)}
            >
              Apply to Sell
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onStartSelling}
            >
              Existing Seller Login
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">
              Why Choose Artisan Gallery?
            </h2>
            <p className="text-lg text-muted-foreground">
              We provide everything you need to succeed as an
              artist
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">
              Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple, fair commission structure that grows with
              your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>
                  Perfect for new artists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl mb-4">15%</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Commission on sales
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Up to 10 active listings
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Basic analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Standard support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Professional
                  <Badge>Popular</Badge>
                </CardTitle>
                <CardDescription>
                  For established artists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl mb-4">12%</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Commission on sales
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Up to 50 active listings
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Featured placement
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Master</CardTitle>
                <CardDescription>
                  For top-tier artists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl mb-4">10%</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Commission on sales
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Unlimited listings
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Premium analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Dedicated account manager
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Homepage features
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">
              What Artists Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from our successful artist community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ),
                    )}
                  </div>
                  <p className="text-sm mb-4">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <div>{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.specialty}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of artists who have found their
            collectors through Artisan Gallery
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setIsApplicationOpen(true)}
          >
            Apply Now
          </Button>
        </div>
      </section>
    </div>
  );
}