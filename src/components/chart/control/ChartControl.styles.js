import styled from 'styled-components';

const ControlContainer = styled.div`
  margin: 0 30px;
  border-radius: 5px;
  background: #2b2b2b;
  box-sizing: border-box;
  padding: 20px;
`;

const ShowInfoWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  border-radius: 20px;
  color: white;
  text-align: left;
  & span {
    & label {
      display: block;
      padding: 10px 0px 10px 40px;
      position: relative;
      cursor: pointer;
      user-select: none;
      &::before {
        left: 0px;
        content: '';
        position: absolute;
        height: 16px;
        width: 16px;
        border: 2px solid #ffffffad;
        transition: all ease-in-out 0.3s;
      }
    }

    & input {
      display: none;
      &:checked ~ label::before {
        transform: rotate(-45deg);
        width: 21px;
        height: 10px;
        border-top-style: none;
        border-right-style: none;
      }
    }
  }
`;

export { ControlContainer, ShowInfoWrapper };
