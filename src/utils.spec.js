import { initMap, fetchRestaurants } from './utils';
import { businessListData } from './__mocks__/mockBusinessData';
import createGoogleMapsMock from 'jest-google-maps-mock';

describe('map utils helper functions', () => {  
    window.google = {};
    
    beforeEach(() => {
        window.google.maps = createGoogleMapsMock();
    });
    
    describe('initMap', () => {  
        test('in creates a map HTMLElement using the Google Maps api', () => {
            document.body.innerHTML =
            "<div id='places-map' className='places-map'></div>";
            
            const map = initMap('places-map');
            expect(map).not.toBeNull();
            expect(window.google.maps.Map).toHaveBeenCalledTimes(1);
        });
    });

    describe('fetchRestaurants', () => {  
        test('it fetches a list of businesses', async () => {
            fetch.mockOnce(
                JSON.stringify({
                    businesses: businessListData
                })
            );

            const data = await fetchRestaurants();
            expect(data.businesses).toEqual(businessListData);
        });
    });
});