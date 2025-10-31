import React, { useState } from "react";
import MaterialCounter from "./MaterialCounter";

function WaterproofSection({ data, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);

  const updateUrethane = (field, value) => {
    onUpdate({
      ...data,
      urethane: {
        ...data.urethane,
        [field]: value,
      },
    });
  };

  const updateUrethaneMaterial = (material, quantity) => {
    onUpdate({
      ...data,
      urethane: {
        ...data.urethane,
        materials: {
          ...data.urethane.materials,
          [material]: quantity,
        },
      },
    });
  };

  const updateLiquid = (field, value) => {
    onUpdate({
      ...data,
      liquid: {
        ...data.liquid,
        [field]: value,
      },
    });
  };

  const updateLiquidMaterial = (material, quantity) => {
    onUpdate({
      ...data,
      liquid: {
        ...data.liquid,
        materials: {
          ...data.liquid.materials,
          [material]: quantity,
        },
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl p-8 mb-8 shadow-xl">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-3xl font-bold text-gray-800">💧 방수</h2>
        <span className="text-3xl text-gray-600">{isOpen ? "-" : "+"}</span>
      </div>

      {/* 우레탄 */}
      {isOpen && (
        <>
          <hr className="mt-4 mb-6 border-b-4 border-indigo-500"></hr>
          <div className="mb-8 p-5 bg-gray-100 rounded-xl">
            <h3 className="text-xl text-gray-700 mb-5 font-semibold">우레탄</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-5">
              <MaterialCounter
                label="하도"
                unit="말"
                price={65000}
                quantity={data.urethane.materials.hado}
                onChange={(qty) => updateUrethaneMaterial("hado", qty)}
              />
              <MaterialCounter
                label="중도"
                unit="말"
                price={70000}
                quantity={data.urethane.materials.jungdo}
                onChange={(qty) => updateUrethaneMaterial("jungdo", qty)}
              />
              <MaterialCounter
                label="상도"
                unit="말"
                price={120000}
                quantity={data.urethane.materials.sangdo}
                onChange={(qty) => updateUrethaneMaterial("sangdo", qty)}
              />
              <MaterialCounter
                label="신나"
                unit="말"
                price={50000}
                quantity={data.urethane.materials.thinner}
                onChange={(qty) => updateUrethaneMaterial("thinner", qty)}
              />
            </div>

            <div className="bg-white p-5 rounded-lg mt-5">
              <div className="flex justify-between items-center py-2 text-gray-700">
                <span>부자재 기본</span>
                <span className="font-semibold text-indigo-500">70,000원</span>
              </div>
              <MaterialCounter
                label="오차금액"
                unit="원"
                price={1}
                quantity={data.urethane.errorMargin}
                onChange={(qty) => updateUrethane("errorMargin", qty)}
                step={10000}
              />
            </div>
          </div>

          {/* 액체방수 */}
          <div className="mb-0 p-5 bg-gray-100 rounded-xl">
            <h3 className="text-xl text-gray-700 mb-5 font-semibold">
              액체방수
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
              <MaterialCounter
                label="시멘트"
                unit="포"
                price={10000}
                quantity={data.liquid.materials.cement}
                onChange={(qty) => updateLiquidMaterial("cement", qty)}
              />
              <MaterialCounter
                label="몰탈"
                unit="포"
                price={10000}
                quantity={data.liquid.materials.mortar}
                onChange={(qty) => updateLiquidMaterial("mortar", qty)}
              />
              <MaterialCounter
                label="방수액"
                unit="말"
                price={50000}
                quantity={data.liquid.materials.waterproofLiquid}
                onChange={(qty) =>
                  updateLiquidMaterial("waterproofLiquid", qty)
                }
              />
            </div>

            <div className="bg-white p-5 rounded-lg mt-5">
              <div className="flex justify-between items-center py-2 text-gray-700">
                <span>부자재 기본</span>
                <span className="font-semibold text-indigo-500">50,000원</span>
              </div>
              <MaterialCounter
                label="오차금액"
                unit="원"
                price={1}
                quantity={data.liquid.errorMargin}
                onChange={(qty) => updateLiquid("errorMargin", qty)}
                step={10000}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WaterproofSection;
