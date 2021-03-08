import styled from 'styled-native-components';
import {Animated, Platform} from 'react-native';

const metric = Platform.OS === 'ios' ? 'vh' : '%';

export const SafeView = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background: #f6f6f6;
  height: ${'100' + metric};
`;

export const Logo = styled.Image`
  width: 14.5rem;
  height: 3.4rem;
  margin-top: 1.2rem;
`;

export const Header = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  align-self: center;
  font-size: 2rem;
  font-family: 'Roboto-Bold';
  margin: 1rem 0;
`;

export const HighlightList = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {paddingLeft: 10, paddingRight: 10},
  showsHorizontalScrollIndicator: false,
})`
  height: 42.4rem;
`;

export const TipContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10rem;
`;

export const TipText = styled.Text`
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'Roboto';
  color: #4885fd;
`;

export const LoginHover = styled(Animated.View)<{visible: boolean}>`
  height: 48rem;
  width: 100%;
  background: #fff;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  position: absolute;
  bottom: 0;
  elevation: 2;
`;

export const LoginHeader = styled.View`
  align-items: center;
  justify-content: center;
`;

export const SwitchLoginButton = styled.TouchableOpacity`
  margin-top: 1rem;
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
`;

export const HighlightContent = styled.View``;

export const ItineraryName = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 1.6rem;
`;

export const RowGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ItineraryLocation = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const ItineraryDate = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const LoginContent = styled.View<{visible: boolean}>`
  margin: 2rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

export const Actions = styled.View``;

export const LoginButton = styled.TouchableOpacity`
  flex: 1;
  height: 4.4rem;
  background: #4885fd;
  border-radius: 0.8rem;

  align-items: center;
  justify-content: center;
`;

export const LoginButtonText = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 2.4rem;
  color: #fff;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  margin: 1rem;
`;

export const ForgotPasswordButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  color: #9d9d9d;
`;

export const RegisterContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1.8rem 0;
`;

export const RegisterText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  color: #9d9d9d;
`;

export const RegisterButton = styled.TouchableOpacity`
  margin: 0 1rem;
`;

export const RegisterButtonText = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 1.6rem;
  color: #3dc77b;
`;
