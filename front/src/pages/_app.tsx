// Next
import type { AppProps } from "next/app";
// Wagmi
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
// Lens
import { LensConfig, development, production } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { LensProvider } from "@lens-protocol/react-web";

import "@/styles/globals.css";

const { publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, polygon],
  [
    alchemyProvider({ apiKey: "W3KL2eIuNlBq7LjjLpKIcFWB4xfybMbd" }),
    publicProvider(),
  ]
);

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
};

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new InjectedConnector({
      options: {
        shimDisconnect: false,
      },
    }),
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <LensProvider config={lensConfig}>
        <Component {...pageProps} />
      </LensProvider>
    </WagmiConfig>
  );
}
