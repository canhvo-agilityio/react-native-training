export interface UserBase {
  email: string;
  password: string;
}

export type User = Pick<UserBase, 'email'> & {
  id: string;
  storeId: string;
  storeName: string;
};
