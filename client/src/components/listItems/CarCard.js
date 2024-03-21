import React from "react";
import { Card } from "antd";

const CarCard = ({ car }) => {
   
    return (
        <Card
            title={car.make}
            style={{
                width: 240,
                border: "2px solid #ccc",
                borderRadius: 12,
                marginBottom: 20,
            }}
        >
            <p>
                <strong>Model:</strong> {car.model}
            </p>
            <p>
                <strong>Year:</strong> {car.year}
            </p>
            <p style={{ color: "#ff6666" }}>
                <strong>Price:</strong> ${car.price}
            </p>
        </Card>
    );
};

export default CarCard;
