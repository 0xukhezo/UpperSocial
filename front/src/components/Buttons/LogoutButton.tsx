// Lens
import { useWalletLogout } from "@lens-protocol/react-web";

export default function LogoutButton() {
  const { execute: logout, isPending } = useWalletLogout();

  return (
    <button
      disabled={isPending}
      onClick={logout}
      className=" font-medium text-gray-500 tracking-wide text-sm py-[9px] mt-[20px] w-1/3 ml-8 mb-[15px]"
    >
      Log out
    </button>
  );
}
