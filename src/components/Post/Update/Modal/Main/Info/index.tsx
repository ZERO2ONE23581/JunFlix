import styled from '@emotion/styled';
import { DangerZone } from './DangerZone';
import { BlockComment } from './BlockComment';
import { SelectBoardBtn } from './SelectBoardBtn';
import { Dispatch, SetStateAction } from 'react';
import { IUseformPost } from '../../../../../../types/post';
import { FlexCol } from '../../../../../../../styles/global';
import { PostInputs } from '../../../../Create/Modal/Info/Inputs';

interface IInfo extends IUseformPost {
  _data: {
    theme: boolean;
    board_id: number;
    quickSave: boolean;
    new_boardId: number;
    setIsDelete: Dispatch<SetStateAction<boolean>>;
    setSelectModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const Info = ({ _data, _useform }: IInfo) => {
  const theme = _data?.theme!;
  const board_id = _data?.board_id!;
  const quickSave = _data?.quickSave!;
  const new_boardId = _data?.new_boardId!;
  const setIsDelete = _data?.setIsDelete!;
  const setSelectModal = _data?.setSelectModal!;
  return (
    <Cont>
      <PostInputs theme={theme} _useform={_useform} />
      <FlexCol className="wrap">
        <SelectBoardBtn
          _data={{
            theme,
            board_id,
            quickSave,
            new_boardId,
            openSelect: () => setSelectModal(true),
          }}
        />
        <BlockComment register={_useform?.register!} />
        <DangerZone theme={theme} setIsDelete={setIsDelete!} />
      </FlexCol>
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  width: 100%;
  gap: 1.2rem;
  .inputs-wrap {
    .title {
      margin-bottom: 2rem;
    }
    .hashtags {
      margin-bottom: 1.2rem;
    }
  }
  .wrap {
    gap: 1.5rem;
  }
`;
