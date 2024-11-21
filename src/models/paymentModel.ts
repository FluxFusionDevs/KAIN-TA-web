import { UserModel } from "./userModel";

export type PaymentModel = {
  _id: string;
  type: string;
  status: string;
  user: UserModel;
  createdAt: string;
  updatedAt: string;
  amount: 0;
  __v: 0;
};
