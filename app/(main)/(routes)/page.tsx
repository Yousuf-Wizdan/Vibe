import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <ModeToggle />
      <h1 className="text-indigo-600 text-xl">This is Protected Route!</h1>
    </div>
  );
}
