import styled from "styled-components";
import {v} from "../../../styles/variables";

export const DashboardPanelDiv = styled.div`
  position: relative;
  height: 340px;
  
  padding: 38px 30px;
`

export const Title = styled.div`
  width: 210px;
  height: 28px;

  font-family: 'Roboto',serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;

  color: #000000;
`

export const SearchBox = styled.div`
  box-sizing: border-box;
  
  width: 380px;
  height: 40px;
  margin: 15px 0 15px 0;

  background: #FFFFFF;
  border: 1px solid #3F88C5;
`

export const SearchInputField = styled.input`
  display: flex;
  width: 350px;
  
  border: none;
  outline: none;
  padding-left: 5px;
  
  font-size: 16px;
`

export const SearchIcon = styled.div`
  padding: 8px 10px 7px 10px;
  display: flex;

  svg {
    font-size: 20px;
  }
`;

export const Version = styled.div`
  width: 150px;
  position: absolute;
  left: 30%;
  right: 0%;
  top: 83.93%;
  bottom: 21.07%;
  
  padding: 25px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;

  display: flex;
  align-items: center;

  color: rgba(0, 0, 0, 0.5);
`

export const TableListDashboards = styled.table`
  
  max-height: 180px;
  max-width: 380px;
  font-family: 'Roboto',serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  display: flex;
  align-items: center;

  border-collapse: collapse;
  width: 100%;

  color: #3F88C5;
  
`

export const TBodyDashboards = styled.tbody`
  height: 180px;
  width: 380px;
  
  overflow: auto;

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


export const TableRow = styled.tr`
    
`

export const TableCell  = styled.td`
  border: none;
  padding: 8px;
  color: #3F88C5;
`
