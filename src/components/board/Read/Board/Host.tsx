import styled from '@emotion/styled';
import { FlexCol_ } from '../../../../../styles/global';
import { Avatar } from '../../../../Tools/Avatar';

interface IHost {
  _data: {
    theme: boolean;
    userId: string;
    host_id: number;
    isDesk: boolean;
  };
}
export const Host = ({ _data }: IHost) => {
  const { theme, userId, host_id, isDesk } = _data;
  const size = isDesk ? '4rem' : '10rem';
  return (
    <Cont isDesk={isDesk}>
      <Avatar _data={{ theme, size, host_id }} />
      <span>@{userId.toUpperCase()}</span>
    </Cont>
  );
};
const Cont = styled(FlexCol_)`
  gap: 1rem;
  > span {
    opacity: 0.8;
    font-size: ${(p) => (p.isDesk ? '1rem' : '3rem')};
  }
`;
