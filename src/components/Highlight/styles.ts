import styled from 'styled-components/native';

export const Container = styled.View.attrs({})`
  border-radius: 8px;
  width: 360px;
  padding: 10px;
  background: #e1e1e1;
`;

export const Background = styled.Image`
  height: 300px;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: #fff;
`;

export const Info = styled.View.attrs({
  elevation: 3,
})`
  background: #fff;
  height: 100px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 8px;
`;
