import React from 'react';

const UnavailableFeaturesBanner = () => {
  const unavailableFeatures = [
    {
      name: '일부 데이터베이스',
      reason: '캘린더, 타임라인, 차트, 폼 데이터베이스 기능을 사용할 수 없어요.',
    },
    {
      name: '비디오',
      reason: `비디오 기능을 사용할 수 없어요. 유튜브 영상은 삽입할 수 있어요.`,
    },
    {
      name: '파일 다운로드',
      reason: '파일을 다운로드할 수 없어요.',
    },
  ];

  return (
    <div className="mb-2 overflow-hidden rounded-lg border border-amber-200 bg-amber-50">
      <div className="p-4">
        <details>
          <summary className="flex cursor-pointer items-center justify-between text-xs font-medium text-amber-900">
            <span>일부 기능을 사용할 수 없어요.</span>
            <span className="text-amber-700">펼치기</span>
          </summary>

          <div className="mt-3 space-y-3">
            {unavailableFeatures.map((feature, index) => (
              <div key={index} className="rounded-md bg-amber-100 p-3">
                <div className="mb-1 text-sm font-semibold text-amber-900">{feature.name}</div>
                <div className="text-xs text-amber-900/80">{feature.reason}</div>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};

export default UnavailableFeaturesBanner;
