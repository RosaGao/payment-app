const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  // validate expiration data
  // getElementById returns an object, so data is its value
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;
  console.log(month, year);
  if (month < 1 || month > 12 || year < 1000 || year > 9999){
    window.alert("Invalid Month and/or Year!");
    return; 
  }
  if (new Date() > new Date(year, month)) {
    window.alert("Your card is expired!");
    return;
  }

  //validate the card
  const cvv = document.getElementById("cvv").value;
  // ^ must be the beginning, $ must be the end
  // must not have spaces between 3,4
  let pattern = /^[0-9]{3,4}$/;
  if (!pattern.test(cvv)) {
    window.alert("Invalid CVV. It must be 3 or 4 digits!");
    return;
  }

  //validate card number
  const cnumber = document.getElementById("cnumber").value;
  let cpattern = /^[0-9]{13,16}$/;
  if ( !cpattern.test(cnumber) || !isValid(cnumber)){
    window.alert("Invalid card number!");
    return;
  }

  window.alert("Thanks for the payment!");

}


function isValid(cnumber) {
    // cnumber inputted as string
    let arr = cnumber
        .split('')
        .reverse()
        .map(ch => parseInt(ch));
    // which is a combination of the flollowing functions:
        // let arr = cnumber.split('');
        // arr = arr.reverse();
        // arr = arr.map(ch => parseInt(ch));
    // functions all return a new array
    // map is a higher order function, as it takes function as parameter

    const sum = arr.reduce( (prev, cur, curIndex) => {
        // cannot use for loop--one element is passed each time
        // so can only look at index of that element and the total
        // result from previous caculations

        curIndex += 1;
        let result = cur;
        if(curIndex %2 ===0){
            result *= 2;
            if(result > 9) result -= 9;
        }
        return prev + result;
    }, 0);

    return sum % 10 === 0;

}


/* reduce function:
    arr.reduce() reduces all array elements to a single value and returns

    arr = [1, 3, 4, 2, 5];
    arr.reduce( (accumulator, currentValue) => {
        accumulator + currentValue;
    }, 0 );
        // the first argument (arrow function) is called a "reducer":
            a function used to reduce the array into a single value

        // para1: a reducer callback function to be performed on each element
                pass the caculation on a preceeding element to the next caculation
           para2: initial value to be passed to first element in the array


    let arr = [[0, 1], [2, 3], [4, 5]];
    let flattened = arr.reduce( (preState, curState) => {
        return preState.concat(curState);
    }, []);
            // [] is the initial array to be concatenated by [0, 1]
            // flattened = [0, 1, 2, 3, 4, 5]


    let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']
    let countedNames = names.reduce( (allNames, name) => {
        if(name in allNames) {
            allNames[name] += 1;
        }
        else{
            allNames[name] = 0;
        }
    }, {});
            // allNames is a name-to-count dictionary, initial state = {}


    let people = [
    { name: 'Alice', age: 21 },
    { name: 'Max', age: 20 },
    { name: 'Jane', age: 20 }
    ];

    const reducer = (prevState, curVal) => {
        if( curVal.age in prevState) {
            prevState[curVal.age].push(curVal);
        }
        else {
            prevState[curVal.age] = [curVal];
        }
        return prevState;
            // return the updated prevState!!! 
    }

    const sortByAge = people.reduce( reducer, {});
            // reducer is a function, auto assign it parameters

    
*/
