import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      label: 'Product',
      links: [
        { title: 'Features', href: '#features' },
        { title: 'Pricing', href: '#pricing' },
        { title: 'Testimonials', href: '#testimonials' },
        { title: 'Integration', href: '/' },
      ],
    },
    {
      label: 'Company',
      links: [
        { title: 'FAQs', href: '/faqs' },
        { title: 'About Us', href: '/about' },
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Services', href: '/terms' },
      ],
    },
    {
      label: 'Resources',
      links: [
        { title: 'Blog', href: '/blog' },
        { title: 'Changelog', href: '/changelog' },
        { title: 'Brand', href: '/brand' },
        { title: 'Help', href: '/help' },
      ],
    },
    {
      label: 'Social Links',
      links: [
        { title: 'Facebook', href: '#', icon: Facebook },
        { title: 'Instagram', href: '#', icon: Instagram },
        { title: 'Youtube', href: '#', icon: Youtube },
        { title: 'LinkedIn', href: '#', icon: Linkedin },
      ],
    },
  ];

  const AnimatedContainer = ({ className, delay = 0.1, children }) => {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
      return <div className={className}>{children}</div>;
    }

    return (
      <motion.div
        initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
        whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <footer className="mt-10 md:mt-20 md:rounded-t-[4rem] relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-[3rem] border-t border-white/30 bg-black/70 px-6 py-12 lg:py-16">
      {/* Expansive Ambient Glow (Behind) */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full h-64 bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Sharp Top-Edge Highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-1/3 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-[2px] z-10" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <div className="text-white text-2xl font-sneaket">SNEAKET</div>
          <p className="text-gray-400 mt-8 text-sm md:mt-0">
            © {new Date().getFullYear()} Sneaket. All rights reserved.
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs text-white font-mono">{section.label}</h3>
                <ul className="text-gray-400 mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="hover:text-cyan-400 inline-flex items-center transition-all duration-300"
                      >
                        {link.icon && <link.icon className="mr-2 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;