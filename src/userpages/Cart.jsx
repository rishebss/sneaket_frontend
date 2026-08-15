import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    FiShoppingBag,
    FiMinus,
    FiPlus,
    FiTrash2,
    FiCheck,
    FiChevronUp,
    FiChevronDown,
} from "react-icons/fi";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import Loader from "../defaultcomponents/Loader";
import ConfirmRemoveModal from "../usercomponents/ConfirmRemoveModal";
import ProductDetailDrawer from "./ProductDetailDrawer";

const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return { results: [], count: 0 };

    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart/`,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const json = await response.json();
    if (Array.isArray(json)) {
        return { results: json, count: json.length };
    }
    return json;
};

export default function Cart() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [itemToRemove, setItemToRemove] = useState(null);
    const [isMobileSummaryExpanded, setIsMobileSummaryExpanded] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [favoriteSet, setFavoriteSet] = useState(new Set());

    const {
        data,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["cart"],
        queryFn: fetchCart,
        staleTime: 30 * 1000,
    });

    const items = data?.results || [];
    const cartCount = data?.count || 0;

    const selectedItems = items.filter((i) => i.is_selected);

    const subtotal = selectedItems.reduce(
        (sum, item) =>
            sum + parseFloat(item.sneaker_price) * item.quantity,
        0
    );

    const totalItems = selectedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // Update quantity of a line (optimistic)
    const handleUpdateQuantity = async (item, delta) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        const newQuantity = Math.max(1, item.quantity + delta);

        // Optimistic patch in cache
        queryClient.setQueryData(["cart"], (old) => {
            if (!old) return old;
            return {
                ...old,
                results: old.results.map((it) =>
                    it.id === item.id
                        ? { ...it, quantity: newQuantity }
                        : it
                ),
            };
        });

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/cart/${item.id}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({ quantity: newQuantity }),
                }
            );
            if (!res.ok) {
                refetch();
                return;
            }
            // Keep navbar badge in sync
            const countRes = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/cart/count/`,
                { headers: { Authorization: `Token ${token}` } }
            );
            if (countRes.ok) {
                const { count } = await countRes.json();
                window.dispatchEvent(
                    new CustomEvent("cart-change", { detail: { count } })
                );
            }
        } catch {
            refetch();
        }
    };

    // Remove a line (optimistic)
    const handleRemove = async (item) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        queryClient.setQueryData(["cart"], (old) => {
            if (!old) return old;
            return {
                ...old,
                results: old.results.filter((it) => it.id !== item.id),
            };
        });

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/cart/${item.id}/`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Token ${token}` },
                }
            );
            if (!res.ok) {
                refetch();
                return;
            }
            const countRes = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/cart/count/`,
                { headers: { Authorization: `Token ${token}` } }
            );
            if (countRes.ok) {
                const { count } = await countRes.json();
                window.dispatchEvent(
                    new CustomEvent("cart-change", { detail: { count } })
                );
            }
            refetch();
        } catch {
            refetch();
        }
    };

    // Toggle the per-line checkout selection (persisted via PATCH)
    const handleToggleSelect = async (item) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        const newVal = !item.is_selected;

        queryClient.setQueryData(["cart"], (old) => {
            if (!old) return old;
            return {
                ...old,
                results: old.results.map((it) =>
                    it.id === item.id
                        ? { ...it, is_selected: newVal }
                        : it
                ),
            };
        });

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/cart/${item.id}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({ is_selected: newVal }),
                }
            );
            if (!res.ok) {
                refetch();
            }
        } catch {
            refetch();
        }
    };

    // Open the product detail drawer for an item
    const handleViewProduct = async (item) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/sneakers/${item.sneaker}/`
            );
            if (!res.ok) return;
            setSelectedProduct(await res.json());
        } catch {
            // ignore
        }
    };

    // Toggle favorite for the product shown in the drawer
    const handleToggleFavorite = async (sneakerId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
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
            if (!res.ok) throw new Error("Failed to toggle favorite");
            const resp = await res.json();
            setFavoriteSet((prev) => {
                const next = new Set(prev);
                if (resp.is_favorited) next.add(sneakerId);
                else next.delete(sneakerId);
                return next;
            });
        } catch {
            // Revert optimistic change on error
            setFavoriteSet((prev) => {
                const next = new Set(prev);
                if (next.has(sneakerId)) next.delete(sneakerId);
                else next.add(sneakerId);
                return next;
            });
        }
    };

    // Add to cart from the drawer (keeps cart query + badge in sync)
    const handleAddToCart = async (sneakerId, size) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return false;
        }
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
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            return true;
        } catch {
            return false;
        }
    };

    // Lock page scroll while the drawer is open
    useEffect(() => {
        document.body.style.overflow = selectedProduct ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedProduct]);

    return (
        <>
            <div className="pb-6 px-4 md:px-8 lg:px-12 relative mt-20 md:mt-28">
                <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                    
                </div>

                <div className="max-w-[1600px] mx-auto flex flex-col gap-6 mt-2">
                    {isLoading ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                            <Loader />
                        </div>
                    ) : items.length > 0 ? (
                        <>
                        <div className="relative">
                            {/* Top full-screen-width horizontal divider line */}
                            <div className="w-screen relative left-1/2 -translate-x-1/2 h-px bg-white/10 hidden lg:block" />

                            {/* Vertical divider line extending all the way to screen bottom */}
                            <div className="hidden lg:block absolute top-0 bottom-[-100vh] left-[calc(66.666667%)] w-px bg-white/10 pointer-events-none" />

                            <div className="grid grid-cols-1 lg:grid-cols-12 relative pt-4 lg:pt-6">
                                {/* Scrollable Cart Items list */}
                                <div className="lg:col-span-8 space-y-4 lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto pr-3 lg:pr-8 custom-scrollbar pb-28 lg:pb-0">
                                    {items.map((item, index) => (
                                        <CartRow
                                            key={item.id}
                                            item={item}
                                            index={index}
                                            selected={!!item.is_selected}
                                            onToggleSelect={handleToggleSelect}
                                            onUpdate={(delta) =>
                                                handleUpdateQuantity(item, delta)
                                            }
                                            onRemove={() => setItemToRemove(item)}
                                            onView={() => handleViewProduct(item)}
                                        />
                                    ))}
                                </div>

                                {/* Order Summary Checkout Card (desktop only) */}
                                <div className="hidden lg:block lg:col-span-4 lg:pl-8">
                                    <div className="sticky top-32 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                                        <h3 className="text-white font-mono font-bold tracking-widest uppercase text-sm mb-6">
                                            Order Summary
                                        </h3>
                                        <div className="flex items-center justify-between text-gray-300 text-sm mb-3">
                                            <span>Subtotal</span>
                                            <span className="font-mono text-white">
                                                ₹{subtotal.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-400 text-xs mb-4">
                                            <span>Total Items</span>
                                            <span className="font-mono text-white">
                                                {totalItems}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-400 text-xs mb-4">
                                            <span>Shipping</span>
                                            <span className="font-mono text-green-400">
                                                FREE
                                            </span>
                                        </div>
                                        <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                                            <span className="text-white font-mono font-bold">
                                                Total
                                            </span>
                                            <span className="text-white font-mono font-bold text-lg">
                                                ₹{subtotal.toLocaleString()}
                                            </span>
                                        </div>
                                        <button className="group relative w-full mt-6 overflow-hidden bg-blue-500/30 px-6 py-3 text-sm font-mono text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] cursor-pointer">
                                            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300" />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300" />
                                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300" />
                                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300" />
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                <FiShoppingBag className="w-5 h-5" />
                                                <span className="tracking-[0.2em] font-bold">
                                                    CHECKOUT
                                                </span>
                                            </span>
                                        </button>
                                        <Link
                                            to="/products"
                                            className="block text-center mt-4 text-cyan-400 hover:underline text-xs font-mono"
                                        >
                                            CONTINUE SHOPPING
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/* Mobile fixed checkout footer */}
                    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-white/10">
                        {isMobileSummaryExpanded && (
                            <div className="px-4 py-4 space-y-3 border-b border-white/10 bg-transparent">
                                <div className="flex items-center justify-between text-gray-300 text-sm">
                                    <span>Subtotal</span>
                                    <span className="font-mono text-white">
                                        ₹{subtotal.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-gray-400 text-xs">
                                    <span>Total Items</span>
                                    <span className="font-mono text-white">
                                        {totalItems}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-gray-400 text-xs">
                                    <span>Shipping</span>
                                    <span className="font-mono text-green-400">
                                        FREE
                                    </span>
                                </div>
                                <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                                    <span className="text-white font-mono font-bold">
                                        Total
                                    </span>
                                    <span className="text-white font-mono font-bold text-lg">
                                        ₹{subtotal.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="px-4 py-3 flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setIsMobileSummaryExpanded((v) => !v)
                                }
                                className="group relative flex items-center justify-center h-12 w-12 shrink-0 overflow-hidden bg-green-500/30 text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] cursor-pointer"
                                aria-label="Toggle order summary"
                            >
                                <RiArrowUpDoubleLine
                                    className={`w-5 h-5 text-white transition-transform duration-300 ${
                                        isMobileSummaryExpanded ? "rotate-180" : ""
                                    }`}
                                />
                                </button>
                            <button className="group relative flex-1 h-12 overflow-hidden bg-green-500/30 px-6 text-sm font-mono text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] cursor-pointer">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <FiShoppingBag className="w-5 h-5" />
                                    <span className="tracking-[0.2em] font-bold">
                                        CHECKOUT
                                    </span>
                                    <span className="font-mono font-bold">
                                        ₹{subtotal.toLocaleString()}
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                    </>

                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded-2xl border border-dashed border-white/10">
                            <FiShoppingBag className="text-5xl text-gray-600 mb-6 opacity-20" />
                            <h3 className="text-xl font-mono text-white mb-2">
                                Your cart is empty
                            </h3>
                            <p className="text-gray-400 font-mono text-sm max-w-md text-center px-4">
                                Add some kicks to your cart and they'll show up here
                                for checkout.
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

            <ConfirmRemoveModal
                isOpen={!!itemToRemove}
                onClose={() => setItemToRemove(null)}
                onConfirm={() => itemToRemove && handleRemove(itemToRemove)}
                item={itemToRemove}
            />

            <ProductDetailDrawer
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                isFavorited={
                    selectedProduct
                        ? favoriteSet.has(selectedProduct.id)
                        : false
                }
                onToggleFavorite={() =>
                    selectedProduct &&
                    handleToggleFavorite(selectedProduct.id)
                }
                onAddToCart={(size) =>
                    selectedProduct &&
                    handleAddToCart(selectedProduct.id, size)
                }
                inCartSizes={
                    selectedProduct
                        ? items
                              .filter(
                                  (it) =>
                                      Number(it.sneaker) ===
                                      Number(selectedProduct.id)
                              )
                              .map((it) => it.size ?? null)
                        : []
                }
            />
        </>
    );
}

function CartRow({ item, index, selected, onToggleSelect, onUpdate, onRemove, onView }) {
    const displayPrice = parseFloat(item.sneaker_price).toLocaleString();
    const hasDiscount =
        item.sneaker_original_price &&
        parseFloat(item.sneaker_original_price) > parseFloat(item.sneaker_price);
    const lineTotal = parseFloat(item.sneaker_price) * item.quantity;
    const [expanded, setExpanded] = useState(false);

    const selectBox = (
        <button
            type="button"
            onClick={() => onToggleSelect(item)}
            aria-label="Toggle selection"
            className={`w-5 h-5 shrink-0 rounded border flex items-center justify-center transition-all cursor-pointer ${
                selected
                    ? "bg-cyan-400/20 border-cyan-400 text-cyan-300"
                    : "border-white/20 text-transparent hover:border-white/40"
            }`}
        >
            <FiCheck className="w-3.5 h-3.5" />
        </button>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            className="group relative bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl"
        >
            {/* Desktop layout */}
            <div className="hidden lg:flex gap-4 p-4">
                <Link
                    to={`/products/${item.sneaker}`}
                    className="w-32 aspect-square rounded-md overflow-hidden bg-gradient-to-b from-[#1a2333]/50 to-transparent border border-white/10 shrink-0"
                >
                    <img
                        src={item.sneaker_image}
                        alt={item.sneaker_name}
                        className="w-full h-full object-contain"
                    />
                </Link>

                <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                                <span className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.15em]">
                                    {item.sneaker_brand}
                                </span>
                                <Link
                                    to={`/products/${item.sneaker}`}
                                    className="block text-white/90 hover:text-blue-400 transition-colors font-medium"
                                >
                                    {item.sneaker_name}
                                </Link>
                            </div>
                            {selectBox}
                        </div>

                    <div className="mt-auto pt-3 flex items-center justify-between">
                        <div className="text-left">
                            <div className="flex items-baseline gap-2 justify-start">
                                {hasDiscount && (
                                    <span className="text-xs text-gray-500 line-through font-mono opacity-70">
                                        ₹
                                        {parseFloat(
                                            item.sneaker_original_price
                                        ).toLocaleString()}
                                    </span>
                                )}
                                <span className="text-sm font-mono font-bold text-white">
                                    ₹{lineTotal.toLocaleString()}
                                </span>
                            </div>
                            <span className="text-[10px] text-gray-500 font-mono">
                                ₹{displayPrice} each
                            </span>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={onRemove}
                                    aria-label="Remove item"
                                    className="flex items-center justify-center h-8 w-8 rounded-sm border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all cursor-pointer hover:scale-105"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={onView}
                                    className="flex items-center gap-2 h-8 px-3 rounded-sm border border-white/10 bg-white/5 text-cyan-400 hover:bg-white/10 hover:border-cyan-400/40 text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer hover:scale-105"
                                >
                                    <span>VIEW ITEM</span>
                                    <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                {item.size && (
                                    <span className="h-8 px-3 flex items-center justify-center font-mono text-xs text-cyan-400 bg-white/5 border border-white/10 rounded-sm whitespace-nowrap">
                                        US {item.size}
                                    </span>
                                )}
                                <QuantityStepper
                                    quantity={item.quantity}
                                    onUpdate={onUpdate}
                                    max={item.sneaker_copies}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile layout: banner with collapsible details */}
            <div className="lg:hidden p-3">
                <div className="absolute top-2 right-2 z-10">{selectBox}</div>
                <div className="flex items-start gap-3">
                    <Link
                        to={`/products/${item.sneaker}`}
                        className="w-20 h-20 rounded-md overflow-hidden bg-gradient-to-b from-[#1a2333]/50 to-transparent border border-white/10 shrink-0"
                    >
                        <img
                            src={item.sneaker_image}
                            alt={item.sneaker_name}
                            className="w-full h-full object-contain"
                        />
                    </Link>

                    <div className="flex-1 min-w-0 flex flex-col self-stretch">
                        <div className="flex items-start justify-between gap-2 flex-1">
                            <div className="min-w-0">
                                <Link
                                    to={`/products/${item.sneaker}`}
                                    className="block text-sm text-white/90 hover:text-blue-400 transition-colors font-medium truncate"
                                >
                                    {item.sneaker_name}
                                </Link>
                                <span className="block mt-1 text-sm font-mono font-bold text-white">
                                    ₹{lineTotal.toLocaleString()}
                                </span>
                            </div>                            <div className="flex items-center gap-2 shrink-0 mt-auto">
                                <button
                                    type="button"
                                    onClick={onView}
                                    className="p-2 rounded-sm border border-white/10 bg-white/5 text-[10px] font-mono font-bold tracking-wider text-white hover:bg-white/10 hover:border-cyan-400/40 transition-all cursor-pointer"
                                >
                                    VIEW
                                </button>
                                <button
                                    onClick={onRemove}
                                    aria-label="Remove item"
                                    className="p-2 rounded-sm border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all cursor-pointer"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setExpanded((v) => !v)}
                                    aria-label="Toggle details"
                                    className="p-2 rounded-sm border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    <FiChevronDown
                                        className={`w-4 h-4 transition-transform duration-300 ${
                                            expanded ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-3 mt-3 border-t border-white/10 space-y-3">
                                <div className="flex items-center justify-between text-xs font-mono">
                                    <span className="text-gray-400">Item</span>
                                    <span className="text-white text-right max-w-[60%] truncate">
                                        {item.sneaker_name}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-mono">
                                    <span className="text-gray-400">Brand</span>
                                    <span className="text-white">
                                        {item.sneaker_brand}
                                    </span>
                                </div>
                                {item.size && (
                                    <div className="flex items-center justify-between text-xs font-mono">
                                        <span className="text-gray-400">
                                            Size
                                        </span>
                                        <span className="text-cyan-400">
                                            US {item.size}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between text-xs font-mono">
                                    <span className="text-gray-400">
                                        Unit Price
                                    </span>
                                    <span className="text-white">
                                        ₹{displayPrice}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono text-gray-400">
                                        Quantity
                                    </span>
                                    <QuantityStepper
                                        quantity={item.quantity}
                                        onUpdate={onUpdate}
                                        compact
                                        max={item.sneaker_copies}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function QuantityStepper({ quantity, onUpdate, compact = false, max }) {
    const boxClass = compact ? "w-7 h-7" : "w-8 h-8";
    const iconClass = compact ? "w-3.5 h-3.5" : "w-4 h-4";
    const countClass = compact ? "text-xs" : "text-sm";
    const atMax = max != null && quantity >= max;
    return (
        <div className="flex items-stretch border border-white/10 rounded-sm overflow-hidden divide-x divide-white/10 bg-white/5">
            <button
                onClick={() => onUpdate(-1)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className={`${boxClass} flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed`}
            >
                <FiMinus className={iconClass} />
            </button>
            <span className={`${boxClass} flex items-center justify-center font-mono text-white ${countClass}`}>
                {quantity}
            </span>
            <button
                onClick={() => onUpdate(1)}
                disabled={atMax}
                aria-label="Increase quantity"
                className={`${boxClass} flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed`}
            >
                <FiPlus className={iconClass} />
            </button>
        </div>
    );
}
