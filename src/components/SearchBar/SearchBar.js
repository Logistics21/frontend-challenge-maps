import React from 'react';

import './SearchBar.css';

const SearchBar = ({ handleClick }) => (
    <ul className="select-food-list">
        <li onClick={handleClick} id="pizza" className="select-food-item"><span role="img" aria-label="pizza">🍕</span> Pizza</li>
        <li onClick={handleClick} id="burger" className="select-food-item"><span role="img" aria-label="burger">🍔</span> Burger</li>
        <li onClick={handleClick} id="sushi" className="select-food-item"><span role="img" aria-label="sushi">🍣</span> Sushi</li>
    </ul>
);

export default SearchBar;
