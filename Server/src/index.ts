import express from "express";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import bodyParser from "body-parser";

const app = express();
const ai = new GoogleGenAI({
  apiKey: process.env.Gemini_API_KEY ?? "",
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.post("/chat", async (req, res) => {
  /// Parse the Chart Data and forward this to LLM to predict the chartpatterns and do analysis
  try {
    let ImageData = req.body.data;
    
    // Strip the data URI prefix if present (e.g., "data:image/png;base64,")
    if (typeof ImageData === 'string' && ImageData.includes(',')) {
      ImageData = ImageData.split(',')[1];
    }
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [{
        parts: [
          { inlineData: { mimeType: "image/png", data: ImageData } },
          { text: "Can you predict the any chart patterns from it" }
        ]
      }]
    });
    console.log(response.text);
    res.send({ message: response.text });
  } catch (err: any) {
    console.error("Error details:", err);
    console.error("Error status:", err?.status);
    console.error("Error message:", err?.message);
    res.status(err?.status || 500).send({ 
      error: err?.message || "Internal server error",
      status: err?.status || 500
    });
  }
});

app.listen(3000, () => {
  console.log("Server started on the port 3000");
});
