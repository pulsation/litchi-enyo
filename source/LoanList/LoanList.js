/**
 * Add button.
 */
enyo.kind({
	name: "LoanListToolbarAdd",
	kind: "onyx.Button",
	content: "Add",
	ontap: "addTaped",
    unmoveable: true
});

/**
 * Header toolbar.
 */
enyo.kind({
    name: "LoanListHeaderToolbar",
    kind: "onyx.MoreToolbar",
    fit: false,
	classes: "loans-toolbar",
    components: [
        { content: "All", unmoveable: true, style: "font-size: 20px;" },
        {
            filterName: "Due",
            kind: "onyx.Button",
            content: "Due",
            classes: "loan-list-toolbar-dropdown-button",
            ontap: "filterTaped"
        },
        {
            filterName: "BorrowedFrom",
            kind: "onyx.Button",
            content: "Borrowed from",
            classes: "loan-list-toolbar-dropdown-button",
            ontap: "filterTaped"
        },
        {
            filterName: "BorrowedTo",
            kind: "onyx.Button",
            content: "Borrowed to",
            classes: "loan-list-toolbar-dropdown-button",
            ontap: "filterTaped"
        },
        {
            filterName: "All",
            kind: "onyx.Button",
            content: "All",
            classes: "loan-list-toolbar-dropdown-button",
            ontap: "filterTaped"
        }
    ],
    filterTaped: function (inSender, inEvent) {
        litchi.loans.filterList(inSender.filterName);

    }
});

/**
 * Footer toolbar.
 */
enyo.kind({
    name: "LoanListFooterToolbar",
    kind: "onyx.Toolbar",
    fit: false,
	classes: "loans-toolbar",
    components: [
        {kind: "LoanListToolbarAdd"}
    ]
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
    touch: true,
    onSetupItem: "loanListSetupItem",
    components: [{kind: "LoanListItem"}],
    loanTaped: function (inSender, inEvent) {
        // TODO: switch to the "details" view
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
