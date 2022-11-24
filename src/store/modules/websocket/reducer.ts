import produce from 'immer';

interface InitialStateProps {
  isConnected: boolean;
}

const INITIAL_STATE: InitialStateProps = {
  isConnected: false,
};

export interface PayloadProps {
  message: string;
  ownerId: number;
  targetId: number;
  authUserId: number;
}

export default function websocket(
  state = INITIAL_STATE,
  action: {type: string; payload: PayloadProps},
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return produce(state, (draft) => {
    switch (action.type) {
      default:
    }
  });
}
