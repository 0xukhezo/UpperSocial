// React
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
// Heroicons
import { XMarkIcon } from "@heroicons/react/24/outline";

import QRCode from "react-qr-code";

import { io } from "socket.io-client";

const linkDownloadPolygonIDWalletApp =
  "https://0xpolygonid.github.io/tutorials/wallet/wallet-overview/#quick-start";

interface PolygonIDVerifierProps {
  getProvedAccess: (approved: boolean) => void;
  getOpenModal: (openmodal: boolean) => void;
  publicServerURL: any;
  localServerURL: any;
}

export default function PolygonIDVerifier({
  getProvedAccess,
  getOpenModal,
  publicServerURL,
  localServerURL,
}: PolygonIDVerifierProps) {
  const [open, setOpen] = useState<boolean>(true);
  const [sessionId, setSessionId] = useState<string>("");
  const [qrCodeData, setQrCodeData] = useState<any>();
  const [isHandlingVerification, setIsHandlingVerification] =
    useState<boolean>(false);
  const [verificationCheckComplete, setVerificationCheckComplete] =
    useState<boolean>(false);
  const [verificationMessage, setVerfificationMessage] = useState<string>("");
  const [socketEvents, setSocketEvents] = useState<any[]>([]);

  const serverUrl = window.location.href.startsWith("https")
    ? publicServerURL
    : localServerURL;

  const getQrCodeApi = (sessionId: any) =>
    serverUrl + `/api/get-auth-qr?sessionId=${sessionId}`;

  const socket = io(serverUrl);

  useEffect(() => {
    socket.on("connect", () => {
      setSessionId(socket.id);

      socket.on(socket.id, (arg: any) => {
        setSocketEvents((socketEvents) => [...socketEvents, arg]);
      });
    });
  }, []);

  useEffect(() => {
    const fetchQrCode = async () => {
      const response = await fetch(getQrCodeApi(sessionId));
      const data = await response.text();
      return JSON.parse(data);
    };

    if (sessionId) {
      fetchQrCode().then(setQrCodeData).catch(console.error);
    }
  }, [sessionId]);

  useEffect(() => {
    if (socketEvents.length) {
      const currentSocketEvent = socketEvents[socketEvents.length - 1] as any;

      if (currentSocketEvent.fn === "handleVerification") {
        if (currentSocketEvent.status === "IN_PROGRESS") {
          setIsHandlingVerification(true);
        } else {
          setIsHandlingVerification(false);
          setVerificationCheckComplete(true);
          if (currentSocketEvent.status === "DONE") {
            setVerfificationMessage("✅ Verified proof");
            getOpenModal(true);
            setTimeout(() => {
              reportVerificationResult(true);
            }, 2000);
            socket.close();
          } else {
            setVerfificationMessage("❌ Error verifying VC");
          }
        }
      }
    }
  }, [socketEvents]);

  const reportVerificationResult = (result: any) => {
    getProvedAccess(result);
  };

  const closeModal = () => {
    setOpen(false);
    getOpenModal(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start w-full ">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex flex-col text-center mx-auto">
                      {qrCodeData && (
                        <div>
                          <div className="text-gray-900 text-lg">
                            Scan this QR code from your{" "}
                            <a
                              href={linkDownloadPolygonIDWalletApp}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-500"
                            >
                              Polygon ID Wallet App
                            </a>{" "}
                            to prove access rights
                          </div>

                          <div>
                            {isHandlingVerification && (
                              <div>
                                <p>Authenticating...</p>
                              </div>
                            )}
                            {verificationMessage}
                            {qrCodeData &&
                              !isHandlingVerification &&
                              !verificationCheckComplete && (
                                <div className="flex justify-center mt-10">
                                  <QRCode value={JSON.stringify(qrCodeData)} />
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
