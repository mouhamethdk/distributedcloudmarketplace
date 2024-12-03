// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    struct CartItem {
        string data;
        string application;
    }

    CartItem[] public cartItems;

    event ItemAdded(string data, string application);

    // Ajoute un nouvel élément dans le tableau cartItems
    function addItem(string memory data, string memory application) public {
        require(bytes(data).length > 0, "Data field must not be empty");
        require(bytes(application).length > 0, "Application field must not be empty");

        CartItem memory newItem = CartItem(data, application);
        cartItems.push(newItem);

        emit ItemAdded(data, application);
    }

    // Permet de récupérer la liste complète des éléments du panier (lecture optimisée)
    function getAllItems() public view returns (CartItem[] memory) {
        return cartItems;
    }

    // Compte le nombre total d'éléments dans le panier
    function getItemCount() public view returns (uint256) {
        return cartItems.length;
    }
}