import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Call, CallRecording } from "@stream-io/video-react-sdk";

export const useLoadRecordings = (call: Call) => {
  const { user } = useUser();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [recordingsLoading, setRecordingsLoading] = useState(true);

  useEffect(() => {
    async function loadRecordings() {
      setRecordingsLoading(true);

      if (!user?.id) return;

      const { recordings } = await call.queryRecordings();
      setRecordings(recordings);

      setRecordingsLoading(false);
    }

    loadRecordings();
  }, [call, user?.id]);

  return { recordings, recordingsLoading };
};
