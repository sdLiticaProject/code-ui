import styled from "styled-components";

import { height, margin, width } from "./ChartConstants";


const Btn = styled.button`
font-size: 75%;
width: 50px;
`;

const Canvas = styled.span`
width: ${width + margin.left + margin.right};
height: ${height + margin.top + margin.bottom};
display: block;
`;

export {Btn, Canvas};