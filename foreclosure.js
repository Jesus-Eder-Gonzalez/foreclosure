'use strict';
var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;

function loan() {
    var account = {
        borrowed: 550000, 
        balance: 286000,
        monthlyPayment: 1700,
        defaulted: 0,
        defaultsToForeclose: 5,
        foreclosed: false
    };


    function missPayment() {
        account.defaulted +=1;
        console.log(account.defaulted);
        console.log(account.foreclosed);
        if(account.defaulted >= account.defaultsToForeclose) {
            account.foreclosed = true;
        }
    }

    return {
        getBalance: function() {
            return account.balance;
        },
        receivePayment: function(amount) {
            if (amount < account.monthlyPayment){
                account.balance -= amount;
                missPayment();
            }else {
                account.balance -= amount;
            }
        },
        getMonthlyPayment: function() {
            return account.monthlyPayment;
        },
        isForeclosed: function(){
            return account.foreclosed;
        }
    }
}

function borrower (loan) {
    var account = {
        monthlyIncome: 1350,
        funds: 2800,
        loan: loan
    };

    return {
        getFunds: function() {
            return account.funds;
        },

        makePayment: function() {
            var monthly = loan.getMonthlyPayment();
            if(account.funds >= monthly) {
                account.funds -= monthly;
                loan.receivePayment(monthly);
            } else {
                loan.receivePayment(account.funds);
                account.funds = 0;
            }
        },

        payDay: function() {
            console.log(account.funds);
            account.funds += account.monthlyIncome;
            console.log(account.funds);
        }

    }
}

var stevesLoan = loan();
var steve = borrower(stevesLoan);

while(!stevesLoan.isForeclosed()){
    steve.payDay();
    steve.makePayment();
    month++;
    console.log(steve.getFunds() + 'month: ' +month);
}

monthsUntilEvicted = month;
console.log(monthsUntilEvicted);