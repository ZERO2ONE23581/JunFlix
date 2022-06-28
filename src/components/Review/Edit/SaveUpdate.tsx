import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { Svg } from '../../Style/Svg/Svg';
import { ErrorMsg } from '../../Style/ErrMsg';
import { Dispatch, SetStateAction } from 'react';
import { MutationRes } from '../../../types/mutation';
import { Modal, ModalClose } from '../../../../styles/global';

interface ISaveBoardUpdateProps {
  data?: MutationRes;
  errors?: {
    data?: string;
    title?: string;
    movieTitle?: string;
    genre?: string;
    content?: string;
    score?: string;
    oneline?: string;
    recommend?: string;
  };
  loading: boolean | null;
  closeModal: Dispatch<SetStateAction<boolean>>;
}
export const SaveUpdate = ({
  data,
  errors,
  loading,
  closeModal,
}: ISaveBoardUpdateProps) => {
  const router = useRouter();
  return (
    <>
      {!errors?.data && (
        <>
          {!loading && !data && (
            <Cont>
              <h1>업데이트를 저장하시겠습니까?</h1>
              <h2>Do you want to save the recent update?</h2>
              <div className="btn-wrap">
                <Btn name="YES" type="submit" loading={loading} />
                <Btn
                  name="NO"
                  type="button"
                  onClick={() => closeModal(false)}
                />
              </div>
              {errors?.data && <ErrorMsg error={errors?.data} />}
              {errors?.title && <ErrorMsg error={errors?.title} />}
              {errors?.movieTitle && <ErrorMsg error={errors?.movieTitle} />}
              {errors?.genre && <ErrorMsg error={errors?.genre} />}
              {errors?.content && <ErrorMsg error={errors?.content} />}
              {errors?.score && <ErrorMsg error={errors?.score} />}
              {errors?.oneline && <ErrorMsg error={errors?.oneline} />}
              {errors?.recommend && <ErrorMsg error={errors?.recommend} />}
            </Cont>
          )}
          {loading && (
            <Cont>
              <h1>업데이트 저장중...</h1>
              <h2>Loading to save update...</h2>
              <Svg type="loading" />
            </Cont>
          )}
        </>
      )}

      {errors?.data && (
        <Error>
          <ErrorMsg error={errors?.data} />
          <Btn name="확인" type="button" onClick={() => router.reload()} />
        </Error>
      )}
      <ModalClose zIndex={203} />
    </>
  );
};
const Cont = styled(Modal)`
  z-index: 204;
`;
const Error = styled(Cont)`
  gap: 15px;
  padding: 40px;
  button {
    width: 100%;
    padding: 6px;
  }
`;
