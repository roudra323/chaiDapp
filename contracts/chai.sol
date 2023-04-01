// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract chai {
    struct Memo {
        string name;
        string message;
        uint timestamp;
        address from;
        uint amount;
    }

    Memo[] memos;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyChai(string memory _name, string memory _message)
        public
        payable
    {
        require(
            msg.value > 0,
            "You can't pay 0 . Try again with the value greater than 0"
        );
        owner.transfer(msg.value);
        memos.push(
            Memo(_name, _message, block.timestamp, msg.sender, msg.value)
        );
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
