export function wsNotificationMessages() {
  return {
    type: 'WS_NOTIFICATION_MESSAGES',
  };
}

export function wsChatSubscribe() {
  return {
    type: 'WS_CHAT_SUBSCRIBE',
  };
}

/*
  para a atualização da conversa em tempo real
  necessario conectar no canal de chat
  e só receber atualizações na tela enquanto estiver lá
  algo como componentDidMount e componentWillUnmount
*/
