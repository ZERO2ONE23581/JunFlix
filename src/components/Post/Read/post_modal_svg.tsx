import { useState } from 'react';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { EllipsModal } from './update_btn_modal';

interface IModalSvg {
  theme: boolean;
  isMyPost: boolean;
  updatePost: () => void;
  closeModal: () => void;
  clickDelete: () => void;
}
export const ModalSvg = ({
  theme,
  isMyPost,
  updatePost,
  closeModal,
  clickDelete,
}: IModalSvg) => {
  const [ellips, setEllips] = useState(false);
  return (
    <>
      <Svg
        type="close_"
        theme={theme}
        onClick={closeModal}
        item={{ fill: '#ffffff' }}
      />
      <Ellipsis>
        <EllipsModal
          theme={theme}
          modal={ellips}
          isMyPost={isMyPost}
          updatePost={updatePost}
          clickDelete={clickDelete}
          closeModal={() => setEllips(false)}
        />
        <Svg
          theme={theme}
          type="ellipsis"
          onClick={() => setEllips((p) => !p)}
        />
      </Ellipsis>
    </>
  );
};
const Ellipsis = styled.div`
  width: 2rem;
  height: 2rem;
  top: 1rem;
  right: 1.5rem;
  position: absolute;
`;
