import { jwtDecode } from "jwt-decode";
import { UserModel, UserPayload } from "../models/userModel";
import { EstablishmentModel } from "../models/establishmentModel";

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