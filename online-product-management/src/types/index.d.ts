// src/types/index.d.ts

export interface CartItem {
    cartItemId: number;
    userId: number;
    productId: number;
    quantity: number;
    product: {
      wsCode: number;
      name: string;
      mrp: number;
      images: string[];
    };
  }
  