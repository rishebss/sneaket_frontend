import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiStar,
  FiHeart,
  FiArrowRight,
  FiX,
  FiShoppingBag,
} from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { MdDoubleArrow } from "react-icons/md";
import Loader from "../defaultcomponents/Loader";
import DefaultFooter from "../defaultcomponents/DefaultFooter";
import ProductDetailDrawer from "./ProductDetailDrawer";
import ProductFilterDrawer from "../usercomponents/ProductFilterDrawer";

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

const fetchSneakers = async ({ page, search, category, brand, feature, sort }) => {
  const params = new URLSearchParams({ page });

  if (search) params.append('search', search);
  if (category && category !== 'all') params.append('category', category);
  if (brand && brand !== 'all') params.append('brand', brand);
  if (feature && feature !== 'all') params.append('features', feature);

  // Sort mapping
  if (sort === 'price-low') params.append('ordering', 'price');
  else if (sort === 'price-high') params.append('ordering', '-price');
  else if (sort === 'rating') params.append('ordering', '-rating');
  else params.append('ordering', '-created_at'); // Default "newest"

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/sneakers/?${params.toString()}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialBrand = searchParams.get("brand") || "all";
  const initialFeature = searchParams.get("feature") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedFeature, setSelectedFeature] = useState(initialFeature);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [favoriteSet, setFavoriteSet] = useState(new Set());
  const [cartSizesMap, setCartSizesMap] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const drawerOpen = !!selectedProduct;
  const filterDrawerOpen = showFilters;

  useEffect(() => {
    const handlePopState = () => {
      if (selectedProduct) {
        setSelectedProduct(null);
      }
      if (showFilters) {
        setShowFilters(false);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedProduct, showFilters]);

  useEffect(() => {
    if (drawerOpen || filterDrawerOpen) {
      history.pushState({ drawerOpen: true }, "");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, filterDrawerOpen]);

  // Sync state with URL parameters
  useEffect(() => {
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const feature = searchParams.get("feature");
    const search = searchParams.get("search");

    if (category) setSelectedCategory(category);
    if (brand) setSelectedBrand(brand);
    if (feature) setSelectedFeature(feature);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory, selectedBrand, selectedFeature, sortBy]);

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["sneakers", page, searchQuery, selectedCategory, selectedBrand, selectedFeature, sortBy],
    queryFn: () => fetchSneakers({
      page,
      search: searchQuery,
      category: selectedCategory,
      brand: selectedBrand,
      feature: selectedFeature,
      sort: sortBy
    }),
    staleTime: 0,
  });

  const products = data?.results || [];

  const pagination = {
    currentPage: page,
    totalPages: data ? Math.ceil(data.count / 10) : 1,
    hasNext: data ? !!data.next : false,
    hasPrevious: data ? !!data.previous : false,
    count: data ? data.count : 0,
  };

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  // Fetch favorite status for visible products (persist across refresh)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !products || products.length === 0) return;
    const sneaker_ids = products.map((p) => p.id);
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/favorites/bulk_check/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify({ sneaker_ids }),
            signal: controller.signal,
          }
        );
        if (!res.ok) return;
        const result = await res.json();
        const next = new Set();
        for (const [key, val] of Object.entries(result)) {
          if (val) next.add(Number(key));
        }
        setFavoriteSet(next);
      } catch {
        // ignore
      }
    })();
    return () => controller.abort();
  }, [products]);

  // Fetch cart membership whenever the detail drawer opens for a product
  // (mirrors how favorites are checked) so the drawer can show IN CART.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/cart/`,
          {
            headers: { Authorization: `Token ${token}` },
            signal: controller.signal,
          }
        );
        if (!res.ok) return;
        const json = await res.json();
        const items = Array.isArray(json) ? json : json.results || [];
        const map = {};
        items.forEach((it) => {
          const sid = it.sneaker;
          (map[sid] = map[sid] || []).push(it.size ?? null);
        });
        setCartSizesMap(map);
      } catch {
        // ignore
      }
    })();
    return () => controller.abort();
  }, [selectedProduct]);

  // Track cart count (initial fetch + live updates from cart-change events)
  useEffect(() => {
    const updateCount = (count) => setCartCount(count);

    const token = localStorage.getItem("token");
    if (token) {
      const controller = new AbortController();
      (async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/cart/count/`,
            {
              headers: { Authorization: `Token ${token}` },
              signal: controller.signal,
            }
          );
          if (!res.ok) return;
          const data = await res.json();
          updateCount(data.count || 0);
        } catch {
          // ignore
        }
      })();
      return () => controller.abort();
    }

    const onCartChange = (e) => updateCount(e.detail?.count ?? 0);
    window.addEventListener("cart-change", onCartChange);
    return () => window.removeEventListener("cart-change", onCartChange);
  }, []);

  // Toggle favorite handler
  const handleToggleFavorite = async (sneakerId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    // Optimistic UI update
    setFavoriteSet((prev) => {
      const next = new Set(prev);
      if (next.has(sneakerId)) next.delete(sneakerId);
      else next.add(sneakerId);
      return next;
    });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/favorites/toggle/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ sneaker_id: sneakerId }),
        }
      );
      if (!res.ok) {
        // Revert optimistic change on error
        setFavoriteSet((prev) => {
          const next = new Set(prev);
          if (next.has(sneakerId)) next.delete(sneakerId);
          else next.add(sneakerId);
          return next;
        });
        return;
      }
      const resp = await res.json();
      // Ensure consistency with server response
      setFavoriteSet((prev) => {
        const next = new Set(prev);
        if (resp.is_favorited) next.add(sneakerId);
        else next.delete(sneakerId);
        return next;
      });
    } catch {
      // Revert on network error
      setFavoriteSet((prev) => {
        const next = new Set(prev);
        if (next.has(sneakerId)) next.delete(sneakerId);
        else next.add(sneakerId);
        return next;
      });
    }
  };

  // Add to cart handler
  const handleAddToCart = async (sneakerId, size) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return false;
    }
    // Optimistically reflect the new line in the membership map
    setCartSizesMap((prev) => {
      const next = { ...prev };
      const sid = String(sneakerId);
      const existing = next[sid] || [];
      if (!existing.some((s) => String(s) === String(size))) {
        next[sid] = [...existing, size ?? null];
      }
      return next;
    });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ sneaker_id: sneakerId, size }),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        if (err.available != null) return err; // stock error
        return false;
      }
      const data = await res.json();
      window.dispatchEvent(
        new CustomEvent("cart-change", {
          detail: { count: data.cart_count },
        })
      );
      return true;
    } catch {
      return false;
    }
  };

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
                onClick={() => navigate("/cart")}
                className="relative flex items-center justify-center h-11 w-11 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:border-white/20 backdrop-blur-xl transition-all"
                aria-label="Cart"
              >
                <FiShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-blue-800 text-white text-[10px] font-bold font-mono">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center h-11 w-11 rounded-lg border transition-all backdrop-blur-xl ${showFilters
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
        <ProductFilterDrawer
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          onPopStateClose={() => setShowFilters(false)}
          categories={CATEGORIES}
          brands={BRANDS}
          features={FEATURES}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedFeature={selectedFeature}
          setSelectedFeature={setSelectedFeature}
          onReset={() => {
            setSelectedCategory("all");
            setSelectedBrand("all");
            setSelectedFeature("all");
          }}
        />

        <div className="max-w-[1600px] mx-auto flex flex-col gap-8 mt-0 md:mt-20">
          {/* Products Grid */}
          <div className="w-full">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <Loader />
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    isFavorited={favoriteSet.has(product.id)}
                    onToggle={() => handleToggleFavorite(product.id)}
                    onProductClick={setSelectedProduct}
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
              products &&
              products.length > 0 &&
              pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-20">
                  <button
                    onClick={() => setPage(old => Math.max(old - 1, 1))}
                    disabled={!pagination.hasPrevious}
                    className={`flex items-center justify-center w-12 h-12 rounded-l-md transition-all ${pagination.hasPrevious
                      ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      : "bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed"
                      }`}
                  >
                    <MdDoubleArrow className="w-6 h-6 rotate-180" />
                  </button>

                  <div className="w-20 h-12 bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    {isFetching ? (
                      <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span className="text-cyan-400 font-bold text-sm">
                        {pagination.currentPage} / {pagination.totalPages}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (!isFetching && pagination.hasNext) {
                        setPage(old => old + 1);
                      }
                    }}
                    disabled={!pagination.hasNext || isFetching}
                    className={`flex items-center justify-center w-12 h-12 rounded-r-md transition-all ${pagination.hasNext
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
      <ProductDetailDrawer
        product={selectedProduct}
        isOpen={drawerOpen}
        onClose={() => setSelectedProduct(null)}
        isFavorited={selectedProduct ? favoriteSet.has(selectedProduct.id) : false}
        onToggleFavorite={() => selectedProduct && handleToggleFavorite(selectedProduct.id)}
        onAddToCart={(size) => selectedProduct && handleAddToCart(selectedProduct.id, size)}
        inCartSizes={selectedProduct ? cartSizesMap[selectedProduct.id] || [] : []}
      />
      <DefaultFooter />
    </>
  );
}

function ProductCard({ product, index, isFavorited = false, onToggle, onProductClick }) {
  const [hovered, setHovered] = useState(false);

  // Parse price
  const displayPrice = parseFloat(product.price).toLocaleString();
  const hasDiscount =
    product.original_price &&
    parseFloat(product.original_price) > parseFloat(product.price);
  const outOfStock = Number(product.copies) === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl ${
        outOfStock ? "opacity-50 grayscale" : ""
      }`}
    >
      {/* Badge */}
      <div className="absolute top-2 left-2 z-20 flex flex-col gap-2">
        {hasDiscount && !outOfStock && (
          <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
            -
            {Math.round(
              ((product.original_price - product.price) /
                product.original_price) *
                100
            )}
            %
          </span>
        )}
        {outOfStock && (
          <span className="bg-gray-700 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
            Sold Out
          </span>
        )}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle && onToggle();
        }}
        aria-pressed={isFavorited}
        title={isFavorited ? "Remove from favorites" : "Add to favorites"}
        className={isFavorited ? "absolute top-2 right-2 z-20 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:scale-110 transition-all shadow-lg bg-red-200 text-white hover:bg-red-200" : "absolute top-2 right-2 z-20 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:scale-110 transition-all shadow-lg bg-blue-300 text-white hover:bg-blue-300"}
      >
        {isFavorited ? (
          <AiFillHeart className="w-4 h-4 text-red-500" />
        ) : (
          <FiHeart className="w-4 h-4 text-white/80" />
        )}
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
      <div
        onClick={() => onProductClick && onProductClick(product)}
        className="p-4 flex flex-col flex-1 group/content cursor-pointer"
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
      </div>
    </motion.div>
  );
}
