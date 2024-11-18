import { jwtDecode } from "jwt-decode";
import { UserModel, UserPayload } from "../models/userModel";

export const loginWithEmail = async (email: string, password: string): Promise<UserPayload> => {
  const hostURL = "http://195.26.255.19:3003"; // ! SHOULD BE HIDDEN
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