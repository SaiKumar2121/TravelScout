export const fetchWhyBestTimeAnswer = async (
  placeName: string,
  bestTime: string
): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const modelName = import.meta.env.VITE_OPENROUTER_MODEL_NAME;



  const prompt = `Why is ${bestTime} the best time to visit ${placeName}? Explain it like you're recommending it to a traveler.`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "TravelScout",
    },
    body: JSON.stringify({
      model: modelName,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  if (data?.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  } else {
    throw new Error("Failed to fetch response");
  }
};
