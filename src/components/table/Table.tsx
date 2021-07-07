import React, { FC, useState, useEffect } from 'react';
import _ from 'lodash';
import { TablePage, Tittle, Table, Wrapper, Navigation, ColumnHeader, WrapperCheckbox } from './style';
import exampleDate from '../chart/data/currencyData.json';

enum Stats {
  Close = 'CLOSE',
  Date = 'DATE',
  High = 'HIGH',
  Low = 'LOW',
  Nominal = 'NOMINAL',
  Open = 'OPEN',
  Ticker = 'TICKER',
  Vol = 'VOL',
  Waprice = 'WAPRICE',
}

interface TableProps {
  CLOSE: number;
  DATE: string;
  HIGH: number;
  LOW: number;
  NOMINAL: number;
  OPEN: number;
  TICKER: string;
  VOL: number;
  WAPRICE: number;
}

interface ColumnHeader {
  value: Stats;
  reverse: boolean;
  setReverse(val: boolean): void;
}

const rows = 15;

const TableComponent: FC = () => {
  const [data, setData] = useState<TableProps[]>(exampleDate as TableProps[]);

  const [isShowClose, setIsShowClose] = useState(true);
  const [isShowDate, setIsShowDate] = useState(true);
  const [isShowHigh, setIsShowHigh] = useState(true);
  const [isShowLow, setIsShowLow] = useState(true);
  const [isShowNominal, setIsShowNominal] = useState(true);
  const [isShowOpen, setIsShowOpen] = useState(true);
  const [isShowTicker, setIsShowTicker] = useState(true);
  const [isShowVol, setIsShowVol] = useState(true);
  const [isShowWaprice, setIsShowWaprice] = useState(true);

  const [isReverseClose, setIsReverseClose] = useState(false);
  const [isReverseDate, setIsReverseDate] = useState(false);
  const [isReverseHigh, setIsReverseHigh] = useState(false);
  const [isReverseLow, setIsReverseLow] = useState(false);
  const [isReverseNominal, setIsReverseNominal] = useState(false);
  const [isReverseOpen, setIsReverseOpen] = useState(false);
  const [isReverseTicker, setIsReverseTicker] = useState(false);
  const [isReverseVol, setIsReverseVol] = useState(false);
  const [isReverseWaprice, setIsReverseWaprice] = useState(false);

  const [number, setNumber] = useState({ first: 0, end: 0 });
  const [sort, setSort] = useState('CLOSE');
  useEffect(() => {
    countNumber('first');
  }, []);
  const setEnd = (val: number) => {
    if (val > data.length - 1) return data.length - 1;
    return val;
  };
  const setNext = () => {
    if (number.end <= data.length - 1) {
      setNumber({ first: number.end + 1, end: setEnd(number.end + 16) });
    }
  };

  const setBack = () => {
    if (number.first > rows) {
      setNumber({ first: number.first - (rows + 1), end: number.end - (rows + 1) });
    }
  };

  const countNumber = (direction: string) => {
    switch (direction) {
      case 'first':
        setNumber({ first: 0, end: setEnd(rows) });
        break;
      case 'next':
        setNext();
        break;
      case 'back':
        setBack();
        break;
    }
  };
  const sortByValue = (stats: Stats, isReverse: boolean) => {
    const tmp = _.sortBy(data, stats);
    if (!isReverse) {
      setData(_.reverse(tmp));
    } else {
      setData(tmp);
    }
  };

  const columnHeader = (props: ColumnHeader) => {
    const sign = props.reverse ? '\\/' : '/\\';
    return (
      <ColumnHeader>
        {props.value}
        <span
          onClick={() => {
            sortByValue(props.value, props.reverse);
            props.setReverse(!props.reverse);
          }}
        >
          {' '}
          {sign}
        </span>
      </ColumnHeader>
    );
  };

  return (
    <TablePage>
      <Tittle>Table</Tittle>
      <Wrapper>
        <Navigation>
          <button onClick={() => countNumber('back')}>Back</button>
          <button onClick={() => countNumber('next')}>Next</button>
        </Navigation>
      </Wrapper>
      <WrapperCheckbox>
        <label>
          <input type="checkbox" checked={isShowClose} onClick={() => setIsShowClose(!isShowClose)} />
          Close
        </label>
        <label>
          <input type="checkbox" checked={isShowDate} onClick={() => setIsShowDate(!isShowDate)} />
          Date
        </label>
        <label>
          <input type="checkbox" checked={isShowHigh} onClick={() => setIsShowHigh(!isShowHigh)} />
          High
        </label>
        <label>
          <input type="checkbox" checked={isShowLow} onClick={() => setIsShowLow(!isShowLow)} />
          Low
        </label>
        <label>
          <input type="checkbox" checked={isShowNominal} onClick={() => setIsShowNominal(!isShowNominal)} />
          Nominal
        </label>
        <label>
          <input type="checkbox" checked={isShowOpen} onClick={() => setIsShowOpen(!isShowOpen)} />
          Open
        </label>
        <label>
          <input type="checkbox" checked={isShowTicker} onClick={() => setIsShowTicker(!isShowTicker)} />
          Ticker
        </label>
        <label>
          <input type="checkbox" checked={isShowVol} onClick={() => setIsShowVol(!isShowVol)} />
          Vol
        </label>
        <label>
          <input type="checkbox" checked={isShowWaprice} onClick={() => setIsShowWaprice(!isShowWaprice)} />
          Waprice
        </label>
      </WrapperCheckbox>
      <Table>
        <thead>
          <tr>
            <td />
            {isShowClose && columnHeader({ value: Stats.Close, reverse: isReverseClose, setReverse: setIsReverseClose })}
            {isShowDate && columnHeader({ value: Stats.Date, reverse: isReverseDate, setReverse: setIsReverseDate })}
            {isShowHigh && columnHeader({ value: Stats.High, reverse: isReverseHigh, setReverse: setIsReverseHigh })}
            {isShowLow && columnHeader({ value: Stats.Low, reverse: isReverseLow, setReverse: setIsReverseLow })}
            {isShowNominal && columnHeader({ value: Stats.Nominal, reverse: isReverseNominal, setReverse: setIsReverseNominal })}
            {isShowOpen && columnHeader({ value: Stats.Open, reverse: isReverseOpen, setReverse: setIsReverseOpen })}
            {isShowTicker && columnHeader({ value: Stats.Ticker, reverse: isReverseTicker, setReverse: setIsReverseTicker })}
            {isShowVol && columnHeader({ value: Stats.Vol, reverse: isReverseVol, setReverse: setIsReverseVol })}
            {isShowWaprice && columnHeader({ value: Stats.Waprice, reverse: isReverseWaprice, setReverse: setIsReverseWaprice })}
          </tr>
        </thead>
        <tbody>
          {_.range(number.first, number.end).map((current, i) => {
            return (
              <tr key={current}>
                <td>{++i}</td>
                {isShowClose && <td>{data[current].CLOSE}</td>}
                {isShowDate && <td>{data[current].DATE}</td>}
                {isShowHigh && <td>{data[current].HIGH}</td>}
                {isShowLow && <td>{data[current].LOW}</td>}
                {isShowNominal && <td>{data[current].NOMINAL}</td>}
                {isShowOpen && <td>{data[current].OPEN}</td>}
                {isShowTicker && <td>{data[current].TICKER}</td>}
                {isShowVol && <td>{data[current].VOL}</td>}
                {isShowWaprice && <td>{data[current].WAPRICE}</td>}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </TablePage>
  );
};

export default TableComponent;
