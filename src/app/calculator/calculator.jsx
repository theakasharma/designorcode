"use client";

import { useMemo, useState } from "react";

export default function SalesCalculator() {
  const [students, setStudents] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const { subtotal, discountAmount, taxableAmount, gst, total } = useMemo(() => {
    const sub = Number(students) * Number(price);
    const discAmt = sub * (Number(discount) / 100);
    const taxable = sub - discAmt;
    const gstAmount = taxable * 0.18;
    return {
      subtotal: sub,
      discountAmount: discAmt,
      taxableAmount: taxable,
      gst: gstAmount,
      total: taxable + gstAmount,
    };
  }, [students, price, discount]);

  const formatINR = (v) =>
    v.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 text-center">
          Sales Calculator
        </h1>
        <p className="text-slate-500 text-center mt-1">
          Calculate total with 18% GST
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Number of Students
            </label>
            <input
              type="number"
              min="0"
              value={students}
              onChange={(e) => setStudents(e.target.value)}
              placeholder="Enter student count"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Amount per Student (₹)
            </label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter amount per student"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Discount (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Enter discount percentage"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4 space-y-2">
          <div className="flex justify-between text-slate-700">
            <span>Subtotal</span>
            <span className="font-medium">{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>Discount ({discount}%)</span>
            <span className="font-medium text-red-600">- {formatINR(discountAmount)}</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>Amount After Discount</span>
            <span className="font-medium">{formatINR(taxableAmount)}</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>GST (18%)</span>
            <span className="font-medium">{formatINR(gst)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between text-lg font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>
        </div>

        <button
          onClick={() => {
            setStudents(0);
            setPrice(0);
            setDiscount(0);
          }}
          className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-white font-medium hover:bg-indigo-700 transition"
        >
          Reset Calculator
        </button>
      </div>
    </div>
  );
}
