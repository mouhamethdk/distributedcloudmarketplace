pragma solidity ^0.8.0;

contract Attestation {
    struct Content {
        string contentHash;
        string contentType;
        string username;
        string fileName;
        uint256 timestamp;
    }

    mapping(string => Content) private contents;

    event ContentAdded(string contentHash, string contentType, string username, string fileName, uint256 timestamp);

    function addContent(string memory contentHash, string memory contentType, string memory username, string memory fileName) public {
        require(bytes(contents[contentHash].contentHash).length == 0, "Content already exists");

        contents[contentHash] = Content(contentHash, contentType, username, fileName, block.timestamp);

        emit ContentAdded(contentHash, contentType, username, fileName, block.timestamp);
    }

    function verifyContent(string memory contentHash, string memory contentType, string memory username, string memory fileName) public view returns (bool) {
        Content memory content = contents[contentHash];
        return (keccak256(abi.encodePacked(content.contentHash)) == keccak256(abi.encodePacked(contentHash)) &&
                keccak256(abi.encodePacked(content.contentType)) == keccak256(abi.encodePacked(contentType)) &&
                keccak256(abi.encodePacked(content.username)) == keccak256(abi.encodePacked(username)) &&
                keccak256(abi.encodePacked(content.fileName)) == keccak256(abi.encodePacked(fileName)));
    }
}