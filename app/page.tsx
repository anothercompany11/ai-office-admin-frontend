import { CODE_PAGE } from "@/constants/path";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(CODE_PAGE);
}
