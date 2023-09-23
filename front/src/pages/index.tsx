// Lens
import { useActiveWallet } from "@lens-protocol/react-web";
// Components
import Loader from "../components/Loader/Loader";
import Home from "../components/Sections/Home";

export default function HomePage() {
  const { loading } = useActiveWallet();

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Home />
    </div>
  );
}
