import { useQuery } from '@tanstack/react-query';

import { getRecordMapOptions } from '@/app/react-query/options/notion';

import { usePageId } from '../../../hooks/usePageIdContext';
import { InputContainer } from '../../../write.styles';

export default function Input({
  url,
  setUrl,
  handleSubmit,
  isError,
}: {
  url: string;
  setUrl: (url: string) => void;
  handleSubmit: () => void;
  isError: boolean;
}) {
  const { pageId } = usePageId();
  const { isFetching } = useQuery({ ...getRecordMapOptions(pageId), throwOnError: false });

  return (
    <InputContainer>
      <form
        id="notion-source"
        className="write-url-form"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="notion-url">Notion 페이지 주소</label>
        <div className="write-url-controls">
          <input
            id="notion-url"
            name="notionUrl"
            type="text"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://www.notion.so/..."
            value={url}
            aria-invalid={isError || undefined}
            aria-describedby="notion-url-feedback"
            className="write-url-input"
          />
          <button
            type="submit"
            className="write-button write-button--secondary"
            disabled={!url.trim() || isFetching}
            aria-busy={isFetching || undefined}
          >
            {isFetching ? '불러오는 중' : '불러오기'}
          </button>
        </div>
        <p
          id="notion-url-feedback"
          className={`write-feedback${isError ? ' write-feedback--error' : ''}`}
          aria-live="polite"
        >
          {isError
            ? '유효하지 않은 Notion URL입니다.'
            : '웹에 게시된 Notion 페이지 주소를 입력해 주세요.'}
        </p>
      </form>
    </InputContainer>
  );
}
