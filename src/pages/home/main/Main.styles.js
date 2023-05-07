import styled from "styled-components";
import {Link} from "react-router-dom";

export const TitleInfo = styled.div`
  font-family: Roboto,serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 42px;
  margin-bottom: 10px;

  color: #000000;
`;

export const InlineDiv = styled.div`
  display: flex;
`

export const LargePlot = styled.div`
  width: 1100px;
  height: 416px;
  margin-top: 20px;
  margin-right: 30px;
  
  position: relative;

  background: #E8E8E8;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 3px 4px rgba(0, 0, 0, 0.04), 0px 1px 8px rgba(0, 0, 0, 0.04);
  border-radius: 15px;
`

export const MediumPlot = styled.div`
  width: 445px;
  height: 416px;
  margin-top: 20px;
  
  position: relative;

  background: #E8E8E8;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 3px 4px rgba(0, 0, 0, 0.04), 0px 1px 8px rgba(0, 0, 0, 0.04);
  border-radius: 15px;
`

export const SmallPlot = styled.div`
  height: 353px;
  width: 310px;
  left: 0px;
  top: 0px;
  border-radius: 15px;

  position: relative;
  
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 25px;

  background: #CFCFCF;
`

export const CircleNumber = styled.div`
  position: absolute;
  left: 4.19%;
  right: 86.13%;
  top: 3.65%;
  bottom: 87.92%;

  border-radius: 50%;
  
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;
  text-align: center;
  user-select: none;

  background: #FFFFFF;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 3px 4px rgba(0, 0, 0, 0.04), 0px 1px 8px rgba(0, 0, 0, 0.04);
`

export const ImageBox = styled.img`
  position: absolute;
  max-width: 226px;
  max-height: 187px;
  left: 42px;
  top: 47px;
  
  padding: 10px;

  background: #FFFFFF;
  box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`

export const LineDivider = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 78.93%;
  bottom: 21.07%;

  border: 2px solid #F5F5F5;
`

export const ButtonBox = styled(Link)`
  position: absolute;
  left: 17.42%;
  right: 17.42%;
  top: 83.43%;
  bottom: 3.93%;

  background-color: #3F88C5;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;

  font-family: 'Roboto',serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  text-transform: uppercase;
  
  text-decoration: none;

  &:hover {
    background-color: #3067A9;
  }
`

export const TitleBox = styled.div`
  position: absolute;
  width: 301px;
  height: 23px;
  left: 32px;
  top: 30px;

  font-family: 'Roboto',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`

export const NavbarGuides = styled.div`
  position: relative;
  width: 1100px;
  //height: 300px;
  //overflow: auto;
  min-height: 300px;
  margin-top: 20px;
  margin-right: 30px;

  background: #E8E8E8;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 3px 4px rgba(0, 0, 0, 0.04), 0px 1px 8px rgba(0, 0, 0, 0.04);
  border-radius: 15px;
`

export const NavbarLinkContainer = styled.div`
  padding-left: 30px;
  padding-top: 68px;
  padding-bottom: 30px;
`

export const LinksGuide = styled(Link)`
  box-sizing: border-box;
  
  width: 1040px;
  height: 56px;
  margin-top: 10px;

  background: #FFFFFF;
  border: 1px solid #3F88C5;
  border-radius: 5px;
  
  padding-left: 15px;

  font-family: 'Roboto',serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  text-decoration: none;

  color: #3F88C5;
`
