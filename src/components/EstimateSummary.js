import React from "react";

function EstimateSummary({ estimate }) {
  const formatPrice = (value) => {
    return value.toLocaleString("ko-KR");
  };

  const urethaneTotal = () => {
    const u = estimate.waterproof.urethane;

    const materials =
      u.materials.hado * 65000 +
      u.materials.jungdo * 70000 +
      u.materials.sangdo * 120000 +
      u.materials.thinner * 50000;

    const hasUrethane = Object.values(u.materials).some((qty) => qty > 0);
    const supplies = (hasUrethane ? 70000 : 0) + u.errorMargin;

    const labor = u.workers.reduce((sum, w) => sum + w.price, 0);

    return { materials, supplies, labor, total: materials + supplies + labor };
  };

  const liquidTotal = () => {
    const l = estimate.waterproof.liquid;

    const materials =
      l.materials.cement * 10000 +
      l.materials.mortar * 10000 +
      l.materials.waterproofLiquid * 50000;

    // ✅ 재료가 하나라도 있으면 기본금액 + 오차금액 포함
    const hasLiquid = Object.values(l.materials).some((qty) => qty > 0);
    const supplies = (hasLiquid ? 50000 : 0) + l.errorMargin;

    const labor = l.workers.reduce((sum, w) => sum + w.price, 0);

    return { materials, supplies, labor, total: materials + supplies + labor };
  };

  const tileTotal = () => {
    const materials =
      estimate.tile.materials.cerapix * 40000 +
      estimate.tile.materials.whiteCement * 10000 +
      estimate.tile.tileGrade.quantity * estimate.tile.tileGrade.price +
      estimate.tile.options.floatMortar * 8000 +
      estimate.tile.options.pressCement * 10000;

    const labor = estimate.tile.workers.reduce(
      (sum, worker) => sum + worker.price,
      0
    );

    return { materials, labor, total: materials + labor };
  };

  const urethane = urethaneTotal();
  const liquid = liquidTotal();
  const tile = tileTotal();

  const grandTotal = urethane.total + liquid.total + tile.total;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl sticky top-5">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-4 border-b-4 border-indigo-500">
        📊 견적 요약
      </h2>

      <div className="flex flex-col gap-5 mb-5">
        {urethane.total > 0 && (
          <div className="bg-gray-100 p-5 rounded-xl">
            <h3 className="text-xl text-gray-700 mb-4 font-semibold flex items-center gap-2">
              <span className="text-indigo-500 text-2xl">•</span>
              우레탄 방수
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center py-2 text-gray-700">
                <span>재료비</span>
                <span>{formatPrice(urethane.materials)}원</span>
              </div>
              <div className="flex justify-between items-center py-2 text-gray-700">
                <span>부자재</span>
                <span>{formatPrice(urethane.supplies)}원</span>
              </div>
              <div className="flex justify-between items-center py-2 text-gray-700">
                <span>인건비</span>
                <span>{formatPrice(urethane.labor)}원</span>
              </div>
              <div className="flex justify-between items-center py-2 mt-1 pt-4 border-t-2 border-gray-300 text-lg">
                <span>소계</span>
                <strong className="text-indigo-500 text-xl">
                  {formatPrice(urethane.total)}원
                </strong>
              </div>
            </div>
          </div>
        )}

        {liquid.total > 0 && (
          <div className="bg-gray-100 p-5 rounded-xl">
            <h3 className="text-xl text-gray-700 mb-4 font-semibold flex items-center gap-2">
              <span className="text-indigo-500 text-2xl">•</span>
              액체방수
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center py-2 text-gray-700">
                <span>재료비</span>
                <span>{formatPrice(liquid.materials)}원</span>
              </div>
              <div className="flex justify-between items-center py-2 text-gray-700">
                <span>부자재</span>
                <span>{formatPrice(liquid.supplies)}원</span>
              </div>
              <div className="flex justify-between items-center py-2 text-gray-700">
                <span>인건비</span>
                <span>{formatPrice(liquid.labor)}원</span>
              </div>
              <div className="flex justify-between items-center py-2 mt-1 pt-4 border-t-2 border-gray-300 text-lg">
                <span>소계</span>
                <strong className="text-indigo-500 text-xl">
                  {formatPrice(liquid.total)}원
                </strong>
              </div>
            </div>
          </div>
        )}

        {tile.total > 0 && (
          <div className="bg-gray-100 p-5 rounded-xl">
            <h3 className="text-xl text-gray-700 mb-4 font-semibold flex items-center gap-2">
              <span className="text-indigo-500 text-2xl">•</span>
              타일
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center py-2 text-gray-700">
                <span>재료비</span>
                <span>{formatPrice(tile.materials)}원</span>
              </div>
              <div className="flex justify-between items-center py-2 text-gray-700">
                <span>인건비</span>
                <span>{formatPrice(tile.labor)}원</span>
              </div>
              <div className="flex justify-between items-center py-2 mt-1 pt-4 border-t-2 border-gray-300 text-lg">
                <span>소계</span>
                <strong className="text-indigo-500 text-xl">
                  {formatPrice(tile.total)}원
                </strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {grandTotal > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-xl mt-5 text-xl font-semibold shadow-lg gap-2">
          <span>총 견적 금액</span>
          <strong className="text-3xl font-bold">
            {formatPrice(grandTotal)}원
          </strong>
        </div>
      )}

      {grandTotal === 0 && (
        <div className="text-center py-10 px-5 text-gray-600 text-lg bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
          자재와 인건비를 추가하여 견적을 계산해보세요
        </div>
      )}
    </div>
  );
}

export default EstimateSummary;
