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

// console.log(productOfNums([1,2,3,4,5]));


// LONGEST WORD 
function longestWord(words){
    if(words.length === 1){
        return words[0];
    }
    const restLongest = longestWord(words.slice(1));
    return words[0].length > restLongest.length ? words[0] : restLongest;
}
// console.log(longestWord(['wolverine', 'hotdog', 'sausages', 'party', 'fraudulent', 'jesslyn']));



// EVERY OTHER CHARACTER
function everyOtherChar(str){
    for(let i = 0 ; i < str.length; i++){
        if (i % 2 === 0){
            console.log(str[i]);
        }
    }
}

// console.log(everyOtherChar('wolverine'));



// IS PALINDROME ?
function isPalindrome(str){
    if (str.length <= 1){   // if the string is empty or has only one character it is a palindrome
        return true;
    }
    if (str[0] !== str[str.length - 1]){    // if the first and last characters are not equal it is not a palindrome
        return false;
    }
    return isPalindrome(str.slice(1, -1));  // if the first and last characters are equal, check if the rest of the string is a palindrome
}

// console.log(isPalindrome('racecar'));
// console.log(isPalindrome('cookie'));



// FIND INDEX
function findIndex(words, word, index = 0){
    if(index === words.length){
        return -1;
    }else{
        return words[index] === word ? index : findIndex(words, word, index + 1);
    }
}

// console.log(findIndex(['fats', 'sodium', 'sugar', 'protein', 'carbs', 'fiber'], 'protein'));



// REVERSE STRING
function reverseString(str){
    if(str.length <= 1){
        return str;
    }
    return reverseString(str.slice(1)) + str[0] ;
}

// console.log(reverseString('wolverine'))



// GATHER STRINGS 
function gatherStrings(obj){
    for ( let key in obj ){
        if(typeof obj[key] === 'string'){
            console.log(obj[key]);
        }
    }
}

// console.log(gatherStrings({wolverine: 100 , hotdog: 3, sausages: 'sausages', party: 'party', jesslyn: 'jesslyn'}));



// BINARY SEARCH 
function binarySearch(arr, target, left = 0 , right = arr.length - 1){
    if (left > right){
        return -1;
    }else{
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target){
            return mid;
        }else{
            if (arr[mid] > target){
                return binarySearch(arr, target, left, mid - 1);
            }else{
                return binarySearch(arr, target, mid + 1, right);
            }
        }
    }
    return -1;
}

// console.log(binarySearch([1,2,3,4,5,6,7,8,9,10], 4));



module.exports = {
    productOfNums,
    longestWord,
    everyOtherChar,
    isPalindrome,
    findIndex,
    reverseString,
    gatherStrings,
    binarySearch
}