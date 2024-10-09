function sum(nums){
    // base case
    if(nums.length === 0) return 0 ;

    // normal case
    return nums[0] + sum(nums.slice(1));
}

sum([3,4,5]);



// sum([3,4,5])
//      3 + sum([4,5])
//              4 + sum([5])
//                      5 + sum([])
//                          0






// CHATGPT EXPLANATION :

// Recursive Process:
// First call: sum([3,4,5])

// The base case is not met (array is not empty), so it proceeds to:
// return 3 + sum([4,5])
// Second call: sum([4,5])

// Again, the array is not empty, so it proceeds to:
// return 4 + sum([5])
// Third call: sum([5])

// Still not empty, so:
// return 5 + sum([])
// Fourth call: sum([])

// Now the array is empty, triggering the base case and returning 0.
// Final Calculation:
// The recursive calls then resolve as follows:
// sum([5]) returns 5 + 0 = 5
// sum([4,5]) returns 4 + 5 = 9
// sum([3,4,5]) returns 3 + 9 = 12
// Thus, the function returns 12, which is the sum of [3, 4, 5].