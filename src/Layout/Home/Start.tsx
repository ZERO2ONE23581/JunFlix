import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Tools/Button';
import { ITheme } from '../../../styles/theme';
import { FlexCol } from '../../../styles/global';
import { useUser } from '../../libs/client/useUser';
import { Dispatch, SetStateAction } from 'react';

interface IStart {
  _data: {
    theme: boolean;
    setStart: Dispatch<SetStateAction<boolean>>;
  };
}
export const Start = ({ _data }: IStart) => {
  const { theme, setStart } = _data;
  const onClick = () => setStart(true);
  return (
    <Cont>
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
const Cont = styled(FlexCol)`
  gap: 0.8rem;
  padding: 1rem 2rem;
  width: fit-content;
  border-radius: 0.5rem;
  border: 3px solid whitesmoke;
  h2 {
    font-size: 1.7rem;
    .kor {
      font-size: 1.6rem;
    }
    span {
      display: block;
      text-align: center;
    }
  }
  button {
    font-weight: 600;
    font-size: 1.5rem;
    width: fit-content;
    padding: 0.5rem 1rem;
  }
`;
