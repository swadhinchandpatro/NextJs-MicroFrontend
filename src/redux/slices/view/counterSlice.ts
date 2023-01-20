import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "../../../services/view/counter";
import type { RootState } from "../../store/index";

// * Custom View Slice , only for persisting states related to views.
export const useCounter = () => {
  const count = useSelector((store: RootState) => store.counter.value);
  const dispatch = useDispatch();
  return {
    count,
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    incrementByAmount: (value: number) => incrementByAmount(value),
  };
};
