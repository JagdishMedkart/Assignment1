import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("session-us")?.value; // Retrieve session-us cookie

    if (!sessionToken) {
      return NextResponse.json(
        { message: "Not authenticated", isLoggedIn: false },
        { status: 401 }
      );
    }

    // Fetch the authenticated user
    const user = await prisma.user.findFirst({
      where: {
        sessions: {
          some: { sessionToken },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "You are not logged in!", isLoggedIn: false },
        { status: 401 }
      );
    }

    const userId = user.userId;

    // Get the page number from query parameters, default to 1
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const ordersPerPage = 5;
    const skip = (page - 1) * ordersPerPage;

    // Fetch paginated orders for the user
    const orders = await prisma.order.findMany({
      where: { userId },
      skip,
      take: ordersPerPage,
      include: {
        orderItems: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Count total orders for the user
    const totalOrders = await prisma.order.count({
      where: { userId },
    });

    const totalPages = Math.ceil(totalOrders / ordersPerPage);

    // Calculate most bought product
    const mostBoughtProduct = await prisma.orderItem.groupBy({
      by: ["productWsCode"],
      where: { order: { userId } },
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 1,
    });

    const mostBoughtProductDetails = mostBoughtProduct.length
      ? await prisma.product.findUnique({
          where: { wsCode: mostBoughtProduct[0].productWsCode },
        })
      : null;

    // Prepare stats
    const stats = {
      mostBoughtProduct: mostBoughtProductDetails?.name || "N/A",
      mostBoughtQuantity: mostBoughtProduct[0]?._sum?.quantity || 0,
      totalSpent: orders.reduce(
        (sum, order) =>
          sum +
          order.orderItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
        0
      ),
      firstOrderDate: orders[orders.length - 1]?.createdAt || "N/A",
      lastOrderDate: orders[0]?.createdAt || "N/A",
    };

    return NextResponse.json(
      {
        message: "Orders retrieved successfully",
        isLoggedIn: true,
        orders,
        totalOrders,
        totalPages,
        stats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in fetching orders:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}


// import { NextRequest, NextResponse } from "next/server";
// import prisma from "../../../../prisma/client";

// export async function GET(req: NextRequest) {
//   try {
//     const sessionToken = req.cookies.get("session-us")?.value; // Retrieve session-us cookie

//     if (!sessionToken) {
//       return NextResponse.json(
//         { message: "Not authenticated", isLoggedIn: false },
//         { status: 401 }
//       );
//     }

//     // Fetch the authenticated user
//     const user = await prisma.user.findFirst({
//       where: {
//         sessions: {
//           some: { sessionToken },
//         },
//       },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { message: "You are not logged in!", isLoggedIn: false },
//         { status: 401 }
//       );
//     }

//     const userId = user.userId;

//     // Fetch all orders for the user
//     const orders = await prisma.order.findMany({
//       where: { userId },
//       include: {
//         orderItems: {
//           include: { product: true },
//         },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     // Calculate most bought product
//     const mostBoughtProduct = await prisma.orderItem.groupBy({
//       by: ["productWsCode"],
//       where: { order: { userId } },
//       _sum: { quantity: true },
//       orderBy: { _sum: { quantity: "desc" } },
//       take: 1,
//     });

//     const mostBoughtProductDetails = mostBoughtProduct.length
//       ? await prisma.product.findUnique({
//           where: { wsCode: mostBoughtProduct[0].productWsCode },
//         })
//       : null;

//     // Prepare stats
//     const stats = {
//       mostBoughtProduct: mostBoughtProductDetails?.name || "N/A",
//       mostBoughtQuantity: mostBoughtProduct[0]?._sum?.quantity || 0,
//       totalSpent: orders.reduce(
//         (sum, order) =>
//           sum +
//           order.orderItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
//         0
//       ),
//       firstOrderDate: orders[orders.length - 1]?.createdAt || "N/A",
//       lastOrderDate: orders[0]?.createdAt || "N/A",
//     };

//     return NextResponse.json(
//       {
//         message: "Orders retrieved successfully",
//         isLoggedIn: true,
//         orders,
//         stats,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error in fetching orders:", error);
//     return NextResponse.json(
//       { message: "Internal server error", success: false },
//       { status: 500 }
//     );
//   }
// }
