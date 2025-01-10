import Nav from "@/components/Layout/Nav"
import Footer from "@/components/Layout/Footer"
import Home from "@/components/Layout/Home"

async function page() {
  return (
    <div>
      <Nav />
      <div className="min-h-screen">
        <Home />
      </div>
      <Footer />
    </div>
  )
}

export default page;