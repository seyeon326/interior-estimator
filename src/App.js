import React, { useState } from "react";
import WaterproofSection from "./components/WaterproofSection";
import TileSection from "./components/TileSection";
import EstimateSummary from "./components/EstimateSummary";

function App() {
  const [estimate, setEstimate] = useState({
    waterproof: {
      urethane: {
        materials: { hado: 0, jungdo: 0, sangdo: 0, thinner: 0 },
        supplies: 70000,
        errorMargin: 0,
        workers: [],
      },
      liquid: {
        materials: { cement: 0, mortar: 0, waterproofLiquid: 0 },
        supplies: 50000,
        errorMargin: 0,
        workers: [],
      },
    },
    tile: {
      materials: { cerapix: 0, whiteCement: 0 },
      tileGrade: { type: "저가형", price: 50000, quantity: 0 },
      options: { floatMortar: 0, pressCement: 0 },
      workers: [],
    },
  });

  const updateEstimate = (section, data) => {
    setEstimate((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 pb-10">
      <header className="bg-white p-10 text-center shadow-lg">
        <h1 className="text-4xl text-gray-800 mb-2 font-bold">
          🏠 인테리어 견적 계산기
        </h1>
        <p className="text-gray-600 text-lg">
          정확한 견적을 위해 필요한 자재와 인건비를 계산해보세요
        </p>
      </header>

      <main className="max-w-7xl mx-auto mt-10 px-5">
        <WaterproofSection
          data={estimate.waterproof}
          onUpdate={(data) => updateEstimate("waterproof", data)}
        />

        <TileSection
          data={estimate.tile}
          onUpdate={(data) => updateEstimate("tile", data)}
        />

        <EstimateSummary estimate={estimate} />
      </main>

      <footer className="text-center p-5 text-white mt-10">
        <p>© 2025 인테리어 견적 사이트</p>
      </footer>
    </div>
  );
}

export default App;
