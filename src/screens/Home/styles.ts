import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  background: #efefef;
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
  font-weight: bold;
`;

export const HighlightList = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {paddingLeft: 10, paddingRight: 10},
  showsHorizontalScrollIndicator: false,
})`
  height: 200px;
`;

export const Highlight = styled.View`
  border-radius: 8px;
  width: 320px;
  height: 400px;
  padding: 5px;
`;

export const Background = styled.Image`
  height: 300px;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const Info = styled.View`
  background: #fff;
  height: 100px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
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
  color: #4885fd;
`;

export const LoginHover = styled.View.attrs({
  elevation: 5,
})`
  height: 500px;
  width: 100%;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: absolute;
  bottom: ${(props) => (props.visible ? 0 : '-400px')};
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
