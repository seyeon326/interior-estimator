import React from "react";

function MaterialCounter({ label, unit, price, quantity, onChange, step = 1 }) {
  const handleIncrement = () => {
    onChange(quantity + step);
  };

  const handleDecrement = () => {
    if (quantity >= step) {
      onChange(quantity - step);
    }
  };

  const formatPrice = (value) => {
    return value.toLocaleString("ko-KR");
  };

  const total = quantity * price;

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 transition-all duration-300 hover:border-indigo-500 hover:shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-gray-800">{label}</span>
        <span className="text-sm text-gray-600 font-medium">
          {formatPrice(price)}원/{unit}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <button
          className="w-10 h-10 border-2 border-indigo-500 bg-white text-indigo-500 rounded-lg text-2xl font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={handleDecrement}
          disabled={quantity === 0}
        >
          −
        </button>

        <div className="flex-1 flex items-center justify-center gap-1 p-2 bg-gray-100 rounded">
          <span className="text-xl font-bold text-gray-800">{quantity}</span>
          <span className="text-sm text-gray-600">{unit}</span>
        </div>

        <button
          className="w-10 h-10 border-2 border-indigo-500 bg-white text-indigo-500 rounded-lg text-2xl font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:scale-105 active:scale-95"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>

      {quantity > 0 && (
        <div className="text-right pt-2 border-t border-gray-200 text-gray-700 text-sm">
          합계:{" "}
          <strong className="text-indigo-500 text-base">
            {formatPrice(total)}원
          </strong>
        </div>
      )}
    </div>
  );
}

export default MaterialCounter;
