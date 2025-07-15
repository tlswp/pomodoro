import { KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';

export const useSensorsSetup = () => {
  return useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(KeyboardSensor)
  );
};
