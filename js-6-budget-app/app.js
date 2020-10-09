//  BUDGET CONTROLLER
var budgetController = (function() {

    //
})();


//  UI CONTROLLER
var UIController = (function() {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };
        },
        getDOMstrings: function() {
            return DOMstrings
        }
    }
})();


// APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function() {
        // 1. get data
        var input = UICtrl.getInput();
        console.log(input);

        // 2. add item to budget controller
        // 3. add item to UI controller
        // 4. calc the budget
        // 5. display to UI
    };

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13) {
                ctrlAddItem();
            }
        }

    )
})(budgetController, UIController);