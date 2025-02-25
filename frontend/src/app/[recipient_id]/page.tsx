import RecipientDetails from "@/components/recipient-details";

export default async function Page({
  params,
}: {
  params: Promise<{ recipient_id: string }>;
}) {
  const { recipient_id } = await params;
  return <RecipientDetails id={recipient_id} />;
}
