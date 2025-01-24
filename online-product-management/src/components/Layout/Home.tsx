// "use client";

// import React from "react";
// import { FaShoppingCart, FaSearch, FaClipboardList, FaShieldAlt, FaHeartbeat } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// const features = [
//   {
//     title: "Explore Medicines",
//     headline: "Browse and compare generic medicines tailored to your needs.",
//     icon: <FaHeartbeat size={40} />,
//   },
//   {
//     title: "Advanced Search",
//     headline: "Search products by name, compound, or category effortlessly.",
//     icon: <FaSearch size={40} />,
//   },
//   {
//     title: "Order Tracking",
//     headline: "Track your orders in real-time with detailed updates.",
//     icon: <FaClipboardList size={40} />,
//   },
//   {
//     title: "Secure Platform",
//     headline: "Enjoy peace of mind with advanced data security measures.",
//     icon: <FaShieldAlt size={40} />,
//   },
// ];

// function Home() {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 via-cyan-100 to-teal-50">
//       {/* Header Section */}
//       <header className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white">
//         <div className="max-w-7xl mx-auto px-6 py-20 text-center">
//           <h1 className="text-5xl font-bold mb-4 animate-fade-in">Welcome to PharmaSync</h1>
//           <p className="text-lg font-medium mb-6 animate-fade-in-delay">
//             Your trusted platform for affordable healthcare and medicine management.
//           </p>
//           <div className="flex justify-center gap-4">
//             <button
//               className="bg-white text-teal-500 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition shadow-lg"
//               onClick={() => router.push("/viewproducts")}
//             >
//               Explore Now
//             </button>
//             {/* <button
//               className="bg-teal-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-teal-700 transition shadow-lg"
//               onClick={() => router.push("/about")}
//             >
//               Learn More
//             </button> */}
//           </div>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center mb-12 text-teal-600">Why Choose PharmaSync?</h2>
//           <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition duration-300 group"
//               >
//                 <div className="flex justify-center items-center mb-4 text-teal-500">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold text-center group-hover:text-teal-600 transition">
//                   {feature.title}
//                 </h3>
//                 <p className="text-center text-gray-600 mt-2 group-hover:text-gray-800 transition">
//                   {feature.headline}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className="py-16 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-600 text-white">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h2 className="text-4xl font-bold mb-6">Join PharmaSync Today!</h2>
//           <p className="text-lg font-medium mb-8">
//             Experience seamless management of your healthcare and medicine needs.
//           </p>
//           <button
//             className="bg-white text-cyan-500 py-3 px-6 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
//             onClick={() => router.push("/auth/signup")}
//           >
//             Get Started
//           </button>
//         </div>
//       </section>

//       {/* Footer Section */}
//       {/* <footer className="bg-gray-900 text-gray-400 py-8">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <p className="text-sm">© {new Date().getFullYear()} PharmaSync. All rights reserved.</p>
//         </div>
//       </footer> */}

//       <style jsx>{`
//         .animate-fade-in {
//           animation: fadeIn 1s ease-in-out;
//         }
//         .animate-fade-in-delay {
//           animation: fadeIn 1.5s ease-in-out;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Home;


"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaSearch, FaClipboardList, FaShieldAlt, FaHeartbeat, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "Explore Medicines",
    headline: "Browse and compare generic medicines tailored to your needs.",
    icon: FaHeartbeat,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    title: "Advanced Search",
    headline: "Search products by name, compound, or category effortlessly.",
    icon: FaSearch,
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    title: "Order Tracking",
    headline: "Track your orders in real-time with detailed updates.",
    icon: FaClipboardList,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    title: "Secure Platform",
    headline: "Enjoy peace of mind with advanced data security measures.",
    icon: FaShieldAlt,
    gradient: "from-emerald-500 to-green-500"
  }
];

function Home() {
  const router = useRouter();
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 overflow-hidden">
      {/* Background Particles Effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-blob top-10 -left-10"></div>
        <div className="absolute w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000 top-1/3 -right-20"></div>
        <div className="absolute w-64 h-64 bg-rose-400/20 rounded-full blur-3xl animate-blob animation-delay-4000 bottom-1/4 left-1/4"></div>
      </div>

      {/* Header Section */}
      <header className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-6 py-24 text-center relative"
        >
          <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600">
            PharmaSync
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Revolutionizing healthcare management with intelligent, secure, and user-friendly solutions.
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2"
              onClick={() => router.push("/viewproducts")}
            >
              Explore Now <FaArrowRight />
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="relative z-10 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose PharmaSync?
          </h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`relative group overflow-hidden rounded-2xl shadow-lg transform transition duration-300 ${
                  hoveredFeature === index ? 'scale-105 z-20' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-all duration-300`}></div>
                <div className="relative p-8 text-center bg-white/70 backdrop-blur-sm">
                  <motion.div 
                    className="flex justify-center items-center mb-6"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <feature.icon 
                      size={48} 
                      style={{fill: "black"}}
                      className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient}`} 
                    />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.headline}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 py-24 bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-700 text-white overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
        >
          <h2 className="text-5xl font-bold mb-6">Transform Your Healthcare Journey</h2>
          <p className="text-xl mb-10 opacity-90">
            Experience seamless, intelligent healthcare management at your fingertips.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 py-4 px-10 rounded-full font-bold text-lg shadow-2xl hover:shadow-xl transition"
            onClick={() => router.push("/auth/signup")}
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;