import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Summarizer = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const API_KEY = "AIzaSyDTfGqXY-zEoaA9lLlM5maY7oqnYGPT7SI"; // Access API key from .env via global.d.ts
  console.log(API_KEY);

  const genAI = new GoogleGenerativeAI(API_KEY);

  const run = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    setResponse(responseText);
  };

  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <div className="flex text-4xl justify-center bold py-4">Summarizer</div>
      <label htmlFor="prompt" className="flex justify-center py-4">
        This will be a csv parsing machine later, will implement static csv here
      </label>
      <div>
        <textarea
          className="w-full border-solid border-2 border-black rounded-xl"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
        />
      </div>
      <button onClick={run} className="bg-slate-400 p-2 rounded-xl">
        Generate Schedule
      </button>
      <p>{response}</p>
    </div>
  );
};

export default Summarizer;
