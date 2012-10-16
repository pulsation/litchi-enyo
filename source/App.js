// tell Enyo to listen for deviceready event
enyo.dispatcher.listen(document, "deviceready");

enyo.kind({
	name: "App",
    kind: "Panels",
	fit: true,
	components:[
		{kind: "LoanListLayout"}
	]
});
