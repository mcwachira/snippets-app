import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as actions from "@/app/actions/actions";

interface SnippetDetailsPageProps {
  params: { id: string };
}

export default async function SnippetDetailsPage({
  params,
}: SnippetDetailsPageProps) {
  // await new Promise((r) => setTimeout(r, 5000));
  //
  const id = parseInt(params.id);
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, id);
  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-2xl font-bold">{snippet.title}</h1>

        <div className="flex gap-4">
          <Link className="p-2 border rounded" href={`${id}/edit`}>
            Edit
          </Link>

          <button className="p-2 border rounded" onClick={deleteSnippetAction}>
            {" "}
            Delete{" "}
          </button>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
