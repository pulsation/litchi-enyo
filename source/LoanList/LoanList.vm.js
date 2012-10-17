var litchi = litchi ||   {};

litchi.loans = (function() {

    var _all = litchi.sampleList,
        _currentList = _all,

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


    return {
        /**
         * Returns all loans.
         */
        getAll: function () {
            return _all;
        },

        /**
         * Return due loans.
         */
        getDue: function () {
            var _today = new Date(),

                /**
                 * Returns if the element is already due.
                 */
                _filterDue = function (element, index, array) {
                    return (new Date(element.dueOn) < _today);
                };
            return _all.filter(_filterDue);
        },

        // Return loans for items I borrowed from someone.
        getBorrowedFrom: function () {
            return _getBorrowedFromTo("from");
        },
        // Return loans for items I borrowed to someone.
        getBorrowedTo: function () {
            return _getBorrowedFromTo("To");
        },

        getList: function () {
            return _currentList;
        },

        getLength: function () {
            return _currentList.length;
        },

        filterList: function (filterName) {
            var getterName = "get" + filterName;

            this._currentList = this[getterName]();
        }
    };
}());
