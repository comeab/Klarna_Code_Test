let assert = require("chai").assert;

describe("isTransactionInPeriod()", function() {
    it("check if time is included period specified", function() {
    assert.equal(
      isTransactionInPeriod(
        new Date("2018-02-12T12:34:00Z"),
        new Date("2018-02-12T12:34:00Z"),
        new Date("2018-03-01T12:34:00Z")
      ),
      true
    );
  });
  
     it("check if time is excluded period specified", function() {
    assert.equal(
      isTransactionInPeriod(
        new Date("2018-02-20T12:34:00Z"),
        new Date("2018-02-12T12:34:00Z"),
        new Date("2018-02-20T12:34:00Z")
      ),
      false
    );
  });
})
describe("sumFixFloatingPoint()", function() {
    it("check if sum works with 0.1+0.3=0.30000000000000004", function() {
    assert.equal(0.1+0.2, 0.30000000000000004)
    assert.equal(
      sumFixFloatingPoint(
         0.1, 0.2
      ),
      0.3
    );
    })
  it("check if sum works with 2.3+2.4=4.699999999999999", function() {
    assert.equal(2.3+2.4, 4.699999999999999)
    assert.equal(
      sumFixFloatingPoint(
         2.3, 2.4
      ),
      4.7
    );
  })
})
describe("getBalanceByCategoryInPeriod()", function() {
  let trans=[
         {
           id: 123,
           sourceAccount: 'my_account',
           targetAccount: 'coffee_shop',
           amount: -0.3,
           category: 'eating_out',
           time: '2018-02-12T12:34:00Z'
         },
         {
           id: 123,
           sourceAccount: 'my_account',
           targetAccount: 'coffee_shop',
           amount: 0.1,
           category: 'eating_out',
           time: '2018-03-12T12:34:00Z'
         },
         {
           id: 123,
           sourceAccount: 'my_account',
           targetAccount: 'coffee_shop',
           amount: 0.2,
           category: 'eating_out',
           time: '2018-03-15T12:34:00Z'
         },
         {
           id: 123,
           sourceAccount: 'my_account',
           targetAccount: 'coffee_shop',
           amount: -0.1,
           category: 'groceries',
           time: '2018-03-12T12:34:00Z'
         },
         {
           id: 123,
           sourceAccount: 'my_account',
           targetAccount: 'coffee_shop',
           amount: -0.3,
           category: 'groceries',
           time: '2018-03-15T12:35:00Z'
      }
 ]
  it("returns 0 if there are no transactions", function() {
    assert.equal(
      getBalanceByCategoryInPeriod(
        [],
        "groceries",
        new Date("2018-03-01"),
        new Date("2018-03-15")
      ),
      0
    );
  });
    it("returns a balance correctly based on category and period", function() {
    assert.equal(
      getBalanceByCategoryInPeriod(
        trans,
        "groceries",
        new Date("2018-03-01"),
        new Date("2018-03-15 12:35")
      ),
      -0.1
    );
    })
  it("returns a balance correctly with floating point precision values", function() {
    assert.equal(
      getBalanceByCategoryInPeriod(
        trans,
        "eating_out",
        new Date("2018-03-01"),
        new Date("2018-03-15 12:35")
      ),
      0.3
    );
  });
  
   it("excludes transactions on end date and includes on start", function() {
    assert.equal(
      getBalanceByCategoryInPeriod(
        trans,
        "eating_out",
        new Date("2018-03-12T12:34:00Z"),
        new Date("2018-03-15 12:34")
      ),
      0.1
    );
  });
});