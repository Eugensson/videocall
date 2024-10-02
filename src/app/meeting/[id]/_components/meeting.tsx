"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";

interface MeetingProps {
  id: string;
}

export const Meeting = ({ id }: MeetingProps) => {
  const [call, setCall] = useState<Call>();

  const client = useStreamVideoClient();

  if (!client) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (!call) {
    return (
      <button
        onClick={async () => {
          const call = client.call("private-meeting", id);
          await call.join();
          setCall(call);
        }}
      >
        Join meeting
      </button>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme classID="space-y-3">
        <SpeakerLayout />
        <CallControls />
      </StreamTheme>
    </StreamCall>
  );
};
