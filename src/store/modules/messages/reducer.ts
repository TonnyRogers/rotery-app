import produce from 'immer';

export interface MessageProps {
  id: number;
  sender_id: number;
  message: string;
  readed: boolean;
  created_at: string;
  unreaded: number;
  sender: {
    username: string;
    person: {
      file: {
        url: string;
      };
    };
  };
}

interface InitialStateProps {
  messages: MessageProps[];
  conversation: MessageProps[];
  unreadCounter: number;
}

interface ActionProps {
  type: string;
  payload: {
    messages: MessageProps[];
  };
}

const INITIAL_STATE: InitialStateProps = {
  messages: [],
  conversation: [],
  unreadCounter: 0,
};

export default function messages(state = INITIAL_STATE, action: ActionProps) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@messages/GET_MESSAGES_SUCCESS': {
        const grouped: MessageProps[] = action.payload.messages.reduce(
          (accumulator: MessageProps[], current) => {
            const found = accumulator.find(
              (find) => find.sender_id === current.sender_id,
            );

            const value = current;
            if (!found) {
              accumulator.push({...value, unreaded: value.readed ? 0 : 1});
            } else {
              found.unreaded += value.readed ? 0 : 1;
              found.created_at = value.created_at;
            }

            return accumulator;
          },
          [],
        );

        let counter = 0;

        grouped.map((item) => (counter += item.unreaded));

        draft.messages = grouped;
        draft.unreadCounter = counter;
        break;
      }
      case '@messages/GET_CONVERSATION_SUCCESS': {
        draft.conversation = action.payload.messages;
        break;
      }
      default:
    }
  });
}
