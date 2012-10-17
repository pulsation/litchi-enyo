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
    kind: "onyx.PickerDecorator",
    handlers: {
		onSelect: "filterSelected"
	},
    filterSelected: function (inSender, inEvent) {
        litchi.loans.filterList(inEvent.selected.filterName);
    },
    components: [
        {classes: "loan-list-filter"},
        {
            kind: "onyx.Picker",
            components: [
                {
                    content: "Due",
                    filterName: "Due"
                },
                {
                    content: "Borrowed from",
                    filterName: "BorrowedFrom"
                },
                {
                    content: "Borrowed to",
                    filterName: "BorrowedTo"
                },
                {
                    content: "All",
                    filterName: "All",
                    active: true
                }
            ]
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
    components: [
        {kind: "LoanListItem"},
        {kind: "Signals", onLoansUpdated: "updateList"}
    ],
    updateList: function (inSender, inEvent) {
        this.setCount(litchi.loans.getLength());
        this.refresh();
    },
    loanTaped: function (inSender, inEvent) {
        var appPanels = this.container.container;
        if (window.innerWidth < 800) {
            appPanels.next();
        }
        console.log("TODO: Show loan detail");
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
