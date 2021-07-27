import produce from 'immer';
import {OptionsActions} from './actions';

export interface ActivityProps {
  id: number;
  name: string;
  value: string;
}

export interface TransportProps {
  id: number;
  name: string;
  value: string;
}

export interface LodgingProps {
  id: number;
  name: string;
  value: string;
}

export interface InitialStateProps {
  activities: ActivityProps[];
  transports: TransportProps[];
  lodgings: LodgingProps[];
  loading: boolean;
}

interface ActionProps {
  type: string;
  payload: {
    activities: ActivityProps[];
    transports: TransportProps[];
    lodgings: LodgingProps[];
  };
}

const INITIAL_STATE: InitialStateProps = {
  activities: [],
  transports: [],
  lodgings: [],
  loading: false,
};

export default function options(state = INITIAL_STATE, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case OptionsActions.GET_ACTIVITIES_REQUEST: {
        draft.loading = true;
        break;
      }
      case OptionsActions.GET_ACTIVITIES_SUCCESS: {
        draft.activities = action.payload.activities;
        draft.loading = false;
        break;
      }
      case OptionsActions.GET_ACTIVITIES_FAILURE: {
        draft.loading = false;
        break;
      }
      case OptionsActions.GET_LODGINGS_REQUEST: {
        draft.loading = true;
        break;
      }
      case OptionsActions.GET_LODGINGS_SUCCESS: {
        draft.lodgings = action.payload.lodgings;
        draft.loading = false;
        break;
      }
      case OptionsActions.GET_LODGINGS_FAILURE: {
        draft.loading = false;
        break;
      }
      case OptionsActions.GET_TRANSPORTS_REQUEST: {
        draft.loading = true;
        break;
      }
      case OptionsActions.GET_TRANSPORTS_SUCCESS: {
        draft.transports = action.payload.transports;
        draft.loading = false;
        break;
      }
      case OptionsActions.GET_TRANSPORTS_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
