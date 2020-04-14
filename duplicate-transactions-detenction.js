/**
 * Calculates the difference in milliseconds and converts to seconds
 * @return {Number} number of seconds of difference 
 */
const calculateTimeDiffInSeconds=(start, end)=>Math.abs(new Date(end).getTime() - new Date(start).getTime()) / 1000;

const isTimeDiffLessThanAMinute=(start, end)=>calculateTimeDiffInSeconds(start, end) < 60;

const sortValues=(a,b)=>b < a ? 1 : (b > a ? -1 : 0);

const isEquals=(tA, tB)=>{
  return (tA.sourceAccount===tB.sourceAccount
         && tA.targetAccount===tB.targetAccount
         && tA.amount===tB.amount
         && tA.category===tB.category)
}

/**
* @private
* Arrow functions can be documented just like normal functions.
* @param {array} sortByKeys - array with object properties to be used for sorting.
* @return {function} innerSort - compares 2 objects based on the sortByKeys 
*/
function _compareValues(sortByKeys) {
  
    const innerSort=(a, b)=> {
       let i = 0, comparison = 0;
      //sort considerin each sort key in defined order (all ascending)
       while(i < sortByKeys.length && comparison === 0) {
            comparison+=sortValues(a[sortByKeys[i] ], b[ sortByKeys[i] ])
            i++;
      }      
      return comparison
    }
    return innerSort
}

/**
* returns list of list of duplicated transactions sorted ascending by date
* @param {array} transactionsList - list of transactions.
* @return {array[][]} multidimensional array (of arrays of transactions)
*/
function findDuplicateTransactions(transactionsList = []){
 //Do not alter global state so copy object. keep function pure!
 const transactions=Array.from(transactionsList)
 
 if(transactions.length==0)
   return []
 
 //the transaction properties used for sorting unequivocally
 const SORTKEYS = ['sourceAccount','targetAccount','amount','category','time']
 
 let all_queues=[[]]
 
 //sort transactions and break them into smaller queues/groups. Add groups to all_queues
 transactions
   .sort(_compareValues(SORTKEYS))
   .forEach((currentTransac, index)=>{ //could optionally use map
   
      //get last queue added
      const lastQueue=all_queues[all_queues.length-1]

      //if it is the first queue, add transaction in this queue
      if(lastQueue.length==0){
         lastQueue.push(currentTransac)
      }
      else{
        
        //if there are queues, get the last element of the last queue added
        const lastAddedTransaction=lastQueue[lastQueue.length-1]
        //if current transaction belongs to this queue based on time difference, then add it
        if(isEquals(lastAddedTransaction, currentTransac) && isTimeDiffLessThanAMinute(lastAddedTransaction.time, currentTransac.time)){
               lastQueue.push(currentTransac)
        }else{
          //else add new queue, initialize the queue with the current transaction
          all_queues[index]=[]
          all_queues[index].push(currentTransac)
        }
      }
})

//filter out duplicates and then sort remaining groups in ascending of time
const result=all_queues
            .filter(q=>q.length>1)
            .sort((a,b)=>
               {
                 // we just need to compare the first of each group
                  return sortValues(a[0].time, b[0].time)
             })
        
return result
}


exports={findDuplicateTransactions}