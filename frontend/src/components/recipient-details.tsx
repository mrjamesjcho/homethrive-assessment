"use client";

import fetchWithBasicAuth from "@/api/auth_fetch";
import { updateDoseSchedule } from "@/api/dose_schedules";
import { createPrescription, updatePrescription } from "@/api/prescriptions";
import { DoseSchedule, Medication, Recipient } from "@/types";
import React, { useEffect, useState } from "react";

interface RecipientDetailsProps {
  id: string;
}

export default function RecipientDetails({ id }: RecipientDetailsProps) {
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [dosageSchedule, setDosageSchedule] = useState<DoseSchedule[] | null>(
    null
  );
  const [medications, setMedications] = useState<Medication[] | null>(null);
  const [newPrescriptionForm, setNewPrescriptionForm] = useState({
    medication_id: "",
    dosage: "",
    dosage_unit: "",
    frequency: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      const response = await fetchWithBasicAuth(
        "GET",
        `${process.env.API_URL}/recipients/${id}`
      );
      const data = await response.json();
      setRecipient(data);
    };
    const fetchDoseScheduleData = async () => {
      const response = await fetchWithBasicAuth(
        "GET",
        `${process.env.API_URL}/dose_schedules?recipient_id=${id}`
      );
      const data = await response.json();
      setDosageSchedule(data.data);
    };
    const fetchMedicationData = async () => {
      const response = await fetchWithBasicAuth(
        "GET",
        `${process.env.API_URL}/medications`
      );
      const data = await response.json();
      setMedications(data.data);
    };
    fetchMedicationData();
    fetchPrescriptionData();
    fetchDoseScheduleData();
  }, [id]);

  const fetchDoseScheduleData = async () => {
    const dsResponse = await fetchWithBasicAuth(
      "GET",
      `${process.env.API_URL}/dose_schedules?recipient_id=${id}`
    );
    const data = await dsResponse.json();
    setDosageSchedule(data.data);
  };

  const fetchRecipientData = async () => {
    const recipientResponse = await fetchWithBasicAuth(
      "GET",
      `${process.env.API_URL}/recipients/${id}`
    );
    const data = await recipientResponse.json();
    setRecipient(data);
  };

  const formatDosage = (dosage: number, unit: string) => {
    if (unit !== "pill") {
      return `${dosage}${unit}`;
    }
    if (dosage === 1) {
      return "1 pill";
    }
    return `${dosage} pills`;
  };

  const handleAddPrescription = async () => {
    if (
      !newPrescriptionForm.medication_id ||
      !newPrescriptionForm.dosage ||
      !newPrescriptionForm.start_date ||
      !newPrescriptionForm.end_date ||
      !newPrescriptionForm.dosage_unit
    ) {
      return;
    }
    const payload = {
      ...newPrescriptionForm,
      dosage: Number(newPrescriptionForm.dosage),
      medication_id: Number(newPrescriptionForm.medication_id),
      recipient_id: Number(id),
    };
    await createPrescription(payload);
    setNewPrescriptionForm({
      medication_id: "",
      dosage: "",
      dosage_unit: "",
      frequency: "",
      start_date: "",
      end_date: "",
    });
    await fetchRecipientData();
    await fetchDoseScheduleData();
  };

  const handleTakenChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const doseId = event.target.value;
    const taken = event.target.checked;
    await updateDoseSchedule(doseId, taken);
    await fetchDoseScheduleData();
  };

  const handleActiveChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const id = event.target.value;
    const active = event.target.checked;
    await updatePrescription(id, { active });
    await fetchRecipientData();
    await fetchDoseScheduleData();
  };

  const render = () => {
    if (!recipient || !dosageSchedule) {
      return <div>loading</div>;
    }
    return (
      <div>
        <h1 className="text-xl p-2">{`${recipient.first_name} ${recipient.last_name}`}</h1>
        <div className="text-lg p-1 pl-4">Add Prescriptions</div>
        <div className="grid grid-cols-2 gap-2 p-2 w-1/2">
          <select
            className="col-span-1 text-gray-500"
            name="medication_id"
            value={newPrescriptionForm.medication_id}
            onChange={(e) =>
              setNewPrescriptionForm({
                ...newPrescriptionForm,
                medication_id: e.target.value,
              })
            }
          >
            <option value="">Select Medication</option>
            {medications?.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <select
            className="col-span-1 text-gray-500"
            name="frequency"
            value={newPrescriptionForm.frequency}
            onChange={(e) =>
              setNewPrescriptionForm({
                ...newPrescriptionForm,
                frequency: e.target.value,
              })
            }
          >
            <option value="">Select Frequency</option>
            <option value="day">daily</option>
            <option value="week">weekly</option>
          </select>
          <input
            className="col-span-1 placeholder:text-gray-500 placeholder:italic text-gray-500"
            placeholder="dosage"
            type="text"
            name="dosage"
            value={newPrescriptionForm.dosage}
            onChange={(e) =>
              setNewPrescriptionForm({
                ...newPrescriptionForm,
                dosage: e.target.value,
              })
            }
          ></input>
          <select
            className="col-span-1 text-gray-500"
            name="dosage_unit"
            value={newPrescriptionForm.dosage_unit}
            onChange={(e) =>
              setNewPrescriptionForm({
                ...newPrescriptionForm,
                dosage_unit: e.target.value,
              })
            }
          >
            <option value="">Select Unit</option>
            <option value="pill">pill</option>
            <option value="mg">mg</option>
            <option value="ml">ml</option>
          </select>
          <input
            className="col-span-1 placeholder:text-gray-500 placeholder:italic text-gray-500"
            placeholder="start date yyyy-mm-dd"
            type="text"
            name="start_date"
            value={newPrescriptionForm.start_date}
            onChange={(e) =>
              setNewPrescriptionForm({
                ...newPrescriptionForm,
                start_date: e.target.value,
              })
            }
          ></input>
          <input
            className="col-span-1 placeholder:text-gray-500 placeholder:italic text-gray-500"
            placeholder="end date yyyy-mm-dd"
            type="text"
            name="end_date"
            value={newPrescriptionForm.end_date}
            onChange={(e) =>
              setNewPrescriptionForm({
                ...newPrescriptionForm,
                end_date: e.target.value,
              })
            }
          ></input>
          <button
            className="border rounded-full"
            onClick={handleAddPrescription}
          >
            Add Prescription
          </button>
        </div>
        <div className="text-lg p-1 pl-4">Prescriptions</div>
        <table className="m-2">
          <thead>
            <tr className="border border-gray-400">
              <td className="p-2 w-64">Name</td>
              <td className="p-2 w-64">Dosage</td>
              <td className="p-2 w-64">Dates</td>
              <td className="p-2">Active</td>
            </tr>
          </thead>
          <tbody>
            {recipient.prescriptions.map((p) => (
              <tr
                key={p.id}
                className="border border-gray-400 cursor-pointer hover:bg-gray-400"
              >
                <td className="p-2">{p.name}</td>
                <td className="p-2">{`${formatDosage(
                  p.dosage,
                  p.dosage_unit
                )} per ${p.frequency}`}</td>
                <td className="p-2">{`${p.start_date.split("T")[0]} - ${
                  p.end_date.split("T")[0]
                }`}</td>
                <td className="p-2 flex justify-center h-full">
                  <input
                    type="checkbox"
                    value={p.id}
                    checked={p.active}
                    onChange={handleActiveChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-lg p-1 pl-4">Schedule</div>
        <table className="m-2">
          <thead>
            <tr className="border border-gray-400">
              <td className="p-2 w-64">Name</td>
              <td className="p-2 w-48">Dose</td>
              <td className="p-2 w-64">Scheduled At</td>
              <td className="p-2">Taken</td>
            </tr>
          </thead>
          <tbody>
            {dosageSchedule.map((d) => (
              <tr
                key={d.id}
                className="border border-gray-400 cursor-pointer hover:bg-gray-400"
              >
                <td className="p-2">{d.name}</td>
                <td className="p-2">{formatDosage(d.dosage, d.dosage_unit)}</td>
                <td className="p-2">{d.scheduled_at.split("T")[0]}</td>
                <td className="p-2 flex justify-center h-full">
                  <input
                    type="checkbox"
                    value={d.id}
                    checked={d.taken}
                    onChange={handleTakenChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return render();
}
