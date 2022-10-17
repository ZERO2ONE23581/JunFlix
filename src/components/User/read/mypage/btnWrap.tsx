import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import { BtnWrap } from '../../../../../styles/global';
import { MyBtn } from '../../../../Tools/Button/my_btn';
import { Dispatch, SetStateAction, useState } from 'react';
import { CreateModal } from './create_modal';

interface IBtnsWrap {
  theme: boolean;
  category: string;
  isMyPage: boolean;
  setCategory: Dispatch<SetStateAction<string>>;
  setCreatePost: Dispatch<SetStateAction<boolean>>;
}
export const BtnsWrap = ({
  theme,
  isMyPage,
  category,
  setCategory,
  setCreatePost,
}: IBtnsWrap) => {
  const [addModal, setAddModal] = useState(false);
  const onClick = (type: string) => setCategory(type);
  return (
    <Cont className="btn-wrap">
      <MyBtn
        type="button"
        onClick={() => onClick('created')}
        item={{ theme, name: 'Created', category }}
      />
      <MyBtn
        type="button"
        onClick={() => onClick('saved')}
        item={{ theme, name: 'Saved', category }}
      />
      <MyBtn
        type="button"
        onClick={() => onClick('likes')}
        item={{ theme, name: 'Likes', category }}
      />
      <Add className="add">
        <Svg type="add" theme={theme} onClick={() => setAddModal((p) => !p)} />
        <CreateModal
          theme={theme}
          modal={addModal}
          isMyPage={isMyPage}
          setModal={setAddModal}
          setCreatePost={setCreatePost}
        />
      </Add>
    </Cont>
  );
};
const Cont = styled(BtnWrap)`
  gap: 20px;
  margin: 0 auto;
  position: relative;
  width: fit-content;
  button {
    width: 100px;
    padding-bottom: 10px;
  }
`;
const Add = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 10px;
  justify-content: flex-end;
  .add {
    z-index: 2;
  }
`;