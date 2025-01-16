import Nav from "@/components/Layout/Nav"
import Footer from "@/components/Layout/Footer"
import OrdersPage from "@/components/Orders/CustomerOrders";

async function page() {
  return (
    <div>
      <Nav />
      <div className="min-h-screen">
        <OrdersPage />
      </div>
      <Footer />
    </div>
  )
}

export default page;