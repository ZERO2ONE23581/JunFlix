import styled from '@emotion/styled';
import { Btn } from '../../../Tools/Button';
import { FlexCol_ } from '../../../../styles/global';
import { Dispatch, SetStateAction } from 'react';

interface IStartBtn {
  _data: {
    theme: boolean;
    isDesk: boolean;
    setStart: Dispatch<SetStateAction<boolean>>;
  };
}
export const StartBtn = ({ _data }: IStartBtn) => {
  const { setStart, isDesk } = _data;
  const onClick = () => setStart(true);
  return (
    <Cont className="start_btn" isDesk={isDesk}>
      <h2>
        <span>Click the button to start!</span>
        <span className="kor">시작하려면 아래 버튼을 클릭하세요!</span>
      </h2>
      <Btn
        type="button"
        onClick={onClick}
        item={{ theme: false, name: 'START' }}
      />
    </Cont>
  );
};
const Cont = styled(FlexCol_)`
  gap: 0.8rem;
  width: fit-content;
  border-radius: 0.5rem;
  border: 3px solid whitesmoke;
  padding: ${(p) => (p.isDesk ? '1rem 2rem' : '3rem 1.5rem')};
  h2 {
    font-size: 1.7rem;
    font-size: ${(p) => (p.isDesk ? '1.6rem' : '3.2rem')};
    .kor {
      font-size: 1.6rem;
      font-size: ${(p) => (p.isDesk ? '1.7rem' : '2.7rem')};
    }
    span {
      display: block;
      text-align: center;
    }
  }
  button {
    font-weight: 600;
    width: fit-content;
    border-radius: 30px;
    padding: 0.5rem 1.5rem;
    font-size: ${(p) => (p.isDesk ? '1.5rem' : '3.3rem')};
  }
`;
