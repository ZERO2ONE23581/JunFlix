import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../styles/global';
import { IGetBoards } from '../../types/board';
import { BoardList } from '../Board/Read/List';
import { MovieAPI } from '../Movie';
import { HeadTitle } from '../Title/Head';
import { Title } from '../Title';
import { MovieTitle } from '../Movie/Title';

interface IMovie {
  type: string;
}
export const Movie = ({ type }: IMovie) => {
  return (
    <>
      {/* <MovieTitle type={type} /> */}
      <MovieAPI type={type} />
    </>
  );
};
