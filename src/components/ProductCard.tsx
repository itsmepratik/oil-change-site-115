import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/config/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-lg bg-white">
            <div className="w-full h-48 flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute top-3 left-3">
              <Badge 
                className={`${product.category.color} border-0 font-medium`}
                variant="secondary"
              >
                {product.category.name}
              </Badge>
            </div>
            {product.featured && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-yellow-100 text-yellow-800 border-0 font-medium">
                  Featured
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-4 font-medium">
              {product.brand}
            </p>
          </div>
          
          {/* Tags - Limited to 2 maximum */}
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs px-2 py-0.5 bg-muted/50"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;