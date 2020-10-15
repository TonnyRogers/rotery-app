import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  flex-direction: column;
  background: #efefef;
  height: 100%;
`;

export const Logo = styled.Image`
  width: 145px;
  height: 34px;
  margin-top: 10px;
`;

export const Header = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  align-self: center;
  font-size: 20px;
  font-family: 'Roboto-Bold';
  margin: 10px 0;
`;

export const HighlightList = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {paddingLeft: 10, paddingRight: 10},
  showsHorizontalScrollIndicator: false,
})`
  height: 424px;
`;

export const TipContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 130px;
`;

export const TipText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  font-family: 'Roboto';
  color: #4885fd;
`;

export const LoginHover = styled(Animated.View).attrs({
  elevation: 5,
})<{visible: boolean}>`
  height: 480px;
  width: 100%;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: absolute;
  bottom: 0;
`;

export const LoginHeader = styled.View`
  align-items: center;
  justify-content: center;
`;

export const SwitchLoginButton = styled.TouchableOpacity`
  margin-top: 10px;
  height: 30px;
  width: 30px;
  align-items: center;
`;

export const HighlightContent = styled.View``;

export const ItineraryName = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 16px;
`;

export const RowGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ItineraryLocation = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  color: #9d9d9d;
`;

export const ItineraryDate = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 14px;
  color: #9d9d9d;
`;

export const LoginContent = styled.View<{visible: boolean}>`
  margin: 20px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

export const Actions = styled.View``;

export const LoginButton = styled.TouchableOpacity`
  flex: 1;
  height: 44px;
  background: #4885fd;
  border-radius: 8px;

  align-items: center;
  justify-content: center;
`;

export const LoginButtonText = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 24px;
  color: #fff;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  margin: 10px;
`;

export const ForgotPasswordButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  color: #9d9d9d;
`;

export const RegisterContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 18px 0;
`;

export const RegisterText = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  color: #9d9d9d;
`;

export const RegisterButton = styled.TouchableOpacity`
  margin: 0 10px;
`;

export const RegisterButtonText = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 16px;
  color: #3dc77b;
`;
