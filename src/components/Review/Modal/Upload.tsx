import { Btn } from '../../Tools/Button';
import { Dispatch, SetStateAction } from 'react';
import { BtnWrap } from '../../../../styles/global';

interface IUpload {
  isEdit?: boolean;
  setUpload: Dispatch<SetStateAction<boolean>>;
}
export const Upload = ({ isEdit, setUpload }: IUpload) => {
  return (
    <>
      {!isEdit && (
        <>
          <span>리뷰를 업로드 하겠습니까?</span>
          <span>Woulud you like to upload your review?</span>
          <span className="small">리뷰는 업로드 후 수정이 가능합니다.</span>
          <span className="small">You can edit review after submit.</span>
        </>
      )}
      {isEdit && (
        <>
          <span>리뷰를 업데이트 하겠습니까?</span>
          <span>Do you want to update your review?</span>
        </>
      )}
      <BtnWrap>
        <Btn type="button" name="BACK" onClick={() => setUpload(false)} />
        <Btn type="submit" name={isEdit ? 'UPDATE' : 'UPLOAD'} />
      </BtnWrap>
    </>
  );
};
