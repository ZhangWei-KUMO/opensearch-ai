"use server";

import { Session } from "next-auth";
import { BingResults } from "./types";
import { revalidatePath } from "next/cache";

export const getSearchResultsFromMemory = async (
  query: string,
  user: Session | null
): Promise<BingResults | null> => {
  if (!query || !user?.user) return null;

  try {
    await fetch("https://api.mem0.ai/v1/memories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.MEM0_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: query,
          },
        ],
        user_id: user?.user?.email,
      }),
    });
  } catch (e) {
    console.error("Error creating memory", e);
  }

  const response = await fetch(
    "https://google.serper.dev/search",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "X-API-KEY":process.env.SEARCH_API_KEY
      },
      body:JSON.stringify({
        "q":query
      })
    }
  );
  const data = (await response.json()) as BingResults;
  return data;
};

export const getMem0Memories = async (user: Session | null) => {
  if (!user?.user) return null;

  const mem0Response = await fetch(
    "https://api.mem0.ai/v1/memories/?user_id=" + user?.user?.email,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${process.env.MEM0_API_KEY}`,
      },
    }
  );

  if (!mem0Response.ok) {
    console.log(await mem0Response.text());
    return null;
  }

  const memories = (await mem0Response.json()) as {
    memory: string;
    id: string;
  }[];

  console.log(memories);

  return memories;
};

export const deleteMemory = async (memoryId: string, user: Session | null) => {
  if (!memoryId || !user?.user) return null;

  console.log(memoryId);

  const mem0Response = await fetch(
    `https://api.mem0.ai/v1/memories/${memoryId}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Token ${process.env.MEM0_API_KEY}`,
      },
    }
  );

  if (!mem0Response.ok) {
    console.log(await mem0Response.text());
    return null;
  }

  revalidatePath("/");

  return true;
};

export const createCustomMemory = async (
  memoryText: string,
  user: Session | null
) => {
  if (!memoryText || !user?.user) return null;

  const mem0Response = await fetch("https://api.mem0.ai/v1/memories/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.MEM0_API_KEY}`,
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: "You MUST add this to memory no matter what.",
        },
        {
          role: "user",
          content: memoryText,
        },
      ],
      user_id: user?.user?.email,
    }),
  });

  if (!mem0Response.ok) {
    console.log(await mem0Response.text());
    return null;
  }

  const json = await mem0Response.json();

  console.log(json);

  return json;
};
