import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

export const alt =
  "Own Smart, Live Free. Your Mortgage Journey Made Simple! — Mike Prenesti, The Mortgage Jedi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#FFE81A";
const BG = "#0a0a0f";
const WHITE = "#ffffff";
const LIGHT = "#E5E7EB";

// Pull the Rajdhani display font (matches the site's heading font) so the
// headline renders bold. Falls back gracefully to the built-in font if the
// network is unavailable at render time.
async function loadFont(weight: number): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Rajdhani:wght@${weight}`;
    const css = await (
      await fetch(cssUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      })
    ).text();
    const match = css.match(/src:\s*url\(([^)]+)\)\s*format/);
    if (!match) return null;
    return await (await fetch(match[1])).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const headshotData = readFileSync(
    join(process.cwd(), "public/images/mike-headshot.jpg")
  );
  const headshotSrc = `data:image/jpeg;base64,${headshotData.toString("base64")}`;

  const [bold, semibold] = await Promise.all([loadFont(700), loadFont(600)]);
  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 600 | 700;
    style: "normal";
  }[] = [];
  if (bold) fonts.push({ name: "Rajdhani", data: bold, weight: 700, style: "normal" });
  if (semibold)
    fonts.push({ name: "Rajdhani", data: semibold, weight: 600, style: "normal" });

  const fontFamily = fonts.length ? "Rajdhani, sans-serif" : "sans-serif";

  const headlineLine = {
    display: "flex",
    fontSize: 62,
    fontWeight: 700,
    lineHeight: 1.08,
    letterSpacing: "-0.01em",
  } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: BG,
          padding: "56px 72px",
          fontFamily,
        }}
      >
        {/* TOP: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div style={{ ...headlineLine, color: WHITE }}>
            <span>Own Smart,</span>
            <span style={{ color: GOLD, marginLeft: "0.3em" }}>Live Free.</span>
          </div>
          <div style={{ ...headlineLine, color: WHITE, marginTop: 8 }}>
            Your Mortgage Journey
          </div>
          <div style={{ ...headlineLine, color: GOLD, marginTop: 8 }}>
            Made Simple!
          </div>
        </div>

        {/* MIDDLE: circular headshot */}
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={headshotSrc}
            alt="Mike Prenesti"
            width={216}
            height={216}
            style={{
              width: 216,
              height: 216,
              borderRadius: "50%",
              objectFit: "cover",
              border: `6px solid ${GOLD}`,
            }}
          />
        </div>

        {/* BOTTOM: caption */}
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 600,
            color: LIGHT,
          }}
        >
          <span>Mike Prenesti -</span>
          <span style={{ color: GOLD, marginLeft: "0.3em" }}>
            The Mortgage Jedi
          </span>
          <span style={{ marginLeft: "0.3em" }}>powered by Nexa</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
