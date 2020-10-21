export function wsNotificationMessages() {
  return {
    type: '@ws/NOTIFICATION_MESSAGES',
  };
}

export function wsChatSubscribe(ownerId: number, targetId: number) {
  return {
    type: '@ws/CHAT_SUBSCRIBE',
    payload: {ownerId, targetId},
  };
}

export function wsCloseChatChannel(ownerId: number, targetId: number) {
  return {
    type: '@ws/CLOSE_CHAT_CHANNEL',
    payload: {ownerId, targetId},
  };
}

export function wsSubscribeUserToNotifications() {
  return {
    type: '@ws/SUBSCRIBE_USER_TO_NOTIFICATIONS',
  };
}

/*
  para a atualização da conversa em tempo real
  necessario conectar no canal de chat
  e só receber atualizações na tela enquanto estiver lá
  algo como componentDidMount e componentWillUnmount
*/
