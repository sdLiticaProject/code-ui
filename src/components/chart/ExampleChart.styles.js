import styled from "styled-components";

const ChartContainer = styled.div`
  background: #2b2b2b;
  border-radius: 5px;
  height: 620px;
  max-width: max-content;
`;

const CurrencyInfo = styled.div``;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
`;

const MoneyBalance = styled.span`
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 41px;
  color: #f4f3f6;
`;

const Btn = styled.div`
  width: 40px;
  cursor: pointer;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #313335;
  border-radius: 3px;
  > span {
    font-family: Nunito;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #757780;
  }
  margin-right: 2px;
`;

const BtnWrapper = styled.div`
  > ${Btn}:last-child {
    width: 80px;
    margin-right: 0px;
  }

  display: flex;
  flex-direction: row;
`;

const Canvas = styled.span`
  display: inline-block;
  position: relative;
  width: 100%;
  vertical-align: top;
  overflow: hidden;

  .line {
    fill: url(#mainGradient);
    stroke: #e35955;
    stroke-width: 3px;
  }
  /* .context {
    display: none;
  } */

  .tick {
    font-family: Nunito;
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 14px;
    /* identical to box height */
    color: #757780;
  }

  .stop-left {
    stop-color: #e25955; /* Indigo */
  }

  .stop-right {
    stop-color: rgba(226, 89, 85, 0); /* Teal */
  }

  .svg-content {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
  }

  .zoom {
    cursor: move;
    fill: none;
    pointer-events: all;
  }

  .tooltip {
    fill: grey;
    opacity: 0.7;
  }

  .overlay {
    fill: none;
    pointer-events: all;
  }

  .axis.axis--y > .domain {
    stroke: #757780;
  }

  .axis.axis--x > .domain {
    stroke: #757780;
  }

  .focus circle {
    fill: #f1f3f3;
    stroke: #ca578e;
    stroke-width: 5px;
  }

  .focusPoints text {
    background: #f1f3f3;
  }

  .hover-line {
    stroke: #ca578e;
    stroke-width: 2px;
    stroke-dasharray: 3, 3;
  }
`;

export {
  MoneyBalance,
  CurrencyInfo,
  InfoWrapper,
  ChartContainer,
  Btn,
  BtnWrapper,
  Canvas,
};
