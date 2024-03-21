import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { ADD_PERSON, GET_PEOPLE } from "../../queries";

const AddPerson = () => {
    const [addPerson] = useMutation(ADD_PERSON);
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [form]);

    const onFinish = (values) => {
        const id = uuidv4();
        const { firstName, lastName } = values;

        addPerson({
            variables: {
                id,
                firstName,
                lastName,
            },
            update: (cache, { data: { addPerson } }) => {
                const data = cache.readQuery({ query: GET_PEOPLE });
                cache.writeQuery({
                    query: GET_PEOPLE,
                    data: { ...data, people: [...data.people, addPerson] },
                });
            },
        });
        form.resetFields();
    };

    return (
        <Form
            form={form}
            name="add-person-form"
            layout="inline"
            onFinish={onFinish}
            style={{ margin: "40px 0", justifyContent: "center" }}
        >
            <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                    {
                        required: true,
                        message: "Please input your first name!",
                    },
                ]}
            >
                <Input placeholder="i.e. John" />
            </Form.Item>
            <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                    { required: true, message: "Please input your last name!" },
                ]}
            >
                <Input placeholder="i.e. Smith" />
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
                        Add Person
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};

export default AddPerson;