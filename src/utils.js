import { COORDS, FETCH_LIMIT, INITIAL_OFFSET } from './constants';

export const createMarkers = (businesses, map) => {
	const bounds = new window.google.maps.LatLngBounds();
	const infowindow = new window.google.maps.InfoWindow();

	const markers = businesses.map(business => {
		const { name, coordinates, display_phone, image_url, location, price, rating, review_count } = business;
		const address = location.display_address.join(' ');
		const decimalRating = rating.toFixed(2);
		const latLng = { lat: coordinates.latitude, lng: coordinates.longitude };

		const marker = new window.google.maps.Marker({ position: latLng, map });
		bounds.extend(latLng);
		
		const contentString =
			'<div id="restaurant-infoWindow-container">' +
			`<h1 class="restaurant-infoWindow-title">${name}</h1>` +
			'<div class="restaurant-infoWindow-body">' +
			`<img class="restaurant-infoWindow-image" src="${image_url}" alt="${name}"></img>` +
			`<p>phone: ${display_phone}</p>` +
			`<p>address: ${address}</p>` +
			`<p>price: ${price}</p>` +
			`<p>rating: ${decimalRating} <span role="img" aria-label="sushi">⭐</span> (${review_count})</p>` +
			"</div>";

		window.google.maps.event.addListener(marker, 'click', ((marker) =>
			() => {
				infowindow.setContent(contentString);
				infowindow.open(map, marker);
			}
		)(marker));

		return marker;
	});

	map.fitBounds(bounds);
	return markers;
}

export const fetchRestaurants = async ({
	searchTerm = "restaurants",
	offset = INITIAL_OFFSET,
} = {}) => {
	const query = {
		limit: FETCH_LIMIT,
		offset,
		location: "Berlin, Germany",
		term: `${searchTerm}`
	}
	const urlParams = new URLSearchParams(query);
	try {
		const response = await fetch(`/-/search?${urlParams}`);
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message);
		}
		return body;
	} catch (error) {
		return Error(error);
	}
}

export const initMap = (mapElementId) => {
	const mapEl = document.getElementById(mapElementId);

	if (mapEl) {
		return new window.google.maps.Map(mapEl, {
			center: COORDS['Europe/Berlin'],
			zoom: 8
		});
	}

	return null;
}