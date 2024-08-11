const express = require("express");
require("dotenv").config();
const { Translator } = require("deepl-node");
const DetectLanguage = require("detectlanguage");
const OpenAI = require("openai");
const app = express();

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 8000;

// API Setups
const detectLanguage_api_key = process.env.DETECT_LANGUAGE_API_KEY;
const detectlanguage = new DetectLanguage(detectLanguage_api_key);

const openai_api_key = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: openai_api_key });

const deepl_authKey = process.env.DEEPL_AUTH_KEY;
const translator = new Translator(deepl_authKey);

// =================================================== //

// Middleware
app.use(express.json());

// accept form data
app.use(express.urlencoded({ extended: true }));

// route
app.post("/translate", async (req, res) => {
  const { convertTo } = req.body;

  if (!convertTo) {
    return res.status(400).send({
      error: "Please provide a language so we can convert text to it!",
    });
  }

  let text = "";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Please give me a text in any language except ${convertTo} language. But just text. Dont add any system message above or below the text. Just give me a text with 20 words.`,
        },
      ],
    });

    text = completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI API error:", error);
    return res
      .status(500)
      .send({ error: "OpenAI API error", message: error.message });
  }

  // detect text language
  let detectedLang = "";
  try {
    const result = await detectlanguage.detect(text);
    detectedLang = result[0].language;
  } catch (error) {
    console.error("DetectLanguage API error:", error);
    return res.status(500).send({ error: "DetectLanguage API error" });
  }

  if (!detectedLang) {
    return res
      .status(400)
      .send({ error: "Could not detect language of the provided text" });
  }

  // convert text to requested lang
  try {
    const result = await translator.translateText(
      text,
      detectedLang,
      convertTo
    );
    const translatedText = result.text;
    res.send({
      error: false,
      message: "Text successfully translated",
      text,
      translatedText,
      convertedFrom: detectedLang,
      convertedTo: convertTo,
    });
  } catch (error) {
    console.error("Deepl API error:", error);
    res.status(500).send({ error: "Deepl API error" });
  }
});

app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send({
      error: "Please provide a prompt to get your ai image",
    });
  }

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
  });

  const image_url = response.data[0].url;

  res.send({
    error: false,
    message: "Image successfully generated",
    prompt,
    image_url,
  });
});

// Listen app
app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
