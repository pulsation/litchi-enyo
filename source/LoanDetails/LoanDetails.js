enyo.kind({
    name: "LoanDetailsHeaderToolbar",
    kind: onyx.Toolbar,
	classes: "details-toolbar",
    components: [
        {content: "Details"}
    ]
});

enyo.kind({
	name: "LoanDetailsToolbarSave",
	kind: "onyx.Button",
	content: "Save"
});

enyo.kind({
	name: "LoanDetailsToolbarDelete",
	kind: "onyx.Button",
	content: "Delete",
	classes: "toolbar-right-button"
});

enyo.kind({
	name: "LoanDetailsToolbarReturn",
	kind: "onyx.Button",
	content: "Return"
});

enyo.kind({
    name: "LoanDetailsFooterToolbar",
    kind: onyx.Toolbar,
	classes: "details-toolbar, loan-toolbar",
    components: [
        {kind: "onyx.Grabber", ontap: "detailsGrabberTapped" },
        {kind: "LoanDetailsToolbarSave"},
        {kind: "LoanDetailsToolbarDelete"},
        {kind: "LoanDetailsToolbarReturn"}
    ]
});

enyo.kind({
    name: "LoanDetailsWhat",
    kind: "onyx.Groupbox",
    components: [
        {kind: "onyx.GroupboxHeader", content: "What"},
        {kind: "onyx.InputDecorator", components: [
			{
                kind: "onyx.Input",
                name: "loanItemName",
                classes: "loan-details-input",
                placeholder: "Item name"
            }
		]}
    ],
    published: [
        "itemName"
    ],
    itemNameChanged: function () {
        this.$.loanItemName.setAttribute("value", this.itemName);
    }
});

enyo.kind({
    name: "LoanDetailsWho",
    kind: "onyx.Groupbox",
    components: [
        {kind: "onyx.GroupboxHeader", content: "Who"},
        {kind: "onyx.InputDecorator", components: [
			{
                kind: "onyx.Input",
                name: "loanContactName",
                classes: "loan-details-input",
                placeholder: "Name"
            }
        ]},
        {kind: "onyx.InputDecorator", components: [
			{
                kind: "onyx.Input",
                name: "loanContactSurname",
                classes: "loan-details-input",
                placeholder: "Surname"
            }
		]}
    ],
    published: [
        "contactName",
        "contactSurname"
    ],
    infoChanged: function () {
        this.$.loanContactName.setAttribute("value", this.contactName);
        this.$.loanContactSurname.setAttribute("value", this.contactSurname);
    }
});

enyo.kind({
    name: "LoanDetailsWhen",
    kind: "onyx.Groupbox",
    components: [
        {kind: "onyx.GroupboxHeader", content: "When"},
        {kind: "onyx.InputDecorator", components: [
			{
                kind: "onyx.Input",
                name: "loanBorrowedOn",
                classes: "loan-details-input",
                placeholder: "Date borrowed"
            }
        ]},
        {kind: "onyx.InputDecorator", components: [
			{
                kind: "onyx.Input",
                name: "loanDueOn",
                classes: "loan-details-input",
                placeholder: "Due on"
            }
		]}
    ],
    published: [
        "borrowedOn",
        "dueOn"
    ],
    infoChanged: function () {
        this.$.loanBorrowedOn.setAttribute("value", this.borrowedOn);
        this.$.loanDueOn.setAttribute("value", this.dueOn);
    }
});

enyo.kind({
    name: "LoanDetailsFromTo",
    kind: "onyx.RadioGroup",
    onActivate: "fromToActivated",
    components: [
        {content: "From", active: true},
		{content: "To"}
    ]
});

enyo.kind({
    fit: true,
    style: "padding: 10px;",
    name: "LoanDetailsContainer",
    components: [
        {kind: "LoanDetailsWhat"},
        {tag: "br"},
        {kind: "FittableColumns", components: [
            {kind: "LoanDetailsFromTo"},
            {style: "text-align: center", components: [{kind: "onyx.Button", content: "Photo"}], fit: true},
            {kind: "onyx.Button", content: "Contact"}
        ]},
        {tag: "br"},
        {kind: "LoanDetailsWho"},
        {tag: "br"},
        {kind: "LoanDetailsWhen"},
    ]
});

enyo.kind({
    name: "LoanDetailsLayout",
    kind: "FittableRows",
    classes: "loan-details-layout",
    components: [
        {kind: "LoanDetailsHeaderToolbar"},
        {kind: "LoanDetailsContainer"},
        {kind: "LoanDetailsFooterToolbar"}
    ],
    create: function () {
        this.inherited(arguments);
    }
});
