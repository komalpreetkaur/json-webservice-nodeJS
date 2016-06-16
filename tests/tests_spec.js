var frisby = require('frisby');
frisby.create('Send invalid JSON resquest for error response')
  .post('http://localhost:3000/listofshows')
  .expectStatus(400)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({error: "Could not decode request: JSON parsing failed"})
.toss();

frisby.create('Send valid JSON request')
  .post('http://localhost:3000/listofshows', {
    "payload": [
        {
            "country": "UK",
            "description": "What's life like when you have enough children to field your own football team?",
            "drm": true,
            "episodeCount": 3,
            "genre": "Reality",
            "image": {
                "showImage": "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg"
            },
            "language": "English",
            "nextEpisode": null,
            "primaryColour": "#ff7800",
            "seasons": [
                {
                    "slug": "show/16kidsandcounting/season/1"
                }
            ],
            "slug": "show/16kidsandcounting",
            "title": "16 Kids and Counting",
            "tvChannel": "GEM"
        },
		{
            "slug": "show/seapatrol",
            "title": "Sea Patrol",
            "tvChannel": "Channel 9"
        }
  ]
  })
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
	  "response": [
		{
			"image": "http://mybeautifulcatchupservice.com/img/shows/16KidsandCounting1280.jpg",
			"slug": "show/16kidsandcounting",
			"title": "16 Kids and Counting"
		}
		]
	})
.toss()