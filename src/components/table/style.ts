import styled from 'styled-components';

const TablePage = styled.div`
  box-sizing: border-box;
  padding: 24px 96px;
  width: 100%;
  height: 100vh;
`;

const ColumnHeader = styled.td`
  & span {
    color: black;
  }
  & span:hover {
    color: DarkSlateGray;
    cursor: pointer;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 24px;
  text-align: right;
  font-family: 'Hind Guntur', sans-serif;
  font-weight: 300;
  & td {
    padding: 6px 0;
    padding-right: 20px;
  }
  & td:first-of-type {
    text-align: center;
  }
  & thead {
    & td {
      color: #afafaf;
      padding: 0px;
      padding-right: 20px;
      padding-bottom: 3px;
      border-bottom: 1px solid #c5c5c5;

      font-size: 13px;
    }
  }
`;

const Tittle = styled.span`
  padding: 12px 0px;
  display: block;
  font-family: 'Chivo', sans-serif;
  font-size: 30px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
`;

const WrapperCheckbox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  font-family: 'Montserrat', sans-serif;
  margin-top: 12px;
  font-size: 13px;
`;

const Sort = styled.div`
  font-family: 'Chivo', sans-serif;
  & select {
    outline: none;
    font-family: 'Chivo', sans-serif;
    cursor: pointer;
    background-color: #395bff;
    color: white;
    border: none;
    border-radius: 50px;
    padding: 10px 25px;
    margin-right: 6px;
    font-size: 15px;
  }
`;

const Navigation = styled.div`
  font-family: 'Chivo', sans-serif;
  & button {
    outline: none;
    cursor: pointer;
    background-color: inherit;
    border: 1px solid #c5c5c5;
    color: #696969;
    border-radius: 50px;
    padding: 5px 10px;
    &:first-of-type {
      margin-right: 6px;
    }
    &:hover {
      color: black;
      border-color: grey;
    }
  }
`;

export {TablePage, Tittle, Table, Wrapper, Sort, Navigation, WrapperCheckbox, ColumnHeader};
