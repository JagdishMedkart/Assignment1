"use client";

import React from "react";
import { FaShoppingCart, FaSearch, FaClipboardList, FaUserShield } from "react-icons/fa";

const features = [
  {
    title: "Add & Manage Products",
    headline: "Easily add, edit, or delete products with detailed information and images.",
    icon: <FaShoppingCart size={40} />,
  },
  {
    title: "Advanced Search",
    headline: "Search products by name, code, or category for faster access.",
    icon: <FaSearch size={40} />,
  },
  {
    title: "Order Management",
    headline: "Track and manage all your orders effortlessly with real-time updates.",
    icon: <FaClipboardList size={40} />,
  },
  {
    title: "Secure Access",
    headline: "Robust user authentication to protect your data and ensure privacy.",
    icon: <FaUserShield size={40} />,
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">Welcome to ProductEase</h1>
          <p className="text-lg font-medium mb-6 animate-fade-in-delay">
            Simplify your product and order management with an intuitive and powerful platform.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-500 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition">
              Get Started
            </button>
            <button className="bg-blue-700 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-800 transition">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10">Why Choose ProductEase?</h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300 group"
              >
                <div className="flex justify-center items-center mb-4 text-blue-500">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-center group-hover:text-blue-500 transition">
                  {feature.title}
                </h3>
                <p className="text-center text-gray-600 mt-2 group-hover:text-gray-800 transition">
                  {feature.headline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="shadow bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Simplify Your Workflow?</h2>
          <p className="text-lg font-medium mb-8">
            Get started today and experience effortless product and order management.
          </p>
          <button className="bg-white text-blue-500 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition">
            Start Now
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="shadow bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">© 2025 ProductEase. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }
        .animate-fade-in-delay {
          animation: fadeIn 2s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Home;
