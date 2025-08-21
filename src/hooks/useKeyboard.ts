import { useEffect, useState, useCallback } from "react";
import { Keyboard } from "react-native";


export function useKeyboard() {
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setIsKeyboardActive(true);
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardActive(false);
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // dismiss keyboard
  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  // open keyboard (requires a ref of TextInput)
  const openKeyboard = useCallback((inputRef:any) => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return {
    isKeyboardActive,
    keyboardHeight,
    openKeyboard,
    dismissKeyboard,
  };
}
