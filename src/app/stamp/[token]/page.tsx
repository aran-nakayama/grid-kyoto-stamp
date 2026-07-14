import { streets } from "@/data/streets";
import { RedirectToStamp } from "./RedirectToStamp";

export function generateStaticParams() {
  return streets.map((street) => ({ token: street.stampToken }));
}

export default async function StampTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <RedirectToStamp token={token} />;
}
