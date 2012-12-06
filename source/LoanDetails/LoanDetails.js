/* global Camera, litchi */

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
    name        : "LoanDetailsContainer",
    kind        : "Scroller",
    horizontal  : "hidden",

    handlers: {
        onContactChosen : "contactChosen"
    },

    published: {
        loan: null
    },
    
    /**
     * Fill contact fields with chosen contact.
     */
    contactChosen: function (inSender, contact) {
        var contactName = contact.name,
            contactFamilyName = contactName.familyName,
            contactGivenName    = contactName.givenName;

        if ((contactFamilyName === undefined) || (contactGivenName === undefined)) {
            contactFamilyName   = contactName.formatted.split(" ")[0];
            contactGivenName    = contactName.formatted.split(" ")[1];
        }

        this.$.loanDetailsWho.contactName       = contactFamilyName;
        this.$.loanDetailsWho.contactSurname    = contactGivenName;
        this.$.loanDetailsWho.infoChanged();

        // Stop propagation.
        return true;
    },

    /**
     * Fill loan details.
     */
    loanChanged: function (inOldValue) {

        var what        = this.$.loanDetailsWhat,
            who         = this.$.loanDetailsWho,
            when        = this.$.loanDetailsWhen,
            fromTo      = this.$.loanDetailsFromTo,
            itemImage   = this.$.itemImage;

        what.itemName           = this.loan.item.name;
        who.contactName         = this.loan.contact.name;
        who.contactSurname      = this.loan.contact.surname;
        when.borrowedOn         = this.loan.borrowedOn;
        when.dueOn              = this.loan.dueOn;
        fromTo.borrowedFromTo   = this.loan.borrowedFromTo;
        itemImage.image         = this.loan.item.image;

        what.itemNameChanged();
        who.infoChanged();
        when.infoChanged();
        fromTo.borrowedFromToChanged();
        itemImage.imageChanged();
        
        return true;
    },

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
                            src: litchi.defaults.itemImageUrl,
                            fit: false,
                            classes: "loan-details-icon",
                            published: [
                                "image"
                            ],
                            imageChanged: function () {
                                if (typeof (this.image) === "undefined") {
                                    this.setAttribute("src", litchi.defaults.itemImageUrl);
                                } else {
                                    this.setAttribute("src", "data:image/jpeg;base64," + this.image);
                                }
                            }
                        }
                    ]
                }
            ]},
            {tag: "br"},
            {kind: "FittableColumns", name: "toto", components: [
                {fit: true, components: [
                    {kind: "LoanDetailsWho"}
                ]},
                {
                    kind: "onyx.Button",
                    ontap: "chooseContact",
                    components: [
                        {
                            tag: "img",
                            name: "contactImage",
                            src: litchi.defaults.contactImageUrl,
                            fit: false,
                            classes: "loan-details-icon"
                        }
                    ]
                },
                {
                    kind: "ContactListPopup",
                    name: "contactListPopup"
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
    },

    chooseContact: function (inSender, inEvent) {
        this.$.contactListPopup.show();
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
