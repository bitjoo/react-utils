import { useState, useCallback } from 'react';

// e.g. const [isOpen, setOpen, setClose] = useBooleanState(false);

export default function useBooleanState(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const setTrueValue = useCallback(() => setValue(true));
  const setFalseValue = useCallback(() => setValue(false));

  return [value, setTrueValue, setFalseValue];
}
