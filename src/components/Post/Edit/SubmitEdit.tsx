import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { ErrorMsg } from '../../Style/ErrMsg';
import { Dispatch, SetStateAction } from 'react';
import { Modal, ModalClose } from '../../../../styles/global';

interface ISubmitEditProps {
  errors?: {
    data?: string;
    title?: string;
    content?: string;
  };
  loading: boolean | null;
  closeModal: Dispatch<SetStateAction<boolean>>;
}
export const SubmitEdit = ({
  errors,
  loading,
  closeModal,
}: ISubmitEditProps) => {
  return (
    <>
      <Cont>
        <h1>편집한 게시물을 업로드 하시겠습니까?</h1>
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
      <ModalClose zIndex={202} onClick={() => closeModal(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  z-index: 203;
  border: 1px solid #353b48;
`;
