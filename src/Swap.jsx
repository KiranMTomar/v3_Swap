import { useState, useEffect } from "react";
import { ethers } from "ethers";
import PageButton from "./components/PageButton";
import ConfigModal from "./components/ConfigModal";
import CurrencyField from "./components/CurrencyField";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import BeatLoader from "react-spinners/BeatLoader";
import {
  getWethContract,
  getUniContract,
  getPrice,
  runSwap,
} from "./AlphaRouterService";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
function Swap() {
  const [swapLoading, setSwapLoading] = useState(false);
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [slippageAmount, setSlippageAmount] = useState(0);
  const [deadlineMinutes, setDeadlineMinutes] = useState(10);
  const [showModal, setShowModal] = useState(undefined);
  const [inputAmount, setInputAmount] = useState(undefined);
  const [outputAmount, setOutputAmount] = useState(undefined);
  const [transaction, setTransaction] = useState(undefined);
  const [loading, setLoading] = useState(undefined);
  const [ratio, setRatio] = useState(undefined);
  const [wethContract, setWethContract] = useState(undefined);
  const [uniContract, setUniContract] = useState(undefined);
  const [wethAmount, setWethAmount] = useState(undefined);
  const [uniAmount, setUniAmount] = useState(undefined);
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();
  const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied
  const EpiSAP_address = "0x911E641E0e576F358b8b62578E8d7ce48979d173";

  // const copiedSuccess = () => {
  //   navigator.clipboard.writeText(EpiSAP_address);
  //   toast.success("Copied Successfully", {
  //     toastId: "1",
  //   });
  // };

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
  };
  useEffect(() => {
    const onLoad = async () => {
      if (isConnected) {
        const provider = await new ethers.providers.Web3Provider(
          walletProvider
        );
        setProvider(provider);
        const signer = await provider.getSigner();
        setSigner(signer);

        const wethContract = getWethContract();

        const tx = await wethContract.balanceOf(address);
        setWethAmount(Number(ethers.utils.formatEther(tx)));
        const uniContract = getUniContract();
        const tx1 = await uniContract.balanceOf(address);
        setUniAmount(Number(ethers.utils.formatEther(tx1)));

        setWethContract(wethContract);

        setUniContract(uniContract);
      }
    };
    onLoad();
  }, [isConnected, address]);

  const getSwapPrice = (inputAmount) => {
    if (inputAmount === undefined || inputAmount == 0) {
      setTransaction("0x");
      setOutputAmount(0);
      return;
    }
    setLoading(true);

    setInputAmount(inputAmount);

    const swap = getPrice(
      inputAmount,
      slippageAmount,
      Math.floor(Date.now() / 1000 + deadlineMinutes * 60),
      signerAddress
    ).then((data) => {
      setTransaction(data[0]);
      setOutputAmount(data[1]);
      setRatio(data[2]);
      setLoading(false);
    });
  };
  const handleSwap = async () => {
    setSwapLoading(true);
    try {
      const tx = await runSwap(transaction, signer, inputAmount);
      await tx.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setSwapLoading(false);
      window.location.reload();
    }
  };
  return (
    <div className="App">
      <div className="appNav">
        <div className="rightNav">
          <div className="connectButtonContainer">
            <w3m-button />
          </div>
        </div>
        <div className="buttonContainer buttonContainerTop">
          <PageButton name={"Buy Episap Token"} isBold={true} />
        </div>
        <div>
          Episap Token Address : {EpiSAP_address.slice(0, 6)}...
          {EpiSAP_address.slice(-4)}
          <CopyToClipboard text={EpiSAP_address} onCopy={onCopyText}>
            <FaCopy />
          </CopyToClipboard>
          {copyStatus && <p>Text copied to clipboard!</p>}
        </div>
      </div>
      <div className="appBody">
        <div className="swapContainer">
          <div className="swapHeader">
            <span className="swapText">Buy</span>
            {showModal && (
              <ConfigModal
                onClose={() => setShowModal(false)}
                setDeadlineMinutes={setDeadlineMinutes}
                deadlineMinutes={deadlineMinutes}
                setSlippageAmount={setSlippageAmount}
                slippageAmount={slippageAmount}
              />
            )}
          </div>
          <div className="swapBody">
            <CurrencyField
              field="input"
              tokenName="USDT"
              getSwapPrice={getSwapPrice}
              signer={signer}
              balance={wethAmount}
            />
            <CurrencyField
              field="output"
              tokenName="SAP"
              value={outputAmount}
              signer={signer}
              balance={uniAmount}
              spinner={BeatLoader}
              loading={loading}
            />
          </div>
        </div>
        <div className="ratioContainer">
          {ratio && <>{`1 SAP = ${ratio} USDT`}</>}
        </div>
        <div className="swapButtonContainer">
          {isConnected ? (
            <div onClick={handleSwap} className="swapButton">
              {swapLoading ? <BeatLoader size={8} color={"#fff"} /> : "Swap"}
            </div>
          ) : (
            <div className="swapButton" onClick={() => open()}>
              Connect Wallet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Swap;
