import Nav from "@/components/Layout/Nav"
import Footer from "@/components/Layout/Footer"
import ViewProductsComponent from "@/components/Products/ViewProductsComponent";

async function page() {
  return (
    <div>
      <Nav />
      <div className="min-h-screen">
        <ViewProductsComponent />
      </div>
      <Footer />
    </div>
  )
}

export default page;