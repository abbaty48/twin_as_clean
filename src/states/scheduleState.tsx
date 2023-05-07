import React, { Dispatch, FC } from 'react';
import { createContext, useReducer } from 'react';
import { scheduleReducer } from '@/src/states/scheduleReducer';
import { ISchedule } from '@/src/commons/models/interfaces/ischedule';
import { IMaterial } from '@/src/commons/models/interfaces/imaterial';

export type StateAction =
  | { type: 'SET_STATES'; payload: ISchedule }
  | { type: 'SET_LOCATION'; payload: string }
  | { type: 'SET_PHONENUMBER'; payload: string }
  | { type: 'SET_SELECTED_MATERIAL'; payload: IMaterial }
  | { type: 'SET_UNSELECTED_MATERIAL'; payload: IMaterial }
  | {
    type: 'CHANGE_SELECTED_MATERIAL';
    payload: { sourceMaterial: IMaterial; destMaterial: IMaterial };
  }
  | {
    type: 'SET_MATERIAL_QUANTITY';
    payload: { materialID: string; quantity: number };
  };

export const scheduleInitialStates: ISchedule = {
  location: '',
  phoneNumber: '',
  materials: [],
  selectedMaterials: [],
  unSelectedMaterials: [],
  totalAmountOnline: 0,
  totalAmountOnPickup: 0,
};

export const StoreContext = createContext<{
  state: ISchedule;
  dispatch: Dispatch<StateAction>;
}>({ state: scheduleInitialStates, dispatch: () => undefined });

export const AppProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(scheduleReducer, scheduleInitialStates);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
