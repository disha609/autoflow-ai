import type { Metadata } from "next";
import { WorkflowStudio } from "@/components/workflow-studio";

export const metadata: Metadata = { title: "New Workflow" };

export default function NewWorkflowPage() {
  return (
    <>
      <div className="mb-8"><p className="text-sm font-medium text-indigo-300">AI processing studio</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">New workflow</h1><p className="mt-2 text-sm text-slate-400">Transform source text into accurate, business-ready outputs.</p></div>
      <WorkflowStudio />
    </>
  );
}
