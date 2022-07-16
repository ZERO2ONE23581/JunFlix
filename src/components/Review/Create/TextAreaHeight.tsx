import {
  UseFormWatch,
  UseFormSetError,
  UseFormClearErrors,
} from 'react-hook-form';
import { ComputeLength } from '../../Tools';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type IHeightReturn = [
  () => void,
  Dispatch<SetStateAction<boolean>>,
  boolean,
  number,
  number,
  number
];
export const TextAreaHeight = (
  watch: UseFormWatch<any>,
  setError: UseFormSetError<any>,
  clearErrors: UseFormClearErrors<any>
): IHeightReturn => {
  const minHeight = 250;
  const maxHeight = 400;
  const [maxTitle] = useState(30);
  const [maxMovieTitle] = useState(30);
  const [minContent] = useState(50);
  const [maxContent] = useState(3000);
  const [height, setHeight] = useState(minHeight);
  //
  useEffect(() => {
    const length = ComputeLength({ watch: watch, type: 'content' });
    if (length) setHeight(minHeight + length * 0.1);
  }, [watch('content'), setHeight, ComputeLength]);
  //
  const [save, setSave] = useState(false);
  const TitleLength = ComputeLength({ watch: watch, type: 'title' });
  const MovieLength = ComputeLength({ watch: watch, type: 'movieTitle' });
  const ContentLength = ComputeLength({ watch: watch, type: 'content' });
  //
  const clickSave = () => {
    if (TitleLength === 0)
      return setError('title', { message: '리뷰제목을 입력해주세요.' });
    if (MovieLength === 0)
      return setError('movieTitle', { message: '영화제목을 입력해주세요.' });
    if (ContentLength === 0)
      return setError('content', { message: '리뷰를 입력해주세요.' });
    if (TitleLength > maxTitle)
      return setError('title', {
        message: `리뷰제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (MovieLength > maxMovieTitle)
      return setError('movieTitle', {
        message: `영화제목의 길이는 ${maxMovieTitle}자 이하입니다.`,
      });
    if (ContentLength <= minContent)
      return setError('content', {
        message: `리뷰의 최소길이는 ${minContent}자 이상입니다.`,
      });
    if (ContentLength > maxContent)
      return setError('content', {
        message: `리뷰의 최대길이는 ${maxContent}자 이하입니다.`,
      });
    setSave(true);
  };
  useEffect(() => {
    if (TitleLength !== 0 && TitleLength < maxTitle) clearErrors('title');
    if (MovieLength !== 0 && MovieLength < maxMovieTitle)
      clearErrors('movieTitle');
    if (ContentLength > minContent && ContentLength < maxContent)
      clearErrors('movieTitle');
  }, [
    clearErrors,
    TitleLength,
    MovieLength,
    ComputeLength,
    ContentLength,
    maxTitle,
    minContent,
    maxContent,
    maxMovieTitle,
  ]);
  return [clickSave, setSave, save, height, minHeight, maxHeight];
};
