import React, {useRef, useState, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import {format, parse} from 'date-fns';
import pt from 'date-fns/locale/pt';
import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';

import {
  updateProfileRequest,
  updateProfileImageRequest,
} from '../../store/modules/profile/actions';

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
  CardHeader,
  BackButton,
} from './styles';
import Header from '../../components/Header';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import DateInput from '../../components/DateInput';

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const {data} = useSelector((state) => state.profile);

  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(data.phone);
  const [cpf, setCpf] = useState(data.cpf);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [profission, setProfission] = useState(data.profission);
  const [birthDate, setBirthDate] = useState(new Date(data.birth));
  const [alertVisible, setAlertVisible] = useState(false);
  const [profileImage, setProfileImage] = useState({
    uri: data.file_id && data.file ? data.file.url : '',
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const cpfRef = useRef();
  const stateRef = useRef();
  const cityRef = useRef();
  const profissionRef = useRef();
  const birthDateRef = useRef();

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
    dispatch(updateProfileRequest(name, birthDate, cpf, profission, phone));
  }

  async function pickFile() {
    try {
      const fileResponse = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      const customFile = {
        name: fileResponse.name,
        type: fileResponse.type,
        uri: fileResponse.uri,
        size: fileResponse.size,
      };

      setProfileImage(customFile);

      const formData = new FormData();
      formData.append('file', customFile);

      const response = await api.post('/profile/avatar', formData);

      const {id} = response.data;

      if (!id) {
        setProfileImage({uri: ''});
        return;
      }

      dispatch(updateProfileImageRequest(id));
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.tron.log('DocumentPicker', error); // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        setProfileImage({uri: ''});
      }
    }
  }

  return (
    <Container>
      <Header />
      <Card>
        <CardHeader>
          <BackButton onPress={() => navigation.navigate('Dashboard')}>
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </BackButton>
        </CardHeader>
        <User>
          <Avatar source={{uri: profileImage.uri}} resizeMode="cover" />
          <ChangeAvatarButton onPress={pickFile}>
            <ChangeAvatarButtonText>Alterar imagem</ChangeAvatarButtonText>
          </ChangeAvatarButton>
          <UserName>{user.username}</UserName>
          <Reputation>
            <Icon name="star" size={24} color="#3dc77b" />
            <Icon name="star" size={24} color="#3dc77b" />
            <Icon name="star" size={24} color="#3dc77b" />
            <Icon name="star" size={24} color="#3dc77b" />
            <Icon name="star-outline" size={24} color="#3dc77b" />
          </Reputation>
          <Joined>Ativo desde {useSinceDate}</Joined>
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
            keyboardType="email-address"
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
            keyboardType="number-pad"
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
            keyboardType="number-pad"
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
          />
          <DateInput date={birthDate} onChange={setBirthDate} />
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
