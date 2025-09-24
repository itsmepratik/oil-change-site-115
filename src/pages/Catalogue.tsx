import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SortAsc, Grid, List, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {
  SAMPLE_PRODUCTS,
  PRODUCT_CATEGORIES,
  getAllBrands,
  getAllTags,
  searchProducts,
  sortProducts,
  Product
} from "@/config/products";

type SortOption = 'name' | 'brand' | 'newest' | 'oldest';
type ViewMode = 'grid' | 'list';

const Catalogue = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get all available filter options
  const allBrands = useMemo(() => getAllBrands(), []);
  const allTags = useMemo(() => getAllTags(), []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = SAMPLE_PRODUCTS;

    // Apply search filter
    if (searchQuery.trim()) {
      products = searchProducts(searchQuery);
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      products = products.filter(product => 
        selectedCategories.includes(product.category.id)
      );
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      products = products.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      products = products.filter(product => 
        selectedTags.some(tag => product.tags.includes(tag))
      );
    }

    // Apply featured filter
    if (showFeaturedOnly) {
      products = products.filter(product => product.featured);
    }

    // Apply sorting
    return sortProducts(products, sortBy);
  }, [searchQuery, selectedCategories, selectedBrands, selectedTags, sortBy, showFeaturedOnly]);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedTags([]);
    setShowFeaturedOnly(false);
  };

  // Toggle filter selections
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Count active filters
  const activeFiltersCount = selectedCategories.length + selectedBrands.length + selectedTags.length + (showFeaturedOnly ? 1 : 0);

  // Filter Panel Component
  const FilterPanel = ({ isMobile = false }) => (
    <div className="space-y-6">
      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
          </span>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Featured Products */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Featured</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={showFeaturedOnly}
            onCheckedChange={(checked) => setShowFeaturedOnly(checked === true)}
          />
          <label htmlFor="featured" className="text-sm">
            Show featured products only
          </label>
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Categories</h3>
        <div className="space-y-2">
          {PRODUCT_CATEGORIES.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <label htmlFor={category.id} className="text-sm flex-1">
                {category.name}
              </label>
              <Badge variant="outline" className="text-xs">
                {SAMPLE_PRODUCTS.filter(p => p.category.id === category.id).length}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Brands</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <label htmlFor={brand} className="text-sm flex-1">
                {brand}
              </label>
              <Badge variant="outline" className="text-xs">
                {SAMPLE_PRODUCTS.filter(p => p.brand === brand).length}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Popular Tags */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0, 12).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Product Catalogue
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover our comprehensive range of automotive products, from premium lubricants to professional tools and maintenance supplies.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-lg border p-6">
                <h2 className="font-semibold text-lg mb-6">Filters</h2>
                <FilterPanel />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                            {activeFiltersCount}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 flex flex-col">
                      <SheetHeader className="flex-shrink-0">
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 flex-1 overflow-y-auto pb-6">
                        <FilterPanel isMobile />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Results Count */}
                  <span className="text-sm text-muted-foreground">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                    <SelectTrigger className="w-48">
                      <SortAsc className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Sort by Name</SelectItem>
                      <SelectItem value="brand">Sort by Brand</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode Toggle */}
                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {activeFiltersCount > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium">Active filters:</span>
                    {selectedCategories.map(categoryId => {
                      const category = PRODUCT_CATEGORIES.find(c => c.id === categoryId);
                      return (
                        <Badge key={categoryId} variant="secondary" className="gap-1">
                          {category?.name}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => toggleCategory(categoryId)}
                          />
                        </Badge>
                      );
                    })}
                    {selectedBrands.map(brand => (
                      <Badge key={brand} variant="secondary" className="gap-1">
                        {brand}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => toggleBrand(brand)}
                        />
                      </Badge>
                    ))}
                    {selectedTags.map(tag => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => toggleTag(tag)}
                        />
                      </Badge>
                    ))}
                    {showFeaturedOnly && (
                      <Badge variant="secondary" className="gap-1">
                        Featured
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setShowFeaturedOnly(false)}
                        />
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Products Grid/List */}
              {filteredProducts.length > 0 ? (
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }>
                  {filteredProducts.map((product, index) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria or clearing some filters.
                    </p>
                    <Button onClick={clearAllFilters} variant="outline">
                      Clear all filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Catalogue;