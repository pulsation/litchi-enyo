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
    components: [
        {kind: "ContactListHeaderToolbar"},
        {kind: "ContactList"}
    ],
    contactListSetupItem: function (nSender, inEvent) {
        this.$.contactList.$.contactListItem.$.name.setContent("Test");
        return true;
    },
    create: function () {
        this.inherited(arguments);
        this.$.contactList.setCount(1);
    },
    onTransitionFinish: "panelChanged"
});
