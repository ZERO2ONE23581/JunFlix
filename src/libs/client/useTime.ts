export interface IDate {
  _date: {
    created: Date;
    updated: Date;
  };
}
export const useTimeDiff = ({ _date }: IDate) => {
  const { created, updated } = _date;
  const today = new Date().getTime();
  const start = new Date(created).getTime();
  const update = new Date(updated).getTime();
  const diff =
    start === update ? Math.abs(today - start) : Math.abs(today - update);
  const getSec = (time: number) => time / 1000;
  const getMin = (time: number) => time / (1000 * 60);
  const getHour = (time: number) => time / (1000 * 60 * 60);
  const getDay = (time: number) => time / (1000 * 60 * 60 * 24);
  const getTime = () => {
    const sec = getSec(diff);
    if (sec > 60 * 60 * 24)
      return { time: Math.floor(getDay(diff)), type: 'day' };
    else if (sec > 60 * 60)
      return { time: Math.floor(getHour(diff)), type: 'hour' };
    else if (sec > 60)
      return { time: Math.floor(getMin(diff)), type: 'minute' };
    else return { time: Math.floor(sec), type: 'second' };
  };
  const { time, type } = getTime();
  const isUpdated = start === update ? '' : '(updated)';
  return { isUpdated, time, type };
};
