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
      <table className="table table-striped">
        <thead>
          <tr>
            <th align="center">Index</th>
            <th align="center">Name</th>
            <th align="center">Message</th>
            <th align="center">From</th>
            <th align="center">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {memos.map((memo, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{memo.name}</td>
              <td>{memo.message}</td>
              <td>{memo.from}</td>
              <td>
                {new Date(memo.timestamp.toNumber() * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default memos;
