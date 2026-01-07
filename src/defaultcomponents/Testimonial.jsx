import React from 'react';
import { motion } from "framer-motion";
import { MdDoubleArrow } from "react-icons/md";

// --- Data ---
const testimonials = [
  {
    text: "Sneaket has the most comfortable sneakers I've ever worn. Perfect for all-day wear without any discomfort!",
    image: "https://i.pinimg.com/736x/8c/1b/3a/8c1b3a6d01a786d663680ce69ed14839.jpg",
    name: "Briana Patton",
    role: "Fitness Enthusiast",
  },
  {
    text: "The sneaker customization options are incredible! I designed my own pair and they arrived faster than expected.",
    image: "https://i.pinimg.com/736x/f4/c2/fe/f4c2fe0f23dc062a0e7db27e7a5adfe4.jpg",
    name: "Bilal Ahmed",
    role: "Sneaker Collector",
  },
  {
    text: "Sneaket's customer support is exceptional. They helped me find the perfect size and even exchanged my order hassle-free.",
    image: "https://i.pinimg.com/736x/41/c0/8e/41c08e93a2d16ac397b2c857665eb27c.jpg",
    name: "Saman Malik",
    role: "Regular Customer",
  },
  {
    text: "As a runner, I need durable sneakers. Sneaket's performance line exceeded my expectations in both comfort and durability.",
    image: "https://i.pinimg.com/736x/f8/75/4b/f8754b3f0c8e18547e995c0c37cec1e5.jpg",
    name: "Omar Raza",
    role: "Marathon Runner",
  },
  {
    text: "The limited edition drops are always on point. I've built my collection exclusively from Sneaket releases.",
    image: "https://i.pinimg.com/736x/bb/94/f3/bb94f36b0b73b84bc08400319f5c71c5.jpg",
    name: "Zainab Hussain",
    role: "Sneakerhead",
  },
  {
    text: "Perfect balance of style and comfort. I wear my Sneakets to work and get compliments every day!",
    image: "https://i.pinimg.com/736x/02/6b/3b/026b3b99ff48f4f1baf7a4184b0156ec.jpg",
    name: "Aliza Khan",
    role: "Marketing Professional",
  },
  {
    text: "The eco-friendly materials make me feel good about my purchase. Style doesn't have to compromise sustainability.",
    image: "https://i.pinimg.com/736x/16/ee/2c/16ee2c07a74f2e52e55fdc5155cb4d25.jpg",
    name: "Farhan Siddiqui",
    role: "Environmental Advocate",
  },
  {
    text: "Fast shipping and perfect fit every time. Sneaket has become my go-to for all my footwear needs.",
    image: "https://i.pinimg.com/736x/fa/9f/86/fa9f863bfc20680888afe30b76290ed4.jpg",
    name: "Sana Sheikh",
    role: "Online Shopper",
  },
  {
    text: "The sizing guide is incredibly accurate. Ordered my first pair online and they fit perfectly without trying them on.",
    image: "https://i.pinimg.com/1200x/40/83/25/408325bb57e1a479b656f75aba29a96f.jpg",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

const firstColumn = testimonials;
const secondColumn = [...testimonials.slice(3), ...testimonials.slice(0, 3)];
const thirdColumn = [...testimonials.slice(6), ...testimonials.slice(0, 6)];

// --- Sub-Components ---
const TestimonialsColumn = ({ className, testimonials, duration }) => {
  return (
    <div className={className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {testimonials.map(({ text, image, name, role }, i) => (
                <motion.li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileFocus={{
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-10 rounded-3xl border border-neutral-800 shadow-lg shadow-black/10 max-w-xs w-full bg-gradient-to-br from-gray-900/50 to-gray-950/50 p-8 backdrop-blur-xl cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-gray-400 text-sm leading-relaxed font-normal m-0">
                      {text}
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-800 group-hover:ring-primary/30 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-mono font-semibold not-italic tracking-tight leading-5 text-white">
                          {name}
                        </cite>
                        <span className="text-sm leading-5 tracking-tight text-gray-400 mt-0.5">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-16 md:py-12 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16 mt-[-60px] md:mt-[10px]">
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 max-w-full">
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <div className="flex -space-x-1.5 sm:-space-x-2">
                  <img
                    src="https://res.cloudinary.com/dviwae8cc/image/upload/v1766746071/999_11zon_p1cwr4.jpg"
                    alt="Community member"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-900 object-cover"
                  />
                  <img
                    src="https://res.cloudinary.com/dviwae8cc/image/upload/v1766745906/3D_UrbanStyle_11zon_r71nzf.jpg"
                    alt="Community member"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-900 object-cover"
                  />
                  <img
                    src="https://res.cloudinary.com/dviwae8cc/image/upload/v1766746136/3D_Ben_Benyamin_Bayati___%D8%A8%D9%86%DB%8C%D8%A7%D9%85%DB%8C%D9%86_%D8%A8%DB%8C%D8%A7%D8%AA%DB%8C_1_ct4ukl.jpg"
                    alt="Community member"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-900 object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-xs sm:text-sm whitespace-nowrap">Join 10K+ Sneakerheads</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs font-mono">Community of collectors</p>
                </div>
              </div>

            </div>
          </div>


          <p className="text-center mt-0 text-gray-400 max-w-2xl mx-auto text-xs md:text-base leading-relaxed">
            Discover what our sneaker enthusiasts say about Sneaket.
          </p>
        </div>

        <div
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={50} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={70} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={60} />
        </div>
      </motion.div>
    </section>
  );
};

// --- Main App Component ---
export default function App() {
  return (
    <div className="w-screen min-h-screen bg-transparent flex flex-col justify-center relative">
      <TestimonialsSection />
    </div>
  );
}