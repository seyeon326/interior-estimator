import React, { useState } from "react";

function LaborCost({ onLaborChange }) {
  const [days, setDays] = useState("");
  const [workerCount, setWorkerCount] = useState("");

  const formatPrice = (value) => {
    return value.toLocaleString("ko-KR");
  };

  const daysNum = parseInt(days) || 0;
  const workerCountNum = parseInt(workerCount) || 0;
  const totalLabor = daysNum * workerCountNum * 300000;

  React.useEffect(() => {
    onLaborChange(totalLabor);
  }, [totalLabor, onLaborChange]);

  return (
    <div className="bg-white rounded-2xl p-8 mb-8 shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">👷 인건비</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4 transition-all duration-300 hover:border-indigo-500 hover:shadow-lg">
          <span className="block font-semibold text-gray-800 mb-3">
            예상 공사 일수
          </span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="flex-1 px-4 py-3 border-2 rounded-lg font-medium bg-gray-100 focus:outline-none focus:border-indigo-500"
              min={0}
              placeholder="일수 입력"
            />
            <span className="text-gray-600 font-medium">일</span>
          </div>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4 transition-all duration-300 hover:border-indigo-500 hover:shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-800">투입 인력 수</span>
            <span className="text-sm text-gray-600 font-medium">
              300,000원/명
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={workerCount}
              onChange={(e) => setWorkerCount(e.target.value)}
              className="flex-1 px-4 py-3 border-2 rounded-lg font-medium bg-gray-100 focus:outline-none focus:border-indigo-500"
              min={0}
              placeholder="인력 수 입력"
            />
            <span className="text-gray-600 font-medium">명</span>
          </div>
        </div>
      </div>

      {days > 0 && workerCount > 0 && (
        <>
          <div className="text-right pt-2 border-t border-gray-200 text-gray-700 text-sm">
            합계:{" "}
            <strong className="text-indigo-500 text-lg">
              {formatPrice(totalLabor)}원
            </strong>
            <div className="text-gray-700 text-sm">
              {daysNum}일 × {workerCountNum}명 × 300,000원
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LaborCost;
