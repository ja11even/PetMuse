import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";
import { Resend } from "npm:resend";

const supabaseAdmin = createClient(
  Deno.env.get("MY_SUPABASE_URL")!,
  Deno.env.get("MY_SUPABASE_KEY")!
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

serve(async () => {
  const now = new Date();
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);
  const nowIso = now.toISOString();
  const fiveMinutesIso = fiveMinutesFromNow.toISOString();
  const results = await Promise.all([
    handleTable("Healthlogs", "Health Log", nowIso, fiveMinutesIso),
    handleTable("Notes", "Note", nowIso, fiveMinutesIso),
    handleTable("Appointments", "Appointment", nowIso, fiveMinutesIso),
  ]);

  const totalSent = results.reduce((sum, count) => sum + count, 0);
  return new Response(JSON.stringify({ totalSent }), { status: 200 });
});

async function handleTable(
  tableName: string,
  label: string,
  nowIso: string,
  fiveMinutesIso: string
): Promise<number> {
  const { data: items, error } = await supabaseAdmin
    .from(tableName)
    .select("user_id, reminder_at, id")
    .gte("reminder_at", nowIso)
    .lte("reminder_at", fiveMinutesIso);

  if (error) {
    console.error(error.message);
    return 0;
  }

  let sentCount = 0;

  for (const item of items) {
    const { user_id, reminder_at, id } = item;
    const { data: userData, error: userError } =
      await supabaseAdmin.auth.admin.getUserById(user_id);
    if (userError) {
      console.error(userError);
      continue;
    }
    const userEmail = userData?.user?.email;
    const userTimeZone = userData?.user?.user_metadata?.timezone;
    if (userEmail) {
      const readableTime = new Date(reminder_at).toLocaleString("en-US", {
        timeZone: userTimeZone || "UTC",
        dateStyle: "medium",
      });
      await resend.emails.send({
        from: "reminders@reactdev.site",
        to: userEmail,
        subject: `⏰ Reminder from PetMuse (${label})`,
        html: `<p>This is your scheduled reminder for your <strong>${label}</strong> at <strong>${readableTime}</strong>.</p>`,
      });

      sentCount++;
    }
  }
  return sentCount;
}
