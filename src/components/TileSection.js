import React, { useState } from "react";
import MaterialCounter from "./MaterialCounter";

function TileSection({ data, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);

  const updateMaterial = (material, quantity) => {
    onUpdate({
      ...data,
      materials: {
        ...data.materials,
        [material]: quantity,
      },
    });
  };

  const updateOption = (option, quantity) => {
    onUpdate({
      ...data,
      options: {
        ...data.options,
        [option]: quantity,
      },
    });
  };

  const updateTileGrade = (field, value) => {
    onUpdate({
      ...data,
      tileGrade: {
        ...data.tileGrade,
        [field]: value,
      },
    });
  };

  const handleGradeChange = (type, price) => {
    onUpdate({
      ...data,
      tileGrade: {
        ...data.tileGrade,
        type,
        price,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl p-8 mb-8 shadow-xl">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-3xl font-bold text-gray-800">🔲 타일</h2>
        <span className="text-3xl text-gray-600">{isOpen ? "-" : "+"}</span>
      </div>

      {isOpen && (
        <>
          <hr className="mt-4 mb-6 border-b-4 border-indigo-500"></hr>
          <div className="mb-0 p-5 bg-gray-100 rounded-xl">
            <h3 className="text-xl text-gray-700 mb-5 font-semibold">
              주요 자재
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <MaterialCounter
                label="세라픽스"
                unit="통"
                price={40000}
                quantity={data.materials.cerapix}
                onChange={(qty) => updateMaterial("cerapix", qty)}
              />
              <MaterialCounter
                label="백시멘트"
                unit="포"
                price={10000}
                quantity={data.materials.whiteCement}
                onChange={(qty) => updateMaterial("whiteCement", qty)}
              />
            </div>

            {/* 타일 등급 선택 */}
            <div className="bg-white p-5 rounded-lg my-5">
              <h4 className="text-lg text-gray-700 mb-4 font-semibold">
                타일 등급 선택
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <button
                  className={`px-5 py-4 border-2 rounded-lg cursor-pointer transition-all duration-300 flex flex-col gap-2 font-semibold ${
                    data.tileGrade.type === "저가형"
                      ? "border-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-700 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-indigo-500 hover:-translate-y-0.5 hover:shadow-lg"
                  }`}
                  onClick={() => handleGradeChange("저가형", 50000)}
                >
                  저가형
                  <span className="text-sm font-medium opacity-90">
                    50,000원
                  </span>
                </button>
                <button
                  className={`px-5 py-4 border-2 rounded-lg cursor-pointer transition-all duration-300 flex flex-col gap-2 font-semibold ${
                    data.tileGrade.type === "중가형"
                      ? "border-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-700 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-indigo-500 hover:-translate-y-0.5 hover:shadow-lg"
                  }`}
                  onClick={() => handleGradeChange("중가형", 75000)}
                >
                  중가형
                  <span className="text-sm font-medium opacity-90">
                    70,000 - 80,000원
                  </span>
                </button>
                <button
                  className={`px-5 py-4 border-2 rounded-lg cursor-pointer transition-all duration-300 flex flex-col gap-2 font-semibold ${
                    data.tileGrade.type === "고가형"
                      ? "border-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-700 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-indigo-500 hover:-translate-y-0.5 hover:shadow-lg"
                  }`}
                  onClick={() => handleGradeChange("고가형", 100000)}
                >
                  고가형
                  <span className="text-sm font-medium opacity-90">
                    100,000원
                  </span>
                </button>
              </div>

              {data.tileGrade.type && (
                <MaterialCounter
                  label={`${data.tileGrade.type} 타일 수량`}
                  unit="개"
                  price={data.tileGrade.price}
                  quantity={data.tileGrade.quantity}
                  onChange={(qty) => updateTileGrade("quantity", qty)}
                />
              )}
            </div>

            {/* 옵션 자재 */}
            <div className="bg-white p-5 rounded-lg mt-5">
              <h4 className="text-lg text-gray-700 mb-4 font-semibold">
                옵션 자재
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MaterialCounter
                  label="떠붙임 몰탈"
                  unit="포"
                  price={8000}
                  quantity={data.options.floatMortar}
                  onChange={(qty) => updateOption("floatMortar", qty)}
                />
                <MaterialCounter
                  label="압착시멘트"
                  unit="포"
                  price={10000}
                  quantity={data.options.pressCement}
                  onChange={(qty) => updateOption("pressCement", qty)}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TileSection;
