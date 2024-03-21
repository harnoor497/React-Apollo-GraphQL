import { Divider, Space } from "antd";
import Title from "../components/layout/Title";
import AddPerson from "../components/forms/AddPerson";
import AddCar from "../components/forms/AddCar";
import People from "../components/lists/People";


const Home = () => {
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ display: "flex" }}
    >
      <Title />
      <Divider />
      <Divider plain>
        <h2>Add Person</h2>
      </Divider>

      <AddPerson />
      <Divider plain>
        <h2>Add Car</h2>
      </Divider>
      <AddCar />
      <Divider plain>
        <h2>Record</h2>
      </Divider>
      <People />
    </Space>
  );
};

export default Home;
