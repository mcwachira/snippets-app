import { db } from "@/db";
import { notFound } from "next/navigation";

interface SnippetDetailsPageProps {
  params: { id: string };
}

export default async function SnippetDetailsPage({
  params,
}: SnippetDetailsPageProps) {
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(params.id) },
  });

  if (!snippet) {
    return notFound();
  }

  return <div>{snippet.title}</div>;
}
