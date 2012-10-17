// tell Enyo to listen for deviceready event
enyo.dispatcher.listen(document, "deviceready");

enyo.kind({
	name: "App",
    realtimeFit: true,
    kind: "Panels",
    arrangerKind: "CollapsingArranger",
	fit: true,
	components:[
		{kind: "LoanListLayout"},
        {kind: "LoanDetailsLayout"}
	]
});
