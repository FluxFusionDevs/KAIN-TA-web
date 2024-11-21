import { jwtDecode } from "jwt-decode";
import { UserModel, UserPayload } from "../models/userModel";
import { EstablishmentModel, EstablishmentStatus } from "../models/establishmentModel";
import { Food } from "../models/foodModel";
import { PaymentModel } from "../models/paymentModel";

const hostURL = import.meta.env.VITE_API_URL; // ! SHOULD BE HIDDEN

export const loginWithEmail = async (email: string, password: string): Promise<UserPayload> => {
  const apiURL = `${hostURL}/auth/login`;

  if (!hostURL)
    throw new Error("API URL is not defined in the environment variables.");

  const requestBody = {
    email,
    password,
  }

  const response = await fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: string = await response.json();
  return jwtDecode<UserPayload>(data);
};

export const getEstablishment = async (owner_id: string): Promise<EstablishmentModel> => {
  const apiURL = `${hostURL}/api/establishments/get-establishment`;

  if (!hostURL)
    throw new Error("API URL is not defined in the environment variables.");

  const response = await fetch(`${apiURL}?_id=${owner_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: EstablishmentModel = await response.json();

  return data;
}

export const getEstablishments = async (): Promise<EstablishmentModel[]> => {
  const apiURL = `${hostURL}`;

  if (!hostURL)
    throw new Error("API URL is not defined in the environment variables.");

  const response = await fetch(`${apiURL}/api/establishments/get-establishments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: EstablishmentModel[] = await response.json();
  console.log(data);
  return data;
}

export const deleteFood = async (food_id: string, establishment_id: string): Promise<EstablishmentModel> => {
  const apiURL = `${hostURL}/api/foods/delete`;

  if (!hostURL)
    throw new Error("API URL is not defined in the environment variables.");

  const response = await fetch(apiURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      foodItemId: food_id,
      establishmentId: establishment_id,
    })
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: EstablishmentModel = await response.json();

  return data;
}

export const addFood = async (food: Food, establishment_id: string): Promise<EstablishmentModel> => {
  const apiURL = `${hostURL}/api/foods/add`;

  if (!hostURL)
    throw new Error("API URL is not defined in the environment variables.");

  const formData = new FormData();
  formData.append('name', food.name);
  formData.append('tags', food.tags.join(","));
  formData.append('image', food.image);
  formData.append('description', food.description);
  formData.append('price', food.price.toString());
  formData.append('establishmentId', establishment_id);

  const response = await fetch(`${apiURL}`, {
    method: "POST",
    body: formData
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: EstablishmentModel = await response.json();

  return data;
}

export const updateFood = async (food: Food, establishment_id: string): Promise<EstablishmentModel> => {
  const apiURL = `${hostURL}/api/foods/update`;

  if (!hostURL)
    throw new Error("API URL is not defined in the environment variables.");

  const response = await fetch(`${apiURL}`, {
    method: "POST",
    body: JSON.stringify({
      establishmentId: establishment_id,
      foodItemId: food._id,
      foodItem: food
    })
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: EstablishmentModel = await response.json();

  return data;
}

export const getPayments = async (): Promise<PaymentModel[]> => {
  const apiURL = `${hostURL}`;

  if (!hostURL)
    throw new Error("API URL is not defined in the environment variables.");

  const response = await fetch(`${apiURL}/api/payments/get-all-payments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: PaymentModel[] = await response.json();
  console.log(data);
  return data;
}

export const updatePayment = async (payment_id: string, status: EstablishmentStatus): Promise<PaymentModel> => {
  const apiURL = `${hostURL}`;

  if (!hostURL)
    throw new Error("API URL is not defined in the environment variables.");

  const response = await fetch(`${apiURL}/api/payments/update-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: payment_id,
      status: status
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: PaymentModel = await response.json();
  return data;
}

export const updateEstablishmentStatus = async (_id: string, status: EstablishmentStatus): Promise<EstablishmentModel> => {
  const apiURL = `${hostURL}/api/establishments/update-establishment`;

  if (!hostURL)
    throw new Error("API URL is not defined in the environment variables.");

  const response = await fetch(`${apiURL}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id, status }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: EstablishmentModel = await response.json();

  return data;
}