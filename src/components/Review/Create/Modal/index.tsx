import { Upload } from './Upload';
import { OneLine } from './OneLine';
import styled from '@emotion/styled';
import { ReviewStars } from './Stars';
import { Recommend } from './Recommend';
import { LoadingModal } from '../../../../Tools/Modal/loading_modal';
import { IUseform } from '../../../../types/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { DimBackground, SmallModal } from '../../../../../styles/global';
import { Svg } from '../../../../Tools/Svg';

interface IReviewModal extends IUseform {
  isEdit?: boolean;
  stars: number;
  loading: boolean | null;
  setSave: Dispatch<SetStateAction<boolean>>;
}
export const ReviewModal = ({
  isEdit,
  stars,
  watch,
  setSave,
  loading,
  setError,
  getValues,
  register,
  setValue,
  clearErrors,
}: IReviewModal) => {
  const [score, setScore] = useState(false);
  const [upload, setUpload] = useState(false);
  const [recommend, setRecommend] = useState(false);
  return (
    <>
      {!loading && (
        <>
          <Cont>
            <Svg size="1.8rem" type="close" onClick={() => setSave(false)} />
            {!score && (
              <OneLine
                watch={watch}
                setSave={setSave}
                setScore={setScore}
                setValue={setValue}
                register={register}
                setError={setError}
                clearErrors={clearErrors}
              />
            )}
            {score && !recommend && (
              <ReviewStars
                stars={stars}
                watch={watch}
                register={register}
                setScore={setScore}
                setRecommend={setRecommend}
              />
            )}
            {recommend && !upload && (
              <Recommend
                register={register}
                setUpload={setUpload}
                setRecommend={setRecommend}
              />
            )}
            {upload && <Upload isEdit={isEdit} setUpload={setUpload} />}
          </Cont>
          <DimBackground zIndex={1} onClick={() => setSave(false)} />
        </>
      )}

      {loading && (
        <LoadingModal
          zIndex={103}
          type={isEdit ? 'update-review' : 'create-review'}
        />
      )}
    </>
  );
};
const Cont = styled(SmallModal)`
  gap: 12px;
  align-items: center;
  span {
    font-size: 1.1rem;
  }
  .red {
    margin: 0;
    margin-left: 5px;
  }
  .btn-wrap {
    gap: 12px;
    button {
      height: 33px;
      width: 150px;
      font-size: 1.1rem;
    }
  }
`;
