// function count(){
//     let n = 1;

//     while(n <= 3){
//         console.log(n);
//         n += 1;
//     }
// }

// count();




function count(n = 1){
    if (n > 3) return;  // if n < 3, return and add 1 to n 
                        // if n > 3, return and stop function
    console.log(n);  // console.log(n) 
    count(n + 1);   // add 1 to n and recall function "count"
    console.log(n); // add console.log for the same n + 1
}

count();







// paulo@ThisPC22:~/SpringBoard/Express-Fundamentals/Recursion/counting-recursively$ node recursion.js
// 1
// 2
// 3
// paulo@ThisPC22:~/SpringBoard/Express-Fundamentals/Recursion/counting-recursively$ node recursion.js
// 1
// 2
// 3
// 3
// 2
// 1
// paulo@ThisPC22:~/SpringBoard/Express-Fundamentals/Recursion/counting-recursively$