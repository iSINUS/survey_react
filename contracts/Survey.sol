
pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/lifecycle/Destructible.sol';

contract Survey is Destructible {
	mapping (bytes32 => mapping (bytes32 => uint)) public votes;
	string private activeSurvey;

	function Survey() public {
	}

	function setSurvey(string _survey) onlyOwner public {
		activeSurvey = _survey;
	}

	function getSurvey() public view returns (string) {
		return activeSurvey;
	}

	function vote(bytes32 _question, bytes32 _answer) public {
		votes[_question][_answer] += 1;
	}
}
