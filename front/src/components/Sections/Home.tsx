import { useActiveWallet } from "@lens-protocol/react-web";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoginButton from "../Buttons/LoginButton";
import Arrow from "../../../public/Arrow.svg";
import Rectangle from "../../../public/Rectangle.svg";
import Circle from "../../../public/Circle.svg";
import And from "../../../public/And.svg";
import Cross from "../../../public/Cross.svg";
import HomeImage from "../../../public/HomeImage.svg";
import SideBar from "../Layout/SideBar";
import Feed from "./Feed";

export default function Home() {
  const { data: wallet } = useActiveWallet();
  const [connected, setConnected] = useState<boolean>(true);

  const setChangeWidth = () => {
    const hiddenElementsHome = document.querySelectorAll(".home") as any;
    if (hiddenElementsHome.length > 0) {
      hiddenElementsHome[0].classList.remove("home");
      hiddenElementsHome[0].classList.add("homeClose");
      hiddenElementsHome[1].classList.remove("home");
      hiddenElementsHome[1].classList.add("homeExpand");
    }
    setTimeout(() => {
      setConnected(true);
    }, 2500);
  };

  useEffect(() => {
    !connected && wallet && setChangeWidth();
  }, [wallet]);

  return (
    <>
      {connected && wallet ? (
        <div className="feed">
          <SideBar page={<Feed wallet={wallet.address} />} />
        </div>
      ) : (
        <div className="flex flex-row w-screen h-screen ">
          <div
            className="home flex flex-col justify-center bg-greenDark w-full text-homeTitle bg-cover"
            style={{ backgroundImage: `url('${HomeImage.src}')` }}
          ></div>
          <div className="home flex flex-col justify-center items-center w-full">
            <div className="flex flex-row gap-x-[12px] mb-[30px]">
              <Image height={30} width={43} src={Arrow.src} alt="home image" />{" "}
              <Image
                height={30}
                width={30}
                src={Rectangle.src}
                alt="home image"
              />
              <Image height={31} width={31} src={Circle.src} alt="home image" />
            </div>

            <div className="text-center flex flex-col justify-center">
              <div className="font-black text-5xl tracking-widest mx-auto">
                Make money
                <Image
                  height={32}
                  width={111.5}
                  src={And.src}
                  alt="and gafitti"
                  className="my-[-15px] ml-[180px]"
                />
                <Image
                  height={60}
                  width={90}
                  src={Cross.src}
                  alt="and gafitti"
                  className="absolute ml-4"
                />
                not friends
              </div>
              {!connected && wallet ? (
                <div className="mb-[44px] mt-[22px] max-w-[297px] text-center mx-auto">
                  Premium content, new creators and gains are comming.
                </div>
              ) : (
                <>
                  <div className="mb-[44px] mt-[22px] max-w-[297px] text-center mx-auto">
                    Find premium content, support creators and share the gains.
                  </div>
                  <div
                    onClick={() => setConnected(false)}
                    className="flex mx-auto"
                  >
                    <LoginButton />
                  </div>{" "}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
