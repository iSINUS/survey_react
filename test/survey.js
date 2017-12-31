var Survey = artifacts.require("./Survey.sol");

contract('Survey', function(accounts) {
  it("should set active survey", function() {
    var meta;
    var surveyHash ="Qma5pVDQ1tNvhhiWz8h5zMx46KR4SMrPHmyDZ9aCiqBP2n";
   
    return Survey.deployed().then(function(instance) {
      meta = instance;     
      return meta.setSurvey(surveyHash);
    }).then(function() {
      return meta.getSurvey();
    }).then(function(result) {
        assert.equal(result, surveyHash, "Survey was not set");
    });
  });

  it("should vote correctly", function() {
    var meta;
    var votes1;
    var votes2;
    var votes3;

    return Survey.deployed().then(function(instance) {
      meta = instance;     
      return meta.vote("Question 1","Answer 12");
    }).then(function() {
      return meta.vote("Question 1","Answer 12");
    }).then(function() {
      return meta.vote("Question 2","Answer 13");
    }).then(function() {
      return meta.votes("Question 1","Answer 11");
    }).then(function(outVotes) {
      votes1 = outVotes.toNumber();
      return meta.votes("Question 1","Answer 12");
    }).then(function(outVotes) {
      votes2 = outVotes.toNumber();
      return meta.votes("Question 2","Answer 13");
    }).then(function(outVotes) {
        votes3 = outVotes.toNumber();
        assert.equal(votes1, 0, "Vote was not tracked");
        assert.equal(votes2, 2, "Vote was not tracked");
        assert.equal(votes3, 1, "Vote was not tracked");

    });
  });
});
