
"use client"
import React, { useState, useEffect, useRef } from "react";
import { useControls, Leva } from "leva";


export default function OtpWithLeva() {
  // Leva controls
  const { validOtp, otpLength } = useControls({
    validOtp: { value: "1234", label: "Valid OTP" },
    otpLength: {
      value: 4,
      options: [4, 6, 8], // length options
      label: "OTP Length",
    },
  });

  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [status, setStatus] = useState("default"); // default | active | correct | incorrect

  // Reset OTP state if length changes
  useEffect(() => {
    setOtp(Array(otpLength).fill(""));
    setStatus("default");
  }, [otpLength]);


  const inputsRef = useRef([]);

  const handleChange = (val, i) => {
    const newOtp = [...otp];
    newOtp[i] = val.slice(-1); // keep last digit only
    setOtp(newOtp);

    if (newOtp && i < otpLength - 1) {
      inputsRef.current[i + 1].focus();
    }

    const entered = newOtp.join("");
    if (entered.length === otpLength && !newOtp.includes("")) {
      if (entered === String(validOtp)) {
        setStatus("correct");
      } else {
        setStatus("incorrect");
      }
    } else {
      setStatus("active");
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const boxStyle = (i) => {
    let base =
      "w-14 h-14 flex items-center justify-center text-xl font-bold rounded-xl border transition-all duration-300";
    if (status === "default") return `${base} border-gray-300 bg-white`;
    if (status === "active" && otp[i] === "")
      return `${base} border-blue-500 shadow-md scale-105`;
    if (status === "correct") return `${base} border-green-500 bg-green-50`;
    if (status === "incorrect") return `${base} border-red-500 bg-red-50`;
    return `${base} border-gray-400 bg-white`;
  };







  return (
    <>
      <div className="header">
        <a className="bear-link" href="https://peerlist.io/akashamra" target="_blank" rel="noreferrer noopener">
          <img src="https://avatars.githubusercontent.com/u/62895760?v=4" alt="Profile" className=" w-12 h-12"/>
            <h4>AAKASH SHARMA</h4>
        </a>
      </div>
      <div className="flex h-dvh flex-col justify-center">
        <h1 className=" text-5xl text-center" style={{ fontFamily: "var(--font-instrument-serif)" }}>OTP Verification Challenge</h1>
        <p className="text-md mt-1.5 text-center">Please enter the correct OTP given below</p>
        <div className="flex flex-col gap-6 items-center mt-10">
          <div className={`flex gap-3 ${status === "incorrect" && "animate-shake"}`}>
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                ref={(el) => (inputsRef.current[i] = el)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className={boxStyle(i) + " text-center"}
              />
            ))}
          </div>
          {status === "correct" ? (
            <p
              className={`text-sm ${status === "correct"
                ? "text-green-600 animate-otp-bounce"
                : status === "incorrect"
                  ? "text-red-600 animate-shake "
                  : "text-gray-500"
                }`}
            >
              {status === "correct"
                ? "OTP Verified"
                : status === "incorrect"
                && "❌ Wrong OTP"
              }
            </p>
          ) : (
            <p className="text-sm">
              Verified Code: <span className=" rounded-4xl border-gray-400 border bg-gray-100 px-2.5 py-1">
                {validOtp}
              </span>
            </p>
          )}
          {/* Leva control panel */}
          <Leva collapsed={false} />
        </div>

      </div>
    </>
  );
}
