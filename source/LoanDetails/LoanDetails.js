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
		]}
    ],
    published: [
        "contactName"
    ],
    contactNameChanged: function () {
        this.$.loanContactName.setAttribute("value", this.contactName);
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
        {kind: "LoanDetailsFromTo"},
        {tag: "br"},
        {kind: "LoanDetailsWho"}
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
