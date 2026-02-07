import { redirect } from "next/navigation";

export default function CivicLinePage() {
  // Keep `nextvoters.com/civic-line` as the public signup entrypoint.
  // The current multi-step signup flow lives at `/next-voters-line`.
  redirect("/next-voters-line");
}