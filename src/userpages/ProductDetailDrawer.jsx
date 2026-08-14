import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiHeart, FiStar, FiShoppingBag } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import GradientDrawerBg from "../usercomponents/GradientDrawerBg";

export default function ProductDetailDrawer({
  product,
  isOpen,
  onClose,
  isFavorited,
  onToggleFavorite,
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const images = [product.img1, product.img2].filter(Boolean);
  const hasDiscount =
    product.original_price &&
    parseFloat(product.original_price) > parseFloat(product.price);
  const discountPercent = hasDiscount
    ? Math.round(
        ((parseFloat(product.original_price) - parseFloat(product.price)) /
          parseFloat(product.original_price)) *
          100
      )
    : 0;
  const displayPrice = parseFloat(product.price).toLocaleString();
  const originalDisplayPrice = hasDiscount
    ? parseFloat(product.original_price).toLocaleString()
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:max-w-md bg-black z-[100] shadow-2xl flex flex-col"
          >
            <GradientDrawerBg />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-mono text-white tracking-tight">
                Product Details
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-b from-[#1a2333]/50 to-transparent border border-white/10">
                  <img
                    src={images[selectedImage] || images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {images.length > 1 && (
                  <div className="flex gap-3">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                          selectedImage === idx
                            ? "border-blue-500"
                            : "border-white/10"
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                    {product.brand}
                  </span>
                  <h3 className="text-xl text-white mt-1 font-medium">
                    {product.name}
                  </h3>
                </div>

                {product.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                      <FiStar className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-gray-400 text-xs font-mono">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-mono font-bold text-white">
                    ₹{displayPrice}
                  </span>
                  {originalDisplayPrice && (
                    <>
                      <span className="text-sm text-gray-500 line-through font-mono">
                        ₹{originalDisplayPrice}
                      </span>
                      <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                        -{discountPercent}%
                      </span>
                    </>
                  )}
                </div>

                {(product.short_description || product.description) && (
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {product.short_description || product.description}
                  </p>
                )}

                {product.category && (
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                    Category: {product.category}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-white/10 space-y-3">
              <button
                onClick={onToggleFavorite}
                className={`group relative w-full overflow-hidden px-6 py-3 text-sm font-mono backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
                  isFavorited
                    ? "bg-rose-500/20 text-white hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                }`}
              >
                <div className={`absolute top-0 left-0 w-4 h-4 border-t border-l transition-all duration-300 ${isFavorited ? "border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.3)]" : "border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"}`} />
                <div className={`absolute top-0 right-0 w-4 h-4 border-t border-r transition-all duration-300 ${isFavorited ? "border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.3)]" : "border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"}`} />
                <div className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l transition-all duration-300 ${isFavorited ? "border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.3)]" : "border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"}`} />
                <div className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r transition-all duration-300 ${isFavorited ? "border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.3)]" : "border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"}`} />

                <div className={`absolute inset-0 bg-gradient-to-r via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isFavorited ? "from-rose-500/5 to-rose-500/5" : "from-cyan-500/5 to-purple-500/5"}`} />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isFavorited ? (
                    <AiFillHeart className="w-5 h-5 text-pink-500" />
                  ) : (
                    <FiHeart className="w-5 h-5" />
                  )}
                  <span className="tracking-[0.2em] font-bold">
                    {isFavorited ? "SAVED TO FAVORITES" : "ADD TO FAVORITES"}
                  </span>
                </span>
              </button>
              <button className="group relative w-full overflow-hidden bg-blue-500/30 px-6 py-3 text-sm font-mono text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] cursor-pointer">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300" />

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <FiShoppingBag className="w-5 h-5" />
                  <span className="tracking-[0.2em] font-bold">
                    ADD TO CART
                  </span>
                </span>
              </button>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
