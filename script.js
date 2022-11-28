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
console.log(movements);


// Descending
// movements.sort((a, b) => {
//   if (a > b)
//     return -1
//   if (b > a)
//     return 1
// })
movements.sort((a, b) => b - a)

console.log(movements);