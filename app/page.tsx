import type { Metadata } from "next";
import { CasePage } from "./CasePage";

export const metadata: Metadata = {
  title: "Fullive.ai GTM Strategy Case",
  description:
    "Market and competitor research for Fullive.ai's North American sleep technology launch.",
};

export default function Home() {
  return <CasePage />;
}
