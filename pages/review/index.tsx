import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { PageContainer } from '../../styles/components/default';
import { Btn } from '../../src/components/Btn';

const allReview: NextPage = () => {
  const router = useRouter();
  //
  return (
    <>
      <PageContainer>
        <Btn
          type="create"
          btnName="Create Review"
          onClick={() => {
            router.push(`/review/create`);
          }}
        />
      </PageContainer>
    </>
  );
};
export default allReview;
