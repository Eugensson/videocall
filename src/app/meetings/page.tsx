import { Metadata } from "next";

import { Meetings } from "@/components/meetings";

export const metadata: Metadata = {
  title: "My Meetings",
};

const MettingsPage = () => {
  return <Meetings />;
};

export default MettingsPage;
