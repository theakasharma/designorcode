"use client"

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Edit2 } from "react-feather";

// Progressive Input Stack Component
// Dependencies: framer-motion, react-feather (or react-icons)
// TailwindCSS for styling (assumes Tailwind is set up in the project)

const stepsConfig = [
  { key: "name", label: "Full name", placeholder: "Jane Doe", validator: v => v.trim().length >= 2, error: "Please enter at least 2 characters." },
  { key: "email", label: "Email", placeholder: "you@company.com", validator: v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v), error: "Enter a valid email." },
  { key: "phone", label: "Phone", placeholder: "+91 98765 43210", validator: v => v.trim().length >= 7, error: "Enter a valid phone." },
  { key: "password", label: "Password", placeholder: "Choose a password", type: "password", validator: v => v.length >= 6, error: "Use 6+ characters." },
];

export default function ProgressiveInputStack() {
  const [values, setValues] = useState(() => Object.fromEntries(stepsConfig.map(s => [s.key, ""])));
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [errors, setErrors] = useState({});
  const [shakeKey, setShakeKey] = useState(0);
  const inputRef = useRef(null);

  const totalSteps = stepsConfig.length;

  const goNext = () => {
    const step = stepsConfig[current];
    const value = values[step.key];
    if (!step.validator(value)) {
      setErrors(e => ({ ...e, [step.key]: step.error }));
      // trigger shake animation
      setShakeKey(k => k + 1);
      return;
    }

    // mark completed
    setErrors(e => ({ ...e, [step.key]: null }));
    setCompleted(c => Array.from(new Set([...c, step.key])));

    if (current < totalSteps - 1) {
      setCurrent(c => c + 1);
      // focus next input next tick
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const goPrev = index => {
    setCurrent(index);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const update = (k, v) => {
    setValues(s => ({ ...s, [k]: v }));
  };

  const onSubmit = () => {
    // validate remaining
    let hasError = false;
    const newErrors = {};
    stepsConfig.forEach((s, i) => {
      if (!s.validator(values[s.key])) {
        newErrors[s.key] = s.error;
        hasError = true;
      }
    });
    setErrors(newErrors);
    if (hasError) {
      // jump to first invalid
      const firstInvalid = stepsConfig.findIndex(s => newErrors[s.key]);
      if (firstInvalid >= 0) setCurrent(firstInvalid);
      setShakeKey(k => k + 1);
      return;
    }

    // success — in real app you'd call API here
    alert("Submitted! " + JSON.stringify(values, null, 2));
  };

  const progressPct = Math.round((completed.length / totalSteps) * 100);

  // motion variants
  const cardVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const shake = {
    initial: { x: 0 },
    animate: { x: [0, -8, 8, -6, 6, -3, 3, 0], transition: { duration: 0.45 } },
  };

  return (
    <>
    <div className="header">
        <a className="bear-link" href="https://peerlist.io/akashamra" target="_blank" rel="noreferrer noopener">
          <img src="https://avatars.githubusercontent.com/u/62895760?v=4" alt="Profile" className=" w-12 h-12"/>
            <h4>AAKASH SHARMA</h4>
        </a>
      </div>
      <div className="min-h-screen flex items-center justify-center p-6 ">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">Quick setup</h3>
                <p className="text-sm text-gray-500">We’ll guide you through a few quick steps.</p>
              </div>
              <div className="w-36">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
                    style={{ width: `${progressPct}%`, transition: "width 400ms ease" }}
                  />
                </div>
                <div className="text-xs text-right text-gray-400 mt-1">{progressPct}%</div>
              </div>
            </div>

            {/* Stack area */}
            <div className="space-y-3">
              {/* Completed stack (small cards) */}
              <div className="space-y-2">
                {stepsConfig.map((s, i) => {
                  const isCompleted = completed.includes(s.key);
                  const isActive = i === current;
                  return (
                    <motion.div
                      key={s.key}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`relative overflow-hidden rounded-xl p-3 border ${isActive ? "border-indigo-200 shadow-lg" : "border-transparent"} bg-gradient-to-r ${isActive ? "from-white to-white" : isCompleted ? "from-gray-50 to-white" : "from-white to-white"}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${isCompleted ? "bg-indigo-50" : "bg-gray-100"}`}>
                          {isCompleted ? <CheckCircle size={18} className="text-indigo-500" /> : <div className="text-xs text-gray-500">{i + 1}</div>}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <div className={`text-sm font-medium ${isActive ? "text-gray-900" : "text-gray-500"}`}>{s.label}</div>
                              <div className="text-xs text-gray-400">{isCompleted ? values[s.key] || <span className="text-gray-300">(empty)</span> : s.placeholder}</div>
                            </div>

                            {isCompleted && (
                              <button
                                className="group flex items-center gap-2 text-xs text-indigo-600 hover:text-indigo-700"
                                onClick={() => goPrev(i)}
                              >
                                <Edit2 size={14} /> <span className="hidden sm:inline">Edit</span>
                              </button>
                            )}
                          </div>

                          {/* Active input */}
                          {isActive && (
                            <div className="mt-3">
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={`input-${s.key}-${shakeKey}`}
                                  initial="enter"
                                  animate="center"
                                  exit="exit"
                                  variants={cardVariants}
                                >
                                  <motion.div
                                    variants={shake}
                                    initial="initial"
                                    animate={errors[s.key] ? "animate" : "initial"}
                                  >
                                    <input
                                      ref={inputRef}
                                      type={s.type || "text"}
                                      value={values[s.key]}
                                      onChange={e => update(s.key, e.target.value)}
                                      onKeyDown={e => {
                                        if (e.key === "Enter") goNext();
                                        if (e.key === "ArrowUp" && i > 0) goPrev(i - 1);
                                      }}
                                      placeholder={s.placeholder}
                                      className={`w-full rounded-md p-3 border focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-shadow ${errors[s.key] ? "border-red-300" : "border-gray-200"}`}
                                    />
                                  </motion.div>
                                  {errors[s.key] && <div className="text-xs text-red-500 mt-2">{errors[s.key]}</div>}

                                  <div className="flex items-center gap-2 mt-3">
                                    <button
                                      onClick={goNext}
                                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white shadow hover:scale-[1.02] transition-transform"
                                    >
                                      Next
                                    </button>
                                    <button
                                      onClick={() => {
                                        setValues(v => ({ ...v, [s.key]: "" }));
                                      }}
                                      className="text-sm text-gray-500"
                                    >
                                      Clear
                                    </button>
                                  </div>
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Summary card appears when all steps are completed */}
              <AnimatePresence>
                {completed.length === totalSteps && current === totalSteps - 1 && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 rounded-xl border p-4 bg-gradient-to-r from-white to-indigo-50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">Summary</div>
                        <div className="text-xs text-gray-500">Review before submit</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-600">All set</div>
                        <CheckCircle size={18} className="text-green-500" />
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-2">
                      {stepsConfig.map(s => (
                        <div key={s.key} className="flex items-center justify-between text-sm">
                          <div className="text-gray-600">{s.label}</div>
                          <div className="text-gray-900 font-medium">{values[s.key] || <span className="text-gray-400">(empty)</span>}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-3">
                      <button onClick={() => setCurrent(0)} className="text-sm text-gray-600">Edit</button>
                      <button onClick={onSubmit} className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-md">Submit</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-gray-400">Tip: press Enter to advance · Use Edit buttons to jump back</div>
        </div>
      </div>
    </>
  );
}
