import React from 'react';

import './BusinessList.css';

const BusinessList = ({ businesses }) => 
    businesses.map(business => (
        <div className="card" key={business.id}>
            <img src={business.image_url} alt={business.name} />
            <div>
                <h4><a href={business.url}>{business.name}</a></h4>
                {
                    business.location &&
                    business.location.display_address &&
                    (
                        <p>
                            {business.location.display_address[0]}
                            <br />
                            {business.location.display_address[1]}
                        </p>
                    )
                }
                <p>{business.display_phone}</p>
            </div>
        </div>
    ));

export default React.memo(BusinessList);
