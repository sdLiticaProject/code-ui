import styled from "styled-components";

export const TableWrapper = styled.div`
  margin: 30px;
  max-height: 400px;
  overflow: auto;
`;

export const TableCol = styled.div``;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 20%);
  gap: 10px;
  border-bottom: 1px solid #3f88c5;
  :first-child {
    border-bottom: unset;
  }
  ${TableCol}:nth-child(3) {
    display: flex;
    align-items: center;
  }
`;

export const TableRowHeader = styled(TableRow)`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
`;

export const Icon = styled.img`
  cursor: pointer;
`;

export const FormWrapper = styled.div`
  display: flex;
  margin: 30px;
  align-items: center;
  justify-content: space-between;
`;

export const FormTitle = styled.div`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;

  color: #000000;
`;

export const Input = styled.input`
  min-width: 70%;
  min-height: 30px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const GenerateBtn = styled.button`
  color: white;
  width: 132px;
  height: 40px;
  border-radius: 10px;
  background: #09ae73;
  border: 1px solid #3f88c5;
`;
