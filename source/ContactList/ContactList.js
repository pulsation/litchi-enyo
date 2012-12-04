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
    updateList: function (inSender, inEvent) {
        this.refresh();
    },
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
        this.$.contactList.setCount(this.contacts.length);
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
    },

    onTransitionFinish: "panelChanged"
});

enyo.kind({
    name: "ContactListPopup",
    kind: "enyo.Popup",
    floating: true,
    centered: true,
    components: [ {kind: "ContactListLayout", name: "contactListLayout" } ]
});
