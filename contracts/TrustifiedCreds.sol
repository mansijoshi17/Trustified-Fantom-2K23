// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./TrustifiedCred.sol";
import "@creds-protocol/contracts/interfaces/ICredential.sol";


contract TrustifiedCreds is ICredential {
    mapping(address => address[]) private credIssuers;

    event createIssuer(address, address);

    function createCredIssuer(
        Verifier[] memory _verifiers,
        address _issuer,
        string memory _issuerName,
        string memory _issuerSymbol
    ) public {
        address _address = address(
            new TrustifiedCred(_verifiers, _issuer, _issuerName, _issuerSymbol)
        ); 

        credIssuers[msg.sender].push(_address);
        emit createIssuer(msg.sender, _address);
    }
}
