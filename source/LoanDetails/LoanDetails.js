enyo.kind({
    name: "LoanDetailsHeaderToolbar",
    kind: onyx.Toolbar,
	classes: "details-toolbar",
    components: [
        {content: "Details"}
    ]
});

enyo.kind({
	name: "LoanDetailsToolbarEdit",
	kind: "onyx.Button",
	content: "Edit"
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
	classes: "details-toolbar",
    components: [
        {kind: "onyx.Grabber", ontap: "detailsGrabberTapped" },
        {kind: "LoanDetailsToolbarEdit"},
        {kind: "LoanDetailsToolbarDelete"},
        {kind: "LoanDetailsToolbarReturn"}
    ]
});

enyo.kind({
    name: "LoanDetailsLayout",
    kind: "FittableRows",
    classes: "loan-details-layout",
    components: [
        {kind: "LoanDetailsHeaderToolbar"},
        {content: "Details", fit: true},
        {kind: "LoanDetailsFooterToolbar"}
    ]
});
