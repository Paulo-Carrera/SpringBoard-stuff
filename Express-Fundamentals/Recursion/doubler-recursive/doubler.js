function doubler(nums){
    for(let n of nums){         // loop through nums array ...
        if(Array.isArray(n)){   // if n is an array ...
            doubler(n);         // call doubler on n array ...
        }else{                  // otherwise ...
            console.log(n*2);   // print n * 2 .
        }
    }
}

doubler([1,2,3,[4,5,6]]);


// for some input array, double every number, but if you encounter 
// an array, call doubler on that array before continuing. ect ...