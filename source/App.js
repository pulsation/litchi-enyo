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

    handlers: {
        onLoanChosen: "loanChosen"
    },

    /**
     * Slide details panel to the left if the screen is too small
     * to display both panels.
     */
    loanChosen: function (inSender, loan) {
        if (window.innerWidth < 800) {
            this.$.mainPanels.next();
        }

        this.$.loanDetailsLayout.$.loanDetailsContainer.setLoan(loan);

        // Stop propagation.
        return true;
    }

});
