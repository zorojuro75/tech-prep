import { Suspense } from "react";
import TestClient from "@/components/TestClient";

export default function TestPage() {
  return (
    <Suspense
      fallback={<div className="text-center py-10">Loading test...</div>}
    >
      <TestClient />
    </Suspense>
  );
}
