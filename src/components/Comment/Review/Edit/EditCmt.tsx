import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { IUseform } from '../../../../types/global';
import { IconBtn } from '../../../Tools/Button/IconBtn';
import { TextArea } from '../../../Tools/Input/TextArea';
import { Svg } from '../../../Tools/Svg';
import { Length } from '../../../Tools/Tools';

interface IInfo extends IUseform {
  loading: boolean;
}
export const EditCmt = ({ register, watch, loading }: IInfo) => {
  const minHeight = 20;
  const [height, setHeight] = useState(minHeight);
  useEffect(() => {
    const length = Length(watch!('content'));
    if (length) setHeight(minHeight + length);
  }, [watch!('content'), setHeight, Length]);
  return (
    <Cont>
      <TextArea
        {...register!('content', { required: '댓글을 입력해주세요.' })}
        id="content"
        name="content"
        height={height}
        placeholder="Add a comment..."
      />
      {loading && <Svg type="loading" size="2rem" />}
      {!loading && <IconBtn type="submit" svgType="paper-plane" size="2rem" />}
    </Cont>
  );
};
const Cont = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 15px;
  textarea {
    padding: 10px;
    min-height: 50px;
    max-height: 200px;
  }
`;
