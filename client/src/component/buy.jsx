import React from "react";

const buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    console.log(name, message, contract);

    const value = { value: ethers.utils.parseEther("0.001") };

    const transaction = await contract.buyChai(name, message, value);
    await transaction.wait();

    console.log("Transaction complete!");
  };

  return (
    <>
      <form onSubmit={buyChai}>
        <label>Name</label>
        <input type="text" id="name" placeholder="Enter your name" />
        <label>Message</label>
        <input type="text" id="message" placeholder="Enter your message" />
        <button type="submit">Pay</button>
      </form>
    </>
  );
};

export default buy;
