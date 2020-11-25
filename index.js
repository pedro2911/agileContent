const io = require('console-read-write');

a = [];
const AdjacentMaxDistance = (array, position, stop, initValue, inverse) =>{
    if((position < array.length - 1 && position >= 0) || stop===position) {
        if(stop!==position) {
            if(array[position]>array[position+1]) {
                return AdjacentMaxDistance(array, position+1,stop, initValue === undefined ? array[position] : initValue);
            } else {
                if(array[position]<array[position+1]) {
                    return AdjacentMaxDistance(array, position+1,stop, initValue === undefined ? array[position] : initValue, true);
                } else {
                    return {
                        res: false,
                        init: initValue,
                        value: undefined,
                        inverse: true,
                        maxDist: -2
                    };
                }
            }
        } else {
            return {
                res: true,
                init: initValue,
                finish: array[position],
                maxDist:  Math.abs(initValue - array[position])
            } 
        }
    } else {
        return {
            res: undefined,
            init: initValue,
            value: undefined,
            abs: undefined
        };
    }
}


const init = async () => {
    let n = 0;
    while (n<=0 || n>40000) {
        io.write('Write the length of array');
        n = parseInt(await io.read());
        if(n==0) {
            console.log('The array can not be empty');
            return;
        }
        if(n<1 || n>40000) {
            console.log('The array must have between 1 and 40.000 elements');
            return;
        }
    }
    let i=0;
    while (i < n) {
        io.write('Write the '+ (i++) +' of array');
        a.push(parseInt(await io.read()));
    }
    error = false;
    let message;
    a.forEach(element => {
        if(element>Math.pow(2,31)-1){
            message='The maximum value allowed for an array element is '+ (Math.pow(2,31)-1).toString();
            error = true;
            return;
        }
        if(element<Math.pow(2,31)*(-1)){
            message='The minimum value allowed for an array element is '+ (Math.pow(2,31)*(-1)).toString();
            error = true;
            return;
        }
    });
    if(error) {
        console.log(message);
        return;
    }
    let p=-1;
    let tryAgain = true;
    while (tryAgain) {
        while (p<0 || p>=a.length-1) {
            io.write('Write a number for start between 0 and ' + (a.length - 2));
            p = parseInt(await io.read());
        }
        let q=p;
        while (q<=p || q>=a.length) {
            io.write('Write a number to end between ' + (p+1) +' and ' + (a.length - 1));
            q = parseInt(await io.read());
        }
        if( 0<=p && p <= q && q <= a.length-1) {
            console.log(AdjacentMaxDistance(a,p,q))
        } else {
            console.log('One or more of the entered values ​​do not meet the rule 0 ≤ P < Q < N,')
        }
        io.write('Would you like to continue? Y/N');
        tryAgain = (await io.read()).toLowerCase() === 'y' ? true : false;
        if(tryAgain) {
            p=-1;
        }
    }
    io.write('Bye!!');
}

init();