/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {registerRequest} from '../../store/modules/auth/actions';

import {
  Fields,
  SubmitButton,
  SubmitButtonText,
  Header,
  Logo,
  CenteredView,
} from './styles';
import Input from '../../components/Input';
import Page from '../../components/Page';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStateProps} from '../../store/modules/rootReducer';
import {YupValidationMessages} from '../../utils/enums';
import {PageContainer} from '../../components/PageContainer';
import Divider from '../../components/Divider';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LoadingContext} from '../../context/loading/context';
import {authenticate} from '../../providers/google-oauth';
import {gOAuthPasswordGen} from '../../utils/helpers';

const horizontalLogo = require('../../../assets/horizontal-logo.png');

interface UseFormFields {
  username: string;
  password: string;
  email: string;
  isGuide: boolean;
}

const validationSchema = yup.object().shape({
  username: yup.string().required(YupValidationMessages.REQUIRED),
  email: yup
    .string()
    .email('e-mail inválido')
    .required(YupValidationMessages.REQUIRED),
  password: yup
    .string()
    .required(YupValidationMessages.REQUIRED)
    .min(8, 'a senha deve ter mais de 8 digitos'),
  isGuide: yup
    .boolean()
    .required()
    .default(() => false),
});

const SignUp: React.FC = () => {
  const {setLoading, isLoading} = useContext(LoadingContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [policyModalVisible, setPolicyModalVisible] = useState(false);
  const [isFirstStepVisible, setFirstStepVisible] = useState(true);
  const [isGuideVisible, setGuideVisible] = useState(false);
  const [isBackpackerVisible, setBackpackerVisible] = useState(false);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isGoogleOauth, setIsGoogleOauth] = useState(false);
  const {loading} = useSelector((state: RootStateProps) => state.auth);
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<UseFormFields>({resolver: yupResolver(validationSchema)});

  useEffect(() => {
    register('username');
    register('password');
    register('email');
    register('isGuide');

    setValue('isGuide', false);
  }, [register, setValue]);

  const usernameRef = useRef<any>();
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const watchUsername = watch('username');
  const watchPassword = watch('password');
  const watchEmail = watch('email');

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  function openPolicyModal() {
    setPolicyModalVisible(true);
  }

  function handleInitialStep() {
    setFirstStepVisible(true);
    setGuideVisible(false);
    setBackpackerVisible(false);
  }

  function handleGuide() {
    setFirstStepVisible(false);
    setGuideVisible(true);
    setValue('isGuide', true);
  }

  function handleBackpacker() {
    setFirstStepVisible(false);
    setBackpackerVisible(true);
    setValue('isGuide', false);
  }

  const onSubmit = (data: UseFormFields) => {
    dispatch(
      registerRequest(data.username, data.email, data.password, data.isGuide),
    );
    setPolicyModalVisible(false);
    setValue('username', '');
    setValue('password', '');
    setValue('email', '');
    setValue('isGuide', false);
  };

  async function handleOAuthSignup() {
    const authUser = await authenticate();
    if (authUser) {
      onSubmit({
        email: authUser.user.email,
        isGuide: getValues().isGuide,
        username: `${authUser.user.givenName}${authUser.user.familyName}`,
        password: gOAuthPasswordGen(authUser.user.email),
      });
    }
  }

  async function handleOpenPolicyModalOAuth() {
    openPolicyModal();
    setIsGoogleOauth(true);
  }

  useEffect(() => {
    if (loading !== isLoading) {
      setLoading(loading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Page showHeader={false}>
      <PageContainer isScrollable={false}>
        {isFirstStepVisible && (
          <>
            <Header>
              <Logo source={horizontalLogo} resizeMode="contain" />
              <Text.Title alignment="center">
                Faça parte da comunidade
              </Text.Title>
            </Header>
            <Divider />
            <Divider />
            <Text.Big
              textWeight="bold"
              textColor="primaryText"
              alignment="center">
              Você é um(a)
            </Text.Big>
            <Card containerStyle={{flex: undefined, height: 180}}>
              <Text.Title alignment="center">Guia</Text.Title>
              <Text.Paragraph alignment="center">
                Você deseja ajudar os mochileiros dando dicas, auxiliando em
                locais que você conhece e recebendo por isso.
              </Text.Paragraph>
              <Button onPress={handleGuide} bgColor="blue" sizeMargin="2rem 0 ">
                Esse(a) sou eu
              </Button>
            </Card>
            <Card containerStyle={{flex: undefined, height: 180}}>
              <Text.Title alignment="center">Mochileiro</Text.Title>
              <Text.Paragraph alignment="center">
                Você viaja explorando o país, buscando aventuras e desafios,
                seja sozinho ou acompanhado.
              </Text.Paragraph>
              <Button
                onPress={handleBackpacker}
                bgColor="green"
                sizeMargin="2rem 0 ">
                Esse(a) sou eu
              </Button>
            </Card>
            <Button
              hasShadow={false}
              customContent
              onPress={goBack}
              bgColor="transparent"
              sizeMargin="1rem 0 0 0">
              <Text.Paragraph textWeight="bold" textColor="green">
                Ja sou cadastrado
              </Text.Paragraph>
            </Button>
          </>
        )}
        {(isGuideVisible || isBackpackerVisible) && (
          <>
            <Button
              onPress={handleInitialStep}
              customContent
              sizeHeight={4}
              sizeWidth={4}
              sizeBorderRadius={20}
              sizePadding={0}
              sizeMargin="1rem 0 0 0"
              bgColor="greenTransparent"
              textColor="white">
              <Icon name="chevron-left" size={24} color="#3dc77b" />
            </Button>
            <Header>
              <Logo source={horizontalLogo} resizeMode="contain" />
              <Text.Title alignment="center">
                Você esta quase la {isBackpackerVisible ? 'Mochileiro' : 'Guia'}
                !
              </Text.Title>
            </Header>
            <Fields>
              <Input
                icon="account-box-outline"
                label="Usuário"
                placeholder="seu nome de usuário"
                ref={usernameRef.current}
                value={watchUsername}
                onChange={(value: String) => setValue('username', value)}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                error={errors.username?.message}
              />
              <Input
                icon="email-outline"
                label="Email"
                keyboardType="email-address"
                placeholder="seu e-mail"
                autoCapitalize="none"
                ref={emailRef.current}
                onChange={(value: String) => setValue('email', value)}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                error={errors.email?.message}
                value={watchEmail}
              />
              <Input
                label="Senha"
                placeholder="sua senha"
                ref={passwordRef.current}
                onChange={(value: String) => setValue('password', value)}
                secureTextEntry={passwordVisible}
                buttonIcon
                onClickButtonIcon={() => setPasswordVisible(!passwordVisible)}
                onSubmitEditing={() => setPolicyModalVisible(true)}
                returnKeyType="done"
                error={errors.password?.message}
                value={watchPassword}
              />
            </Fields>

            <Button
              onPress={
                isPolicyAccepted ? handleSubmit(onSubmit) : openPolicyModal
              }
              bgColor={isBackpackerVisible ? 'green' : 'blue'}
              sizeMargin="1rem 0 0 0">
              Cadastrar-se
            </Button>
            <Divider />
            <Text alignment="center">Outras opções de cadastro</Text>
            <Button
              onPress={
                isPolicyAccepted
                  ? handleOAuthSignup
                  : handleOpenPolicyModalOAuth
              }
              bgColor="red"
              sizeMargin="1rem 0 0 0">
              Cadastrar com Google
            </Button>
            <Button
              hasShadow={false}
              customContent
              onPress={goBack}
              bgColor="transparent"
              sizeMargin="1rem 0 0 0">
              <Text.Paragraph textWeight="bold" textColor="green">
                Ja sou cadastrado
              </Text.Paragraph>
            </Button>
          </>
        )}
      </PageContainer>
      <Modal
        visible={policyModalVisible}
        title="Termos de Uso"
        onCloseRequest={() => setPolicyModalVisible(false)}>
        <ScrollView>
          <Text.Paragraph alignment="start" withLineBreak textWeight="light">
            Bem-vindo(a) {isBackpackerVisible ? 'mochileiro(a)' : 'guia'}! 🏔🛤
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Antes de utilizar nosso app gostaríamos que você conhecesse um pouco
            mais sobre nossos termos de uso, eles foram criados pensando na sua
            segurança no mundo digital , para firmar uma ótima relação entre
            usuários e empresa, contamos com sua atenção ao ler e aceitar (ou
            não) estes termos.
          </Text.Paragraph>

          <Text withLineBreak textWeight="light">
            **Poucas pessoas param para ler os termos, então dá essa força pra a
            gente aí! 😎👍
          </Text>

          <Text.Paragraph
            alignment="start"
            textColor="primaryText"
            textWeight="bold"
            withLineBreak>
            1. O Nosso Serviço
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Somos um app que conecta pessoas que buscam atividades radicais,
            turismo, encontros em grupos relacionados a esportes ou aventuras,
            viagens e passeios, essas atividades podem ser gratuitas ou pagas.
          </Text.Paragraph>
          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Os usuários denomidaos como Guias oferecem ajuda através do chat
            para auxiliar os Mochileiros em locais desconhecidos, ou afim de
            tirar duvidas, informações privilegiadas e situações semelhantes.
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Nossa missão é tornar o acesso a essas atividades muito mais fácil,
            confiável para o máximo de pessoas possível, através deste app,
            criando um ambiente seguro e saudável, por isso se você aceitar os
            termos contamos com sua colaboração para manter o ambiente na
            comunidade assim.
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Acreditamos na comunidade que estamos criando e sabemos que essa não
            é uma tarefa fácil, vamos falar um pouco mais sobre o que esperamos
            de você como usuário.
          </Text.Paragraph>

          <Text.Paragraph
            alignment="start"
            textColor="primaryText"
            textWeight="bold"
            withLineBreak>
            2. Seus compromissos com a Mochilee
          </Text.Paragraph>

          <Text.Paragraph textWeight="light" alignment="start">
            Primeiramente, quem pode usar nosso app:
          </Text.Paragraph>

          {isGuideVisible && (
            <Text.Paragraph withLineBreak textWeight="light" alignment="start">
              Você deve ser maior de 18 (dezoito) anos se quiser ser um Guia,
              além de ter experiência com atividades a céu aberto (trilha,
              camping e etc...), aquilo que você disser nos chats será salvo e
              pode ser utilizado como prova contra assédio, racismo, preconceito
              e afins.
            </Text.Paragraph>
          )}

          {isBackpackerVisible && (
            <Text.Paragraph withLineBreak textWeight="light" alignment="start">
              Para participar dos chats com Guias você deve ser maior de 16
              (dezesseis) anos ou pode solicitar para seu responsável interagir
              por você (necessário que ele crie uma conta neste caso).
            </Text.Paragraph>
          )}

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Como usuário você deve o respeito a todos os outros membros do app,
            descriminação, racismo, qualquer outro tipo de agressão não será
            tolerado dentro da comunidade podendo resultar no bloqueio ou
            remoção da sua conta, deixe fora todas as palavras ofensivas e
            desrespeitosas.
          </Text.Paragraph>

          <Text.Paragraph
            alignment="start"
            textColor="primaryText"
            textWeight="bold"
            withLineBreak>
            3. Sua segurança
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Dentro do mundo digital é necessário ter o maior cuidado possivel,
            por isso nunca fornerça seus dados (telefone, endereço e etc...)
            para os usuário toda interação dentro do app deve ser segura e se
            limitar a suas duvidas sobre o local, atividade e etc...
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Nós coletamos alguns dados mais sensíveis como CPF e localização
            após o cadastro para a confirmação de sua identidade e quaisquer
            eventuais problemas judiciais atrelados a você.
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Caso presencie algo desrespeitoso, imprudente ou que ponha a vida de
            outros usuários em risco, fotografe, filme, nos notifique e denuncie
            para que o responsável seja punido, contamos com você!
          </Text.Paragraph>

          <Text.Paragraph
            alignment="start"
            textColor="primaryText"
            textWeight="bold"
            withLineBreak>
            4. Sua parte na Preservação da Natureza e Meio Ambiente
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Outro motivo em que criamos a Mochilee foi auxiliar na preservação e
            manutenção das trilhas e ambientes em meio a natureza, gostaríamos
            de contar com você para isso, se encontrar lixo nas trilhas, viagens
            ou passeios, colete por favor e nos mande uma foto com o que foi
            coletado para promover esta conscientização em nossas redes sociais
            e o mais importante, não deixe seu lixo.
          </Text.Paragraph>

          <Text.Paragraph
            alignment="start"
            textColor="primaryText"
            textWeight="bold"
            withLineBreak>
            5. Como a Mochilee se mantém
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Até o momento somos uma "iniciativa" com poucas pessoas e com custo
            reduzido, mas com crescimento do app, os custos sobem e se torna
            inviável se manter por conta própria e então a exibição de
            propagandas e anúncio relacionados aos roteiros podem aparecer para
            você. {'\n'} Como não temos nenhum anuncio no app até o momento, não
            utilizamos seus dados para te mostrar anúncios mais relevantes, mas
            se isso acontecer vamos te notificar e não se preocupe, prezamos
            pela segurança e transparência com você.
          </Text.Paragraph>

          <Text.Paragraph
            alignment="start"
            textColor="primaryText"
            textWeight="bold"
            withLineBreak>
            6. Atualização dos Termos
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Os termos do app podem ser alterados a qualquer momento sem aviso,
            mas todos os usuários serão notificados por e-mail da atualização de
            qualquer palavra em qualquer uma de nossas políticas.
          </Text.Paragraph>

          <CenteredView>
            <Logo source={horizontalLogo} resizeMode="contain" />
          </CenteredView>

          <Text
            textColor="blue"
            withLineBreak
            alignment="center"
            textWeight="light">
            Ultima atualização 15/07/2021
          </Text>
          {isGoogleOauth ? (
            <SubmitButton
              onPress={() => {
                setPolicyModalVisible(false);
                handleOAuthSignup();
              }}>
              <SubmitButtonText>Aceito os Termos</SubmitButtonText>
            </SubmitButton>
          ) : (
            <SubmitButton
              onPress={handleSubmit(onSubmit, () => {
                setPolicyModalVisible(false);
                setIsPolicyAccepted(true);
              })}>
              <SubmitButtonText>Aceito os Termos</SubmitButtonText>
            </SubmitButton>
          )}
        </ScrollView>
      </Modal>
    </Page>
  );
};

export default SignUp;
