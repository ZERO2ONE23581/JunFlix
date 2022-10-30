import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import { CreateModal } from './CreateModal';
import { BtnWrap } from '../../../../../styles/global';
import { MyBtn } from '../../../../Tools/Button/my_btn';
import { Dispatch, SetStateAction, useState } from 'react';

interface IBtnsWrap {
  _data: {
    theme: boolean;
    type: string;
    isMyAcct: boolean;
    setType: Dispatch<SetStateAction<string>>;
    setCreate: Dispatch<
      SetStateAction<{ post: boolean; board: boolean; review: boolean }>
    >;
  };
}
export const BtnsWrap = ({ _data }: IBtnsWrap) => {
  const theme = _data?.theme!;
  const category = _data?.type!;
  const isMyAcct = _data?.isMyAcct!;
  const setCategory = _data?.setType!;
  const setCreate = _data?.setCreate!;
  const [addModal, setAddModal] = useState(false);
  const onClick = (type: string) => setCategory(type);
  return (
    <Cont className="btn-wrap">
      <div className="blank" />
      <MyBtn
        type="button"
        theme={theme}
        name={'Created'}
        category={category}
        onClick={() => onClick('created')}
      />
      <MyBtn
        type="button"
        name={'Saved'}
        theme={theme}
        category={category}
        onClick={() => onClick('saved')}
      />
      <MyBtn
        type="button"
        theme={theme}
        name={'Likes'}
        category={category}
        onClick={() => onClick('likes')}
      />
      <Add className="add">
        <Svg type="plus" theme={theme} onClick={() => setAddModal((p) => !p)} />
        <CreateModal
          theme={theme}
          modal={addModal}
          isMyAcct={isMyAcct}
          setModal={setAddModal}
          setCreate={setCreate}
        />
      </Add>
    </Cont>
  );
};
const Cont = styled(BtnWrap)`
  .blank {
    width: 2rem;
    height: 2rem;
  }
  gap: 20px;
  margin: 0 auto;
  position: relative;
  width: fit-content;
  button {
    width: 100px;
    font-size: 1.3rem;
    padding-bottom: 10px;
  }
`;
const Add = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 10px;
  justify-content: flex-end;
  .plus {
    z-index: 2;
  }
  .create-modal {
    top: 2.5rem;
    left: -3rem;
  }
`;
