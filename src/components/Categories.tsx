import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

const categories = [
  {
    name: 'Statues & Sculptures',
    description: 'Classic and contemporary sculptures in marble, bronze, and stone',
    image: 'https://images.unsplash.com/photo-1699437110121-5b1ec9155868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9uemUlMjBzY3VscHR1cmUlMjBhcnR8ZW58MXx8fHwxNzU4ODI5Nzg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    count: '150+ pieces'
  },
  {
    name: 'Home Decorations',
    description: 'Elegant vases, pottery, and decorative objects for your space',
    image: 'https://images.unsplash.com/photo-1628685374755-3a293a37aa92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3JhdGlvbnMlMjB2YXNlc3xlbnwxfHx8fDE3NTg4Mjk3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    count: '200+ items'
  },
  {
    name: 'Custom Art',
    description: 'Commissioned pieces tailored to your vision and space',
    image: 'https://images.unsplash.com/photo-1707578087102-92520fda8f97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBzY3VscHR1cmV8ZW58MXx8fHwxNzU4NzQ3MDg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    count: 'Unlimited possibilities'
  }
];

export function Categories() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Browse by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From classical sculptures to modern decorative pieces, find the perfect art for every space
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-2">{category.name}</h3>
                  <p className="text-muted-foreground mb-3">{category.description}</p>
                  <p className="text-sm text-primary">{category.count}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}