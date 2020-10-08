// SPDX-License-Identifier: MIT
pragma solidity >=0.5.4;
contract CertificateStore {
    event NewCertificate(uint certificateId, string name, string instituteName, uint id);
    struct Certificate {
        string name;
        string instituteName;
        uint id;
    }
    Certificate[] public certificates;
    function _createCertificate(string memory _name, string memory _instituteName, uint _id) private {
        certificates.push(Certificate(_name, _instituteName, _id));
        uint MainID = certificates.length -1;
        emit NewCertificate(MainID, _name, _instituteName, _id);
    }
    function _generateRandomId(string memory _str) private pure returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand;
    }
    function createRandomCertificate(string memory _name, string memory _instituteName) public {
        uint randID= _generateRandomId(_name);
        _createCertificate(_name, _instituteName, randID);
    }
}