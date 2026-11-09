import React from 'react';
import { ChevronDown } from 'lucide-react';

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
    <details className="write-limitations">
      <summary>
        <span>일부 기능을 사용할 수 없어요.</span>
        <ChevronDown size={20} aria-hidden="true" />
      </summary>
      <dl>
        {unavailableFeatures.map((feature) => (
          <div key={feature.name}>
            <dt>{feature.name}</dt>
            <dd>{feature.reason}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
};

export default UnavailableFeaturesBanner;
