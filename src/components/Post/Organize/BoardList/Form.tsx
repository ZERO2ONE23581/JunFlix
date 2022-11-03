import { Layer } from './Layer';
import { NewBtn } from './New_Btn';
import { BoardsList } from './List';
import styled from '@emotion/styled';
import { IPostForm } from '../../../../types/post';
import { UseFormHandleSubmit } from 'react-hook-form';
import { FlexCol } from '../../../../../styles/global';

interface ISelectBoardForm {
  _data: {
    theme: boolean;
    onValid: () => void;
    closeModal: () => void;
    openNewModal: () => void;
    clickBoard: (id: number) => void;
    handleSubmit?: UseFormHandleSubmit<IPostForm>;
  };
}
export const Form = ({ _data }: ISelectBoardForm) => {
  const { theme, onValid, closeModal, openNewModal, clickBoard, handleSubmit } =
    _data;
  return (
    <Cont onSubmit={handleSubmit!(onValid)}>
      <Layer theme={theme} closeModal={closeModal} />
      <h2 className="title">
        <span className="kor">포스트를 저장할 보드를 선택하세요.</span>
        <span>Select board to save your posts.</span>
      </h2>
      <FlexCol className="wrap">
        <BoardsList _data={{ theme, clickBoard }} />
        <NewBtn theme={theme} clickNew={openNewModal} />
      </FlexCol>
    </Cont>
  );
};
const Cont = styled.form`
  width: 100%;
  height: 80%;
  .title {
    padding: 1.5rem;
    font-size: 1.2rem;
    .kor {
      font-size: 1.1rem;
    }
    span {
      display: block;
    }
  }
  .wrap {
    height: 100%;
    align-items: flex-start;
    justify-content: space-between;
  }
`;
