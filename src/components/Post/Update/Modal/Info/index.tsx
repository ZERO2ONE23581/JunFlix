import { SelectBtn } from './Btn';
import styled from '@emotion/styled';
import { RemovePost } from './Remove';
import { BlockComment } from './Block';
import { Dispatch, SetStateAction } from 'react';
import { IPostUseform } from '../../../../../types/post';
import { FlexCol } from '../../../../../../styles/global';
import { PostInputs } from '../../../Create/Modal/Info/Inputs';

export const Info = ({ _boolean, _useform, _id, _set }: IInfo) => {
  const { theme, quickSave } = _boolean;
  const { board_id, new_boardId } = _id;
  const { setIsDelete, setSelectModal } = _set;
  const openSelect = () => setSelectModal(true);
  return (
    <Cont>
      <PostInputs theme={theme} _useform={_useform} />
      <Wrap>
        <SelectBtn
          _data={{ theme, board_id, quickSave, openSelect, new_boardId }}
        />
        <BlockComment register={_useform?.register!} />
        <RemovePost theme={theme} setIsDelete={setIsDelete!} />
      </Wrap>
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  width: 100%;
  gap: 1.2rem;
`;
const Wrap = styled(FlexCol)`
  gap: 1.5rem;
`;

interface IInfo extends IPostUseform {
  _boolean: {
    theme: boolean;
    quickSave: boolean;
  };
  _id: {
    new_boardId: number;
    board_id: number | null;
  };
  _set: {
    setIsDelete: Dispatch<SetStateAction<boolean>>;
    setSelectModal: Dispatch<SetStateAction<boolean>>;
  };
}
