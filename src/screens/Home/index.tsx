import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Logo,
  Header,
  HighlightList,
  Background,
  Info,
  Highlight,
  Title,
  LoginHover,
  LoginHeader,
  SwitchLoginButton,
  TipContent,
  TipText,
} from './styles';
import horizontalLogo from '../../assets/horizontal-logo.png';

const Home: React.FC = () => {
  const [loginVisible, setLoginVisible] = useState(false);

  return (
    <Container>
      <Header>
        <Logo source={horizontalLogo} resizeMode="contain" />
      </Header>
      <Title>Destaques</Title>
      <HighlightList>
        <Highlight>
          <Background
            source={{
              uri:
                'https://youmatter.world/app/uploads/sites/2/2019/11/travel-world.jpg',
            }}
            resizeMode="cover"
          />
          <Info />
        </Highlight>

        <Highlight>
          <Background
            source={{
              uri:
                'https://nerdymates.com/static/img/regular/shutterstock_1044339595.jpg',
            }}
            resizeMode="cover"
          />
          <Info />
        </Highlight>

        <Highlight>
          <Background
            source={{
              uri:
                'https://cdn.businesstraveller.com/wp-content/uploads/fly-images/985033/Column-Travel-916x516.jpg',
            }}
            resizeMode="cover"
          />
          <Info />
        </Highlight>
      </HighlightList>
      <TipContent>
        <Icon name="keyboard-arrow-left" size={24} color="#4885fd" />
        <TipText> Arraste para ver mais</TipText>
      </TipContent>
      <LoginHover visible={loginVisible}>
        <LoginHeader>
          <SwitchLoginButton onPress={() => setLoginVisible(!loginVisible)}>
            <Icon
              name={loginVisible ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
              size={30}
              color="#545454"
            />
          </SwitchLoginButton>
        </LoginHeader>
      </LoginHover>
    </Container>
  );
};

export default Home;
