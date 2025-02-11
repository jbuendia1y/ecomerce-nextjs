export interface Product {
  id: string;
  slug: string;
  image: { name: string; url: string };
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description: any[];
  price: number;
  stock: number;
}
