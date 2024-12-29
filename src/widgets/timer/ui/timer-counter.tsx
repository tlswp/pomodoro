interface ITimerCounterProps {
  value: string;
}

export const TimerCounter: React.FC<ITimerCounterProps> = ({ value }) => {
  return (
    <h1
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
    >
      {value}
    </h1>
  );
};
