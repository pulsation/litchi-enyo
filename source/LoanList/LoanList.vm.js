var litchi = litchi || {};

litchi._loanListInstance = null;
litchi.loanList = function () {
    // example set.
    var _all = litchi.sampleList,
        _currentList    = _all,

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

    this.getList = function () {
        return _currentList;
    };

    this.getLength = function () {
        return _currentList.length;
    };
    return this;
}
