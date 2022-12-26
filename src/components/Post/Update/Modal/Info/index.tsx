import { SelectBtn } from './Btn';
import styled from '@emotion/styled';
import { RemovePost } from './Remove';
import { BlockComment } from './Block';
import { Dispatch, SetStateAction } from 'react';
import { IPostUseform } from '../../../../../types/post';
import { PostInputs } from '../../../Create/Modal/Info/Inputs';
import { useResponsive } from '../../../../../libs/client/useTools';
import { FlexCol, FlexCol_ } from '../../../../../../styles/global';

export const Info = ({ _boolean, _useform, _id, _set }: IInfo) => {
  const { register } = _useform;
  const { isDesk } = useResponsive();
  const { theme, quickSave } = _boolean;
  const { board_id, new_boardId } = _id;
  const { setIsDelete, setSelectModal } = _set;
  const openSelect = () => setSelectModal(true);
  return (
    <Cont isDesk={isDesk}>
      <PostInputs theme={theme} _useform={_useform} />
      <Wrap>
        <SelectBtn
          _boolean={{ theme, isDesk, quickSave }}
          _data={{ board_id, openSelect, new_boardId }}
        />
        <BlockComment _data={{ register: register!, isDesk }} />
        <RemovePost _data={{ theme, setIsDelete, isDesk }} />
      </Wrap>
    </Cont>
  );
};
const Cont = styled(FlexCol_)`
  gap: 2rem;
  width: 100%;
  .textarea-wrap {
    margin-top: 1rem;
  }
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
