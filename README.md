# Klarna_Code_Test
Transaction processing. This code assignment is part of an interview assignment for Klarna - klarna.com.

1 - Assignment One
Calculate the balance of an account based on category and dates. 

# Steps
1. Map all transactions and only return amounts of those that match category and period (non-inclusive). 
2. Reduce the amounts to a total by acumulating. Make sure, floating point does not create unexpected results.

# Things to check:
* Calculating the balance 
Avoiding Number  floating point
Should i assume the amount will always be an integer? Probably not. Therefore we could run into the 0.1+0.2=0.300000000004 problem. So applied one of the 2 typical solutions to bypass this problem. 1- multiply and divide by 10^n or use toFixed[digits].
Otherwise, just acumulate and go

# Coding Style and Conventions
I am following the Google JavaScript Style Guide from https://google.github.io/styleguide/jsguide.html


2. Assignment Two 
Identify duplicates from transaction list. All transactions by the same source account to the same destiny account, category, and amount with a time difference of less than 1 minute should be identified and grouped.

# Logic of the algorithm

**Sort all transactions in the array by all filtering criterias**. The transactions are sorted in a way that are already grouped properly. I just need to find the points to break them into smaller groups/queues.
In this case, it is a big queue of transactions and i just need  break the big queue into smaller queues. i sort of, tell each transaction which queue to be in by  following the last in line or creating a new queue.

# How it works:
1. Pick the first transaction and add it to a brand new queue

2. For every next transaction, check if it belongs to the last created queue. Since all transactions are sorted, every next transaction can either belong to the last queue/group or to a brand new queue/group.

3. A transaction belongs to an existing queue if is equal to last transaction in that queue and its time difference is less than a minute. A transaction is added to a brand new queue if it is not equal or its time difference is higher or equal than a minute. 

4. Finally, sort the queues among themselves and filter out the groups with only one transactions (they are not duplicates)


# Testing
* Testing the sorting method
This code was written in a platform named Qualified and offered limited Editor capabilities. So for instance, the test data could not be separated in a different file (say a JSON file).
The sorting method (_compareValues) is at the core of the algorithm and therefore needs to be unit-tested. Any failure in the sorting of the transactions then the results will fail. Transactions are pre-grouped by the sorting algorithm.

* Edge case
I have added a case of consecutive transactions with the same time, category, target and source but different amounts in an alternative order in the original transactionList. This case checks if the algorithm sorting mechanism is in fact sorting taking into account all criterias. 

* Other Unit tests
I have chosen to isolate the methods *calculateTimeDiffInSeconds()* and *isTimeDiffLessThanAMinute()* and *sortValues()* so that i could write tests for each of them. They are used to make sure transactions are queued properly. If any of them fails, then the main algorithm will fail too

# Coding Style and Conventions
I am following the Google JavaScript Style Guide from https://google.github.io/styleguide/jsguide.html

