import { useState, useEffect } from "react";

const memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const getMemos = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && getMemos();
  }, [contract]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <>
      <h1 align="center">Memos</h1>
      {memos.map((memo, index) => (
        <div align="center" key={index}>
          <p>Index: {index}</p>
          <p>Name: {memo.name}</p>
          <p>Message: {memo.message}</p>
          <p>From: {memo.from}</p>
          <p>Timestamp: {formatDate(memo.timestamp)}</p>
          <hr />
        </div>
      ))}
      ;
    </>
  );
};

export default memos;
