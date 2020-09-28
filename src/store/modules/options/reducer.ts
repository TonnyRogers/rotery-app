import produce from 'immer';

export interface ActivityProps {
  id: number;
  name: string;
}

export interface TransportProps {
  id: number;
  name: string;
}

export interface LodgingProps {
  id: number;
  name: string;
}

export interface InitialStateProps {
  activities: ActivityProps[];
  transports: TransportProps[];
  lodgings: LodgingProps[];
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
};

export default function options(state = INITIAL_STATE, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@options/GET_ACTIVITIES_SUCCESS': {
        draft.activities = action.payload.activities;
        break;
      }
      case '@options/GET_LODGINGS_SUCCESS': {
        draft.lodgings = action.payload.lodgings;
        break;
      }
      case '@options/GET_TRANSPORTS_SUCCESS': {
        draft.transports = action.payload.transports;
        break;
      }
      default:
    }
  });
}
