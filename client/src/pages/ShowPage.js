import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_PERSON_WITH_CARS } from "../queries";
import CarCard from "../components/listItems/CarCard";
import { Col, Row, Typography } from "antd";
import "./ShowPage.css";

const { Title } = Typography;

const ShowPage = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
        variables: { id: id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;

    const { firstName, lastName, cars } = data.personWithcars;

    return (
        <div className="show-page-container">
            <div className="title-container">
                <Title level={2}>
                    {firstName} {lastName}
                </Title>
            </div>
            <Row gutter={[16, 16]} className="car-list">
                {cars.map((car, index) => (
                    <Col span={8} key={index}>
                        <CarCard car={car} />
                    </Col>
                ))}
            </Row>
            <Link to="/" className="back-to-home-button">Back to Home</Link>
        </div>
    );
};

export default ShowPage;