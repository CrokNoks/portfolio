"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, ExternalLink, Code } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById("featured-projects");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="gradient-text p-4">Développeur Web</div>
            <div className="text-foreground">Créatif & Passionné</div>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Spécialisé en React, NodeJS et TypeScript. Je <b>transforme</b> vos
            idées en expériences web modernes et performantes conformément aux{" "}
            <b>attentes des utilisateurs</b>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
            >
              <Code className="w-5 h-5" />
              <span>Voir mes projets</span>
            </motion.button>

            <Link
              href="/contact"
              className="flex items-center justify-center space-x-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-border rounded-full font-semibold hover:bg-accent transition-colors flex items-center justify-center space-x-2"
              >
                <span>Me contacter</span>
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-[1] left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <button
            onClick={scrollToProjects}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
