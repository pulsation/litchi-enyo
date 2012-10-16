var kavimo = kavimo || {};

kavimo.loans = function () {
    // Model.
    var _all = [
        {
            contact: { name: "John", surname: "Door"},
            item: {name: "Buggy"},
            dueOn: '2012-05-09T13:44:29.203Z',
            borrowedOn: '2012-04-13T13:44:29.203Z',
            borrowedFromTo: 'from'
        },
        {
            contact: {name: "Marie-Hélène", surname: "Delatour"},
            item: {name: "U-Turn DVD"},
            dueOn: '2012-12-12T13:44:29.203Z',
            borrowedOn: '2012-03-03T13:44:29.203Z',
            borrowedFromTo: 'to'
        }
    ],

        /**
         * Return loans for items I borrowed from or to someone.
         */
        _getBorrowedFromTo = function (fromTo) {
            var
                /**
                 * Returns if the element is already due.
                 */
                _filterBorrowedFromTo = function (element, index, array) {
                    return (element.borrowedFromTo === fromTo);
                };
            return _all.filter(_filterBorrowedFromTo);
        };
    /**
     * Returns all loans.
     */
    this.getAll = function () {
        return _all;
    };

    /**
     * Return due loans.
     */
    this.getDue = function () {
        var _today = new Date(),

            /**
             * Returns if the element is already due.
             */
            _filterDue = function (element, index, array) {
                return (new Date(element.dueOn) < _today);
            };
        return _all.filter(_filterDue);
    };

    // Return loans for items I borrowed from someone.
    this.getBorrowedFrom = function () { return _getBorrowedFromTo("from"); };
    // Return loans for items I borrowed to someone.
    this.getBorrowedTo = function () { return _getBorrowedFromTo("To"); };

    // Initialize the current loan
    // this.setCurrentLoan(this.getAll()[0]);
}();

// LoanList MVVM
Karimasu.loanList = new function () {

    // Current list of loans
    var _loans          = null,
        _currentList    = null;

    this.setLoans = function (loans) {
        _loans = loans;
        _currentList = loans.getAll();
    };

    this.getList = function () {
        return _currentList;
    }

    this.getLength = function () {
        return _currentList.length;
    }
}();

// console.log(Karimasu.loanList);

// Karimasu.loanList.setLoans(Karimasu.loansModel);
