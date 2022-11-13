import { Alert, Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import Todo from "./Todo";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask is not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("connected to chain ", chainId);

      const goerliChainId = "0x5";
      if (chainId !== goerliChainId) {
        setIsCorrectNetwork(false);
        alert("You are not connected with Goerli Chain");
        return;
      } else {
        setIsCorrectNetwork(true);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found account ", accounts[0]);
      setIsLoggedIn(true);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();
    console.log("connecting.....");
  }, []);

  return (
    <Row style={{ margin: "10px" }} justify="center">
      {isLoggedIn ? (
        isCorrectNetwork ? (
          <Todo />
        ) : (
          <Alert
            message="Error"
            description="Wrong Network"
            type="error"
            showIcon
          />
        )
      ) : (
        <Col span={16}>
          <Button onClick={connectWallet} size="large">
            Connect Wallet
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default App;
