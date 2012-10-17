var litchi = litchi || {};

litchi.loan = (function () {
    // current loan
    var _currentLoan = null;

    return {
        getCurrent: function () {
            return _currentLoan;
        },
        setCurrent: function (currLoan) {
            _currentLoan = currLoan;
        }
    };
}());


