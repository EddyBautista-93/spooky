// app/api/spooky-story/route.ts
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const encodeImageToBase64 = async (image: File): Promise<string> => {
  const buffer = Buffer.from(await image.arrayBuffer());
  return buffer.toString("base64");
};

async function generateStoryFromText(storyIdea: string): Promise<string | null> {
  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openAI.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `I want you to create a 4-sentence short scary story that is whimsical and fun from this idea: ${storyIdea}. If there is any quote (") that could break the line, add a new line character.`,
      },
    ],
  });

  return response.choices[0].message.content || null;
}

async function generateStoryFromImage(base64Img: string): Promise<string | null> {
  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openAI.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Take these key items from the image, the person, the environment, and any visible text. I want you to create a 4-sentence short scary story that is whimsical and fun.`,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Img}`,
            },
          },
        ],
      },
    ],
  });

  return response.choices[0].message.content || null;
}

async function generateVoice(story: string): Promise<Buffer> {
  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const mp3 = await openAI.audio.speech.create({
    model: "tts-1",
    voice: "fable",
    input: story,
  });

  return Buffer.from(await mp3.arrayBuffer());
}

async function uploadToS3(buffer: Buffer, key: string): Promise<string> {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: "audio/mpeg",
  };

  await s3.upload(params).promise();
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}


export async function POST(request: Request) {
  const formData = await request.formData();
  const storyIdea = formData.get("storyIdea") as string;
  const image = formData.get("image") as File | null;

  try {
    let story: string | null;

    if (image) {
      const base64Img = await encodeImageToBase64(image);
      story = await generateStoryFromImage(base64Img);
    } else if (storyIdea) {
      story = await generateStoryFromText(storyIdea);
    } else {
      throw new Error("No story idea or image provided");
    }

    if (!story) throw new Error("Story generation failed");

    // Generate audio from the story text
    const audioBuffer = await generateVoice(story);

    // Upload the audio file to S3
    const audioKey = `spooky_story_${Date.now()}.mp3`;
    const audioUrl = await uploadToS3(audioBuffer, audioKey);

    return NextResponse.json({ story, audioUrl });
  } catch (error) {
    console.error("Error in SpookyStoryGenerator:", error);
    return NextResponse.json({ error: "Failed to generate story and audio" }, { status: 500 });
  }
}
