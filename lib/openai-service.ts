import OpenAI from "openai";

/**
 * FOR LOCAL DEVELOPMENT ONLY!!
 * Do not store sensitive info, such as private keys, in EXPO_PUBLIC_ variables!
 * These variables will be visible in plain-text in your compiled application.
 */
const openAiApiKey = process.env.EXPO_PUBLIC_OPENAI_KEY

const openai = new OpenAI({
  apiKey: openAiApiKey,
});

export async function generateWordOptions(word: string): Promise<{ correct: string; wrong: string[] }> {
  try {
    const prompt = `
      Given the word "${word}", generate one correct translation in Finnish and two incorrect translations in Finnish. 
      Return the data in the following JSON format:
      {
        "correct": "<correct translation>",
        "wrong": ["<wrong translation 1>", "<wrong translation 2>"]
      }.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant that provides language-based games." },
        { role: "user", content: prompt },
      ],
    });

    const response = completion.choices[0].message?.content;
    if (response) {
      const data = JSON.parse(response);
      return {
        correct: data.correct,
        wrong: data.wrong,
      };
    } else {
      throw new Error("Invalid response from OpenAI");
    }
  } catch (error) {
    console.error("Error generating word options:", error);
    throw new Error("Failed to generate word options");
  }
}