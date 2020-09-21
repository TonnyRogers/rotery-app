import React, {useState, useRef} from 'react';

import {
  Container,
  Content,
  CardContent,
  CardActions,
  SubmitButton,
  SubmitButtonText,
  ImageList,
  ImageButton,
  Background,
  BackgroundCover,
  SIcon,
  Title,
} from './styles';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Card from '../../components/Card';

const images = [
  {
    id: 1,
    url:
      'https://images.theconversation.com/files/271799/original/file-20190430-136810-1mceagq.jpg',
    name: 'file',
    size: '2mb',
  },
  {
    id: 2,
    url:
      'https://s29081.pcdn.co/wp-content/uploads/2017/10/untitled-0183.jpg.optimal.jpg',
    name: 'file',
    size: '2mb',
  },
  {
    id: 3,
    url: 'https://thirdeyetraveller.com/wp-content/uploads/2017/12/slider1.jpg',
    name: 'file',
    size: '2mb',
  },
  {
    id: 4,
    url: '...',
    name: 'file',
    size: '2mb',
    isEmpty: true,
  },
];

const NewItinerary: React.FC = () => {
  const [name, setName] = useState('');

  const nameRef = useRef();

  return (
    <Container>
      <Header />
      <Content>
        <Card icon="chevron-left">
          <CardContent>
            <Input
              label="Nome do Roteiro"
              placeholder="dê um nome para este roteiro."
              value={name}
              ref={nameRef}
              onChange={setName}
            />
            <Title>Imagens</Title>
            <ImageList
              data={images}
              keyExtractor={(item: {id: number}) => item.id}
              numColumns={3}
              renderItem={({item}) => (
                <ImageButton>
                  <Background
                    resizeMode="cover"
                    source={{
                      uri: item.url,
                    }}
                  />
                  <BackgroundCover empty={item.isEmpty}>
                    <SIcon
                      name={
                        item.isEmpty ? 'image-plus' : 'delete-forever-outline'
                      }
                      color={item.isEmpty ? '#D9D8D8' : '#F57373'}
                      size={30}
                    />
                  </BackgroundCover>
                </ImageButton>
              )}
            />
          </CardContent>
          <CardActions>
            <SubmitButton>
              <SubmitButtonText>Salvar</SubmitButtonText>
            </SubmitButton>
          </CardActions>
        </Card>
      </Content>
    </Container>
  );
};

export default NewItinerary;
