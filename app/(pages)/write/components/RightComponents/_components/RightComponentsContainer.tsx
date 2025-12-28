import { WriteFunnelContainer } from '../../../write.styles';

export default function RightComponentsContainer({ children }: { children: React.ReactNode }) {
  return (
    <WriteFunnelContainer>
      <div className="h-full w-full overflow-y-auto pb-24">{children}</div>
    </WriteFunnelContainer>
  );
}
