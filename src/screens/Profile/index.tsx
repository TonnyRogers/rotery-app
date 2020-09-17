import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  User,
  Avatar,
  ChangeAvatarButton,
  ChangeAvatarButtonText,
  UserName,
  Reputation,
  Joined,
  InputContent,
  ActionContent,
  SubmitButton,
  SubmitButtonText,
  DeleteAccountButton,
  DeleteAccountButtonText,
} from './styles';
import Header from '../../components/Header';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Alert from '../../components/Alert';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [profission, setProfission] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const cpfRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();
  const profissionRef = useRef();
  const birthDateRef = useRef();

  function alertToggle() {
    setAlertVisible(!alertVisible);
  }

  return (
    <Container>
      <Header />
      <Card icon="chevron-left">
        <User>
          <Avatar
            source={{
              uri:
                'https://f6s-public.s3.amazonaws.com/profiles/2187188_original.jpg',
            }}
            resizeMode="cover"
          />
          <ChangeAvatarButton>
            <ChangeAvatarButtonText>Alterar imagem</ChangeAvatarButtonText>
          </ChangeAvatarButton>
          <UserName>Tony Amaral</UserName>
          <Reputation>
            <Icon name="star" size={24} color="#3dc77b" />
            <Icon name="star" size={24} color="#3dc77b" />
            <Icon name="star" size={24} color="#3dc77b" />
            <Icon name="star" size={24} color="#3dc77b" />
            <Icon name="star-outline" size={24} color="#3dc77b" />
          </Reputation>
          <Joined>Ativo desde 10 Jun 2004</Joined>
        </User>
      </Card>
      <Card>
        <InputContent>
          <Input
            icon="face-recognition"
            label="Nome"
            placeholder="Digite seu nome completo"
            ref={nameRef}
            value={name}
            onChange={setName}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />
          <Input
            icon="email-outline"
            label="Email"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            value={email}
            onChange={setEmail}
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current.focus()}
          />
          <Input
            icon="cellphone-iphone"
            label="Telefone"
            placeholder="Digite seu telefone"
            ref={phoneRef}
            value={phone}
            onChange={setPhone}
            returnKeyType="next"
            onSubmitEditing={() => cpfRef.current.focus()}
          />
          <Input
            icon="fingerprint"
            label="CPF"
            placeholder="Digite seu CPF"
            ref={cpfRef}
            value={cpf}
            onChange={setCpf}
            returnKeyType="next"
            onSubmitEditing={() => stateRef.current.focus()}
          />
          <Input
            label="Estado"
            placeholder="Digite seu estado"
            ref={stateRef}
            value={state}
            onChange={setState}
            returnKeyType="next"
            onSubmitEditing={() => cityRef.current.focus()}
          />
          <Input
            label="Cidade"
            placeholder="Digite sua cidade"
            ref={cityRef}
            value={city}
            onChange={setCity}
            returnKeyType="next"
            onSubmitEditing={() => profissionRef.current.focus()}
          />
          <Input
            icon="purse-outline"
            label="Profissão"
            placeholder="Digite sua profissão"
            ref={profissionRef}
            value={profission}
            onChange={setProfission}
            returnKeyType="next"
            onSubmitEditing={() => birthDateRef.current.focus()}
          />
          <Input
            icon="calendar-today"
            label="Data de Nascimento"
            placeholder="Queremos saber usa idade"
            ref={birthDateRef}
            value={birthDate}
            onChange={setBirthDate}
            returnKeyType="send"
            onSubmitEditing={() => {}}
          />
        </InputContent>
        <ActionContent>
          <SubmitButton>
            <SubmitButtonText>Atualizar</SubmitButtonText>
          </SubmitButton>
        </ActionContent>
      </Card>
      <DeleteAccountButton onPress={alertToggle}>
        <Icon name="delete-forever-outline" size={24} color="#FFF" />
        <DeleteAccountButtonText>Desativar Conta</DeleteAccountButtonText>
      </DeleteAccountButton>
      <Alert
        title="Opá!"
        icon="clipboard-alert-outline"
        iconColor="#3dc77b"
        visible={alertVisible}
        onRequestClose={() => alertToggle}
        onCancel={alertToggle}
        onConfirm={() => {}}
      />
    </Container>
  );
};

export default Profile;
