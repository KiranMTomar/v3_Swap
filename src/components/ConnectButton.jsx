import React from 'react'
import PageButton from './../components/PageButton';
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";

const ConnectButton = props => {
  const { isConnected, signerAddress, getSigner, provider } = props
  const displayAddress = `${signerAddress?.substring(0,10)}...`
  

  return (
    <>
      {isConnected ? (
        <div className="buttonContainer">
          <PageButton name={displayAddress} />
        </div>
      ) : (
        <div
          className="btn my-2 connectButton"
          onClick={() => getSigner(provider)}
        >
          <w3m-button />
        </div>
      )}
    </>
  )
}

export default ConnectButton
