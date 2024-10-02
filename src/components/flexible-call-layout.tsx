import {
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  LayoutGrid,
} from "lucide-react";
import { useState } from "react";
import {
  CallControls,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useStreamCall } from "@/hooks/use-stream-call";
import { EndCallButton } from "@/components/end-call-button";

type CallLayout = "speaker-vertical" | "speaker-horizontal" | "grid";

export const FlexibleCallLayout = () => {
  const [layout, setLayout] = useState<CallLayout>("speaker-vertical");
  const call = useStreamCall();
  const router = useRouter();

  return (
    <div className="space-y-3">
      <CallLayoutButtons layout={layout} setLayout={setLayout} />
      <CallLayoutView layout={layout} />
      <CallControls onLeave={() => router.push(`/meeting/${call.id}/left`)} />
      <EndCallButton />
    </div>
  );
};

interface CallLayoutButtonsProps {
  layout: CallLayout;
  setLayout: (layout: CallLayout) => void;
}

const CallLayoutButtons = ({ layout, setLayout }: CallLayoutButtonsProps) => {
  return (
    <div className="mx-auto w-fit space-x-6">
      <button onClick={() => setLayout("speaker-vertical")}>
        <BetweenVerticalEnd
          className={layout !== "speaker-vertical" ? "text-gray-400" : ""}
        />
      </button>
      <button onClick={() => setLayout("speaker-horizontal")}>
        <BetweenHorizonalEnd
          className={layout !== "speaker-horizontal" ? "text-gray-400" : ""}
        />
      </button>
      <button onClick={() => setLayout("grid")}>
        <LayoutGrid className={layout !== "grid" ? "text-gray-400" : ""} />
      </button>
    </div>
  );
};

interface CallLayoutViewProps {
  layout: CallLayout;
}

const CallLayoutView = ({ layout }: CallLayoutViewProps) => {
  switch (layout) {
    case "speaker-vertical":
      return <SpeakerLayout />;
    case "speaker-horizontal":
      return <SpeakerLayout participantsBarPosition="right" />;
    case "grid":
      return <PaginatedGridLayout />;
    default:
      return null;
  }
};
