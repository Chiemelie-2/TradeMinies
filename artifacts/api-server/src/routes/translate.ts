import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.post("/translate", async (req, res) => {
  const { text, targetLocale, sourceLocale = "en" } = req.body ?? {};
  if (typeof text !== "string" || !text.trim() || typeof targetLocale !== "string") {
    res.status(400).json({ error: "text and targetLocale are required" });
    return;
  }
  if (sourceLocale === targetLocale) {
    res.json({ text, sourceLocale, targetLocale, provider: "identity" });
    return;
  }

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    res.status(503).json({
      error: "Translation provider is not configured",
      detail: "Add GOOGLE_TRANSLATE_API_KEY to enable dynamic translation.",
    });
    return;
  }

  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: sourceLocale,
        target: targetLocale,
        format: "text",
      }),
    },
  );

  if (!response.ok) {
    res.status(502).json({ error: "Google Cloud Translation request failed" });
    return;
  }

  const body = (await response.json()) as {
    data?: { translations?: Array<{ translatedText?: string }> };
  };
  const translatedText = body.data?.translations?.[0]?.translatedText;
  if (!translatedText) {
    res.status(502).json({ error: "Google Cloud Translation returned no text" });
    return;
  }
  res.json({ text: translatedText, sourceLocale, targetLocale, provider: "google-cloud-translation" });
});

export default router;