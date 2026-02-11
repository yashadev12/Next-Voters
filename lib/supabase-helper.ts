/**
 * Returns the name of the most recent summary folder in Supabase Storage.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
 * to be set; throws a clear message when they're missing so the build
 * doesn't fail with a cryptic "Cannot find name 'supabase'" error.
 */
export const getLastSummaryFolder = async (): Promise<string> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY missing)"
    );
  }

  // Dynamic import so the build never fails when @supabase/supabase-js isn't installed.
  let createClient: typeof import("@supabase/supabase-js").createClient;
  try {
    const mod = await import("@supabase/supabase-js");
    createClient = mod.createClient;
  } catch {
    throw new Error(
      "@supabase/supabase-js is not installed. Run: npm i @supabase/supabase-js"
    );
  }

  const supabase = createClient(url, key);

  const { data: folders, error } = await supabase.storage
    .from("next-voters-summaries")
    .list("public", { sortBy: { column: "name", order: "asc" } });

  if (error) {
    throw new Error(`Failed to list folders: ${error.message}`);
  }

  if (!folders || folders.length === 0) {
    throw new Error("No summary folders found in storage.");
  }

  return folders[folders.length - 1].name;
};