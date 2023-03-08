// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@creds-protocol/contracts/CredsIssuer.sol";

contract TrustifiedCred is CredsIssuer {
    using Counters for Counters.Counter;
    Counters.Counter private _credIds;

    address public owner;

    event CredCreated(address, uint256, uint256, uint256, string);
    event IssueCred(address, uint256, uint256);

    constructor(
        Verifier[] memory _verifiers,
        address _issuer,
        string memory _issuerName,
        string memory _issuerSymbol
    ) CredsIssuer(_verifiers, _issuer, _issuerName, _issuerSymbol) {}

    function issueCred(
        uint256 merkleTreeDepth,
        uint256 zeroValue,
        string memory credURI
    ) public {
        uint256 _credId = _credIds.current();
        _credIds.increment();
        createCred(_credId, merkleTreeDepth, zeroValue, msg.sender, credURI);
        emit CredCreated(
            msg.sender,
            _credId,
            merkleTreeDepth,
            zeroValue,
            credURI
        );
    }

    function claimCredToTrustifiedIssuer(
        uint256 credId,
        uint256 identityCommitment
    ) public {
        addIdentity(credId, identityCommitment);
    }
}
