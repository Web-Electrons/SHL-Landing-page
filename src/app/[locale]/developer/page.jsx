"use client";
import { Button } from "@/src/components/ui/button";

export default function DevPage() {
  const handleSentEmail = async () => {
    try {
      const response = await fetch("/api/sentTransport", {
        method: "POST",
      });

      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-11 min-h-screen w-full bg-slate-600 pt-20">
      <Button onClick={handleSentEmail}>Send Email</Button>
    </div>
  );
}
