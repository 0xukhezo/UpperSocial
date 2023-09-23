import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import MessageCard from "../Cards/MessageCard";
import Image from "next/image";
import UpperSocial from "../../../public/UpperSocial.svg";
interface ChatFeedProps {
  messages: any;
  profile: any;
  data: any;
  address: any;
  convertation: any;
  height: number;
}

export default function ChatFeed({
  messages,
  profile,
  data,
  address,
  convertation,
  height,
}: ChatFeedProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const MessageList = (messages: any) => {
    messages = messages.messages.filter(
      (v: { id: any }, i: any, a: any[]) =>
        a.findIndex((t: { id: any }) => t.id === v.id) === i
    );

    return (
      <ul className="1flex flex-col mt-6">
        {messages.map((message: any, index: number) => (
          <MessageCard
            message={message}
            address={address}
            profile={profile}
            data={data}
            key={index}
          />
        ))}
      </ul>
    );
  };

  const handleSend = async () => {
    if (inputValue) {
      await onSendMessage(inputValue);
      setInputValue("");
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const onSendMessage = async (value: any) => {
    return convertation.send(value);
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, []);

  return (
    <div style={{ height: height - 64 }} className="overflow-y-auto">
      {messages && profile ? (
        <>
          <div ref={messageListRef} className="overflow-y-auto h-full">
            <MessageList messages={messages} />
          </div>
          <div className="absolute bottom-0 flex flex-row items-center  w-full justify-between px-4 sm:px-6 lg:px-8 border-t border-gray-200">
            <div className="flex h-16 shrink-0 bg-white w-11/12 flex-col overflow-x-hidden">
              <input
                value={inputValue}
                onChange={(e: any) => setInputValue(e.target.value)}
                className=" border-0 py-0 text-gray-900 placeholder:text-gray-400 sm:text-sm outline-white h-16 "
                placeholder="Write something"
                onKeyPress={handleKeyPress}
              />
            </div>

            <button
              onClick={() => handleSend()}
              className="bg-indigo-700 p-2 rounded-full "
            >
              <PaperAirplaneIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </button>
          </div>
        </>
      ) : (
        <div className="justify-center flex flex-col h-screen items-center pb-32">
          <span className="mb-10 font-semibold text-lg">Select a chat</span>
          <Image
            src={UpperSocial.src}
            height={200}
            width={200}
            alt="Logo Image"
          />
        </div>
      )}
    </div>
  );
}
