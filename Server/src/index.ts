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
    console.log(ImageData);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [{ inlineData: { mimeType: "image/png", data: ImageData } }],
    });
    console.log(response.text);
    res.send({ message: response.text });
  } catch (err) {
    console.log(err);
    res.send({ err: err });
  }
});

app.listen(3000, () => {
  console.log("Server started on the port 3000");
});
