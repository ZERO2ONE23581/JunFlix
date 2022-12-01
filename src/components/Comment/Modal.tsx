import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { Comments } from './Comments';
import { FlexCol, Layer_, Modal } from '../../../styles/global';
import { ITheme } from '../../../styles/theme';
import { Dispatch, SetStateAction } from 'react';
import { postVar } from '../../../styles/post';
import { CreateBox } from './CreateComment/Box';
import { OverlayBg } from '../../Tools/overlay';

export interface ISetPost extends ITheme {
  setPost: Dispatch<SetStateAction<string>>;
}
interface ICommentModal {
  _data: {
    theme: boolean;
    post_id: number;
    host_id: number;
    layoutId: string;
    setPost: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const CommentModal = ({ _data }: ICommentModal) => {
  const { theme, setPost, post_id, host_id, layoutId, setCmtModal } = _data;
  const closeModal = () => setCmtModal(false);
  return (
    <>
      <Cont
        exit="exit"
        initial="initial"
        animate="animate"
        custom={theme}
        variants={postVar}
        layoutId={layoutId}
      >
        <Layer>
          <div>
            <Svg
              type="close_"
              theme={theme}
              onClick={closeModal}
              item={{ size: '1.8rem' }}
            />
          </div>
          <div>
            <h1 className="title">Comments</h1>
            <Svg type="comments" theme={theme} onClick={closeModal} />
          </div>
          <div />
        </Layer>
        <Wrap>
          <CreateBox _data={{ theme, post_id, host_id, setPost }} />
          <Comments
            _data={{ theme, setPost, post_id, og_id: 0, setCmtModal }}
          />
        </Wrap>
      </Cont>
      <OverlayBg closeModal={closeModal} />
    </>
  );
};
const Cont = styled(Modal)`
  top: 1.2rem;
  z-index: 101;
  width: 33vw;
  padding: 0;
  min-width: 500px;
  height: fit-content;
`;

const Wrap = styled(FlexCol)`
  //border: 5px solid red;
  gap: 1rem;
  padding: 1rem 2rem;
  overflow-y: auto;
  max-height: 77vh;
`;
const Layer = styled(Layer_)`
  padding: 0.8rem 1rem;
  border-bottom: 1px dotted ${(p) => p.theme.color.font};
  > div {
    :nth-of-type(2) {
      h1 {
        font-size: 1.6rem;
        margin-right: 1rem;
      }
    }
  }
`;
