import { Modal } from "antd";
import { useState } from "react";

export const FeedModal = () => {
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
        open={isModalOpen}
        onCancel={handleCancel}
        closable={true}
        maskClosable={true}
        footer={null}
      />
    </>
  )
}