import {
  UseCapLetter,
  useTimeDiff,
} from '../../../../../../libs/client/useTools';
import styled from '@emotion/styled';
import { Flex } from '../../../../../../../styles/global';

interface IComment {
  _data: {
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
export const UserDate = ({ _data }: IComment) => {
  const { userId, createdAt, updatedAt } = _data;
  const { time, type } = useTimeDiff({ createdAt, updatedAt });
  return (
    <Cont className="date">
      <Host>{UseCapLetter(userId)}</Host>
      <Date>
        <span>{time}</span>
        <span>{time > 1 ? `${type}s` : type}</span>
        <span>ago</span>
      </Date>
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 1rem;
  width: fit-content;
  justify-content: flex-start;
`;
const Host = styled.div`
  font-weight: 500;
  color: #0984e3;
`;
const Date = styled(Flex)`
  gap: 0.3rem;
  opacity: 0.8;
  font-style: italic;
`;
