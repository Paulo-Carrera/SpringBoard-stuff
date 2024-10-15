// Import the functions you want to test
const {
    productOfNums,
    longestWord,
    reverseString,
    findIndex,
    isPalindrome,
    binarySearch
} = require('./recursion'); 

test('productOfNums works correctly', () => {
    expect(productOfNums([1, 2, 3, 4, 5])).toBe(120);
    expect(productOfNums([2, 4, 6])).toBe(48);
    expect(productOfNums([7])).toBe(7);
    expect(productOfNums([10, 0, 5])).toBe(0);
    expect(productOfNums([-3, 4, 5])).toBe(-60);
});

test('longestWord works correctly', () => {
    expect(longestWord(['wolverine', 'hotdog', 'sausages', 'party', 'jesslyn'])).toBe('wolverine');
    expect(longestWord(['apple', 'banana', 'pear'])).toBe('banana');
    expect(longestWord(['cat', 'dog', 'fish'])).toBe('fish');
    expect(longestWord([''])).toBe('');
    expect(longestWord(['elephant', 'bird', 'caterpillar'])).toBe('caterpillar');
});

test('reverseString works correctly', () => {
    expect(reverseString('wolverine')).toBe('enirevlow');
    expect(reverseString('abcde')).toBe('edcba');
    expect(reverseString('a')).toBe('a');
});

test('findIndex works correctly', () => {
    expect(findIndex(['fats', 'sodium', 'sugar', 'protein', 'carbs', 'fiber'], 'protein')).toBe(3);
    expect(findIndex(['apple', 'banana', 'pear'], 'banana')).toBe(1);
    expect(findIndex(['apple', 'banana', 'pear'], 'orange')).toBe(-1);
    expect(findIndex(['one'], 'one')).toBe(0);
    expect(findIndex([], 'nothing')).toBe(-1);
});

test('isPalindrome works correctly', () => {
    expect(isPalindrome('racecar')).toBe(true);
    expect(isPalindrome('cookie')).toBe(false);
    expect(isPalindrome('madam')).toBe(true);
    expect(isPalindrome('a')).toBe(true);
    expect(isPalindrome('')).toBe(true);
});

test('binarySearch works correctly', () => {
    expect(binarySearch([1, 2, 3, 4, 5], 3)).toBe(2);
    expect(binarySearch([10, 20, 30, 40, 50], 40)).toBe(3);
    expect(binarySearch([5, 10, 15, 20], 25)).toBe(-1);
    expect(binarySearch([1, 3, 5, 7], 7)).toBe(3);
    expect(binarySearch([1], 1)).toBe(0);
});
