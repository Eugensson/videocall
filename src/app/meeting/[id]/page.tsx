import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";

import { Meeting } from "@/components/meeting";
import { MeetingLogin } from "@/components/meeting-login";

interface MeetingIdPageProps {
  params: { id: string };
  searchParams: { guest: string };
}

export const generateMetadata = ({
  params: { id },
}: MeetingIdPageProps): Metadata => {
  return {
    title: `Meeting ${id}`,
  };
};

const MeetingIdPage = async ({
  params: { id },
  searchParams: { guest },
}: MeetingIdPageProps) => {
  const user = await currentUser();

  const guestMode = guest === "true";

  if (!user && !guestMode) {
    return <MeetingLogin />;
  }

  return <Meeting id={id} />;
};

export default MeetingIdPage;
