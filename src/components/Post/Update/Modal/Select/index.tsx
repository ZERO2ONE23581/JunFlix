import { OverlayBg } from '../../../../../Tools/overlay';
import { PostModal } from '../../../../../../styles/post';
import { FlexCol } from '../../../../../../styles/global';
import { variants } from '../../../../../../styles/variants';
import { BoardsList } from '../../../Create/Select/MyBoards';
import styled from '@emotion/styled';
import { Layer } from './Layer';
import { QuickSave } from './QuickSave';

interface ISelectModal {
  _data: {
    theme: boolean;
    host_id: number;
    layoutId: string;
    selectModal: boolean;
    closeModal: () => void;
    selectClick: (type: string, id: number) => void;
  };
}
export const SelectModal = ({ _data }: ISelectModal) => {
  const theme = _data?.theme!;
  const host_id = _data?.host_id!;
  const layoutId = _data?.layoutId!;
  const closeModal = _data?.closeModal!;
  const selectModal = _data?.selectModal!;
  const selectClick = _data?.selectClick!;
  const _select = {
    theme,
    host_id,
    clickQuick: () => selectClick('quick', 0)!,
    clickBoard: (id: number) => selectClick('board', id),
  };
  return (
    <>
      {selectModal && (
        <>
          <Cont
            exit="exit"
            animate="animate"
            initial="initial"
            className="select-modal"
            custom={theme}
            variants={variants}
            layoutId={layoutId + 'submit'}
          >
            <Layer theme={theme} closeModal={closeModal} />
            <FlexCol className="wrap">
              <QuickSave _data={{ ..._select }} />
              <BoardsList _data={{ ..._select }} />
            </FlexCol>
          </Cont>
          <OverlayBg dark={0.8} zIndex={113} />
        </>
      )}
    </>
  );
};
const Cont = styled(PostModal)`
  top: -5rem;
`;
