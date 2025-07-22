import React from 'react';
import { Modal } from 'antd';
import { UseGlobal } from '../Context';

const ModalComp = () => {
  const {
    isModalOpen,
    handleCancel,
    handleOk,
    correct,
    questions,
  } = UseGlobal();

  const percentage = Math.round((correct / questions.length) * 100);

  let comment = '';
  if (percentage === 100) {
    comment = "🌟 Perfect score! You're a quiz master!";
  } else if (percentage >= 80) {
    comment = "🔥 Great job! You're almost perfect.";
  } else if (percentage >= 60) {
    comment = "😊 Good effort! Keep practicing.";
  } else if (percentage >= 40) {
    comment = "😐 Not bad. Try again for a better score.";
  } else {
    comment = "😢 Don't give up! Practice makes perfect.";
  }

  return (
    <>
      <Modal
        title="🎉 Quiz Result"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-semibold mb-2">
            You scored {correct} out of {questions.length}
          </h1>
          <p className="text-lg font-medium mb-2">Percentage: {percentage}%</p>
          <p className="text-base italic mb-4">{comment}</p>
          <button
            onClick={handleOk}
            className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Restart Quiz
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ModalComp;
