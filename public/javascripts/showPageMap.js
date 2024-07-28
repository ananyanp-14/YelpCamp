
mapboxgl.accessToken =mapToken ;
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/dark-v11', // style URL
	center: campground.geometry.coordinates,
	zoom: 9, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
 .setLngLat(campground.geometry.coordinates)
 .setPopup(
	new mapboxgl.Popup({offset:25})
	.setHTML(
		`<h3>${campground.title}</h3><p>${campground.location}</p>`
	)
 )
 .addTo(map)