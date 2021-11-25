import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import { addRestaurants, fetchRestaurants, createMarkers, createMap } from '../../utils';
import './Main.css';

const Main = () => {
	const [map, setMap] = useState();
	const [markers, setMarkers] = useState([]);
	const [businesses, setBusinesses] = useState({ restaurants: [] });
	const [currentRestaurantType, setCurrentRestaurantType] = useState('restaurants');

	const clearMarkers = () => markers.forEach(marker => marker.setMap(null));

	const addMapWithRestaurantsAndMarkers = async ({ searchTerm, offset }) => {
		const { businesses: newBusinesses } = await fetchRestaurants({ searchTerm, offset });
		const updatedBusinesses = {
			...businesses,
			[searchTerm]: newBusinesses || [],
		}

		const updatedMap = map ? map : createMap();
		const newMarkers = createMarkers(newBusinesses, updatedMap);
		setMap(updatedMap);
		setBusinesses(updatedBusinesses);
		setMarkers(newMarkers);
	}

	const updateMarkers = (businessList) => {
		const newMarkers = createMarkers(businessList, map);
		setMarkers(newMarkers);
	}

	useEffect(() => {
		addMapWithRestaurantsAndMarkers({ searchTerm: currentRestaurantType });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateRestaurantList = async () => {
		const originalList = businesses[currentRestaurantType];

		const additionalBusinesses = await addRestaurants({ searchTerm: currentRestaurantType, offset: originalList.length })
		const newMarkers = createMarkers(additionalBusinesses, map);
		
		const updatedBusinessList = originalList.concat(additionalBusinesses);
		const updatedMarkers = markers.concat(newMarkers);

		const updatedBusinesses = {
			...businesses,
			[currentRestaurantType]: updatedBusinessList,
		};

		setMarkers(updatedMarkers);
		setBusinesses(updatedBusinesses);
	};

	const handleChangeBusiness = (event) => {
		const { id: searchTerm } = event?.currentTarget;

		if (searchTerm !== currentRestaurantType) {
			setCurrentRestaurantType(searchTerm);
			clearMarkers();
			
			const originalList = businesses[searchTerm] || [];
			if (originalList.length === 0) {
				addMapWithRestaurantsAndMarkers({ searchTerm });
			} else {
				updateMarkers(originalList);
			}
		}
	}

	const currentRestaurants = businesses[currentRestaurantType] || [];

	return (
		<main>
			<SearchBar handleClick={handleChangeBusiness} />
			<div id='places-map' className='places-map'></div>
			<InfiniteScroll
				className="businesses-list"
				dataLength={currentRestaurants.length} //This is important field to render the next data
				next={updateRestaurantList}
				hasMore={currentRestaurants.length <= 50}
				loader={<h4>Loading...</h4>}>
				<BusinessList businesses={currentRestaurants} />
			</InfiniteScroll>
		</main>
	);
};

export default Main;
