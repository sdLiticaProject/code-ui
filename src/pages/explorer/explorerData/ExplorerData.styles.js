import styled from "styled-components";
import {List, Typography} from "@material-ui/core";

export const ContentWrapper = styled.div`
  padding: 30px 20px;
  
  margin-top: 30px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px;

  width: 100%;
  max-width: 90%;
  
  background: white;
`;

export const ContentWrapperSettings = styled.div`
  display: inline-flex;
  flex-direction: column;

  padding: 10px 20px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px;

  width: 100%;
  max-width: 90%;

  background: white;
`

export const ContentControls = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
`

export const ContentControlsSettings = styled.div`
  padding: 4px;
  flex-grow: 1;
  position: relative;
  height: 100%;
`

export const ContentChoose = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const Card = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: space-between;
`

export const ScrollBarsWrapper = styled.div`
  //position: absolute;
  inset: 0px;
  overflow: hidden;
  width: 88%;
`

export const ScrollBarsContent = styled.div`
  box-sizing: border-box;
  padding: 0.05px;
  min-height: 100%;
  min-width: 100%;
`

export const ScrollList = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-wrap: nowrap;
  position: absolute;
  height: 100%;
`

export const ScrollObject = styled.div`
  flex: 0 0 228px;
  border: 1px solid #3F88C5;
  border-radius: 5px;
  margin-right: 5px;
`

export const ContentChooseSettings = styled.div`
  flex: 0 0 228px;
  min-width: 10%;
`

export const ContentControlsEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const MyTitle = styled(Typography)`
  justify-content: center;
  display: flex;
  padding: 5px;
  
  border-bottom: 1px solid #3F88C5;
`

export const MyList = styled(List)`
  overflow-x: hidden;
  height: 80%;

  /* Стилизуем полосу прокрутки */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Стилизуем бегунок полосы прокрутки */
  ::-webkit-scrollbar-thumb {
    background: #5FA8D3;
    border-radius: 5px;
  }

  /* Стилизуем фон полосы прокрутки */
  ::-webkit-scrollbar-track {
    background: transparent;
  }
`

export const MyBr = styled.div`
  height: 20px;
  border-bottom: 1px solid #3F88C5;
`