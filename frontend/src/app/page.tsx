"use client";

import { fetchRecipients } from "@/api/recipients";
import { Recipient } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [recipients, setRecipients] = useState<Recipient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const recipients = await fetchRecipients();
      setRecipients(recipients);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-xl p-2">Recipients</h1>
      <table className="m-2">
        <thead>
          <tr className="border border-gray-400">
            <td className="p-2 w-24">ID</td>
            <td className="p-2 w-64">Name</td>
            <td className="p-2 w-48">Email</td>
          </tr>
        </thead>
        <tbody>
          {recipients &&
            recipients.map((recipient) => (
              <tr
                key={recipient.id}
                className="border border-gray-400 cursor-pointer hover:bg-gray-400"
                onClick={() => router.push(`/${recipient.id}`)}
              >
                <td className="p-2">{recipient.id}</td>
                <td className="p-2">{`${recipient.first_name} ${recipient.last_name}`}</td>
                <td className="p-2">{recipient.last_name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
