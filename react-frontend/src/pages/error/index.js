import React from 'react';
import Spline from '@splinetool/react-spline';
import styled from "styled-components";


const Error = () => {
  return (
      <Wrapper>
        <Spline scene="https://prod.spline.design/c4sOgIrMXd-mGHA8/scene.splinecode" />
      </Wrapper>
  );
};

const Wrapper = styled.div`
position: relative;
height: 100%;

.spline{
  position: absolute;
  height: 100%;
  margin: 0;
  top: 0;
}
`;

export default Error;

