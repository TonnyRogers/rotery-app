/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {format, parse} from 'date-fns';
import pt from 'date-fns/locale/pt';
import {useNavigation} from '@react-navigation/native';

import {phoneBR, cpfCnpj, clearValue} from '../../lib/mask';
import {
  updateProfileRequest,
  updateProfileImageRequest,
} from '../../store/modules/profile/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import {removeUserRequest} from '../../store/modules/profile/actions';

import {
  Container,
  User,
  Avatar,
  ChangeAvatarButton,
  ChangeAvatarButtonText,
  Reputation,
  InputContent,
  ActionContent,
  SubmitButton,
  SubmitButtonText,
  DeleteAccountButton,
  DeleteAccountButtonText,
  CardHeader,
  BackButton,
} from './styles';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import DateInput from '../../components/DateInput';
import PickerInput from '../../components/PickerInput';
import Page from '../../components/Page';
import Text from '../../components/Text';
import FileInput from '../../components/FileInput';

const sexOptions = [
  {
    id: 1,
    name: 'Masculino',
    value: 'male',
  },
  {
    id: 2,
    name: 'Feminino',
    value: 'female',
  },
  {
    id: 3,
    name: 'Outro',
    value: 'other',
  },
];

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootStateProps) => state.auth);
  const {data} = useSelector((state: RootStateProps) => state.profile);

  const [name, setName] = useState(data?.name || '');
  const [gender, setGender] = useState(data?.gender || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(data?.phone || '');
  const [cpf, setCpf] = useState(data?.cpf || '');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [profission, setProfission] = useState(data?.profission || '');
  const [birthDate, setBirthDate] = useState(
    data?.birth ? new Date(data?.birth) : new Date(),
  );
  const [alertVisible, setAlertVisible] = useState(false);
  const [profileImage, setProfileImage] = useState({
    uri: data?.file_id && data.file ? data.file.url : undefined,
  });

  const nameRef = useRef() as any;
  const genderRef = useRef() as any;
  const emailRef = useRef() as any;
  const phoneRef = useRef() as any;
  const cpfRef = useRef() as any;
  const stateRef = useRef() as any;
  const cityRef = useRef() as any;
  const profissionRef = useRef() as any;

  const useSinceDate = useMemo(
    () =>
      format(
        parse(user.created_at, 'yyyy-MM-dd HH:mm:ss', new Date()),
        "MMMM 'de' yyyy",
        {locale: pt},
      ),
    [user],
  );

  function alertToggle() {
    setAlertVisible(!alertVisible);
  }

  function updateProfileHandle() {
    if (!name || !gender || !birthDate || !cpf || !phone) {
      return;
    }

    dispatch(
      updateProfileRequest(
        name,
        gender,
        birthDate.toDateString(),
        Number(clearValue(String(cpf))),
        profission,
        Number(clearValue(String(phone))),
      ),
    );
  }

  function handleDeleteUser() {
    dispatch(removeUserRequest());
    setAlertVisible(false);
  }

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  function handleProfileImage(imageList: any) {
    if (imageList !== undefined) {
      setProfileImage({uri: imageList[0].uri});
      dispatch(updateProfileImageRequest(imageList[0].id));
    }
  }
  return (
    <Page showHeader={false}>
      <Container>
        <Card>
          <CardHeader>
            <BackButton onPress={goBack}>
              <Icon name="chevron-left" size={24} color="#3dc77b" />
            </BackButton>
          </CardHeader>
          <User>
            <Avatar
              source={{uri: profileImage.uri}}
              resizeMode="cover"
              style={{borderColor: '#e1e1e1'}}
            />
            <FileInput onSelect={handleProfileImage}>
              <ChangeAvatarButton>
                <ChangeAvatarButtonText>Alterar imagem</ChangeAvatarButtonText>
              </ChangeAvatarButton>
            </FileInput>
            <Text.Title>{user.username}</Text.Title>
            <Reputation>
              <Icon name="star" size={24} color="#3dc77b" />
              <Icon name="star" size={24} color="#3dc77b" />
              <Icon name="star" size={24} color="#3dc77b" />
              <Icon name="star" size={24} color="#3dc77b" />
              <Icon name="star-outline" size={24} color="#3dc77b" />
            </Reputation>
            <Text textWeight="light">Ativo desde {useSinceDate}</Text>
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
              onSubmitEditing={() => emailRef.current?.focus()}
            />
            <PickerInput
              label="Sexo"
              value={gender}
              onChange={setGender}
              options={sexOptions}
              ref={genderRef}
              byValue={true}
            />
            <Input
              icon="email-outline"
              label="Email"
              placeholder="Digite seu e-mail"
              ref={emailRef}
              value={email}
              onChange={setEmail}
              returnKeyType="next"
              onSubmitEditing={() => phoneRef.current?.focus()}
              keyboardType="email-address"
            />
            <Input
              icon="cellphone-iphone"
              label="Telefone"
              placeholder="Digite seu telefone"
              ref={phoneRef}
              value={phoneBR(String(phone))}
              onChange={setPhone}
              returnKeyType="next"
              onSubmitEditing={() => cpfRef.current?.focus()}
              keyboardType="number-pad"
            />
            <Input
              icon="fingerprint"
              label="CPF"
              placeholder="Digite seu CPF"
              ref={cpfRef}
              value={cpfCnpj(String(cpf))}
              onChange={setCpf}
              returnKeyType="next"
              onSubmitEditing={() => stateRef.current?.focus()}
              keyboardType="number-pad"
            />
            <Input
              label="Estado"
              placeholder="Digite seu estado"
              ref={stateRef}
              value={state}
              onChange={setState}
              returnKeyType="next"
              onSubmitEditing={() => cityRef.current?.focus()}
            />
            <Input
              label="Cidade"
              placeholder="Digite sua cidade"
              ref={cityRef}
              value={city}
              onChange={setCity}
              returnKeyType="next"
              onSubmitEditing={() => profissionRef.current?.focus()}
            />
            <Input
              icon="purse-outline"
              label="Profissão"
              placeholder="Digite sua profissão"
              ref={profissionRef}
              value={profission}
              onChange={setProfission}
              returnKeyType="next"
            />
            <DateInput
              label="Nascimento"
              date={birthDate}
              onChange={setBirthDate}
            />
          </InputContent>
          <ActionContent>
            <SubmitButton onPress={() => updateProfileHandle()}>
              <SubmitButtonText>Atualizar</SubmitButtonText>
            </SubmitButton>
          </ActionContent>
        </Card>

        <DeleteAccountButton onPress={alertToggle}>
          <Icon name="delete-forever-outline" size={24} color="#FFF" />
          <DeleteAccountButtonText>Desativar Conta</DeleteAccountButtonText>
        </DeleteAccountButton>
      </Container>
      <Alert
        title="Opá!"
        message="você deseja realmente excluir sua conta?"
        icon="clipboard-alert-outline"
        iconColor="#3dc77b"
        visible={alertVisible}
        onRequestClose={(value) => setAlertVisible(value)}
        onCancel={alertToggle}
        onConfirm={() => handleDeleteUser()}
      />
    </Page>
  );
};

export default Profile;
