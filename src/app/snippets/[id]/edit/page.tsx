import SnippetEditForm from "@/app/components/SnippetEditForm";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface SnippetEditsPageProps {
  params: { id: string };
}

export default async function SnippetEditPage({
  params,
}: SnippetEditsPageProps) {
  const id = parseInt(params.id);

  const snippet = await db.snippet.findFirst({
    where: { id },
  });

  if (!snippet) {
    return notFound();
  }
  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
