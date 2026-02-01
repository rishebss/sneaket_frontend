import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiStar,
  FiHeart,
  FiArrowRight,
  FiX,
} from "react-icons/fi";
import { MdDoubleArrow } from "react-icons/md";
import Loader from "../defaultcomponents/Loader";
import DefaultFooter from "../defaultcomponents/DefaultFooter";

const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "running", name: "Running" },
  { id: "basketball", name: "Basketball" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "training", name: "Training" },
  { id: "skateboarding", name: "Skateboarding" },
  { id: "soccer", name: "Soccer" },
  { id: "boots", name: "Boots" },
  { id: "customs", name: "Customs" },
];

const BRANDS = [
  { id: "all", name: "All Brands" },
  { id: "nike", name: "Nike" },
  { id: "adidas", name: "Adidas" },
  { id: "jordan", name: "Jordan" },
  { id: "puma", name: "Puma" },
  { id: "new_balance", name: "New Balance" },
  { id: "reebok", name: "Reebok" },
  { id: "converse", name: "Converse" },
  { id: "vans", name: "Vans" },
  { id: "balenciaga", name: "Balenciaga" },
  { id: "gucci", name: "Gucci" },
];

const FEATURES = [
  { id: "all", name: "All Features" },
  { id: "best_seller", name: "Best Seller" },
  { id: "featured", name: "Featured" },
  { id: "new_arrival", name: "New Arrival" },
  { id: "value_for_money", name: "Value for Money" },
  { id: "limited_edition", name: "Limited Edition" },
  { id: "ai_designed", name: "AI Designed" },
  { id: "trending", name: "Trending" },
  { id: "staff_pick", name: "Staff Pick" },
];

const fetchSneakers = async (page) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/sneakers?page=${page}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function Products() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedFeature, setSelectedFeature] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const {
    data,
    isLoading,
    isError,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["sneakers", page],
    queryFn: () => fetchSneakers(page),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000, // 1 minute
  });

  const products = data?.results || [];

  const pagination = {
    currentPage: page,
    totalPages: data ? Math.ceil(data.count / 10) : 1,
    hasNext: data ? !!data.next : false,
    hasPrevious: data ? !!data.previous : false,
    count: data ? data.count : 0,
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrand !== "all") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (selectedFeature !== "all") {
      result = result.filter(
        (p) =>
          p.features &&
          Array.isArray(p.features) &&
          p.features.includes(selectedFeature)
      );
    }

    // Sort logic
    if (sortBy === "price-low") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedBrand, selectedFeature, sortBy]);

  useEffect(() => {
    if (page > 1) {
       window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  return (
    <>
      <div className="min-h-screen pb-20 px-4 md:px-8 lg:px-12 relative mt-24 md:mt-35">
        {/* Page Header */}
        <div className="max-w-[1600px] mx-auto mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 mb-4"
              ></motion.div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group flex-1 md:flex-none md:w-80">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search kicks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all backdrop-blur-xl"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center h-11 w-11 rounded-lg border transition-all backdrop-blur-xl ${
                  showFilters
                    ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                    : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                }`}
              >
                <FiFilter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Sidebar Overlay */}
        <AnimatePresence>
          {showFilters && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFilters(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full max-w-sm bg-gray-950/95 backdrop-blur-2xl border-l border-white/10 z-[100] p-8 shadow-2xl overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-xl font-mono text-white tracking-tight">
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-10">
                  <div>
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span className="w-1 h-1 bg-cyan-500 rounded-lg" />
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            selectedCategory === cat.id
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold"
                              : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                      
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-500 rounded-lg" />
                      Brands
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {BRANDS.map((brand) => (
                        <button
                          key={brand.id}
                          onClick={() => setSelectedBrand(brand.id)}
                          className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            selectedBrand === brand.id
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold"
                              : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                          }`}
                        >
                          {brand.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-500 rounded-lg" />
                      Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {FEATURES.map((feature) => (
                        <button
                          key={feature.id}
                          onClick={() => setSelectedFeature(feature.id)}
                          className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            selectedFeature === feature.id
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold"
                              : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                          }`}
                        >
                          {feature.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedBrand("all");
                      setSelectedFeature("all");
                    }}
                    className="w-full py-4 mt-8 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-mono"
                  >
                    RESET FILTERS
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="max-w-[1600px] mx-auto flex flex-col gap-8 mt-0 md:mt-20">
          {/* Products Grid */}
          <div className="w-full">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <Loader />
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-lg border border-dashed border-white/10">
                <FiX className="text-4xl text-gray-600 mb-4" />
                <p className="text-gray-400 font-mono">No sneakers found </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedBrand("all");
                    setSelectedFeature("all");
                  }}
                  className="mt-4 text-cyan-400 hover:underline text-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {!isLoading &&
              filteredProducts &&
              filteredProducts.length > 0 &&
              pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-20">
                  <button
                    onClick={() => setPage(old => Math.max(old - 1, 1))}
                    disabled={!pagination.hasPrevious}
                    className={`flex items-center justify-center w-12 h-12 rounded-l-md transition-all ${
                      pagination.hasPrevious
                        ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                        : "bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed"
                    }`}
                  >
                    <MdDoubleArrow className="w-6 h-6 rotate-180" />
                  </button>

                  <div className="w-20 h-12 bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    {isPlaceholderData ? (
                      <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span className="text-cyan-400 font-bold text-sm">
                        {pagination.currentPage} / {pagination.totalPages}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                       if (!isPlaceholderData && pagination.hasNext) {
                         setPage(old => old + 1);
                       }
                    }}
                    disabled={!pagination.hasNext || isPlaceholderData}
                    className={`flex items-center justify-center w-12 h-12 rounded-r-md transition-all ${
                      pagination.hasNext
                        ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                        : "bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed"
                    }`}
                  >
                    <MdDoubleArrow className="w-6 h-6" />
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
      <DefaultFooter />
    </>
  );
}

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);

  // Parse price
  const displayPrice = parseFloat(product.price).toLocaleString();
  const hasDiscount =
    product.original_price &&
    parseFloat(product.original_price) > parseFloat(product.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl"
    >
      {/* Badge */}
      <div className="absolute top-2 left-2 z-20 flex flex-col gap-2">
        {hasDiscount && (
          <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
            -
            {Math.round(
              ((product.original_price - product.price) /
                product.original_price) *
                100,
            )}
            %
          </span>
        )}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
        }}
        className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-blue-600 border border-white/10 flex items-center justify-center text-white hover:bg-blue-500 hover:text-white hover:scale-110 transition-all shadow-lg"
      >
        <FiHeart className="w-4 h-4" />
      </button>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#1a2333]/50 to-transparent">
        <AnimatePresence mode="wait">
          <motion.img
            key={hovered && product.img2 ? "img2" : "img1"}
            src={hovered && product.img2 ? product.img2 : product.img1}
            alt={product.name}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-contain"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Content Link Section */}
      <Link
        to={`/products/${product.id}`}
        className="p-4 flex flex-col flex-1 group/content"
      >
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.15em]">
            {product.brand}
          </span>
          <div className="flex items-center gap-0.5 md:gap-1 bg-white/5 px-1 md:px-2 py-0.5 rounded-full border border-white/5">
            <FiStar className="w-2 h-2 md:w-2.5 md:h-2.5 text-amber-500 fill-amber-500" />
            <span className="text-gray-400 text-[8px] md:text-[10px] font-mono">
              {product.rating || "4.5"}
            </span>
          </div>
        </div>

        <h3 className="text-sm md:text-base text-white/90 mb-2 line-clamp-1 group-hover/content:text-blue-400 transition-colors font-medium">
          {product.name}
        </h3>

        <p className="hidden md:line-clamp-2 text-gray-400 text-[11px] mb-4 leading-relaxed opacity-60 group-hover/content:opacity-100 transition-opacity">
          {product.short_description || product.description}
        </p>

        <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-end md:justify-between">
          <div className="flex items-baseline gap-2">
            {hasDiscount && (
              <span className="text-xs text-gray-500 line-through font-mono opacity-70">
                ₹{parseFloat(product.original_price).toLocaleString()}
              </span>
            )}
            <span className="text-sm md:text-base font-mono font-bold text-white">
              ₹{displayPrice}
            </span>
          </div>

          <div className="hidden md:flex items-center text-blue-500/50 group-hover/content:text-blue-400 transition-colors">
            <MdDoubleArrow className="w-8 h-8" />
            <MdDoubleArrow className="w-8 h-8 -ml-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
