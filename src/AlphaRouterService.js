import { AlphaRouter } from "@uniswap/smart-order-router";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";
import { ethers, BigNumber } from "ethers";
import JSBI from "jsbi";
import ERC20ABI from "./abi.json";
import { toast } from "react-toastify";
const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
const REACT_APP_INFURA_URL_TESTNET =
  "https://polygon-mainnet.infura.io/v3/18c4cfb92f254417a6607a6182cc33e6";

const chainId = 137;

const web3Provider = new ethers.providers.JsonRpcProvider(
  REACT_APP_INFURA_URL_TESTNET
);
const router = new AlphaRouter({ chainId: chainId, provider: web3Provider });

const name0 = "Tether USD";
const symbol0 = "USDT";
const decimals0 = 6;
const address0 = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

const name1 = "Episap";
const symbol1 = "SAP";
const decimals1 = 18;
const address1 = "0x911E641E0e576F358b8b62578E8d7ce48979d173";

const WETH = new Token(chainId, address0, decimals0, symbol0, name0);
const UNI = new Token(chainId, address1, decimals1, symbol1, name1);

export const getWethContract = () =>
  new ethers.Contract(address0, ERC20ABI, web3Provider);
export const getUniContract = () =>
  new ethers.Contract(address1, ERC20ABI, web3Provider);

export const getPrice = async (
  inputAmount,
  slippageAmount,
  deadline,
  walletAddress
) => {
  const percentSlippage = new Percent(slippageAmount, 100);
  const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals0);
  const currencyAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(wei));
  const route = await router.route(currencyAmount, UNI, TradeType.EXACT_INPUT, {
    recipient: walletAddress,
    slippageTolerance: percentSlippage,
    deadline: deadline,
  });
  const transaction = {
    data: route.methodParameters.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: BigNumber.from(route.methodParameters.value),
    from: walletAddress,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.utils.hexlify(1000000),
  };
  const quoteAmountOut = route.quote.toFixed(6);
  console.log("quoteAmountOut", quoteAmountOut);
  const ratio = (inputAmount / quoteAmountOut).toFixed(8);
  console.log(ratio);
  return [transaction, quoteAmountOut, ratio];
};

export const runSwap = async (transaction, signer, inputAmount) => {
  try {
    const approvalAmount = ethers.utils.parseUnits(inputAmount, 6).toString();
    const contract0 = getWethContract();
    const t = await contract0
      .connect(signer)
      .approve(V3_SWAP_ROUTER_ADDRESS, approvalAmount);

    await t.wait();
    await signer.sendTransaction(transaction);
    toast.success("Swap successful");
  } catch (error) {
    toast.error("Swap failed" + error.message);
    console.log(error);
  }
};
