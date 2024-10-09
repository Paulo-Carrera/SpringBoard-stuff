// PRODUCT OF NUMS
function productOfNums(nums){
    for (let i = 0 ; i < nums.length; i++){
        if (nums.length === 1){
            return nums[0];
        }else{
            return nums[i] * productOfNums(nums.slice(1));
        }
    }
}

console.log(productOfNums([1,2,3,4,5]));


// LONGEST WORD 
