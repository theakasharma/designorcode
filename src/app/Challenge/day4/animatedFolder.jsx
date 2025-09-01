/*
LivingFolderComponent.jsx

A React component implementing the "Living Folder" interaction described.

Prerequisites:
- React
- Tailwind CSS configured in your project
- framer-motion: `npm install framer-motion`

How to use:
import LivingFolder from './LivingFolderComponent';

<LivingFolder
  title="Project Files"
  items={["specs.pdf", "design.sketch", "notes.txt", "todo.md"]}
  mode="playful" // 'professional' | 'playful' | 'futuristic'
/>

This file contains all styling via Tailwind classes and inline styles for 3D transforms.
Feel free to tweak timing, easing, and sizes.
*/
"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const lidVariants = {
  closed: { rotateX: 0, y: 0 },
  hover: { rotateX: -6, y: -4 },
  open: { rotateX: -110, y: -18 },
};

const contentContainer = {
  hidden: { opacity: 0, y: 6 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, type: 'spring', stiffness: 260, damping: 20 },
  }),
  exit: i => ({ opacity: 0, y: 6, transition: { delay: (3 - i) * 0.03 } }),
};

export default function LivingFolder({ title = 'Folder', items = [], mode = 'professional' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const papers = ["Snapchat", "Meta", "Telegram", "CASE STUDY"];

  // visual variants per mode
  const modeStyles = {
    professional: {
      folderBg: 'bg-yellow-400',
      innerBg: 'bg-yellow-50',
      ring: 'ring-yellow-300/40',
      paperStyle: 'bg-white/90 border border-yellow-200',
    },
    playful: {
      folderBg: 'bg-amber-300/95',
      innerBg: 'bg-amber-50',
      ring: 'ring-amber-300/50',
      paperStyle: 'bg-white/95 border border-amber-200 shadow-sm',
    },
    futuristic: {
      folderBg: 'bg-gradient-to-br from-sky-500 to-indigo-500 text-white',
      innerBg: 'bg-gradient-to-tl from-white/6 to-white/2',
      ring: 'ring-sky-400/40',
      paperStyle: 'bg-white/6 backdrop-blur border border-white/8',
    },
  };

  const style = modeStyles[mode] || modeStyles.professional;

  return (
    <>
      <div className="header">
        <a className="bear-link" href="https://peerlist.io/akashamra" target="_blank" rel="noreferrer noopener">
          <img src="https://avatars.githubusercontent.com/u/62895760?v=4" alt="Profile" className=" w-12 h-12" />
          <h4>AAKASH SHARMA</h4>
        </a>
      </div>
      <div className={`p-6 w-full h-dvh flex items-center justify-center`}>
        <div className="flex flex-col items-center">
          {/* Label */}
          <div className="mb-3 text-center">
            <div className="text-sm text-gray-600">{title}</div>
          </div>

          {/* Folder interactive area */}
          <motion.button
            aria-expanded={isOpen}
            onClick={() => setIsOpen(p => !p)}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`relative w-56 h-40 focus:outline-none group`}
            style={{ perspective: 900 }}
          >
            {/* shadow + base */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
              <motion.div
                initial={{ scale: 1 }}
                animate={isOpen ? { scale: 1.02 } : isHover ? { scale: 1.01 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                className={`w-52 h-32 rounded-xl ${style.folderBg} ${style.ring} ring-1 ring-offset-2 ring-offset-transparent shadow-xl`}
                style={{ transformStyle: 'preserve-3d' }}
              />
            </div>

            {/* lid - positioned at top of folder */}
            <motion.div
              className={`absolute left-2 right-2 top-6 h-12 rounded-t-lg origin-bottom shadow-md ${style.folderBg} overflow-hidden`}
              style={{ transformStyle: 'preserve-3d' }}
              variants={lidVariants}
              animate={isOpen ? 'open' : isHover ? 'hover' : 'closed'}
              transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            >
              {/* lid texture */}
              <div className="w-full h-full flex items-center pl-4">
                <div className="w-14 h-5 rounded-sm bg-white/25" />
                <div className="ml-3 text-xs font-semibold text-white/95">{isOpen ? 'Open' : 'Folder'}</div>
              </div>
            </motion.div>

            {/* inner content area (visible when open) */}
            <div className="absolute left-4 right-4 top-20 bottom-6 rounded-md overflow-visible pointer-events-none">
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'tween', duration: 0.18 }}
                    className={`w-full h-full p-2 rounded-md ${style.innerBg} flex flex-col items-center justify-start gap-2`}
                  >
                    {/* sample papers/cards that peek out */}
                    <div className="w-full flex flex-col items-center">
                      {items.length === 0 ? (
                        <>
                          {/* <motion.div
                           className={`py-6 px-4 rounded-md text-sm ${style.paperStyle} text-gray-400 italic`}
                           initial={{ y: 6, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ type: 'spring', stiffness: 260 }}
                         >
                           Empty
                         </motion.div> */}
                          <motion.div
                            className="relative w-48 h-21 cursor-pointer paperIndex"
                            onClick={() => setOpen(!open)}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <AnimatePresence>
                              {papers.map((paper, i) => (
                                <motion.div
                                  key={paper}
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{
                                    y: open ? -i * 8 : 0,
                                    opacity: open ? 1 : 0,
                                  }}
                                  exit={{ y: 20, opacity: 0 }}
                                  transition={{ duration: 0.4, delay: i * 0.08 }}
                                  className="absolute left-3 right-3 bottom-6 bg-white border border-gray-200 rounded-md shadow-sm p-2 text-sm font-medium text-gray-700 text-center"
                                  style={{ zIndex: 99 + papers.length - i }}
                                >
                                  {paper}
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </motion.div>
                        </>
                      ) : (
                        items.slice(0, 4).map((it, idx) => (
                          <motion.div
                            key={it + idx}
                            custom={idx}
                            variants={contentContainer}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`w-11/12 py-2 px-3 mb-1 rounded-md text-sm flex items-center justify-between ${style.paperStyle}`}
                          >
                            <div className="truncate text-xs font-medium">{it}</div>
                            <div className="text-xs opacity-70">{idx + 1}</div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* subtle breathing shadow under the folder */}
            <motion.div
              className="absolute left-8 right-8 bottom-1 h-2 rounded-full bg-black/8 blur-2xl"
              animate={isOpen ? { scaleX: 1.08, opacity: 0.6 } : isHover ? { scaleX: 1.04, opacity: 0.45 } : { scaleX: 1, opacity: 0.35 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              style={{ transformOrigin: 'center' }}
            />
          </motion.button>

          {/* simple control row */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setIsOpen(p => !p)}
              className="px-3 py-1 rounded-md bg-gray-100 text-sm shadow-sm hover:scale-105 transition-transform"
            >
              {isOpen ? 'Close' : 'Open'}
            </button>

            <div className="text-xs text-gray-500">Hover to lift • Click to toggle</div>
          </div>
        </div >
      </div >
    </>
  );
}


// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";

// export default function FolderInteraction() {
//   const [open, setOpen] = useState(false);

//   const papers = ["Snapchat", "Meta", "Telegram", "CASE STUDY"];

//   return (
//     <div className="flex flex-col items-center justify-center h-screen ">
//       {/* Folder Wrapper */}
//       <motion.div
//         className="relative w-48 h-36 cursor-pointer paperIndex"
//         onClick={() => setOpen(!open)}
//         whileHover={{ scale: 1.05 }}
//         transition={{ type: "spring", stiffness: 200 }}
//       >
//         {/* Folder Base (back part) */}
//         <div className="absolute bottom-0 w-full h-28 bg-yellow-400 rounded-b-xl shadow-md"></div>

//         {/* Papers inside */}
//         <AnimatePresence>
//           {papers.map((paper, i) => (
//             <motion.div
//               key={paper}
//               initial={{ y: 20, opacity: 0 }}
//               animate={{
//                 y: open ? -i * 8 : 0,
//                 opacity: open ? 1 : 0,
//               }}
//               exit={{ y: 20, opacity: 0 }}
//               transition={{ duration: 0.4, delay: i * 0.08 }}
//               className="absolute left-3 right-3 bottom-6 bg-white border border-gray-200 rounded-md shadow-sm p-2 text-sm font-medium text-gray-700 text-center"
//               style={{ zIndex: papers.length - i }}
//             >
//               {paper}
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* Folder Flap */}
//         <motion.div
//           className="absolute top-0 w-full h-12 bg-yellow-500 rounded-t-lg shadow origin-bottom px-3 flex items-center text-xs font-semibold text-gray-700"
//           animate={{ rotateX: open ? -50 : 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           CASE STUDY
//         </motion.div>
//       </motion.div>

//       {/* Hint */}
//       <p className="mt-6 text-gray-600 text-sm">
//         {open ? "Click to close folder" : "Click to open folder"}
//       </p>
//     </div>
//   );
// }
