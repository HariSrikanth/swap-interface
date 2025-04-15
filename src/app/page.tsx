
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { Swap } from "~/app/_components/swap"

export default async function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <h1> swap-interface</h1>
        <Swap />
      </main>
  );
}
