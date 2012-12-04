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
    /*
    updateList: function (inSender, inEvent) {
        this.refresh();
    },*/
    contactTaped: function (inSender, inEvent) {
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

    published: {
        contacts: []
    },

    contactsChanged: function (inOldValue) {
        console.log("contactsChanged");
        this.$.contactList.setCount(this.contacts.length);
        this.$.contactList.refresh();

    },

    components: [
        {kind: "ContactListHeaderToolbar"},
        {kind: "ContactList"}
    ],

    contactListSetupItem: function (nSender, inEvent) {
        var contacts = this.getContacts();
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
        onShow: "_show"
    },
    components: [ {kind: "ContactListLayout", name: "contactListLayout" } ],

    _show: function () {
        var options = new ContactFindOptions(),
            fields  = ["displayName", "name", "photos"],
            self    = this;
        this.inherited(arguments);

        console.log("onShow");

        options.filter = "";
        navigator.contacts.find(
            fields,
            function (loadedContacts) {
                console.log("DEBUG: success retrieving contacts");
                self.$.contactListLayout.setContacts(loadedContacts);
            },
            function (error) {
                console.log("TOODO: error retrieving contacts");
            },
            options
        );
    }

});
