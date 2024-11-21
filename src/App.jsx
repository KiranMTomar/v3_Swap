import "./App.css";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import Swap from "./Swap";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const projectId = "2fa6c12dde1b5cd1a88e4fd4cb690bca";

const PolygonMainnet = {
  chainId: 137, 
  name: "polygon mainnet",
  currency: "POL",
  explorerUrl: "https://polygonscan.com/",
  rpcUrl:
    "https://polygon-mainnet.infura.io/v3/18c4cfb92f254417a6607a6182cc33e6",
};

const metadata = {
  name: "Episap Swap",
  description: "Swap for Episap Token",
  url: "https://episap.io/",
  icons: ["https://presale.plutope.io/favicon.ico"],
  redirectTo: "https://episap.io/",
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [PolygonMainnet],
  projectId,
  enableAnalytics: true,
  featuredWalletIds: [
    "91b9a02134bc834b96ebfa333a0bf27ac6372ac56682b5e77bf8577abe0eea78",
  ],
});
function App() {
  

  return (
    <div className="App">
      <Swap />
      <ToastContainer />
    </div>
  );
}

export default App;
