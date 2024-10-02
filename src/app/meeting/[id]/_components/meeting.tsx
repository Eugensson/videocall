"use client";

import Link from "next/link";
import {
  StreamCall,
  StreamTheme,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { useLoadCall } from "@/hooks/use-load-call";
import { useStreamCall } from "@/hooks/use-stream-call";
import { buttonClassName } from "@/components/button";

interface MeetingProps {
  id: string;
}

export const Meeting = ({ id }: MeetingProps) => {
  const { user, isLoaded: userLoaded } = useUser();

  const { call, callLoading } = useLoadCall(id);

  if (!userLoaded || callLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (!call) {
    return <p className="text-center font-bold">Call not found</p>;
  }

  const notAllowedToJoin =
    call.type === "private-meeting" &&
    (!user || call.state.members.find((m) => m.user.id === user.id));

  if (notAllowedToJoin) {
    return (
      <p className="text-center font-bold">
        You are not allowed to view this meeting
      </p>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        <MeetingScreen />
      </StreamTheme>
    </StreamCall>
  );
};

export const MeetingScreen = () => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();

  const callEndedAt = useCallEndedAt();
  const callStartsAt = useCallStartsAt();

  const callIsInFuture = callStartsAt && new Date(callStartsAt) > new Date();

  const callHasEnded = !!callEndedAt;

  if (callHasEnded) {
    return <MeetingEndedScreen />;
  }
  if (callIsInFuture) {
    return <UpcommingMeetingScreen />;
  }

  return <div>Call UI</div>;
};

const UpcommingMeetingScreen = () => {
  const call = useStreamCall();

  return (
    <div className="flex flex-col items-center gap-6">
      <p>
        This meeting hes not started yet. It will start at{" "}
        <span className="font-bold">
          {call.state.startsAt?.toLocaleString()}
        </span>
      </p>
      {call.state.custom.description && (
        <p>
          Description:{" "}
          <span className="font-bold">{call.state.custom.description}</span>
        </p>
      )}
      <Link href="/" className={buttonClassName}>
        Go home
      </Link>
    </div>
  );
};

const MeetingEndedScreen = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">This meeting has ended.</p>
      <Link href="/" className={buttonClassName}>
        Go home
      </Link>
    </div>
  );
};
