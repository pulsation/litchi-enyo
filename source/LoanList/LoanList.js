/**
 * Add button.
 */
enyo.kind({
	name: "LoanListToolbarAdd",
	kind: "onyx.Button",
	content: "Add",
	ontap: "addTapped",
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
            kind: "onyx.Button",
            content: "Due",
            classes: "loan-list-toolbar-dropdown-button"
        },
        {
            kind: "onyx.Button",
            content: "Borrowed from",
            classes: "loan-list-toolbar-dropdown-button"
        },
        {
            kind: "onyx.Button",
            content: "Borrowed to",
            classes: "loan-list-toolbar-dropdown-button"
        },
        {
            kind: "onyx.Button",
            content: "All",
            classes: "loan-list-toolbar-dropdown-button"
        }

    ]
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
    ontap: "loanTapped"
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
    loanTapped: function (inSender, inEvent) {
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
        this.loans = new litchi.loanList();
        this.$.loanList.setCount(this.loans.getLength());
    }
});
