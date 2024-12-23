// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CartContract {
    struct CartItem {
        string itemId;
        string itemType;
        string username;
        string filename;
        string content;
        string os;
        string cpu;
        string gpu;
        string ram;
        string storageCapacity; // Renommé pour éviter le conflit avec le mot réservé
    }

    struct UserCart {
        string username;
        CartItem[] cart;
    }

    mapping(address => UserCart) public userCarts;

    event CartUpdated(address indexed user, string username, CartItem[] cart);

    function addItemToCart(
        string memory _username,
        string memory _itemId,
        string memory _itemType,
        string memory _filename,
        string memory _content,
        string memory _os,
        string memory _cpu,
        string memory _gpu,
        string memory _ram,
        string memory _storageCapacity
    ) public {
        CartItem memory newItem = CartItem({
            itemId: _itemId,
            itemType: _itemType,
            username: _username,
            filename: _filename,
            content: _content,
            os: _os,
            cpu: _cpu,
            gpu: _gpu,
            ram: _ram,
            storageCapacity: _storageCapacity
        });

        userCarts[msg.sender].username = _username;
        userCarts[msg.sender].cart.push(newItem);

        emit CartUpdated(msg.sender, _username, userCarts[msg.sender].cart);
    }

    function getCart(address _user) public view returns (UserCart memory) {
        return userCarts[_user];
    }
}
