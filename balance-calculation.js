/**
 *checks if transactions are between start and  end non-inclusive
 */
const isTransactionInPeriod=(transaction_time,start,end)=>{
    var transc_time=new Date(transaction_time)
    return transc_time>=start&&transc_time<end
};

 /**
 * Sums two numbers and fixes floating point problems (Ex.: 0.1+0.2)
 */
const sumFixFloatingPoint=(a,b)=>parseFloat(parseFloat(a+b).toFixed(2));

/**
   * Calculates the balance of an account from a list of transactions.
   * @param {Array} transactions is the list of transactions required and always valid.
   * @param {String} category filters the transactions to consider
   * @return {Date} start all transactions from this date are considered.
   * @return {Date} end all transactions until this date are considered (non-inclusive).
   */
function getBalanceByCategoryInPeriod (transactionList = [], category, start, end) {
  
  //copy transaction list. keep fucntion pure!
  const transactions=Array.from(transactionList)
  
  if(transactions.length==0) return 0;
  
  //A filter by category
  const belongsToCategory=(transactionCategory)=>transactionCategory.toLowerCase()===category.toLowerCase();
  
  //map transactions conditionally and return amounts; then reduce them to a total sum
  const balance=transactions.
      map(transaction=>{
         if(belongsToCategory(transaction.category)&&isTransactionInPeriod(transaction.time, start, end)){
            return transaction.amount;
          }
          return 0;
      }).
      reduce((accumulator, amount)=>sumFixFloatingPoint(accumulator, amount),0);
 
  return balance;
}


exports={getBalanceByCategoryInPeriod}