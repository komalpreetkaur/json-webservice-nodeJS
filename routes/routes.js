var appRouter = function(app) {

app.post("/listofshows", function(req, res) {
	var payloadArr = req.body.payload;
	if (typeof payloadArr === "undefined" || payloadArr.constructor != Array) {
		var jsonErr = {
			"error": "Could not decode request: JSON parsing failed"
		}
		res.contentType('application/json');
		res.statusCode = 400;
		res.send(JSON.stringify(jsonErr));
	} else {
		var result = [];
		for(var i in payloadArr){
			if(payloadArr[i]["drm"] && payloadArr[i]["episodeCount"] > 0){
				if (payloadArr[i].hasOwnProperty("image") && payloadArr[i].hasOwnProperty("slug") && payloadArr[i].hasOwnProperty("title")) {
					result.push({image:payloadArr[i]["image"]["showImage"], slug:payloadArr[i]["slug"], title:payloadArr[i]["title"]});
				}
		
			}
		}
		res.contentType('application/json');
		res.send(JSON.stringify({response:result}));
	}
});

}

module.exports = appRouter;