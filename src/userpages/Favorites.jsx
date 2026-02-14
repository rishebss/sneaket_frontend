import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    FiSearch,
    FiFilter,
    FiStar,
    FiHeart,
    FiX,
    FiArrowLeft,
} from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
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

const fetchFavorites = async ({ search, category, brand, sort }) => {
    const token = localStorage.getItem("token");
    if (!token) return [];

    const params = new URLSearchParams({ favorited: 'true' });

    if (search) params.append('search', search);
    if (category && category !== 'all') params.append('category', category);
    if (brand && brand !== 'all') params.append('brand', brand);

    // Sort mapping
    if (sort === 'price-low') params.append('ordering', 'price');
    else if (sort === 'price-high') params.append('ordering', '-price');
    else if (sort === 'rating') params.append('ordering', '-rating');
    else params.append('ordering', '-created_at');

    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/sneakers/?${params.toString()}`,
        {
            headers: {
                Authorization: `Token ${token}`,
            }
        }
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export default function Favorites() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedBrand, setSelectedBrand] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [showFilters, setShowFilters] = useState(false);
    const [favoriteSet, setFavoriteSet] = useState(new Set());

    const {
        data: products = [],
        isLoading,
        isError,
        refetch
    } = useQuery({
        queryKey: ["favorites", searchQuery, selectedCategory, selectedBrand, sortBy],
        queryFn: () => fetchFavorites({
            search: searchQuery,
            category: selectedCategory,
            brand: selectedBrand,
            sort: sortBy
        }),
        staleTime: 30 * 1000,
    });

    // Sync favorites set for UI
    useEffect(() => {
        if (products.length > 0) {
            setFavoriteSet(new Set(products.map(p => p.id)));
        } else {
            setFavoriteSet(new Set());
        }
    }, [products]);

    // Toggle favorite handler
    const handleToggleFavorite = async (sneakerId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        // Optimistically remove from list
        setFavoriteSet((prev) => {
            const next = new Set(prev);
            next.delete(sneakerId);
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
                refetch(); // Rollback on error
                return;
            }
            // If it's removed, it will automatically disappear on next refetch or we can filter locally
            refetch();
        } catch {
            refetch();
        }
    };

    return (
        <>
            <div className="min-h-screen pb-20 px-4 md:px-8 lg:px-12 relative mt-24 md:mt-35">
                {/* Page Header */}
                <div className="max-w-[1600px] mx-auto mb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-end gap-6">


                        <div className="flex items-center gap-3 mt-10">
                            <div className="relative group flex-1 md:flex-none md:w-80">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search favorites..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-11 bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all backdrop-blur-xl"
                                />
                            </div>

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
                <AnimatePresence>
                    {showFilters && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowFilters(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                            />

                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 h-full w-full md:max-w-sm bg-gray-950/95 backdrop-blur-2xl border-l border-white/10 z-[100] p-8 shadow-2xl overflow-y-auto custom-scrollbar"
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
                                                    className={`px-4 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat.id
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
                                                    className={`px-4 py-2 rounded-lg text-sm transition-all ${selectedBrand === brand.id
                                                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold"
                                                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                                        }`}
                                                >
                                                    {brand.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setSelectedCategory("all");
                                            setSelectedBrand("all");
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

                <div className="max-w-[1600px] mx-auto flex flex-col gap-8 mt-12">
                    {isLoading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
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
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded-2xl border border-dashed border-white/10">
                            <FiHeart className="text-5xl text-gray-600 mb-6 opacity-20" />
                            <h3 className="text-xl font-mono text-white mb-2">Your wishlist is empty</h3>
                            <p className="text-gray-400 font-mono text-sm max-w-md text-center px-4">
                                Looks like you haven't saved any kicks yet. Explore our collection and add your favorites here!
                            </p>
                            <Link
                                to="/products"
                                className="mt-8 px-8 py-3 bg-white text-black font-mono text-sm rounded-full hover:bg-cyan-400 hover:text-black transition-all shadow-xl shadow-white/5"
                            >
                                EXPLORE PRODUCTS
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <DefaultFooter />
        </>
    );
}

function ProductCard({ product, index, isFavorited = false, onToggle }) {
    const [hovered, setHovered] = useState(false);
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
            className="mt-0 md:mt-10 group relative bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl"
        >
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggle && onToggle();
                }}
                className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:scale-110 transition-all shadow-lg bg-red-500/20 text-white backdrop-blur-md"
            >
                <AiFillHeart className="w-4 h-4 text-red-500" />
            </button>

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
            </div>

            <Link
                to={`/products/${product.id}`}
                className="p-4 flex flex-col flex-1"
            >
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.15em]">
                        {product.brand}
                    </span>
                    <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                        <FiStar className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                        <span className="text-gray-400 text-[10px] font-mono">
                            {product.rating || "4.5"}
                        </span>
                    </div>
                </div>

                <h3 className="text-sm md:text-base text-white/90 mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors font-medium">
                    {product.name}
                </h3>

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
                    <div className="hidden md:flex items-center text-blue-500/50 group-hover:text-blue-400 transition-colors">
                        <MdDoubleArrow className="w-8 h-8" />
                        <MdDoubleArrow className="w-8 h-8 -ml-3" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
