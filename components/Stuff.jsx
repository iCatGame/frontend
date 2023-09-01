import { List } from "antd"
import { FoodCard } from "./FoodCard";
import { MedicineCard } from "./MedicineCard";
import { OrnamentCard } from "./OrnamentCard";

export const Stuff = () => {
  const listData = [
    <div className="flex flex-col space-y-3">
      <p className="font-semibold">猫粮</p>
      <div className="flex flex-col lg:flex-row gap-4 pt-8 pb-20">
        <FoodCard style={"leftover"} />
        <FoodCard style={"fishchip"} />
        <FoodCard style={"tin"} />
      </div>
    </div>,
    <div className="flex flex-col space-y-3">
      <p className="font-semibold">饰品</p>
      <div className="flex flex-col lg:flex-row gap-4 pt-8 pb-20">
        <OrnamentCard style={"hat"} />
        <OrnamentCard style={"scarf"} />
        <OrnamentCard style={"clothes"} />
      </div>
    </div>,
    <div className="flex flex-col space-y-3">
      <p className="font-semibold">药品</p>
      <div className="flex flex-col lg:flex-row gap-4 pt-8 pb-20">
        <MedicineCard />
      </div>
    </div>,
  ];

  return (
    <div className="flex flex-col">
      <List
        dataSource={listData}
        bordered
        renderItem={(item) => (
          <List.Item>{item}</List.Item>
        )}
      />
    </div>
  )
}