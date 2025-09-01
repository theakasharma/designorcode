"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// A single-file demo that simulates a mobile app frame and
// showcases a seamless, blended transition between two pages
// using shared elements + cross-fade + subtle blur.
// TailwindCSS + Framer Motion required.

export default function SeamlessBlendTransition() {
  const [page, setPage] = useState("home");

  return (
    <>
      
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-6">
        <div className="relative w-[380px] max-w-full h-[760px] max-h-[85vh] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-neutral-900">
          {/* Top status bar mimic */}
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-3 text-xs text-white/70">
            <span>09:41</span>
            <div className="flex gap-1.5 opacity-75">
              <span className="w-3 h-1 rounded-sm bg-white/70" />
              <span className="w-3 h-1 rounded-sm bg-white/70" />
              <span className="w-3 h-1 rounded-sm bg-white/70" />
            </div>
          </div>

          {/* Shared, morphing gradient shape */}
          <motion.div
            layoutId="shared-gradient"
            className="absolute -top-20 -right-24 w-[420px] h-[420px] rounded-full blur-3xl"
            style={{
              background: page === "home" ?
                "radial-gradient(40% 40% at 60% 40%, rgba(56,189,248,0.8), rgba(56,189,248,0.1) 70%)" :
                "radial-gradient(40% 40% at 50% 50%, rgba(244,114,182,0.8), rgba(244,114,182,0.1) 70%)"
            }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          />

          {/* Secondary shared shape for richer blend */}
          <motion.div
            layoutId="shared-gradient-2"
            className="absolute -bottom-28 -left-28 w-[480px] h-[480px] rounded-full blur-3xl"
            style={{
              background: page === "home" ?
                "radial-gradient(35% 35% at 30% 70%, rgba(34,197,94,0.9), rgba(34,197,94,0.05) 70%)" :
                "radial-gradient(35% 35% at 70% 30%, rgba(168,85,247,0.9), rgba(168,85,247,0.05) 70%)"
            }}
            transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.04 }}
          />

          {/* Page container with cross-fade + subtle backdrop blur */}
          <div className="relative z-10 w-full h-full">
            <AnimatePresence mode="wait">
              {page === "home" ? (
                <PageHome key="home" onOpen={() => setPage("details")} />
              ) : (
                <PageDetails key="details" onBack={() => setPage("home")} />
              )}
            </AnimatePresence>
          </div>

          {/* Bottom nav mimic */}
          <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-around py-4 bg-black/20 backdrop-blur-md border-t border-white/10">
            <button
              onClick={() => setPage("home")}
              className={`px-4 py-2 rounded-full transition ${page === "home" ? "bg-white text-black" : "bg-white/10 hover:bg-white/20"
                }`}
            >Home</button>
            <button
              onClick={() => setPage("details")}
              className={`px-4 py-2 rounded-full transition ${page === "details" ? "bg-white text-black" : "bg-white/10 hover:bg-white/20"
                }`}
            >Details</button>
          </div>
        </div>
      </div>
    </>
  );
}

function PageHome({ onOpen }) {

  const imgBox = [
    {
      img: 'https://images.unsplash.com/photo-1552308995-2baac1ad5490?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      img: 'https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      img: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      img: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]

  return (
    <motion.div
      className="w-full h-full p-6 pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
    >
      <div className="space-y-5">
        <motion.h1
          layoutId="title"
          className="text-2xl font-semibold tracking-tight"
        >
          Discover
        </motion.h1>

        {/* Shared card that will expand on Details */}
        <motion.button
          layoutId="feature-card"
          onClick={onOpen}
          className="group w-full text-left"
        >
          <div className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-lg">
            <div className="p-5">
              <motion.div layoutId="chip" className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-white/10">
                <span className="w-2 h-2 rounded-full bg-white/70" />
                New this week
              </motion.div>
              <motion.h2 layoutId="feature-title" className="mt-3 text-xl font-medium">
                Autumn Color Palettes
              </motion.h2>
              <p className="mt-1 text-sm text-white/70">
                Curated shades and gradients for your next project.
              </p>
            </div>
            <motion.div layoutId="feature-media" className="h-48 bg-gradient-to-tr from-white/10 to-white/5" >
              <img src="https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=1076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </motion.div>
          </div>
        </motion.button>

        <div className="grid grid-cols-2 gap-3 pt-2">
          {imgBox.map((item, i) => (
            <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
              <img className=" h-full w-full object-cover" src={item.img} alt="" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PageDetails({ onBack }) {
  return (
    <motion.div
      className="w-full h-full p-0 pt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
    >
      {/* Top bar */}
      <div className="absolute top-10 left-0 right-0 z-20 flex items-center justify-between px-6">
        <button onClick={onBack} className="px-3 py-1.5 rounded-full bg-white text-black text-sm">Back</button>
        <div className="text-white/70 text-sm">Edit</div>
      </div>

      {/* The shared card expands to a full header */}
      <motion.div layoutId="feature-card" className="rounded-b-[2rem] overflow-hidden bg-white/5 border-b border-white/10">
        <motion.div layoutId="feature-media" className="h-64 bg-gradient-to-tr from-white/10 to-white/5">
          <img src="https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=1076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </motion.div>
        <div className="p-6 pb-8">
          <motion.div layoutId="chip" className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-white/10">
            <span className="w-2 h-2 rounded-full bg-white/70" />
            New this week
          </motion.div>
          <motion.h2 layoutId="feature-title" className="mt-3 text-2xl font-semibold">
            Autumn Color Palettes
          </motion.h2>
          <p className="mt-1 text-sm text-white/70 max-w-[32ch]">
            Explore soft ambers, deep plums, and forest greens. Tap any swatch to copy.
          </p>
        </div>
      </motion.div>

      {/* Content that slides slightly in for added continuity */}
      <motion.div
        className="p-6 space-y-4"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.05 }}
      >
        <div className="grid grid-cols-4 gap-3">
          {[...Array(12)].map((_, i) => (
            <Swatch key={i} idx={i} />
          ))}
        </div>
      </motion.div>

      {/* Subtle overlay that briefly adds blur during page switch */}
      <AnimatePresence>
        <motion.div
          key="blur"
          className="pointer-events-none absolute inset-0 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
        />
      </AnimatePresence>
    </motion.div>
  );
}

function Swatch({ idx }) {
  // simple deterministic palette
  const hues = [20, 30, 40, 120, 160, 190, 215, 260, 290, 320, 345, 5];
  const hue = hues[idx % hues.length];
  const bg = `oklch(70% 0.15 ${hue})`;
  return (
    <button
      className="aspect-square rounded-xl border border-white/10 shadow-inner"
      style={{ background: bg }}
      title={`Copy ${bg}`}
      onClick={() => navigator.clipboard?.writeText(bg)}
    />
  );
}