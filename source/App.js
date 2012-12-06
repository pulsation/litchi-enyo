// tell Enyo to listen for deviceready event
enyo.dispatcher.listen(document, "deviceready");

enyo.kind({
    name: "App",
    realtimeFit: true,
    kind: "Panels",
    components: [{
        name: "mainPanels",
        realtimeFit: true,
        kind: "Panels",
        arrangerKind: "CollapsingArranger",
        onTransitionFinish: "panelChanged",
        components: [
            {kind: "LoanListLayout"},
            {kind: "LoanDetailsLayout"}/*,
            {kind: "ContactListLayout"}*/
        ]
    }],
    panelChanged : function () { console.log("TODO: transition finished"); }

});
