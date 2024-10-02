"use client";

import { nanoid } from "nanoid";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { getToken } from "@/app/actions";

interface ClientProviderProps {
  children: React.ReactNode;
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
  const videoClient = useInitializeVideoClient();

  if (!videoClient) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="mx-auto animate-spin" />
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

const useInitializeVideoClient = () => {
  const { user, isLoaded: userLoaded } = useUser();

  useEffect(() => {
    if (!userLoaded) return;

    let streamUser: User;

    if (user?.id) {
      streamUser = {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      };
    } else {
      const id = nanoid();

      streamUser = {
        id,
        type: "guest",
        name: `Guest ${id}`,
      };
    }

    const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;

    if (!apiKey) {
      throw new Error("Stream API key not set");
    }

    const client = new StreamVideoClient({
      apiKey,
      user: streamUser,
      tokenProvider: user?.id ? getToken : undefined,
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser();
      setVideoClient(null);
    };
  }, [user?.id, user?.imageUrl, user?.username, userLoaded]);

  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );

  return videoClient;
};
