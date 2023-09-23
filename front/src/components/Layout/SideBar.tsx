// React
import { Fragment, ReactElement, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// Identicon
import Identicon from "identicon.js";
// Heroicons
import {
  Bars3Icon,
  ChartBarIcon,
  ShoppingCartIcon,
  PaperAirplaneIcon,
  HomeIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
// Images
import UpperCoin from "../../../public/UpperCoin.svg";
import Parachute from "../../../public/Parachute.svg";
// Lens
import {
  ProfileOwnedByMe,
  useProfilesOwnedByMe,
} from "@lens-protocol/react-web";
// Components
import LogoutButton from "../Buttons/LogoutButton";
import PostModal from "../Modals/PostModal";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Notifications",
    href: "/notifications",
    icon: HeartIcon,
  },
  { name: "Messages", href: "/messages", icon: PaperAirplaneIcon },

  {
    name: "Purchases",
    href: "/purchases",
    icon: ShoppingCartIcon,
  },
  { name: "Proposals", href: "/proposals", icon: ChartBarIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SideBarProps {
  page: ReactElement;
  isProfile?: boolean;
  isChat?: boolean;
}

export default function SideBar({ page, isProfile, isChat }: SideBarProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { data } = useProfilesOwnedByMe({
    limit: 10,
  });
  const router = useRouter();
  console.log(data);
  const getOpenModal = (modalState: boolean) => {
    setModalOpen(modalState);
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1 bg-white">
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <Link href="/">
                        <Image
                          height={32}
                          width={32}
                          src={UpperCoin.src}
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                    <div className="absolute right-0 top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-black"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.name.toLowerCase() ===
                                      router.route.slice(
                                        1,
                                        router.route.length
                                      ) ||
                                      (router.route === "/" &&
                                        item.name.toLowerCase() === "home")
                                      ? "text-gray-900 hover:text-gray-900"
                                      : "text-gray-600",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:text-indigo-700"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.name.toLowerCase() ===
                                        router.route.slice(
                                          1,
                                          router.route.length
                                        ) ||
                                        (router.route === "/" &&
                                          item.name.toLowerCase() === "home")
                                        ? "text-gray-900"
                                        : "text-gray-600 group-hover:text-indigo-700",
                                      `h-6 w-6 shrink-0 ${
                                        item.icon === PaperAirplaneIcon &&
                                        "rotate-270"
                                      }`
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                            <li>
                              {" "}
                              <Image
                                width={24}
                                height={24}
                                alt="Profile Image"
                                src={Parachute.src}
                                className="rounded-full"
                              />
                              Airdrop
                            </li>
                            <li>
                              {/* {data && data?.length > 0 && (
                                <Link
                                  href={`/profiles/${data[0].handle}`}
                                  className={classNames(
                                    router.route.slice(
                                      1,
                                      router.route.length
                                    ) == "profile"
                                      ? "text-gray-900 hover:text-gray-900"
                                      : "text-gray-600",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:text-indigo-700"
                                  )}
                                >
                                  {data &&
                                  data[0].picture &&
                                  "original" in data[0].picture ? (
                                    <Image
                                      width={24}
                                      height={24}
                                      alt="Profile Image"
                                      src={data[0].picture.original.url}
                                      className="rounded-full"
                                    />
                                  ) : (
                                    data && (
                                      <Image
                                        width={24}
                                        height={24}
                                        alt="Profile Image"
                                        src={`data:image/png;base64,${new Identicon(
                                          data[0].ownedBy,
                                          64
                                        ).toString()}`}
                                        className="rounded-full"
                                      />
                                    )
                                  )}
                                  Profile
                                </Link>
                              )} */}
                              <Link
                                href={`/profiles/1695481341214.test`}
                                className={classNames(
                                  router.route.slice(1, router.route.length) ==
                                    "profile"
                                    ? "text-gray-900 hover:text-gray-900"
                                    : "text-gray-600",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:text-indigo-700"
                                )}
                              >
                                {" "}
                                <Image
                                  width={24}
                                  height={24}
                                  alt="Profile Image"
                                  src={`data:image/png;base64,${new Identicon(
                                    "0xF70c1cEa8909563619547128A92dd7CC965F9657",
                                    64
                                  ).toString()}`}
                                  className="rounded-full"
                                />
                                Profile
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-1">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Link href="/">
                <Image
                  height={32}
                  width={32}
                  src={UpperCoin.src}
                  alt="Your Company"
                />
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.name.toLowerCase() ===
                              router.route.slice(1, router.route.length) ||
                              (router.route === "/" &&
                                item.name.toLowerCase() === "home")
                              ? "text-gray-900 hover:text-gray-900"
                              : "text-gray-600",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:text-indigo-700"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.name.toLowerCase() ===
                                router.route.slice(1, router.route.length) ||
                                (router.route === "/" &&
                                  item.name.toLowerCase() === "home")
                                ? "text-gray-900"
                                : "text-gray-600 group-hover:text-indigo-700",
                              `h-6 w-6 shrink-0 ${
                                item.icon === PaperAirplaneIcon && "rotate-270"
                              }`
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}{" "}
                    <li className="text-gray-400 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                      <Image
                        width={24}
                        height={24}
                        alt="Parachute Image"
                        src={Parachute.src}
                      />
                      <span>Airdrop</span>
                    </li>
                    <li>
                      {/* {data && data?.length > 0 && (
                        <Link
                          href={`/profiles/${data[0].handle}`}
                          className={classNames(
                            router.route.slice(1, router.route.length) ==
                              "profile"
                              ? "text-gray-900 hover:text-gray-900"
                              : "text-gray-600",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:text-indigo-700"
                          )}
                        >
                          {data &&
                          data[0].picture &&
                          "original" in data[0].picture ? (
                            <Image
                              width={24}
                              height={24}
                              alt="Profile Image"
                              src={data[0].picture.original.url}
                              className="rounded-full"
                            />
                          ) : (
                            data && (
                              <Image
                                width={24}
                                height={24}
                                alt="Profile Image"
                                src={`data:image/png;base64,${new Identicon(
                                  data[0].ownedBy,
                                  64
                                ).toString()}`}
                                className="rounded-full"
                              />
                            )
                          )}
                          Profile
                        </Link>
                      )} */}{" "}
                      <Link
                        href={`/profiles/1695481341214.test`}
                        className={classNames(
                          router.route.slice(1, router.route.length) ==
                            "profile"
                            ? "text-gray-900 hover:text-gray-900"
                            : "text-gray-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:text-indigo-700"
                        )}
                      >
                        {" "}
                        <Image
                          width={24}
                          height={24}
                          alt="Profile Image"
                          src={`data:image/png;base64,${new Identicon(
                            "0xF70c1cEa8909563619547128A92dd7CC965F9657",
                            64
                          ).toString()}`}
                          className="rounded-full"
                        />
                        Profile
                      </Link>
                    </li>
                  </ul>
                  <button
                    className="bg-indigo-700 rounded-lg font-medium text-white tracking-wide text-sm w-full py-[9px] mt-[20px]"
                    onClick={() => setModalOpen(true)}
                  >
                    New Post
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <LogoutButton />
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="relative flex flex-1">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 sm:text-sm outline-white"
                  placeholder="Search"
                  type="search"
                  name="search"
                />
              </div>
            </div>
          </div>

          <main className={`${isProfile ? `pb-0"` : "py-10"}`}>
            <div className={isChat ? "px-0" : "px-4 sm:px-6 lg:px-8"}>
              {page}
            </div>
          </main>
        </div>
      </div>
      {modalOpen && data && (
        <PostModal
          getOpenModal={getOpenModal}
          publisher={data[0] as ProfileOwnedByMe}
        />
      )}
    </>
  );
}
