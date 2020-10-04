import produce from 'immer';

export interface ProfileProps {
  id: number;
  name: string | null;
  gender: string | null;
  birth: string | null;
  cpf: number | null;
  profission: string | null;
  phone: number | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  file_id: number | null;
  file: {
    url: string;
  };
}

interface UserProps {
  id: number;
  username: string;
  email: string;
  person: ProfileProps;
}

export interface ConnectionsProps {
  id: number;
  owner_id: number;
  user_id: number;
  blocked: boolean;
  accepted: boolean;
  owner: UserProps[];
  target: UserProps[];
}

interface ActionProps {
  type: string;
  payload: {
    connections: ConnectionsProps[];
  };
}

interface InitialStateProps {
  list: ConnectionsProps[] | null;
}

const INITIAL_STATE: InitialStateProps = {
  list: null,
};

export default function connections(
  state = INITIAL_STATE,
  action: ActionProps,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@connections/GET_CONNECTIONS_SUCCESS': {
        draft.list = action.payload.connections;
        break;
      }
      default:
    }
  });
}
