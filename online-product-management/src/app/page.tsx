import Navbar from "@/components/Layout/Navbar"
import Footer from "@/components/Layout/Footer"
import Home from "@/components/Layout/Home"

async function page() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Home />
      </div>
      <Footer />
    </div>
  )
}

export default page;