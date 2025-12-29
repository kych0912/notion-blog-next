import { useQuery } from '@tanstack/react-query';
import { parsePageId } from 'notion-utils';

import { getRecordMapOptions } from '@/app/react-query/options/notion';
import { ContainedButton } from '@/app/components/Button/button.styles';
import { Spinner } from '@/app/components/shared/spinner';

import { usePageId } from '../../../hooks/usePageIdContext';
import { InputContainer } from '../../../write.styles';

export default function Input({
  url,
  setUrl,
  handleSubmit,
  isError,
}: {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  isError: boolean;
}) {
  const { pageId, setPageId } = usePageId();
  const { isLoading } = useQuery(getRecordMapOptions(pageId));

  return (
    <InputContainer>
      <div className="text-2xl font-bold">{'Notion 페이지 주소를'}</div>
      <div className="text-2xl font-bold">{'입력해주세요.'}</div>

      <div className="relative w-full pt-4">
        <input
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.notion.so/..."
          value={url}
          className={[
            'h-12 w-full rounded-sm border border-input bg-background px-4 pr-[110px] text-sm outline-none',
            isError
              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
              : 'focus:ring-2 focus:ring-ring/30 focus:border-ring',
          ].join(' ')}
        />

        <div className="absolute right-2.5 bottom-1.5">
          <ContainedButton
            onClick={() => {
              handleSubmit();
              setPageId(parsePageId(url) ?? null);
            }}
            disabled={!url?.length || isError || isLoading}
            size="small"
          >
            {isLoading ? <Spinner className="h-4 w-4 text-white" /> : '불러오기'}
          </ContainedButton>
        </div>
      </div>
    </InputContainer>
  );
}
