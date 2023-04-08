import _ from 'deep-equal';
import { IStateAction, StateActions } from '@stores/store';
import { ISchedule } from '@/src/commons/models/interfaces/ischedule';

export const scheduleReducer = (
  state: ISchedule,
  action: IStateAction
): ISchedule => {
  const { type, payload } = action;

  //   if (_(payload, state, { strict: true })) {
  //     return state;
  //   }
  console.log('PAYLOAD: ', payload);
  switch (type) {
    case StateActions.SET_STATES:
      return {
        ...payload,
      };
    case StateActions.SET_LOCATION:
      return {
        ...state,
        location: payload,
      };
    case StateActions.SET_PHONENUMBER:
      return {
        ...state,
        phoneNumber: payload,
      };
    case StateActions.SET_SELECTED_MATERIALS:
      return {
        ...state,
        selectedMaterials: payload,
      };
    case StateActions.SET_UNSELECTED_MATERIALS:
      return {
        ...state,
        selectedMaterials: payload,
      };
    default:
      return state;
  }
};
