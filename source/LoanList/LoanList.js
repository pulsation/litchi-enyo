/* global litchi */

/**
 * Add button.
 */
enyo.kind({
	name: "LoanListToolbarAdd",
	kind: "onyx.Button",
	content: "Add",
	ontap: "addTaped",
    unmoveable: true,
    classes: "loan-list-add"
});

enyo.kind({
    name: "LoanListFilter",
    kind: "onyx.RadioGroup",
    onActivate: "filterSelected",
    filterSelected: function (inSender, inEvent) {
        litchi.loans.filterList(inEvent.selected.filterName);
    },
    components: [
        {
            content: "Due",
            filterName: "Due",
            classes: "loan-list-tab-selector"
        },
        {
            content: "From",
            filterName: "BorrowedFrom",
            classes: "loan-list-tab-selector"
        },
        {
            content: "To",
            filterName: "BorrowedTo",
            classes: "loan-list-tab-selector"
        },
        {
            content: "All",
            filterName: "All",
            classes: "loan-list-tab-selector",
            active: true
        }
    ]
});

/**
 * Header toolbar.
 */
enyo.kind({
    name: "LoanListHeaderToolbar",
    kind: "onyx.MoreToolbar",
    fit: false,
	classes: "loans-toolbar",
    components: [{content: "Litchi"}]
});

/**
 * Footer toolbar.
 */
enyo.kind({
    name: "LoanListFooterToolbar",
    kind: "onyx.Toolbar",
    fit: false,
	classes: "loan-toolbar",
    components: [
        //{kind: "LoanListToolbarAdd"},
        {kind: "LoanListFilter"}
    ],
    filterSelected: function (inSender, inEvent) {
        if (inEvent.originator.getActive()) {
        litchi.loans.filterList(inEvent.originator.filterName);
        }
    }
});

/**
 * Loan item.
 */
enyo.kind({
    name: "LoanListItem",
    classes: "loan-list-item",
    components: [{name: "name", classes: "loan-list-item-name"}],
    ontap: "loanTaped"
});

/**
 * List of loans.
 */
enyo.kind({
    name: "LoanList",
    kind: "List",
    fit: true,
    onSetupItem: "loanListSetupItem",
    components: [
        {kind: "LoanListItem"},
        {kind: "Signals", onLoansUpdated: "updateList"}
    ],
    
    events: { onLoanChosen: "" },

    updateList: function (inSender, inEvent) {
        this.setCount(litchi.loans.getLength());
        this.refresh();
    },
    loanTaped: function (inSender, inEvent) {
        // FIXME: calling container.container looks pretty ugly.
        var currentLoan = litchi.loans.getList()[inEvent.index];

        litchi.loan.setCurrent(currentLoan);
        this.doLoanChosen(currentLoan);
    }
});

/**
 * List screen layout. 
 */
enyo.kind({
    name: "LoanListLayout",
	classes: "loan-list-layout",
    kind: "FittableRows",
    components: [
        {kind: "LoanListHeaderToolbar"},
        {kind: "LoanList"},
        {kind: "LoanListFooterToolbar"}
    ],
    loans: litchi.loanList,
    loanListSetupItem: function (nSender, inEvent) {
        this.$.loanList.$.loanListItem.$.name.setContent(this.loans.getList()[inEvent.index].item.name);
        return true;
    },
    create: function () {
        this.inherited(arguments);
        this.loans = litchi.loans;
        this.$.loanList.setCount(this.loans.getLength());
    }
});
