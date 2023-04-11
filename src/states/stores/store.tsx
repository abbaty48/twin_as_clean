import React, { Dispatch, FC } from 'react';
import { createContext, useReducer } from 'react';
import { scheduleReducer } from '@reducers/scheduleReducer';
import { ISchedule } from '@/src/commons/models/interfaces/ischedule';


export enum StateActions {
  SET_LOCATION,
  SET_PHONENUMBER,
  SET_STATES,
  SET_SELECTED_MATERIALS,
  SET_UNSELECTED_MATERIALS,
}

export interface IStateAction {
  type: StateActions;
  payload: any;
}

const scheduleInitialStates: ISchedule = {
  location: '',
  phoneNumber: '',
  materials: [],
  selectedMaterials: [],
  unSelectedMaterials: [],
  totalAmountOnline: 0,
  totalAmountOnPickup: 0,
};

export const StoreContext =
  createContext<{ state: ISchedule, dispatch: Dispatch<IStateAction> }>({ state: scheduleInitialStates, dispatch: () => null });

export const StoreProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(scheduleReducer, scheduleInitialStates);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};
