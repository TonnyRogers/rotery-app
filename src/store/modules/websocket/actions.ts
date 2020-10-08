export function wsNotificationMessages() {
  return {
    type: 'WS_NOTIFICATION_MESSAGES',
  };
}

export function wsChatSubscribe(ownerId: number, targetId: number) {
  return {
    type: 'WS_CHAT_SUBSCRIBE',
    payload: {ownerId, targetId},
  };
}

export function wsCloseChatChannel(ownerId: number, targetId: number) {
  return {
    type: 'WS_CLOSE_CHAT_CHANNEL',
    payload: {ownerId, targetId},
  };
}

/*
  para a atualização da conversa em tempo real
  necessario conectar no canal de chat
  e só receber atualizações na tela enquanto estiver lá
  algo como componentDidMount e componentWillUnmount
*/
