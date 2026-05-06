const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.explainTopic = async (req, res) => {
  try {
    const { topic, context } = req.body;
    
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key') {
      return res.json({ 
        message: `[MOCK] AI Explanation for ${topic}: This is a high-level overview based on the course content for ${context}. Please provide a valid OPENAI_API_KEY in .env for real AI responses.` 
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful AI tutor for a Learning Management System." },
        { role: "user", content: `Explain the following topic in the context of ${context}: ${topic}` }
      ],
    });
    
    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('AI Explain Error:', error);
    res.status(500).json({ message: 'AI service unavailable' });
  }
};

exports.generateQuizQuestions = async (req, res) => {
  try {
    const { lessonContent } = req.body;

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key') {
      return res.json({ 
        questions: [
          {
            question: "Based on the lesson, what is the primary goal of this topic?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            answer: "Option A"
          }
        ],
        note: "Provide a valid OPENAI_API_KEY for real AI-generated questions."
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert educator. Generate 3 multiple-choice questions based on the provided lesson content. Return only a JSON array of objects with 'question', 'options' (array of 4), and 'answer' (the correct option string) fields." },
        { role: "user", content: lessonContent }
      ],
    });
    
    const questions = JSON.parse(completion.choices[0].message.content);
    res.json({ questions });
  } catch (error) {
    console.error('AI Quiz Gen Error:', error);
    res.status(500).json({ message: 'AI generation failed' });
  }
};
