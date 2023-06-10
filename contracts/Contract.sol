// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Medical {
    mapping(address => bool) private admin;
    mapping(address => bool) private doctor;
    mapping(address => bool) private patient;

    mapping(address => string) private patientInfo;
    mapping(address => string) private drInfo; //dr info IPFS
    mapping(address => string[]) private patientRecords;

    mapping(address => mapping(address => bool)) private access;

    address[] private Dr_ids;
    address[] private Pateint_ids;

    //  address public creator;

    constructor() {
        admin[msg.sender] = true;
        //    creator = msg.sender;
    }

    //get Admin

    function isAdmin() public view returns (bool) {
        return admin[msg.sender];
    }

    function isDoctor() public view returns (bool) {
        return doctor[msg.sender];
    }

    function isPatient() public view returns (bool) {
        return patient[msg.sender];
    }

    //Add Doctor

    function addDoctor(
        address _newDr,
        string memory _docInfoHash
    ) public onlyAdmin {
        require(
            !doctor[_newDr] && !patient[_newDr] && !admin[_newDr],
            "address already has a role"
        );
        doctor[_newDr] = true;
        drInfo[_newDr] = _docInfoHash;
        Dr_ids.push(_newDr);
    }

    function removeDoctor(address _newDr) public onlyAdmin {
        doctor[_newDr] = false;
    }

    //modified
    function doctorList() public view returns (string[] memory) {
        string[] memory list = new string[](Dr_ids.length);
        uint c = 0;
        for (uint8 i = 0; i < Dr_ids.length; i++) {
            if (doctor[Dr_ids[i]] == true) {
                list[c++] = drInfo[Dr_ids[i]];
            }
        }
        return list;
    }

    //  Add patient

    function givePermission(address _newDoctor) external onlyPatient {
        access[msg.sender][_newDoctor] = true;
    }

    function removePermission(address _newDoctor) external onlyPatient {
        access[msg.sender][_newDoctor] = false;
    }

    //new
    // check Permission
    //FIX
    //// sender always patient
    function checkPermission(address _drId) public view returns (bool) {
        return access[msg.sender][_drId];
    }

    // Add patient Information to BlockChain

    function addPatInfo(string memory _patInfoHash) public {
        require(
            !doctor[msg.sender] && !patient[msg.sender] && !admin[msg.sender],
            "address already has a role"
        );
        patientInfo[msg.sender] = _patInfoHash;
        patient[msg.sender] = true;
        Pateint_ids.push(msg.sender);
    }

    function getPatientinfo(address _id) public view returns (string memory) {
        return patientInfo[_id];
    }

    function getPatientList() public view returns (address[] memory) {
        return Pateint_ids;
    }

    // Add Medical record to block chain

    function addMedRecord(string memory _recHash, address _pat_id) public {
        require(patient[msg.sender] == true, "Only pateints add records");

        patientRecords[_pat_id].push(_recHash);
    }

    function deleteRecord(string memory _recHash) public {
        string[] memory records = patientRecords[msg.sender];
        string[] memory tempArr;
        uint256 j = 0;
        for (uint256 i = 0; i < records.length; i++) {
            if (
                keccak256(abi.encodePacked((records[i]))) !=
                keccak256(abi.encodePacked((_recHash)))
            ) {
                tempArr[j] = records[i];
                j++;
            }
        }
        patientRecords[msg.sender] = tempArr;
    }

    // View Medical record return IPFS hash of record

    function viewMedRec() public view returns (string[] memory) {
        require(patient[msg.sender] == true, "only Pateints can view record");
        return (patientRecords[msg.sender]);
    }

    function viewMedRecOfPatient(
        address _pat_id
    ) public view returns (string[] memory) {
        require(
            access[_pat_id][msg.sender] == true,
            "Only allowed Doctor Can Do That"
        );
        return (patientRecords[_pat_id]);
    }

    /*
    Modifiers
*/

    modifier onlyAdmin() {
        require(admin[msg.sender] == true, "Only Admin Can Do That");
        _;
    }
    modifier onlyDoctor() {
        require(doctor[msg.sender] == true, "Only Doctor Can Do That");
        _;
    }
    modifier onlyPatient() {
        require(patient[msg.sender] == true, "Only Patient Can Do That");
        _;
    }

    //  modifier onlyCreator(){
    //    require(creator == msg.sender, "Only Patient Can Do That");
    //    _;
    //  }

    modifier onlyAccessedId(address _person) {
        require(
            access[msg.sender][_person] == true,
            "Only accessed persons Can Do That"
        );
        _;
    }
}
