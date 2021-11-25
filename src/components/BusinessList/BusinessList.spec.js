import React from 'react';
import { render } from '@testing-library/react'
import { businessListData } from '../../__mocks__/mockBusinessData';
import BusinessList from './BusinessList';

describe('BusinessList', () => {  
    test('it renders a list of businesses', () => {
        const wrapper = render(<BusinessList businesses={businessListData} />);
        const businesses = wrapper.container.children;
        expect(businesses.length).toBe(10)
    });

    test('it renders a list of business items containing a name, image, and link', () => {
        const { container } = render(<BusinessList businesses={businessListData} />);
        const business = container.firstChild;
        const businessImg = business.children[0];
        const businessLink = business.children[1].querySelector('a');

        const { name, image_url, url } = businessListData[0]

        expect(businessImg.src).toEqual(image_url)
        expect(businessLink.href).toEqual(url)
        expect(businessLink.textContent).toEqual(name)
    });
});
