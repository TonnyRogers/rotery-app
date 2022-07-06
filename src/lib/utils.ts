export function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 100);
}

export function translateError(errorMessage: string): string {
  let translated = '';

  switch (errorMessage) {
    case 'This email is already in use.':
      translated = 'Este e-mail ja esta em uso.';
      break;
    case 'Password must be more than 6 characters.':
      translated = 'A senha deve ter mais de 6 digitos.';
      break;
    case 'Cannot find user with provided email':
      translated = 'Erro ao fazer login.';
      break;
    case 'Invalid user password':
      translated = 'Erro ao fazer login.';
      break;
    case 'email validation failed on email':
      translated = 'Erro ao fazer login.';
      break;
    case 'You cannot join to this itinerary anymore.':
      translated = 'Prazo para participar expirado.';
      break;
    case 'Limit of members reached!':
      translated = 'Limite de membros atingido.';
      break;
    case 'Error on login.':
      translated = 'E-mail ou senha incorreta.';
      break;
    case "Can't create user.":
      translated = 'Erro ao se cadastrar.';
      break;
    case "Can't use this e-mail.":
      translated = 'Você não pode usar este e-mail.';
      break;
    case 'This username is already in use.':
      translated = 'Nome de usuário já utilizado.';
      break;
    case 'Inactive user, check your e-mail.':
      translated = 'Usuário não ativado, verifique seu e-mail.';
      break;
    case "You can't join to this itinerary anymore.":
      translated = 'Data limite de inscrição encerrada.';
      break;
    case 'Error on validade creation try again.':
      translated = 'Não foi possivel validar esta ação tente mais tarde.';
      break;
    case "Can't set capacity less than members list.":
      translated =
        'Você não pode setar a capacidade menor que o número de membros.';
      break;

    default:
      translated = `${errorMessage}`;
      break;
  }

  return translated;
}

export function formatChatName(userId: number, ownerId: number) {
  const idsArr = [userId, ownerId];
  const sortedArr = idsArr.sort();
  return `chat:${sortedArr[0]}and${sortedArr[1]}`;
}
