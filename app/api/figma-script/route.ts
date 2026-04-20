import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a Figma Plugin API code generator. You receive a UI design description and output ONLY valid executable JavaScript code for the Figma Plugin API.

RULES:
- Output ONLY raw JavaScript. No markdown, no backticks, no explanation.
- Use the Figma Plugin API (figma.createFrame, figma.createText, figma.createRectangle, etc.)
- Always set x, y positions so elements don't overlap.
- Always use figma.loadFontAsync before setting text characters.
- Use modern, professional colors (hex values).
- Create a main parent frame to hold everything.
- Set proper sizing, padding, border radius for a polished look.
- NEVER call figma.closePlugin().
- The code will be wrapped in an async function that receives 'figma' as a parameter.

EXAMPLE OUTPUT:
const frame = figma.createFrame();
frame.name = "Hero Section";
frame.resize(1440, 600);
frame.fills = [{type: 'SOLID', color: {r: 0.06, g: 0.06, b: 0.06}}];

await figma.loadFontAsync({ family: "Inter", style: "Bold" });
const title = figma.createText();
title.fontName = { family: "Inter", style: "Bold" };
title.characters = "Welcome";
title.fontSize = 48;
title.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
frame.appendChild(title);
title.x = 100;
title.y = 200;

figma.currentPage.appendChild(frame);
figma.viewport.scrollAndZoomIntoView([frame]);`,
          },
          {
            role: "user",
            content: `Convert this design description into Figma Plugin API code:\n\n${description}`,
          },
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    let script = data.choices[0].message.content;

    // Strip any markdown code fences the AI might add despite instructions
    script = script.replace(/^```(?:javascript|js|typescript|ts)?\n?/gm, "");
    script = script.replace(/```$/gm, "");
    script = script.trim();

    return NextResponse.json({ script });

  } catch (error: any) {
    console.error("Figma Script Generation Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate Figma script" },
      { status: 500 }
    );
  }
}
