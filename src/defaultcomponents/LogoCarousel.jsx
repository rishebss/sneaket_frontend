import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  SiNike,
  SiAdidas,
  SiPuma,
  SiNewbalance,
  SiReebok,
  SiJordan,
  SiFila
} from "react-icons/si";

// Converse SVG Component from the public/converse.svg path
const Converse = (props) => (
  <svg viewBox="0 -307.68 713.531 713.531" fill="currentColor" {...props}>
    <path d="M155.49 0H98.271c-9.993 0-18.095 8.094-18.095 18.078v61.764c0 9.982 8.102 18.076 18.095 18.076h57.219c9.994 0 18.095-8.094 18.095-18.076V18.078C173.585 8.094 165.483 0 155.49 0zm-9.551 56.91l12.985 38.289-30.997-24.062-29.949 23.852 11.938-37.242L82.27 36.824h34.348l10.89-34.104 11.519 34.104h32.253L145.939 56.91zM377.85 98.168c-11.66 0-21.113-9.443-21.113-21.091V23.081c0-11.648 9.453-21.091 21.113-21.091h52.195v25.874h-45.453v9.277h45.453v25.876h-45.453v9.277h45.453V98.17l-52.195-.002zM261.403 23.081c0-11.648-9.452-21.091-21.112-21.091H182.72v96.18h27.858V27.863h22.97V98.17h27.857l-.002-75.089zM21.112 98.17C9.453 98.17 0 88.728 0 77.079V23.078C0 11.43 9.453 1.986 21.112 1.986h51.22v25.877H27.858v44.431h44.475V98.17H21.112zM260.199 1.986h28.836l19.06 58.59 19.549-58.59h28.835L324.223 98.17h-32.256L260.199 1.986zM584.66 98.168c11.66 0 21.113-9.443 21.113-21.091V58.233c0-11.647-9.453-21.09-21.113-21.09l-29.225-.002v-9.277h46.92V1.989h-53.662c-11.658 0-21.111 9.443-21.111 21.091v18.842c0 11.648 9.453 21.092 21.111 21.092h29.715v9.279h-50.83V98.17l57.082-.002zM687.402 98.17l-52.195-.002c-11.658 0-21.111-9.443-21.111-21.091V23.081c0-11.648 9.453-21.091 21.111-21.091h52.195v25.874h-45.451v9.277h45.451v25.876h-45.451v9.277h45.451V98.17zM504.145 61.656c7.973-3.014 13.643-10.713 13.643-19.733V23.081c0-11.648-9.453-21.091-21.111-21.091h-56.594v96.18h27.857V43.487l24.926 54.683h28.346l-17.067-36.514zM490.906 37.07h-22.971v-9.277h22.971v9.277zM710.744 6.271c-1.855-1.848-4.104-2.771-6.738-2.771-2.617 0-4.852.924-6.699 2.771-1.857 1.855-2.787 4.091-2.787 6.706 0 2.641.922 4.89 2.762 6.745 1.848 1.864 4.09 2.796 6.725 2.796s4.883-.933 6.738-2.796c1.859-1.864 2.787-4.113 2.787-6.745-.001-2.624-.928-4.86-2.788-6.706zm-.945 12.531c-1.59 1.606-3.521 2.409-5.793 2.409s-4.203-.803-5.791-2.409c-1.582-1.605-2.373-3.547-2.373-5.825 0-2.262.795-4.19 2.385-5.787 1.598-1.605 3.525-2.408 5.779-2.408 2.264 0 4.195.803 5.793 2.408 1.59 1.597 2.385 3.525 2.385 5.787 0 2.278-.795 4.22-2.385 5.825z" />
    <path d="M708.244 18.038c-.043-.086-.074-.268-.09-.544a11.971 11.971 0 0 1-.027-.776v-.764c0-.527-.189-1.066-.568-1.619-.381-.552-.982-.893-1.803-1.022.648-.104 1.154-.271 1.518-.505.682-.44 1.023-1.126 1.023-2.058 0-1.312-.541-2.192-1.621-2.641-.604-.25-1.555-.375-2.85-.375h-3.654v10.435h1.84v-4.117h1.451c.977 0 1.658.112 2.047.336.658.389.984 1.187.984 2.395v.829l.039.337c.01.042.018.082.027.116l.025.104h1.723l-.064-.131zm-2.824-5.511c-.389.156-.973.233-1.75.233h-1.658V8.98h1.568c1.02 0 1.76.129 2.221.388.463.26.693.769.693 1.528 0 .803-.357 1.347-1.074 1.631z" />
  </svg>
);

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const distributeLogos = (allLogos, columnCount) => {
  const shuffled = shuffleArray(allLogos);
  const columns = Array.from({ length: columnCount }, () => []);

  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });

  const maxLength = Math.max(...columns.map((col) => col.length));
  columns.forEach((col) => {
    while (col.length < maxLength) {
      const unusedInColumn = shuffled.filter(s => !col.some(c => c.id === s.id));
      const source = unusedInColumn.length > 0 ? unusedInColumn : shuffled;
      col.push(source[Math.floor(Math.random() * source.length)]);
    }
  });

  return columns;
};

const LogoColumn = React.memo(({ logos, index, currentTime }) => {
  const cycleInterval = 3000;
  const columnDelay = index * 400;
  const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length);
  const currentIndex = Math.floor(adjustedTime / cycleInterval);
  const CurrentLogo = useMemo(() => logos[currentIndex].img, [logos, currentIndex]);

  return (
    <div className="relative h-20 w-24 overflow-hidden md:h-40 md:w-60">
      <div
        key={`${logos[currentIndex].id}-${currentIndex}`}
        className="absolute inset-0 flex items-center justify-center animate-fade-in group"
      >
        <CurrentLogo
          className={`h-10 w-10 md:h-20 md:w-20 text-white/30 group-hover:text-cyan-400 transition-all duration-700 cursor-pointer drop-shadow-[0_0_15px_rgba(34,211,238,0)] group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.4)] ${logos[currentIndex].name === "Converse" ? "scale-[1.6] md:scale-[2.4]" : ""}`}
        />
      </div>
    </div>
  );
});

export default function LogoCarousel({ columnCount = 4 }) {
  const [logoSets, setLogoSets] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  const logos = useMemo(() => [
    { name: "Nike", id: 1, img: SiNike },
    { name: "Adidas", id: 2, img: SiAdidas },
    { name: "Puma", id: 3, img: SiPuma },
    { name: "New Balance", id: 4, img: SiNewbalance },
    { name: "Reebok", id: 5, img: SiReebok },
    { name: "Jordan", id: 6, img: SiJordan },
    { name: "Fila", id: 7, img: SiFila },
    { name: "Converse", id: 8, img: Converse }
  ], []);

  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateTime, 100);
    return () => clearInterval(intervalId);
  }, [updateTime]);

  useEffect(() => {
    const distributedLogos = distributeLogos(logos, columnCount);
    setLogoSets(distributedLogos);
  }, [logos, columnCount]);

  return (
    <div className="relative w-full bg-black py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >


        <div className="flex justify-center space-x-2 md:space-x-8 mt-[-70px] md:mt-[-50px]">
          {logoSets.map((column, index) => (
            <LogoColumn
              key={index}
              logos={column}
              index={index}
              currentTime={currentTime}
            />
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15%) scale(0.92);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
}