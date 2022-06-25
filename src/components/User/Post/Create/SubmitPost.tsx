import styled from '@emotion/styled';
import { Btn } from '../../../Style/Button';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { Dispatch, SetStateAction } from 'react';
import { Modal, ModalClose } from '../../../../../styles/global';

interface IClosePostModalProps {
  errors?: {
    data?: string;
    title?: string;
    content?: string;
  };
  loading: boolean | null;
  closeModal: Dispatch<SetStateAction<boolean>>;
}
export const SubmitPost = ({
  errors,
  loading,
  closeModal,
}: IClosePostModalProps) => {
  return (
    <>
      <Cont>
        <h1>작성하신 게시물을 제출하시겠습니까?</h1>
        <h2>게시물은 추후에 수정이 가능합니다.</h2>
        <div className="btn-wrap">
          <Btn name="제출하기" type="submit" loading={loading} />
          <Btn
            name="돌아가기"
            type="button"
            onClick={() => closeModal(false)}
          />
        </div>
        {errors?.data && <ErrorMsg error={errors?.data} />}
        {errors?.title && <ErrorMsg error={errors?.title} />}
        {errors?.content && <ErrorMsg error={errors?.content} />}
      </Cont>
      <ModalClose zIndex={201} />
    </>
  );
};
const Cont = styled(Modal)`
  z-index: 9999;
  border: 1px solid #353b48;
`;
