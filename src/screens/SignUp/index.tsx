import React, {useState, useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {registerRequest} from '../../store/modules/auth/actions';

import {
  Container,
  Fields,
  Actions,
  BackButton,
  BackButtonText,
  SubmitButton,
  SubmitButtonText,
  Header,
  Logo,
  CenteredView,
} from './styles';
import Input from '../../components/Input';
import {TextInput} from 'react-native';
import Page from '../../components/Page';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import {ScrollView} from 'react-native-gesture-handler';
import DismissKeyboad from '../../components/DismissKeyboad';
import SplashScreen from '../../components/SplashScreen';
import {RootStateProps} from '../../store/modules/rootReducer';
const horizontalLogo = require('../../../assets/horizontal-logo.png');

const validationSchema = yup.object().shape({
  username: yup.string().required('campo obrigatório'),
  email: yup.string().email('e-mail inválido').required('campo obrigatório'),
  password: yup
    .string()
    .required('campo obrigatório')
    .min(8, 'a senha deve ter mais de 8 digitos'),
});

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [policyModalVisible, setPolicyModalVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const {loading} = useSelector((state: RootStateProps) => state.auth);
  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});

  useEffect(() => {
    register('username');
    register('password');
    register('email');
  }, [register]);

  const usernameRef = useRef<TextInput>();
  const emailRef = useRef<TextInput>();
  const passwordRef = useRef<TextInput>();

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  function openPolicyModal() {
    setPolicyModalVisible(true);
  }

  const onSubmit = (data: any) => {
    dispatch(registerRequest(data.username, data.email, data.password));
  };

  return (
    <Page showHeader={false}>
      <DismissKeyboad>
        <Container>
          <Header>
            <Logo source={horizontalLogo} resizeMode="contain" />
            <Text.Title alignment="center">Faça parte da Rotery.</Text.Title>
          </Header>
          <Fields>
            <Input
              icon="account-box-outline"
              label="Usuário"
              placeholder="nome de usuário"
              ref={usernameRef}
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
              ref={emailRef}
              onChange={(value: String) => setValue('email', value)}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              error={errors.email?.message}
            />
            <Input
              label="Senha"
              placeholder="sua senha"
              ref={passwordRef}
              onChange={(value: String) => setValue('password', value)}
              secureTextEntry={passwordVisible}
              buttonIcon
              onClickButtonIcon={() => setPasswordVisible(!passwordVisible)}
              onSubmitEditing={() => setPolicyModalVisible(true)}
              returnKeyType="done"
              error={errors.password?.message}
            />
          </Fields>

          <Actions>
            <BackButton onPress={goBack}>
              <BackButtonText>Ja sou cadastrado</BackButtonText>
            </BackButton>
            <SubmitButton onPress={openPolicyModal}>
              <SubmitButtonText>Cadastrar-se</SubmitButtonText>
            </SubmitButton>
          </Actions>
        </Container>
      </DismissKeyboad>
      <Modal
        visible={policyModalVisible}
        title="Termos de Uso"
        onCloseRequest={() => setPolicyModalVisible(false)}>
        <ScrollView>
          <Text.Paragraph alignment="start" withLineBreak textWeight="light">
            Bem-vindo(a) aventureiro(a)! <Text.Title>🏔🛤</Text.Title>
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
            gente aí! <Text.Title>😎👍</Text.Title>
          </Text>

          <Text.Paragraph
            alignment="start"
            textColor="primary"
            textWeight="bold"
            withLineBreak>
            1. O Nosso Serviço
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Somos um app que conecta pessoas que buscam atividades radicais,
            turismo, encontros em grupos relacionados a esportes ou aventuras,
            viagens e passeios, essas atividades podem ser gratuitas ou pagas e
            os próprios usuários denominados como Host são os responsáveis por
            promover estes eventos dentro do app.
          </Text.Paragraph>
          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Os Hosts também detêm toda a responsabilidade sobre o que ocorre nos
            seus Roteiros, por isso se você deseja promover atividades no app,
            tenha muito cuidado, deixe as informações o mais claro possível,
            trabalhe com segurança e atenção, em caso de dúvida não deixe de nos
            mandar um e-mail (contato@rotery.com.br) estamos aqui para ajudar.
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Nossa missão é tornar o acesso a essas atividades muito mais fácil,
            confiável para o máximo de pessoas possível, através deste app,
            criando um ambiente seguro e saudável, por isso se você aceitar os
            termos contamos com sua colaboração para manter o ambiente dentro do
            app assim.
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Acreditamos na comunidade que estamos criando e sabemos que essa não
            é uma tarefa fácil e nem barata, agora vamos falar um pouco mais
            sobre o que esperamos de você como nosso usuário.
          </Text.Paragraph>

          <Text.Paragraph
            alignment="start"
            textColor="primary"
            textWeight="bold"
            withLineBreak>
            2. Seus compromissos com a Rotery
          </Text.Paragraph>

          <Text.Paragraph textWeight="light" alignment="start">
            Primeiramente, quem pode usar nosso app:
          </Text.Paragraph>
          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Você deve ser maior de 18 (dezoito) anos para criar roteiros, pois
            neste caso você estará responsável por aqueles que participarem e
            poderá responder legalmente em caso de ação judicial e afins.
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Para participar de roteiros você deve ser maior de 16 (dezesseis)
            anos e acompanhado(a) de um maior (que não seja o próprio dono do
            roteiro) ou com autorização reconhecida por cartório em nome de seu
            responsável.
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Em caso de roteiros pagos, no presente momento estão sendo feitos
            diretamente para o host por fora do app, mas para trazer mais
            segurança estamos trabalhando para trazer essas transações para
            dentro e com isso por hora o reembolso e afins devem ser tratados
            diretamente com o dono do roteiro (o host).
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Como usuário você deve o respeito a todos os outros membros do app,
            descriminação, racismo, agressões físicas e qualquer outro tipo de
            agressão não será tolerado dentro da comunidade podendo resultar no
            bloqueio ou remoção da sua conta, deixe fora todas as palavras
            ofensivas e desrespeitosas.
          </Text.Paragraph>

          <Text.Paragraph
            alignment="start"
            textColor="primary"
            textWeight="bold"
            withLineBreak>
            3. Sua segurança nos Roteiros
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Dentro das atividades que podem ser promovidas no app é necessário
            ter o máximo de cuidado possível, rotineiramente acontecem diversos
            acidentes com pessoas no meio de trilhas ou viagens por não terem um
            bom senso, descuido ou uma má gerência de "guias", portanto tenha
            cautela, temos um recurso de avaliação e então considere a nota do
            host e suas avaliações antes de ir para o roteiro.
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
            textColor="primary"
            textWeight="bold"
            withLineBreak>
            4. Sua parte na Preservação da Natureza e Meio Ambiente
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Outro motivo em que criamos a Rotery foi auxiliar na preservação e
            manutenção das trilhas e ambientes em meio a natureza, gostaríamos
            de contar com você para isso, se encontrar lixo nas trilhas, viagens
            ou passeios, colete por favor e nos mande uma foto com o que foi
            coletado para promover esta conscientização em nossas redes sociais
            e o mais importante, não deixe seu lixo.
          </Text.Paragraph>

          <Text.Paragraph
            alignment="start"
            textColor="primary"
            textWeight="bold"
            withLineBreak>
            5. Como a Rotery se mantém
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Até o momento somos uma “startup” com poucas pessoas e com custo
            reduzido, mas com crescimento do app, os custos sobem e se torna
            inviável se manter por conta própria e então a exibição de
            propagandas e anúncio relacionados aos roteiros podem aparecer para
            você. {'\n'} Como não temos nenhum anuncio no app até o momento, não
            utilizamos seus dados pessoais para te mostrar anúncios mais
            relevantes, mas se isso acontecer vamos te notificar e não se
            preocupe prezamos pela segurança e transparência com você.
          </Text.Paragraph>

          <Text.Paragraph
            alignment="start"
            textColor="primary"
            textWeight="bold"
            withLineBreak>
            6. Atualização dos Termos
          </Text.Paragraph>

          <Text.Paragraph withLineBreak textWeight="light" alignment="start">
            Os termos da Rotery podem ser alterados a qualquer momento sem
            aviso, mas todos os usuários serão notificados por e-mail da
            atualização de qualquer palavra em qualquer uma de nossas políticas.
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
          <SubmitButton
            onPress={handleSubmit(onSubmit, () =>
              setPolicyModalVisible(false),
            )}>
            <SubmitButtonText>Aceito os Termos</SubmitButtonText>
          </SubmitButton>
        </ScrollView>
      </Modal>
      <SplashScreen visible={loading} />
    </Page>
  );
};

export default SignUp;
