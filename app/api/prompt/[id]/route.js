import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt)
      return new Response("Prompt not found.", {
        status: 404,
      });
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts.", {
      status: 500,
    });
  }
};
// PATCH
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.JSON();

  try {
    await connectToDB();
    const updatedPrompt = await Prompt.findById(params.id);
    if (!updatedPrompt)
      return new Response("Prompt not found.", {
        status: 404,
      });
    updatedPrompt.prompt = prompt;
    updatedPrompt.tag = tag;

    await updatedPrompt.save();
    return new Response(JSON.stringify(updatedPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update prompt.", {
      status: 500,
    });
  }
};

//DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted.", {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to delete prompt.", {
      status: 500,
    });
  }
};
