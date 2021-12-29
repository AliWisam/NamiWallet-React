/** @format */

import React from "react";
import Loader from "./loader";
const Nami = () => {
  const [connected, setConnected] = React.useState("");

  const addressToBech32 = async () => {
    await Loader.load();
    const address = (await window.cardano.enable())[0];
    return Loader.Cardano.Address.from_bytes(
      Buffer.from(address, "hex")
    ).to_bech32();
  };

  React.useEffect(() => {
    (async () => {
      console.log("addresss======", await window?.cardano?.enable());
      console.log("addresss======", await window?.cardano?.getChangeAddress());

      window.cardano.onAccountChange(async () => {
        const address = await addressToBech32();
        setConnected(address);
        //   setFlag(true);
      });
    })();
  }, [connected]);

  const checkConnection = async () => {
    // console.log("object");
    if (window.cardano && (await window.cardano.isEnabled())) {
      //   console.log("object1");
      const session = localStorage.getItem("session");
      if (Date.now() - parseInt(session) < 6000000) {
        //1h
        const address = await addressToBech32();
        setConnected(address);
      }
    }
  };
  React.useEffect(() => {
    checkConnection();
  }, []);
  //   console.log(connected);
  return (
    <div>
      ss
      <p>{connected}</p>
    </div>
  );
};

export default Nami;
