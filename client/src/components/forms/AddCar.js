import React, { useEffect } from "react";
import { Form, Input, Select, Button, message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CAR, GET_PEOPLE, GET_CARS } from "../../queries";

const AddCar = () => {
    const [addCar] = useMutation(ADD_CAR);
    const { loading, error, data } = useQuery(GET_PEOPLE);
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [form, loading, error]);

    const onFinish = (values) => {
        const { year, make, model, price, personId } = values;
        const id = uuidv4();
        const parsedYear = parseInt(year, 10);
        const parsedPrice = parseFloat(price);

        addCar({
            variables: {
                id,
                year: parsedYear,
                make,
                model,
                price: parsedPrice,
                personId,
            },
            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({ query: GET_CARS });
                cache.writeQuery({
                    query: GET_CARS,
                    data: { ...data, cars: [...data.cars, addCar] },
                });
            },
        });
        form.resetFields();
        message.success("Car added successfully!");
    };

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <Form
            form={form}
            name="add-car-form"
            layout="inline"
            onFinish={onFinish}
            style={{ margin: "40px 0", justifyContent: "space-evenly" }}
        >
            <Form.Item
                name="year"
                rules={[
                    {
                        required: true,
                        message: "Please input year of car manufacture!",
                    },
                ]}
                label="Year"
            >
                <Input placeholder="i.e. 2024" />
            </Form.Item>
            <Form.Item
                name="make"
                rules={[
                    {
                        required: true,
                        message: "Please input make of the car!",
                    },
                ]}
                label="Make"
            >
                <Input placeholder="i.e. Toyota" />
            </Form.Item>
            <Form.Item
                name="model"
                rules={[
                    {
                        required: true,
                        message: "Please input model of the car!",
                    },
                ]}
                label="Model"
            >
                <Input placeholder="i.e. Corolla" />
            </Form.Item>
            <Form.Item
                name="price"
                rules={[
                    {
                        required: true,
                        message: "Please input price of the car!",
                    },
                ]}
                label="Price"
            >
                <Input placeholder="i.e. 40000" />
            </Form.Item>
            <Form.Item
                name="personId"
                rules={[
                    { required: true, message: "Please choose a person!" },
                ]}
                label="Person"
            >
                <Select
                    showSearch
                    placeholder="Select a person"
                    options={data.people.map((person) => ({
                        value: person.id,
                        label: `${person.firstName} ${person.lastName}`,
                    }))}
                />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form
                                .getFieldsError()
                                .filter(({ errors }) => errors.length).length
                        }
                    >
                        Add Car
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};

export default AddCar;