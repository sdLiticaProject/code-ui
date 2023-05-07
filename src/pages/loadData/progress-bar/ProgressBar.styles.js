import styled from "styled-components";
import {AiFillCheckCircle} from "react-icons/all";


export const ContentWrapper = styled.div`
  padding-top: 30px;
  width: 100%;
  
  display: flex;
  
  justify-content: center;
  align-items: center;
`;

export const CircleMain = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 15px;
  
  border-radius: 50%;
  
  display: flex;
  justify-content: center;
  align-items: center;

  background: #FFFFFF;
  border: 2px solid #3F88C5;
`

export const Circle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #3F88C5;
`

export const CircleComplete = styled(AiFillCheckCircle)`
  width: 30px;
  height: 30px;
  color: #3F88C5;
`

export const CircleTextBox = styled.div`
  padding: 10px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  align-items: center;
  text-align: center;
  
  display: flex;
  flex-direction: column;
  
  > span {
    margin-top: 10px;
  }
`

export const LineEmpty = styled.div`
  width: 104px;
  height: 9px;
  
  margin-bottom: 40px;
  
  background: #FFFFFF;
  border: 2px solid #3F88C5;
`
export const LineFill = styled.div`
  width: 104px;
  height: 9px;

  margin-bottom: 40px;
  
  background: #3F88C5;
  border: 2px solid #3F88C5;
`

