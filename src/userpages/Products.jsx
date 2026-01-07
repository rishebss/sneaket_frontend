import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiChevronDown, FiStar, FiShoppingBag, FiArrowRight, FiX } from 'react-icons/fi';
import Loader from '../defaultcomponents/Loader';
import DefaultFooter from '../defaultcomponents/DefaultFooter';

const CATEGORIES = [
    { id: 'all', name: 'All' },
    { id: 'running', name: 'Running' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'training', name: 'Training' },
    { id: 'skateboarding', name: 'Skateboarding' },
    { id: 'soccer', name: 'Soccer' },
    { id: 'boots', name: 'Boots' },
    { id: 'customs', name: 'Customs' },
];

const BRANDS = [
    { id: 'all', name: 'All Brands' },
    { id: 'nike', name: 'Nike' },
    { id: 'adidas', name: 'Adidas' },
    { id: 'jordan', name: 'Jordan' },
    { id: 'puma', name: 'Puma' },
    { id: 'new_balance', name: 'New Balance' },
    { id: 'reebok', name: 'Reebok' },
    { id: 'converse', name: 'Converse' },
    { id: 'vans', name: 'Vans' },
    { id: 'balenciaga', name: 'Balenciaga' },
    { id: 'gucci', name: 'Gucci' },
];

export default function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [products, searchQuery, selectedCategory, selectedBrand, sortBy]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sneakers`);
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let result = [...products];

        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.brand.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (selectedBrand !== 'all') {
            result = result.filter(p => p.brand === selectedBrand);
        }

        // Sort logic
        if (sortBy === 'price-low') {
            result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sortBy === 'rating') {
            result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }

        setFilteredProducts(result);
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
                            >

                            </motion.div>

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
                                className={`flex items-center justify-center h-11 w-11 rounded-lg border transition-all backdrop-blur-xl ${showFilters
                                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400'
                                    : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'
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
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 h-full w-full max-w-sm bg-gray-950/95 backdrop-blur-2xl border-l border-white/10 z-[100] p-8 shadow-2xl overflow-y-auto"
                            >
                                <div className="flex items-center justify-between mb-10">
                                    <h2 className="text-xl font-mono text-white tracking-tight">Filters</h2>
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
                                            {CATEGORIES.map(cat => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => setSelectedCategory(cat.id)}
                                                    className={`px-4 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat.id
                                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold'
                                                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                                        }`}
                                                >
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                            <span className="w-1 h-1 bg-purple-500 rounded-lg" />
                                            Brands
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {BRANDS.map(brand => (
                                                <button
                                                    key={brand.id}
                                                    onClick={() => setSelectedBrand(brand.id)}
                                                    className={`px-4 py-2 rounded-lg text-sm transition-all ${selectedBrand === brand.id
                                                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 font-bold'
                                                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                                        }`}
                                                >
                                                    {brand.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            setSelectedBrand('all');
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

                <div className="max-w-[1600px] mx-auto flex flex-col gap-8">
                    {/* Products Grid */}
                    <div className="w-full">
                        {loading ? (
                            <div className="flex items-center justify-center min-h-[300px]">
                                <Loader />
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-lg border border-dashed border-white/10">
                                <FiX className="text-4xl text-gray-600 mb-4" />
                                <p className="text-gray-400 font-mono">No sneakers found matching your criteria</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('all');
                                        setSelectedBrand('all');
                                    }}
                                    className="mt-4 text-cyan-400 hover:underline text-sm"
                                >
                                    Clear all filters
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
    const hasDiscount = product.original_price && parseFloat(product.original_price) > parseFloat(product.price);

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
            <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
                {product.features?.includes('new_arrival') && (
                    <span className="bg-blue-500 text-white text-[8px] md:text-[10px] font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-tighter shadow-[0_0_10px_rgba(59,130,246,0.5)]">New Drop</span>
                )}
                {hasDiscount && (
                    <span className="bg-red-500 text-white text-[8px] md:text-[10px] font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-tighter">
                        -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                    </span>
                )}
            </div>

            <button className="absolute top-3 right-3 md:top-5 md:right-5 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400/50 flex items-center justify-center text-white hover:bg-blue-500 hover:scale-110 transition-all">
                <FiShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#1a2333] to-transparent">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={hovered && product.img2 ? 'img2' : 'img1'}
                        src={hovered && product.img2 ? product.img2 : product.img1}
                        alt={product.name}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-contain"
                    />
                </AnimatePresence>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em]">{product.brand}</span>
                    <div className="flex items-center gap-1">
                        <FiStar className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-gray-400 text-xs font-mono">{product.rating || '4.5'}</span>
                    </div>
                </div>

                <h3 className="text-sm md:text-lg text-white mb-1 md:mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">{product.name}</h3>

                <p className="hidden md:line-clamp-2 text-gray-400 text-xs mb-6 leading-relaxed">
                    {product.short_description || product.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        {hasDiscount && (
                            <span className="text-[10px] text-gray-600 line-through font-mono mt-[-1px] md:mt-[-10px]">₹{parseFloat(product.original_price).toLocaleString()}</span>
                        )}
                        <span className="text-sm md:text-base font-mono text-white">₹{displayPrice}</span>
                    </div>

                    <Link to={`/products/${product.id}`} className="flex items-center gap-1 md:gap-2 text-blue-400 text-[10px] md:text-sm font-semibold group/btn">
                        <span className="hidden sm:inline">Details</span>
                        <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
