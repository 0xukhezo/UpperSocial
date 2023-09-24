// React
import React, { useEffect, useRef, useState } from "react";
// Components
import ChatCard from "../Cards/ChatCard";
import ChatFeed from "../Feeds/ChatFeed";
// XMTP
import { Client, Signer } from "@xmtp/xmtp-js";
// Hooks
import { useEthersSigner } from "@/hooks/useEthersSigner";
// Wagmi
import { useAccount } from "wagmi";
// Lens
import { useProfile, useProfilesOwnedBy } from "@lens-protocol/react-web";

const userWithChat = [
  {
    handle: "ukhezo.lens",
    address: "0x43DdF2bF7B0d2bb2D3904298763bcA2D3F2b40E0",
  },
  {
    handle: "oxkis.lens",
    address: "0xea2e261ec64030b25c863bb51fb9602285bc2acc",
  },
  {
    handle: "damarnez.lens",
    address: "0x88a769db5055b046c9a45db621978bbec65c8c5b",
  },
  {
    handle: "vikthor.lens",
    address: "0xE6307e57dd7A85843E396Ad0bedde0d462ad861b",
  },
  {
    handle: "peliculas.lens",
    address: "0xb3204E7bD17273790f5ffb0Bb1e591Ab0011dC55",
  },
];

export default function Chat() {
  const [chatSelected, setChatSelected] = useState<any>(null);
  const [height, setHeight] = useState<number>(1000);
  const [messages, setMessages] = useState<any>(null);
  const [isOnNetwork, setIsOnNetwork] = useState<any>(false);
  const convRef = useRef<any>(null);
  const { address } = useAccount();
  const signer = useEthersSigner();

  const { data: profile } = useProfile({
    handle: chatSelected && chatSelected.handle,
  });

  const { data } = useProfilesOwnedBy({
    address: address ? address : "",
    limit: 10,
  });

  const initXmtp = async (addressTo: string) => {
    const xmtp = await Client.create(signer as Signer, { env: "production" });
    setIsOnNetwork(!!xmtp.address);
    await newConversation(xmtp, addressTo);
  };

  const newConversation = async function (xmtp_client: any, addressTo: any) {
    if (await xmtp_client?.canMessage(addressTo)) {
      const conversation = await xmtp_client.conversations.newConversation(
        addressTo
      );
      convRef.current = conversation;

      const messages = await conversation.messages();
      setMessages(messages);
    } else {
      console.log("cant message because is not on the network.");
    }
  };

  useEffect(() => {
    if (isOnNetwork && convRef.current) {
      const streamMessages = async () => {
        const newStream = await convRef.current.streamMessages();
        for await (const msg of newStream) {
          const exists = messages.find((m: any) => m.id === msg.id);
          if (!exists) {
            setMessages((prevMessages: any[]) => {
              const msgsnew = [...prevMessages, msg];
              return msgsnew;
            });
          }
        }
      };
      streamMessages();
    }
  }, [messages, isOnNetwork]);

  useEffect(() => {
    signer && chatSelected && initXmtp(chatSelected.address);
  }, [chatSelected]);

  const displayHeight = () => {
    const htmlElementHeight = document.documentElement.clientHeight;
    const height = htmlElementHeight - 64;

    setHeight(height);
  };

  useEffect(() => {
    window.addEventListener("scroll", displayHeight);
    window.addEventListener("resize", displayHeight);
    displayHeight();
  }, []);

  return (
    <div className="flex flex-row feed">
      <section className="min-w-[400px] border-r-1 ">
        <h1 className="py-[12px] px-[24px] font-semibold text-2xl">Messages</h1>
        <div className="flex flex-col">
          {userWithChat.map((user: any) => {
            return (
              <button onClick={() => setChatSelected(user)} key={user.handle}>
                <ChatCard handle={user.handle} chatSelected={chatSelected} />
              </button>
            );
          })}
        </div>
      </section>
      <section className="w-full relative" style={{ height: `${height}px` }}>
        <ChatFeed
          messages={messages}
          profile={profile}
          data={data}
          address={address}
          convertation={convRef.current}
          height={height}
        />
      </section>
    </div>
  );
}
