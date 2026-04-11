import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, type, tone, audience, reference, colorPrefs, mode } = body;

    // Simulate backend processing time for AI
    await new Promise(res => setTimeout(res, 500));

    // Dynamic mock values based on inputted colorPreference or tone
    let primaryBase = "#6E63F5"; // Default Brand Blue/Purple
    if (colorPrefs === "Warm") primaryBase = "#F97316";
    if (colorPrefs === "Cool") primaryBase = "#0EA5E9";
    if (colorPrefs === "Neutral") primaryBase = "#525252";
    if (colorPrefs === "High contrast") primaryBase = "#111111";

    // Build the preview subset
    const previewData = {
      colors: {
        primary: {
          100: `${primaryBase}22`,
          300: `${primaryBase}66`,
          500: primaryBase,
          700: `${primaryBase}AA`,
          900: `${primaryBase}EE`,
        },
        bg: mode === "Dark only" || mode === "Both" ? "#0C0C0C" : "#FFFFFF",
        surface: mode === "Dark only" || mode === "Both" ? "#1A1A1A" : "#F5F5F5",
        textMain: mode === "Dark only" || mode === "Both" ? "#F0F0F0" : "#111111",
        textMuted: mode === "Dark only" || mode === "Both" ? "#9A9A9A" : "#555555",
      },
      typography: {
        fontFamily: reference === "Linear" || reference === "Vercel" ? "'Inter', sans-serif" : "'Geist', sans-serif",
        scale: {
          display: "48px",
          heading: "24px",
          body: "15px",
          label: "13px",
          caption: "11px"
        }
      },
      components: {
        buttonRadius: "8px",
        inputHeight: "40px",
        badgeBg: `${primaryBase}20` // Tint for badge
      }
    };

    return NextResponse.json(previewData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch preview" }, { status: 500 });
  }
}
