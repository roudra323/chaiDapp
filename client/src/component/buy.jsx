import React from "react";
import { ethers } from "ethers";

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
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={buyChai} className="py-5">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <input
                  type="text"
                  className="form-control"
                  id="message"
                  placeholder="Message"
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Donate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default buy;
