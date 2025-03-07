"use client";
import { useRouter } from "next/navigation";
import AllChats from "./components/AllChats";
import MainChat from "./components/MainChat";
import Modal from "./components/Modal";
import Nav from "./components/Nav";
import SideLeft from "./components/SideLeft";
import SideRight from "./components/SideRight";
import { useCurrentUser, useDisplayChat } from "./store";
import { useEffect } from "react";
import BrandPage from "./components/BrandPage";

export default function Home() {
  const displayChat = useDisplayChat((state) => state.display);
  const signedInUser = useCurrentUser((state) => state.currentUser);
  const router = useRouter();

  useEffect(() => {
    if (signedInUser === undefined) return;
    if (!signedInUser) {
      router.push("/signin");
    }
  }, [router, signedInUser]);
  return (
    <div className="h-screen bg-neutral-100 grid grid-cols-20">
      <SideLeft />
      <div className="col-span-19 h-full grid grid-rows-20">
        <Nav />
        <section className="row-span-19 grid grid-cols-20">
          <AllChats />
          {displayChat ? <MainChat /> : <BrandPage />}
          <SideRight />
        </section>
      </div>
      <Modal />
    </div>
  );
}
