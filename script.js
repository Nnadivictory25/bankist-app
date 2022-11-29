'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



const displayMovements = (movements, sort = false) => {
  containerMovements.innerHTML = ''

  const movs = sort ? movements.slice().sort((a, b) => a - b).reverse() : movements
    
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}€</div>
   </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)
  });
}


const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((accumulator, curr) => accumulator + curr, 0)
  
  labelBalance.textContent = `${acc.balance}€`
}

const calcDisplaySummary = (acc) => {
  const incomes = acc.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomes}€`

  const out = acc.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = `${Math.abs(out)}€`

  const interest = acc.movements.filter((mov) => mov > 0).map(deposit => deposit * acc.interestRate / 100).filter((interest, i, arr) => {
    return interest >= 1;
  }).reduce((acc, interest) => acc + interest, 0)
  labelSumInterest.textContent = `${interest}€`
}

const createUsernames = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner.toLowerCase().split(' ').map((name) => name[0]).join('')
  })
}
createUsernames(accounts)

const updateUI = (acc) => {
      // Display movements
      displayMovements(acc.movements)

      // Display balance
      calcDisplayBalance(acc)
  
      // Display summary
      calcDisplaySummary(acc)
}

// event handlers
let currentAccount

btnLogin.addEventListener('click', (e) => {
  e.preventDefault()

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 1

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''

    updateUI(currentAccount)
  }
})


btnTransfer.addEventListener('click', (e) => {
  e.preventDefault()

  const amount = Number(inputTransferAmount.value)
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
  
  inputTransferAmount.value = inputTransferTo.value = ''

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // doing the transfer
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)

    // update UI
    updateUI(currentAccount)
  }
})

btnLoan.addEventListener('click', (e) => {
  e.preventDefault()

  const amount = Number(inputLoanAmount.value)

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount)

    //Update UI
    updateUI(currentAccount)
  }
  inputLoanAmount.value = ''
})


btnClose.addEventListener('click', (e) => {
  e.preventDefault()

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)

    // delete account
    accounts.splice(index, 1)

    // hide ui
    containerApp.style.opacity = 0
  }

  inputCloseUsername.value = inputClosePin.value = ''
})

// Sort
let sorted = false
btnSort.addEventListener('click', (e) => {
  e.preventDefault()

  sorted = !sorted
  displayMovements(currentAccount.movements, sorted)
})










// flat method
const overallBalance = accounts.map(acc => acc.movements).flat().reduce((acc, curr) => acc + curr, 0)
// console.log(overallBalance);

//flat map method
const overallBalance2 = accounts.flatMap(acc => acc.movements).reduce((acc, curr) => acc + curr, 0)
//  Flat Map method maps through an array and performs the flat method on the result
// console.log(overallBalance2);














const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//Getting maximum value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc
//   else return mov
// }, movements[0])

// const eurToUsd = 1.1
// const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, curr) => acc + curr, 0)
// console.log(totalDepositsUSD);






/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);


/////////////////////////////////////////////////


// const deposits = movements.filter((mov) => mov > 0)

// const withdrawals = movements.filter((mov) => mov < 0)

// const owners = ['Jonas', 'Zach', 'Adam', 'Martha']
// console.log(owners.sort());


// Ascending Sorting
// movements.sort((a, b) => {
//   if (a > b)
//     return 1
//   if (b > a)
//     return -1
// })
movements.sort((a, b) => a -b)


// Descending
// movements.sort((a, b) => {
//   if (a > b)
//     return -1
//   if (b > a)
//     return 1
// })
movements.sort((a, b) => b - a)


// Array.from
labelBalance.addEventListener('click', () => {
  
  const movementsUI = Array.from(document.querySelectorAll('.movements__value')).map(el => Number(el.textContent.replace('€', '')))
  console.log(movementsUI);
})

// Working with nested arrays
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

// console.log(bankDepositSum);

// Number of deposits greater than 1K
// const numDeposits1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length

// OR
const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((count, curr) => curr >= 1000 ? ++count : count, 0)
// console.log(numDeposits1000);


// Reduce superpower
const sums = accounts.flatMap(acc => acc.movements).reduce((sums, currentValue) => {
  // currentValue > 0 ? sums.deposits += currentValue : sums.withdrawals += currentValue
  // OR
  sums[currentValue > 0 ? 'deposits' : 'withdrawals'] += currentValue

  return sums;
}, { deposits: 0, withdrawals: 0 })
// console.log(sums);

// Converting title case string
// eg : this is a nice title case -> This Is a Nice Title

const convertTitleCase = (title) => {

  const capitalize = str => str[0].toUpperCase() + str.slice(1)
  
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with']

  const titleCase = title.toLowerCase().split(' ').map(word => exceptions.includes(word) ? word : capitalize(word)).join(' ')
  return capitalize(titleCase)
}

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));




///////////////////////////////////////
// Coding Challenge #4


// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
// HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
// GOOD LUCK 😀

// 1.

dogs.forEach(dog => {
  dog.recommendedFood = dog.weight ** 0.75 * 28
})

// 2.

const checkSarahDog = () => {
  const sarahDog = dogs.flatMap(dog => dog.owners.includes('Sarah') ? dog : false).filter(obj => obj !== false)[0]
  let withinRange = false

  if (sarahDog.curFood > (sarahDog.recommendedFood * 0.90) && sarahDog.curFood < (sarahDog.recommendedFood * 1.10)) {
    console.log(`Sarah's dog eats okay`);
    withinRange = !withinRange
  }
  else if (!withinRange && sarahDog.curFood > sarahDog.recommendedFood) {
    console.log(`Sarah's dog eats too much`);
  } else if (!withinRange && sarahDog.curFood < sarahDog.recommendedFood) {
    console.log(`Sarah's dog eats too small`);
  }
}
checkSarahDog()

// 3.

let ownersEatTooMuch = []
let ownersEatTooLittle = []

const checkDogOwners = () => {
  let withinRange = false
  
  for (let i = 0; i < dogs.length; i++) {

    if (dogs[i].curFood > (dogs[i].recommendedFood * 0.90) && dogs[i].curFood < (dogs[i].recommendedFood * 1.10)) {
      withinRange = !withinRange
    }
    else if (!withinRange && dogs[i].curFood > dogs[i].recommendedFood) {
      ownersEatTooMuch.push(...dogs[i].owners)
    } else if (!withinRange && dogs[i].curFood < dogs[i].recommendedFood) {
      ownersEatTooLittle.push(...dogs[i].owners)
    }
  }

}
checkDogOwners()
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4.
const logMessage = () => {
  let message1 = ownersEatTooMuch.join(' and ')
  let message2 = ownersEatTooLittle.join(' and ')
  const s = `'s`
  console.log(`${message1 + s} Dog eat too much !`);
  console.log(`${message2 + s} Dog eat too little !`);
}
logMessage()









console.log(dogs);