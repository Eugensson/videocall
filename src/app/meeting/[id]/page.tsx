import { Metadata } from "next";

import { Meeting } from "@/app/meeting/[id]/_components/meeting";

interface MeetingIdPageProps {
  params: {
    id: string;
  };
}

export const generateMetadata = ({
  params: { id },
}: MeetingIdPageProps): Metadata => {
  return {
    title: `Meeting ${id}`,
  };
};

const MeetingIdPage = ({ params: { id } }: MeetingIdPageProps) => {
  return <Meeting id={id} />;
};

export default MeetingIdPage;
