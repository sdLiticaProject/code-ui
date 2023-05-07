import styled from "styled-components";

export const SelectTypeButton = styled.button`
  box-sizing: border-box;
  
  display: flex;
  flex-direction: column;
  
  justify-content: center;
  align-items: center;
  
  margin: 20px;
  
  width: 30%;
  height: 400px;

  background: #FFFFFF;
  border: 1px solid #3F88C5;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  
  > span {
    margin-top: 50px;
    width: 80%;
    
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    text-align: center;

    color: #000000;
  }
`

export const LargePlot = styled.div`
  box-sizing: border-box;
  
  width: 1080px;
  height: 450px;
  
  padding: 30px;

  background: #FFFFFF;
  border: 1px solid #3F88C5;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`

export const TitlePlot = styled.div`
  width: 1020px;
  height: 40px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;

  color: #000000;
`