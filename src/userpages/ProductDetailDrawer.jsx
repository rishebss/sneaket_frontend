import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiHeart, FiStar, FiShoppingBag, FiCheck, FiTrash2, FiEdit2 } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import GradientDrawerBg from "../usercomponents/GradientDrawerBg";

export default function ProductDetailDrawer({
  product,
  isOpen,
  onClose,
  isFavorited,
  onToggleFavorite,
  onAddToCart,
  inCartSizes = [],
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [stockError, setStockError] = useState(null);
  const sizeSelectRef = useRef(null);

  const API = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");
  const currentUsername =
    (() => {
      try {
        return JSON.parse(localStorage.getItem("user") || "{}").username;
      } catch {
        return null;
      }
    })() || null;

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [myReview, setMyReview] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewHover, setReviewHover] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewsNext, setReviewsNext] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const renderStars = (value) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <FiStar
          key={n}
          className={`w-3.5 h-3.5 ${
            n <= value
              ? "text-amber-500 fill-amber-500"
              : "text-gray-600"
          }`}
        />
      ))}
    </div>
  );

  const submitReview = async () => {
    if (!token) {
      setReviewError("Please log in to review");
      return;
    }
    if (reviewRating < 1) {
      setReviewError("Select a rating");
      return;
    }
    setSubmittingReview(true);
    setReviewError(null);
    try {
      const res = await fetch(`${API}/api/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          sneaker: product.id,
          rating: reviewRating,
          title: reviewTitle,
          comment: reviewComment,
        }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        setReviewError(e.error || "Could not submit review");
        return;
      }
      const saved = await res.json();
      setReviews((prev) =>
        prev.filter((rv) => rv.id !== saved.id).concat(saved)
      );
      setMyReview(saved);
      setShowReviewForm(false);
    } catch {
      setReviewError("Something went wrong");
    } finally {
      setSubmittingReview(false);
    }
  };

  const deleteReview = async () => {
    if (!myReview || !token) return;
    setSubmittingReview(true);
    try {
      const res = await fetch(`${API}/api/reviews/${myReview.id}/`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });
      if (res.ok) {
        setReviews((prev) => prev.filter((rv) => rv.id !== myReview.id));
        setMyReview(null);
        setReviewTitle("");
        setReviewComment("");
        setReviewRating(5);
        setShowReviewForm(false);
      }
    } finally {
      setSubmittingReview(false);
    }
  };

  const loadMoreReviews = async () => {
    if (!reviewsNext) return;
    setLoadingMore(true);
    try {
      const res = await fetch(reviewsNext);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.results || [];
      setReviews((prev) => [...prev, ...list]);
      setReviewsNext(data.next || null);
    } catch {
      // ignore
    } finally {
      setLoadingMore(false);
    }
  };

  const outOfStock = Number(product?.copies) === 0;

  const availableSizes = Array.isArray(product?.available_sizes)
    ? product.available_sizes
    : [];

  // Reset transient UI state whenever a new product is opened
  useEffect(() => {
    if (isOpen) {
      setAdded(false);
      setLoading(false);
      setSizeError(false);
      setStockError(null);
    }
  }, [isOpen, product?.id]);

  // Auto-select the size already in cart when drawer opens if available
  useEffect(() => {
    if (isOpen && inCartSizes.length > 0) {
      const matchingSize = availableSizes.find((size) =>
        inCartSizes.some((s) => String(s) === String(size))
      );
      if (matchingSize != null) {
        setSelectedSize(matchingSize);
      } else if (inCartSizes[0] != null) {
        setSelectedSize(inCartSizes[0]);
      }
    } else if (isOpen && inCartSizes.length === 0) {
      setSelectedSize(null);
    }
  }, [isOpen, product?.id, inCartSizes]);

  // Fetch reviews for the product and detect the current user's own review
  useEffect(() => {
    if (!isOpen || !product?.id) return;
    let cancelled = false;
    setReviewsLoading(true);
    fetch(`${API}/api/reviews/?sneaker=${product.id}&page=1`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : data.results || [];
        setReviews(list);
        setReviewsNext(Array.isArray(data) ? null : data.next || null);
        const mine = currentUsername
          ? list.find((rv) => rv.username === currentUsername)
          : null;
        setMyReview(mine || null);
        setShowReviewForm(false);
        if (mine) {
          setReviewRating(mine.rating);
          setReviewComment(mine.comment || "");
          setReviewTitle(mine.title || "");
        } else {
          setReviewRating(5);
          setReviewComment("");
          setReviewTitle("");
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setReviewsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, product?.id, API, currentUsername]);

  // Cart membership (which sizes of this product are already in the cart) is
  // owned by Products.jsx and passed in as inCartSizes - same pattern as
  // favorites. Derive the in-cart status for the currently selected size.
  const isSelectedSizeInCart =
    availableSizes.length === 0
      ? inCartSizes.some((s) => s === null || s === undefined)
      : selectedSize != null &&
        inCartSizes.some((s) => String(s) === String(selectedSize));

  const hasAnySizeInCart = inCartSizes.length > 0;

  const inCart = selectedSize != null ? isSelectedSizeInCart : hasAnySizeInCart;

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

                {availableSizes.length > 0 && (
                  <div className="space-y-2" ref={sizeSelectRef}>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-mono uppercase tracking-widest transition-colors ${
                          sizeError ? "text-red-400" : "text-gray-400"
                        }`}
                      >
                        Select Size (US)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map((size) => {
                        const isSizeInCart = inCartSizes.some(
                          (s) => String(s) === String(size)
                        );
                        return (
                          <button
                            key={size}
                            onClick={() => {
                              setSelectedSize(size);
                              setSizeError(false);
                            }}
                            className={`relative min-w-[3rem] px-3 py-2 rounded-md border text-sm font-mono transition-all ${
                              selectedSize === size
                                ? "border-blue-500 bg-blue-500/20 text-white"
                                : isSizeInCart
                                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:border-emerald-500"
                                  : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:bg-white/10"
                            }`}
                          >
                            {size}
                            {isSizeInCart && (
                              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Reviews section */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-mono font-bold tracking-widest uppercase text-sm">
                    Reviews
                  </h4>
                  {product.review_count > 0 && (
                    <div className="flex items-center gap-2">
                      {renderStars(Math.round(product.rating || 0))}
                      <span className="text-gray-400 text-xs font-mono">
                        {product.rating} ({product.review_count})
                      </span>
                    </div>
                  )}
                </div>

                {/* Review form (toggled) for logged-in users */}
                {token ? (
                  showReviewForm ? (
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3">
                      <div className="flex items-center justify-end">
                        {myReview && (
                          <button
                            onClick={deleteReview}
                            disabled={submittingReview}
                            className="px-4 py-2 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-mono tracking-wider uppercase hover:bg-red-500/20 transition-all disabled:opacity-60 cursor-pointer"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
                        {myReview ? "Edit your review" : "Write a review"}
                      </p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onMouseEnter={() => setReviewHover(n)}
                            onMouseLeave={() => setReviewHover(0)}
                            onClick={() => setReviewRating(n)}
                            className="transition-transform hover:scale-110 cursor-pointer"
                          >
                            <FiStar
                              className={`w-6 h-6 ${
                                (reviewHover || reviewRating) >= n
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-gray-600"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-xs font-mono text-gray-500">
                          {reviewRating}/5
                        </span>
                      </div>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="Title (optional)"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50"
                      />
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience..."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 resize-none"
                      />
                      {reviewError && (
                        <p className="text-xs font-mono text-red-400">{reviewError}</p>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowReviewForm(false)}
                          className="flex-1 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-xs font-mono tracking-wider uppercase hover:bg-white/10 transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={submitReview}
                          disabled={submittingReview}
                          className="flex-1 px-4 py-2 rounded-lg bg-blue-500/30 border border-blue-500/40 text-white text-xs font-mono tracking-wider uppercase hover:bg-blue-500/40 transition-all disabled:opacity-60 cursor-pointer"
                        >
                          {submittingReview
                            ? "SAVING..."
                            : myReview
                            ? "Update"
                            : "Submit"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    !myReview && (
                      <button
                        onClick={() => setShowReviewForm(true)}
                        className="w-full px-4 py-2.5 rounded-lg border border-dashed border-white/20 bg-white/5 text-white text-xs font-mono tracking-wider uppercase hover:border-blue-500/50 hover:bg-white/10 transition-all cursor-pointer"
                      >
                        + Write a Review
                      </button>
                    )
                  )
                ) : (
                  <p className="text-gray-500 text-xs font-mono">
                    Log in to write a review.
                  </p>
                )}

                {/* Reviews list */}
                <div className="mt-4 space-y-3">
                  {reviewsLoading ? (
                    <p className="text-gray-500 text-xs font-mono">
                      Loading reviews...
                    </p>
                  ) : reviews.length === 0 ? (
                    <p className="text-gray-500 text-xs font-mono">
                      No reviews yet. Be the first!
                    </p>
                  ) : (
                    <>{reviews.map((rv) => {
                      const isMine = rv.username === currentUsername;
                      return (
                      <div
                        key={rv.id}
                        className={`rounded-lg border bg-white/5 p-3 ${
                          isMine
                            ? "border-blue-500/40"
                            : "border-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/10 border border-amber-500/30 flex items-center justify-center text-xs font-mono font-bold text-white shrink-0">
                              {(
                                rv.first_name?.[0] ||
                                rv.username?.[0] ||
                                "U"
                              ).toUpperCase()}
                            </span>
                            <span className="text-white text-sm font-mono truncate">
                              {rv.first_name
                                ? `${rv.first_name} ${rv.last_name || ""}`.trim()
                                : rv.username}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {renderStars(rv.rating)}
                            {isMine && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => setShowReviewForm(true)}
                                  title="Edit review"
                                  className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                  <FiEdit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={deleteReview}
                                  disabled={submittingReview}
                                  title="Delete review"
                                  className="p-1 rounded-md text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-60"
                                >
                                  <FiTrash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        {rv.title && (
                          <p className="text-white text-sm font-mono mt-2">
                            {rv.title}
                          </p>
                        )}
                        {rv.comment && (
                          <p className="text-gray-400 text-xs leading-relaxed mt-1">
                            {rv.comment}
                          </p>
                        )}
                        </div>
                        );
                    })
                  }
                  {reviewsNext && (
                    <button
                      onClick={loadMoreReviews}
                      disabled={loadingMore}
                      className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-xs font-mono tracking-wider uppercase hover:bg-white/10 transition-all disabled:opacity-60 cursor-pointer"
                    >
                      {loadingMore ? "LOADING..." : "Load More Reviews"}
                    </button>
                  )}
                  </>)}
                </div>
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
              <button
onClick={async () => {
                   if (added || loading) return;
                   if (availableSizes.length > 0 && selectedSize == null) {
                     setSizeError(true);
                     sizeSelectRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                     return;
                   }
                   setLoading(true);
                   try {
                     const success = onAddToCart
                       ? await onAddToCart(selectedSize)
                       : false;
                     if (success === true) {
                       setAdded(true);
                       setStockError(null);
                       setTimeout(() => setAdded(false), 1800);
                     } else if (success && success.available != null) {
                       setStockError(success.available);
                     }
                   } catch {
                     // ignore errors
                   } finally {
                     setLoading(false);
                   }
                 }}
                disabled={added || loading || outOfStock}
                className={`group relative w-full overflow-hidden px-6 py-3 text-sm font-mono transition-all duration-500 cursor-pointer ${
                  outOfStock
                    ? "bg-red-500/20 text-red-300 opacity-70 cursor-not-allowed"
                    : added || inCart
                      ? "bg-emerald-500/20 text-white hover:scale-[1.02]"
                      : "bg-blue-500/30 text-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                } ${loading ? "opacity-80 cursor-wait" : ""}`}
              >
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover:border-white group-hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-300" />

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  ) : added ? (
                    <FiCheck className="w-5 h-5 text-emerald-400" />
                  ) : inCart ? (
                    <FiCheck className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <FiShoppingBag className="w-5 h-5" />
                  )}
                   <span className="tracking-[0.2em] font-bold">
                    {outOfStock
                      ? "OUT OF STOCK"
                      : loading
                        ? "ADDING..."
                        : added
                          ? "ADDED TO CART"
                          : inCart
                            ? "IN CART"
                            : "ADD TO CART"}
                  </span>
                </span>
               </button>
               {stockError != null && (
                 <p className="text-xs font-mono text-red-400 text-center">
                   Only {stockError} left in stock
                 </p>
               )}
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
