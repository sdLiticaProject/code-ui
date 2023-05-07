import styled from "styled-components";
import {AiOutlineRight, BsPlusSquare} from "react-icons/all";


export const InfoBlock = styled.div`
  height: 275px;
  width: 320px;

  margin-right: 20px;
  margin-bottom: 20px;

  background: #FFFFFF;
  border: 1px solid #3F88C5;
  border-radius: 10px;
`

export const NewBlock = styled(BsPlusSquare)`
  width: 75px;
  height: 75px;
  color: rgba(52,49,76,0.75);
`

export const TitleAndDescriptionBox = styled.div`
  width: 228px;
  height: 61px;
  
  margin: 20px 46px 15px;
`

export const Title = styled.h2`
  margin: 0 0 6px 0;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #000000;
`;

export const Description = styled.h3`
  margin: 6px 0 6px 0;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #3F88C5;
`;

export const Line = styled.div`
  width: 228px;
  height: 0px;

  border: 1px solid #3F88C5;
`

export const Stats = styled.div`
  width: 245px;
  height: 172px;
  
  margin-left: 45px;
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

export const Param = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  
  color: black;
`

export const Circle = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 10px;
  
  border-radius: 50%;

  background: #3F88C5;
`

export const SortAndSearchBox = styled.div`
  display: flex;
`

export const SearchBox = styled.div`
  box-sizing: border-box;
  
  width: 475px;
  height: 40px;
  margin: 15px 10px 15px 0;

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

export const Dropdown = styled.select`
  
  background-color: #3F88C5;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  appearance: none;
  position: relative;

  margin: 15px 0 15px 0;
  
  width: 196px;
  height: 40px;

  transition: opacity 0.3s ease-in-out;

  &:focus {
    outline: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0.75rem;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  &::after > svg {
    width: 100%;
    height: 100%;
  }
`;

export const DropdownOption = styled.option`
  background-color: #3F88C5;
  color: white;
`;

export const DropdownIcon = styled(AiOutlineRight)`
  width: 100%;
  height: 100%;
`;