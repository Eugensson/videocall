"use server";

import { StreamClient } from "@stream-io/node-sdk";
import {
  clerkClient as getClerkClient,
  currentUser,
} from "@clerk/nextjs/server";

export const getToken = async () => {
  const streamApiSecret = process.env.STREAM_VIDEO_API_SECRET;
  const streamApiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;

  if (!streamApiKey || !streamApiSecret) {
    throw new Error("Stream API key or secret not set");
  }

  const user = await currentUser();

  console.log("Generating token for user: ", user?.id);

  if (!user) {
    throw new Error("User not authenticated");
  }

  const streamClient = new StreamClient(streamApiKey, streamApiSecret);

  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.generateUserToken({
    user_id: user.id,
    exp: expirationTime,
    iat: issuedAt,
  });

  console.log("Successfully generated token: ", token);

  return token;
};

export const getUserIds = async (emailAddresses: string[]) => {
  const clerkClient = getClerkClient();
  const response = await clerkClient.users.getUserList({
    emailAddress: emailAddresses,
  });

  const users = response.data;

  return users.map((user) => user.id);
};
