import React from 'react';
import { Progress } from '@heroui/react';

interface StoryProgressProps {
  total: number;
  current: number;
  duration: number;
  isPaused: boolean;
  onComplete: () => void;
}

export const StoryProgress: React.FC<StoryProgressProps> = ({
  total,
  current,
  duration,
  isPaused,
  onComplete
}) => {
  const [progress, setProgress] = React.useState(0);
  const progressInterval = React.useRef<number>();

  React.useEffect(() => {
    setProgress(0);
  }, [current]);

  React.useEffect(() => {
    if (isPaused) {
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
      }
      return;
    }

    const startTime = Date.now();
    const initialProgress = progress;

    progressInterval.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = initialProgress + (elapsed / duration) * 100;

      if (newProgress >= 100) {
        if (progressInterval.current) {
          window.clearInterval(progressInterval.current);
        }
        setProgress(100);
        onComplete();
      } else {
        setProgress(newProgress);
      }
    }, 16);

    return () => {
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
      }
    };
  }, [current, isPaused, duration, onComplete, progress]);

  return (
    <div className="flex gap-1 w-full">
      {Array.from({ length: total }).map((_, index) => (
        <Progress
          key={index}
          size="sm"
          value={index < current ? 100 : index === current ? progress : 0}
          className="flex-1"
          classNames={{
            base: "h-0.5",
            indicator: "bg-white"
          }}
        />
      ))}
    </div>
  );
};
