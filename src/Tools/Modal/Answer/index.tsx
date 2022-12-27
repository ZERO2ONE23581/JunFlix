import { Svg } from '../../Svg';
import styled from '@emotion/styled';
import { OverlayBg } from '../../OverlayBg';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { Mob, Modal } from '../../../../styles/global';
import { modalVar } from '../../../../styles/variants';
import { useResponsive } from '../../../libs/client/useTools';

interface IAnswer {
  _data: {
    type: string;
    theme?: boolean;
    answer?: boolean;
    closeModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const Answer = ({ _data }: IAnswer) => {
  const { isDesk } = useResponsive();
  const { type, theme, answer, closeModal } = _data;
  const size = isDesk ? '2rem' : '4rem';
  return (
    <AnimatePresence>
      {answer && (
        <Cont isDesk={isDesk}>
          <Modal
            exit="exit"
            initial="initial"
            animate="animate"
            className="modal"
            variants={modalVar}
            custom={{ theme, duration: 0.6 }}
          >
            <Svg
              type="close"
              theme={theme!}
              item={{ size }}
              onClick={() => closeModal(false)}
            />
            <ul>
              {type === 'board' && (
                <>
                  <li>
                    새로운 게시물을 생성하려면
                    <span className="red">Board</span>
                    선택해주세요.
                  </li>
                  <li>
                    새로운 보드를 생성하려면 <span className="red">'+'</span>
                    표시 아이콘을 클릭해주세요.
                  </li>
                  <li>
                    보드에 저장되지 않은 <span className="red">Post</span>
                    <span className="red">'Quick Saved'</span>에 저장되어
                    있습니다.
                  </li>
                  <li>
                    Please<span className="red">'+'</span>icon on the side to
                    create new BOARD.
                  </li>
                  <li>
                    To create post, please select one of your
                    <span className="red">Board</span>.
                  </li>
                  <li>
                    Posts that are not saved on any board is on
                    <span className="red">'Quick Saved'</span>.
                  </li>
                </>
              )}
              {type === 'post' && (
                <>
                  <li>
                    포스트 내용을 보려면 각<span className="red">Post</span>를
                    클릭하세요.
                  </li>
                  <li>
                    블러처리된<span className="red">Post</span>는 비공개 모드
                    입니다.
                  </li>
                  <li>
                    Click the<span className="red">Post</span>to see the
                    content.
                  </li>
                  <li>
                    <span className="red">Post</span>that is on blur is private
                    mode.
                  </li>
                </>
              )}
            </ul>
          </Modal>
          <OverlayBg closeModal={() => closeModal(false)} />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Mob)`
  > .modal {
    top: 50vh;
    font-size: 1.4rem;
    padding: 2rem 5rem;
    font-size: ${(p) => (p.isDesk ? '1.3rem' : '2.5rem')};
    ul {
      li {
        text-align: center;
        font-style: italic;
        .red {
          margin: 0 8px;
          color: ${(p) => p.theme.color.logo};
        }
      }
    }
  }
`;
