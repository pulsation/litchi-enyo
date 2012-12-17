var litchi = litchi || {};

litchi.loan = (function () {
    // current loan
    var _currentLoan = null;

    return {
        getCurrent: function () {
            return _currentLoan;
        },
        setCurrent: function (currLoan, index) {
            _currentLoan        = currLoan;
            _currentLoan.index  = index;
        },
        save: function () {
            if (typeof _currentLoan.index !== undefined) {
                litchi.loans[_currentLoan.index] = _currentLoan;
                litchi.loans.save();
            }
        }
    };
}());

litchi.defaults = litchi.defaults || {};

litchi.defaults.itemImageUrl = "assets/1350594803_6-Camera.png";
litchi.defaults.contactImageUrl = "assets/1350569140_people.png";
