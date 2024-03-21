import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { GET_PEOPLE, UPDATE_CAR } from "../../queries";

const UpdateCar = (props) => {
    const { id, year, make, model, price, personId } = props;
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [updateCar] = useMutation(UPDATE_CAR);

    useEffect(() => {
        forceUpdate({});
    }, []);

    const { loading, error, data } = useQuery(GET_PEOPLE);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    const onFinish = (values) => {
        const { year, make, model, price, personId } = values;

        const parsedYear = parseInt(year, 10);
        const parsedPrice = parseFloat(price);

        updateCar({
            variables: {
                id,
                year: parsedYear,
                make,
                model,
                price: parsedPrice,
                personId,
            },
        });
        props.onButtonClick();
    };

    return (
        <Form
            form={form}
            name="update-car-form"
            layout="inline"
            onFinish={onFinish}
            initialValues={{ year, make, model, price, personId }}
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
                <Input placeholder="i.e. 2023" />
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
                rules={[{ required: true, message: "Please choose a person!" }]}
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
                            (!form.isFieldTouched("year") &&
                                !form.isFieldTouched("make") &&
                                !form.isFieldTouched("model") &&
                                !form.isFieldTouched("price") &&
                                !form.isFieldTouched("personId")) ||
                            form
                                .getFieldsError()
                                .filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Car
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    );
};
export default UpdateCar;
