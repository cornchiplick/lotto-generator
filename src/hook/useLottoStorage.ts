import {RecordData, RecordHistory} from "@/types/Lotto";
import {useEffect, useState} from "react";

export const useLottoStorage = (key: string) => {
  const [state, setState] = useState<RecordHistory[]>([]);

  useEffect(() => {
    const storedData = window.localStorage.getItem(key);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData && typeof parsedData === "object") {
          setState(parsedData);
        }
      } catch (error) {
        console.error("useLottoStorage Error : ", error);
      }
    }
  }, [key]);

  const setItem = (data: RecordData) => {
    const id = state.length + 1;
    const formattedData = {id, ...data};
    window.localStorage.setItem(key, JSON.stringify([...state, formattedData]));
    setState((prev) => [...prev, formattedData]);
  };

  const clear = () => {
    window.localStorage.removeItem(key);
    setState([]);
  };

  return {
    state,
    setItem,
    clear,
  };
};
