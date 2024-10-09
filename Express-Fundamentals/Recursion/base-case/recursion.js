// NO BASE CASE (would go on forever and stack overflow!)
function countNoBaseCase(n = 1){
    console.log(n);
    countNoBaseCase(n + 1);
    console.log(n);
};
// countNoBaseCase()



// EXPLICIT BASE CASE (most common)
function count(n = 1){
    if (n > 3) return ; // base case 

    console.log(n);
    count(n + 1);
    console.log(n);
};
count()



// HIDDEN BASE CASE 
function hiddenCount(n = 1){
    if (n <= 3){
        console.log(n);
        hiddenCount(n + 1);
    }
}
hiddenCount()



