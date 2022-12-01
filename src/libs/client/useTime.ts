export interface IDate {
  createdAt: Date;
  updatedAt: Date;
}
export const useTimeDiff = ({ createdAt, updatedAt }: IDate) => {
  const today = new Date().getTime();
  const start = new Date(createdAt).getTime();
  const update = new Date(updatedAt).getTime();
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
  const isUpdated = Boolean(
    createdAt.toString().slice(0, 20) === updatedAt.toString().slice(0, 20)
  )
    ? ''
    : '(updated)';
  return { isUpdated, time, type };
};
