import React from 'react';
import { connect } from 'react-redux';
import { ControlContainer, ShowInfoWrapper } from './ChartControl.styles';
import { addLine, removeLine, showTooltip } from '../../../actions/chartActions';
import { getDoShow, getLines } from '../../../reducers/controlReducer';

const mapStateToProps = (state) => ({
  doShow: getDoShow(state),
  lines: getLines(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggle: () => dispatch(showTooltip()),
  addLine: (line) => dispatch(addLine(line)),
  removeLine: (line) => dispatch(removeLine(line)),
});

const lines = ['New York_1', 'San Francisco_1', 'Austin_1', 'New York_2', 'San Francisco_2', 'Austin_2'];

const ChartControl = (props) => {
  // if (!localStorage.getItem('doShow')) localStorage.setItem('doShow', 'true');
  // const [showInfo, setShowInfo] = React.useState(JSON.parse(localStorage.getItem('doShow')));
  return (
    <ControlContainer>
      <ShowInfoWrapper>
        <span>
          <input
            type="checkbox"
            id="first"
            checked={props.doShow}
            onChange={() => {
              // setShowInfo(!showInfo);
              props.toggle();
              // localStorage.setItem('doShow', (!showInfo).toString());
            }}
          />
          <label for="first">Show additional information</label>
        </span>
        {lines.map((el, index) => (
          <span>
            <input
              type="checkbox"
              id={index}
              checked={props.lines.includes(el)}
              onChange={() => {
                if (props.lines.includes(el)) props.removeLine(el);
                else props.addLine(el);
              }}
            />
            <label for={index}>{el}</label>
          </span>
        ))}
      </ShowInfoWrapper>
    </ControlContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartControl);
