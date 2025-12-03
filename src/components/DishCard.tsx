import React from 'react';

const DishCard: React.FC<{ name: string; description: string; price: number; imageUrl: string; }> = ({ name, description, price, imageUrl }) => {
    return (
        <div className="dish-card">
            <img src={imageUrl} alt={name} />
            <h2>{name}</h2>
            <p>{description}</p>
            <p>${price.toFixed(2)}</p>
        </div>
    );
};

export default DishCard;