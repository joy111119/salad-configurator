export type Bowl = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Ingredient = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
};
