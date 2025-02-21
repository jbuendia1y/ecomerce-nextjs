export interface Product {
  id: string;
  slug: string;
  /**
   * Cloudinary url can be transform -> width, height
   */
  image: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any;
  price: number;
  stock: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProduct {
  slug: string;
  /**
   * Cloudinary url can be transform -> width, height
   */
  image: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any;

  price: number;
  stock: number;
}
