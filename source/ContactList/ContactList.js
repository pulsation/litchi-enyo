/**
 * Header toolbar.
 */
enyo.kind({
    name: "ContactListHeaderToolbar",
    kind: "onyx.MoreToolbar",
    fit: false,
	classes: "contact-toolbar",
    components: [{content: "Contacts"}]
});

/**
 * Contact item.
 */
enyo.kind({
    name: "ContactListItem",
    classes: "contact-list-item",
    components: [{name: "name", classes: "contact-list-item-name"}],
    ontap: "contactTaped"
});

/**
 * List of contacts.
 */
enyo.kind({
    name: "ContactList",
    kind: "List",
    fit: true,
    touch: true,
    onSetupItem: "contactListSetupItem",
    components: [
        {kind: "ContactListItem"}
    ],

    published: {
        contacts: []
    },

    contactsChanged: function (inOldValue) {
        console.log("contactsChanged");
        this.setCount(this.contacts.length);
        this.refresh();

    },

    contactTaped: function (inSender, inEvent) {
        // FIXME: there should be another way than calling this.container
        var chosenContact = this.contacts[inEvent.index],
            loanDetails   = this.container.container.container.container.container;
        console.log(chosenContact);
        loanDetails.$.loanDetailsWho.contactName = chosenContact.displayName;
        loanDetails.$.loanDetailsWho.infoChanged();
        
        console.log("TODO : contact taped");
    }
});

/**
 * List screen layout. 
 */
enyo.kind({
    name: "ContactListLayout",
	classes: "contact-list-layout",
    kind: "FittableRows",

    components: [
        {kind: "ContactListHeaderToolbar"},
        {kind: "ContactList"}
    ],

    contactListSetupItem: function (nSender, inEvent) {
        var contacts = this.$.contactList.getContacts();
        this.$.contactList.$.contactListItem.$.name.setContent(contacts[inEvent.index].displayName);
        return true;
    },

    create: function () {
        this.inherited(arguments);
    }

});

enyo.kind({
    name: "ContactListPopup",
    kind: "onyx.Popup",
    floating: true,
    centered: true,
    modal: true,
    handlers: {
        onShow: "findAndShow",
        onHide: "freeAndHide"
    },
    components: [ {kind: "ContactListLayout", name: "contactListLayout" } ],

    /**
     * Finds contacts and show them.
     */
    findAndShow: function () {
        var options = new ContactFindOptions(),
            fields  = ["displayName", "name", "photos"],
            self    = this;
        this.inherited(arguments);

        options.filter = "";
        navigator.contacts.find(
            fields,
            function (loadedContacts) {
                self.$.contactListLayout.$.contactList.setContacts(loadedContacts);
            },
            function (error) {
                console.log("TODO: error retrieving contacts");
            },
            options
        );
    },

    freeAndHide: function () {
        this.$.contactListLayout.$.contactList.setContacts([]);
    }

});
