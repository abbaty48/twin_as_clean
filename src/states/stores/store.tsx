import React, { Dispatch, useMemo } from 'react';
import react, { createContext, useReducer } from 'react';
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

export const Context = createContext<[state: ISchedule, action: Dispatch<IStateAction>] | null>(null);

export const Store = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(scheduleReducer, scheduleInitialStates);
  return <Context.Provider value={[state, dispatch]}>{props.children}</Context.Provider>;
};
