import produce from 'immer';

import {ConnectionsProps, InvitesProps} from '../../../utils/types';

interface ActionProps {
  type: string;
  payload: {
    connections: ConnectionsProps[];
    invites: InvitesProps[];
  };
}

interface InitialStateProps {
  connections: ConnectionsProps[] | null;
  invites: InvitesProps[] | null;
}

const INITIAL_STATE: InitialStateProps = {
  connections: null,
  invites: null,
};

export default function connections(
  state = INITIAL_STATE,
  action: ActionProps,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@connections/GET_CONNECTIONS_SUCCESS': {
        draft.connections = action.payload.connections;
        draft.invites = action.payload.invites;
        break;
      }
      default:
    }
  });
}
