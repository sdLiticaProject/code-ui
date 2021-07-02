import styled from 'styled-components';

const WrapperContainer = styled.div`
  box-sizing: border-box;
`;

const ChartWrapperContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 960px auto;
  text-align: center;
`;

const Tittle = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 46px;
  display: inline-block;
  padding-bottom: 20px;
  color: white;
`;

export { ChartWrapperContainer, WrapperContainer, Tittle };
