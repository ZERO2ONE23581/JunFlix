import { Layer } from './Layer';
import { OverlayBg } from '../../../../Tools/overlay';
import { PostModal } from '../../../../../styles/post';
import { FlexCol } from '../../../../../styles/global';
import { variants } from '../../../../../styles/variants';
import { QuickSave } from '../../Create/Select_Modal/QuickSave';
import { BoardsList } from '../../Create/Select_Modal/BoardsList';

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
  const _select = {
    theme,
    host_id,
    clickQuick: () => _data?.selectClick('quick', 0)!,
    clickBoard: (id: number) => _data?.selectClick('board', id)!,
  };
  return (
    <>
      {selectModal && (
        <>
          <PostModal
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
          </PostModal>
          <OverlayBg dark={0.8} zIndex={113} />
        </>
      )}
    </>
  );
};
