import produce from 'immer';

const INITIAL_STATE = {
  messages: '',
};

export default function websocket(
  state = INITIAL_STATE,
  action: {type: string; payload: {message: string}},
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'WS_NOTIFICATION_MESSAGES': {
        draft.messages = 'Agora Foi';
        break;
      }
      default:
    }
  });
}
