import { cn } from '@/shared/lib/utils';

interface ITimerCounterProps {
  time: string;
  className?: string;
}

export const TimerCounter: React.FC<ITimerCounterProps> = ({ time, className, ...props }) => {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {time
        ? time.split('').map((char, index) => (
            <h1 className="w-6 scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl" key={index}>
              {char}
            </h1>
          ))
        : '00:00'}
    </div>
  );
};
