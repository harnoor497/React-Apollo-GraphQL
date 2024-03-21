import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import UpdateCar from "../forms/UpdateCar";
import RemoveCar from "../buttons/RemoveCar";

const Car = (props) => {
    const { id, year, make, model, price, personId } = props;
    const [editMode, setEditMode] = useState(false);

    const handleButtonClick = () => {
        setEditMode(!editMode);
    };

    
    return (
        <>
            {editMode ? (
                <UpdateCar
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}
                    onButtonClick={handleButtonClick}
                />
            ) : (
                <Card
                    type="inner"
                    title={`${year} ${make} ${model} -> $ ${new Intl.NumberFormat().format(
                        price
                    )}`}
                    actions={[
                        <EditOutlined key="edit" onClick={handleButtonClick} />,
                        <RemoveCar id={id} />,
                    ]}
                ></Card>
            )}
        </>
    );
};

export default Car;
