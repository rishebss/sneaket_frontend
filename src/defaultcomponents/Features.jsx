import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Features = ({
  className,
  title = "How to Get Your Sneaket",
  autoPlayInterval = 4000,
  imageHeight = "h-[400px]"
}) => {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  const features = [
    {
      step: "01",
      title: "Lows",
      content: "Sleek and versatile low-cut silhouettes for everyday comfort and effortless style.",
      image: "https://res.cloudinary.com/dviwae8cc/image/upload/v1767742568/Gemini_Generated_Image_yszaluyszaluysza-Photoroom_pdvyav.png"
    },
    {
      step: "02",
      title: "Ankles",
      content: "Classic mid-top designs that provide extra support and a balanced, iconic look.",
      image: "https://res.cloudinary.com/dviwae8cc/image/upload/v1767742706/Gemini_Generated_Image_j1zgbtj1zgbtj1zg-Photoroom_cioifd.png"
    },
    {
      step: "03",
      title: "Chunky",
      content: "Bold, chunky and retro-inspired designs for that statement look.",
      image: "https://res.cloudinary.com/dviwae8cc/image/upload/v1767744555/Gemini_Generated_Image_47ydji47ydji47yd-Photoroom_er0kna.png"
    },
    {
      step: "04",
      title: "Boots",
      content: "Rugged durability meets high-end street fashion with our premium hybrid boots.",
      image: "https://res.cloudinary.com/dviwae8cc/image/upload/v1767743238/Gemini_Generated_Image_rayliorayliorayl-Photoroom_ztqjph.png"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval])

  return (
    <div className={`p-8 md:p-12 ${className || ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="max-w-7xl mx-auto w-full"
      >
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 mb-4 mt-[-10px] md:mt-10">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500/50" />
            <span className="text-xs md:text-xl font-mono text-cyan-400 uppercase tracking-[0.3em] whitespace-nowrap">
              CATEGORIES
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
        </div>

        <p className="text-center mt-0 text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-12">
          Explore our diverse range of sneaker silhouettes for every occasion.
        </p>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 md:mt-20 mt-0">
          <div className="order-2 md:order-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`relative flex gap-6 md:gap-8 cursor-pointer ${
                  index < features.length - 1 ? "mb-8" : ""
                }`}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  setCurrentFeature(index);
                  setProgress(0);
                }}
              >
                {index < features.length - 1 && (
                  <div
                    className="absolute left-[15px] md:left-[19px] top-[32px] md:top-[40px] w-0.5 bg-transparent"
                    style={{ height: `100%` }}
                  >
                    <motion.div
                      className="h-full w-full bg-cyan-500"
                      initial={{ scaleY: 0 }}
                      animate={{
                        scaleY:
                          index < currentFeature
                            ? 1
                            : index === currentFeature
                            ? progress / 100
                            : 0,
                      }}
                      style={{ originY: 0 }}
                      transition={{
                        duration: index === currentFeature ? 0.1 : 0.5,
                        ease: "linear",
                      }}
                    />
                  </div>
                )}
                <div className="relative z-10 flex w-full items-start gap-6 md:gap-8">
                  <div className="flex flex-col items-center">
                    <motion.div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 ${
                        index <= currentFeature // Condition for color
                          ? "bg-cyan-500 border-cyan-500 text-white"
                          : "bg-gray-800 border-gray-700"
                      } ${
                        index === currentFeature // Condition for scale
                          ? "scale-110"
                          : ""
                      }`}
                    >
                      {index <= currentFeature ? (
                        <span className="text-lg font-bold">✓</span>
                      ) : (
                        <span className="text-lg font-semibold text-gray-300">
                          {index + 1}
                        </span>
                      )}
                    </motion.div>
                  </div>

                  <div className="flex-1 pt-1">
                    <h3 className="text-base font-mono text-white mb-2">
                      {feature.title || feature.step}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {feature.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={`order-1 md:order-2 relative h-[250px] md:h-[320px] overflow-hidden rounded-lg`}>
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 overflow-hidden rounded-lg"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="relative w-full h-full">
                        <img
                          src={feature.image}
                          alt={feature.step}
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black via-black/50 to-transparent rounded-lg" />
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Features