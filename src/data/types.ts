export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TUniqIngredient = TIngredient & { constructorId: string };

export type TOrder = {
  _id: string;
  ingredients: ReadonlyArray<string>;
  owner: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  __v: number;
};

export type TRegisterData = {
  name: string;
  email: string;
};

export type IRegisterDataWithPassword = TRegisterData & {
  password: string;
};
