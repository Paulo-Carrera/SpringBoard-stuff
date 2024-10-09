nums = [ 5, 6, 7, [8, 9, [10, 11, 12]]];

function doubler(nums){
    stack = nums.reverse();

    while(stack.length > 0){    // while the stack is not empty :
        console.log(stack);
        let n = stack.pop();    // pop the last item.
        if (Array.isArray(n)){  // if it is an array,
            for(let inner of n.reverse()){  // reverse it, 
                stack.push(inner);  // and push it back to the stack.
            }
        }else {
            console.log(n * 2); // otherwise just print it doubled.
        }
    }
}


doubler(nums);