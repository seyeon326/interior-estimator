import React from "react";

function WorkerManager({ workers, basePrice, expertPrice, onChange }) {
  const addWorker = (type) => {
    const newWorker = {
      id: Date.now(),
      type: type,
      price: type === "base" ? basePrice : expertPrice,
    };
    onChange([...workers, newWorker]);
  };

  const removeWorker = (id) => {
    onChange(workers.filter((w) => w.id !== id));
  };

  const updateWorkerPrice = (id, price) => {
    onChange(
      workers.map((w) =>
        w.id === id ? { ...w, price: parseInt(price) || 0 } : w
      )
    );
  };

  const formatPrice = (value) => {
    return value.toLocaleString("ko-KR");
  };

  const totalLabor = workers.reduce((sum, worker) => sum + worker.price, 0);

  return (
    <div className="bg-white p-5 rounded-lg mt-5">
      <h4 className="text-lg text-gray-700 mb-4 font-semibold">👷 인건비</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        <button
          className="px-5 py-3 border-2 border-indigo-500 bg-white text-indigo-500 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:-translate-y-0.5 hover:shadow-lg"
          onClick={() => addWorker("base")}
        >
          + 기본 ({formatPrice(basePrice)}원)
        </button>
        <button
          className="px-5 py-3 border-2 border-purple-700 bg-white text-purple-700 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-purple-700 hover:text-white hover:-translate-y-0.5 hover:shadow-lg"
          onClick={() => addWorker("expert")}
        >
          + 기술직 ({formatPrice(expertPrice)}원)
        </button>
      </div>

      {workers.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg">
          {workers.map((worker, index) => (
            <div
              key={worker.id}
              className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-3 bg-white rounded mb-2 border border-gray-200"
            >
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-semibold text-gray-800 text-sm">
                  인력 #{index + 1}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded w-fit font-medium ${
                    worker.type === "base"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {worker.type === "base" ? "기본" : "기술직"}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={worker.price}
                  onChange={(e) => updateWorkerPrice(worker.id, e.target.value)}
                  className="w-full md:w-32 px-3 py-2 border border-gray-300 rounded font-semibold focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                <span className="text-gray-600 text-sm">원</span>
              </div>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded font-semibold cursor-pointer transition-all duration-200 hover:bg-red-700 hover:scale-105"
                onClick={() => removeWorker(worker.id)}
              >
                삭제
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded mt-2 text-lg">
            <span>인건비 합계</span>
            <strong className="text-xl">{formatPrice(totalLabor)}원</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkerManager;
