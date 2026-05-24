import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { RequestDetailsClient } from "./RequestDetailsClient";

export const dynamic = "force-dynamic";

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = await prisma.itemRequest.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!request) {
    notFound();
  }

  return <RequestDetailsClient request={request} />;
}
