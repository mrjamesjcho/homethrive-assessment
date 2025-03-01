import { PrescriptionCreatePayload, PrescriptionUpdatePayload } from "@/types";
import fetchWithBasicAuth from "./auth_fetch";

export const createPrescription = async (
  payload: PrescriptionCreatePayload
) => {
  const data = await fetchWithBasicAuth(
    "POST",
    `${process.env.API_URL}/prescriptions`,
    payload
  );
  const prescription = await data.json();
  return prescription;
};

export const updatePrescription = async (
  id: string,
  payload: PrescriptionUpdatePayload
) => {
  const data = await fetchWithBasicAuth(
    "PATCH",
    `${process.env.API_URL}/prescriptions/${id}`,
    payload
  );
  const prescription = await data.json();
  return prescription;
};
