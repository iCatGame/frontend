import { Card, Modal } from "antd";
import { useState } from "react";
import { FeedCard } from "./FeedCard";

export const FeedModal = ({ tokenId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal} className={`rounded-xl px-8 py-3 text-neutral-100 font-[500] transition tracking-wide w-[200px] outline-none bg-blue-600 hover:bg-blue-700`}>
        喂食
      </button>
      <Modal 
        title="选择投喂的食物："
        open={isModalOpen}
        onCancel={handleCancel}
        closable={true}
        maskClosable={true}
        footer={null}
        destroyOnClose={true}
        width={800}
      >
        <div className="flex flex-row space-x-8">
          <FeedCard tokenId={tokenId} style={`leftover`} />
          <FeedCard tokenId={tokenId} style={`fishchip`} />
          <FeedCard tokenId={tokenId} style={`tin`} />
        </div>
      </Modal>
    </>
  )
}