export type ProductVariant = {
  type: string;
  value: string;
};

export type ProductInventory = {
  quantity: number;
  inStock: boolean;
};

export type PProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: ProductVariant[];
  inventory: ProductInventory;
  isDeleted?: boolean;
};

export type QueryParams = {
  name?: string;
  category?: string;
  description?: string;
};
