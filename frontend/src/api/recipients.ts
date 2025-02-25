import { Recipient } from "@/types";
import fetchWithBasicAuth from "./auth_fetch";

export const fetchRecipients = async () => {
  const data = await fetchWithBasicAuth(
    "GET",
    `${process.env.API_URL}/recipients`
  );
  const recipients = (await data.json()).data as Recipient[];
  return recipients;
};

export const fetchRecipient = async (id: string) => {
  const data = await fetchWithBasicAuth(
    "GET",
    `${process.env.API_URL}/recipients/${id}`
  );
  const recipient = (await data.json()) as Recipient;
  return recipient;
};
