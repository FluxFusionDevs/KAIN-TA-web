import { UserModel } from "./userModel";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";
export type PaymentMethods = "GCASH";

export type PaymentModel = {
  _id: string;
  type: string;
  amount: 0;
  paymentMethod: PaymentMethods;
  proofOfPayment: string;
  status: PaymentStatus;
  user: UserModel | string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};
