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
    classes: "loan-details-gb",
    components: [
        {kind: "onyx.GroupboxHeader", content: "What"},
        {kind: "onyx.InputDecorator", components: [
            {
                kind: "onyx.Input",
                name: "loanItemName",
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
    classes: "loan-details-gb",
    components: [
        {kind: "onyx.GroupboxHeader", content: "Who"},
        {kind: "onyx.InputDecorator", components: [
            {
                kind: "onyx.Input",
                name: "loanContactName",
                placeholder: "Name"
            }
        ]},
        {kind: "onyx.InputDecorator", components: [
            {
                kind: "onyx.Input",
                name: "loanContactSurname",
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
        {content: "Borrowed on"},
        {kind: "onyx.InputDecorator", components: [
            {
                kind: "onyx.Input",
                name: "loanBorrowedOn",
                placeholder: "Date borrowed"
            }
        ]},
        {content: "Due on"},
        {kind: "onyx.InputDecorator", components: [
			{
                kind: "onyx.Input",
                name: "loanDueOn",
                placeholder: "Due on"
            }
		]}
    ],
    published: [
        "borrowedOn",
        "dueOn"
    ],
    /**
     * Make a date readable.
     */
    formatDate: function (isoDate) {
        var d = new Date(isoDate);
        
        return ('0' + d.getDate()).slice(-2) + "/" + ('0' + d.getMonth()).slice(-2) + "/" + d.getFullYear();
    },
    infoChanged: function () {
        this.$.loanBorrowedOn.setAttribute("value", this.formatDate(this.borrowedOn));
        this.$.loanDueOn.setAttribute("value", this.formatDate(this.dueOn));
    }
});

enyo.kind({
    name: "LoanDetailsFromTo",
    kind: "onyx.RadioGroup",
    onActivate: "fromToActivated",
    components: [
        {name: "from", content: "From", active: true},
		{name: "to", content: "To"}
    ],
    published: [
        "borrowedFromTo"
    ],
    borrowedFromToChanged: function () {
        if (this.borrowedFromTo === "to") {
            this.$.to.setActive(true);
        } else {
            this.$.from.setActive(true);
        }
    
    }
});

enyo.kind({
    fit: true,
    name: "LoanDetailsContainer",
    kind: "Scroller",
    touch: true,
    horizontal: "hidden",
    components: [{
        classes: "loan-details-content",
        components: [
            {kind: "FittableColumns", components: [
                {fit: true, components: [
                    {kind: "LoanDetailsWhat"},
                    {tag: "br"},
                    {kind: "LoanDetailsFromTo"}
                ]},
                {
                    kind: "onyx.Button",
                    ontap: "takeItemPhoto",
                    components: [
                        {
                            tag: "img",
                            name: "itemImage",
                            src: "assets/1350594803_6-Camera.png",
                            fit: false,
                            classes: "loan-details-icon",
                            published: [
                                "image"
                            ],
                            imageChanged: function () {
                                this.setAttribute("src", "data:image/jpeg;base64," + this.image);
                                
                            }
                        }
                    ]
                }
            ]},
            {tag: "br"},
            {kind: "FittableColumns", components: [
                {fit: true, components: [
                    {kind: "LoanDetailsWho"}
                ]},
                {
                    kind: "onyx.Button",
                    ontap: "loanSelectContact",
                    components: [
                        {
                            tag: "img",
                            name: "contactImage",
                            src: "assets/1350569140_people.png",
                            fit: false,
                            classes: "loan-details-icon"
                        }
                    ]
                }
            ]},
            {tag: "br"},
            {kind: "LoanDetailsWhen"}
        ]
    }],

    takeItemPhoto: function (inSender, inEvent) {
        var itemImageCtrl = this.$.itemImage;

        navigator.camera.getPicture(
            // Success
            function (imageData) {
                itemImageCtrl.image = imageData;
                itemImageCtrl.imageChanged();
                litchi.loan.getCurrent().item.image = imageData;
            },
            // Failure
            function (message) {
                console.log("TODO: alert user if taking photo failed.");
            },
            // Options
            {
                quality: 10,
                destinationType: Camera.DestinationType.DATA_URL
            }
        );
        console.log("TODO: Take item photo");
    },

    chooseContact: function (inSender, inEvent) {
        console.log("TODO: Choose contact");
    }
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
