import React from 'react';
import DocumentPicker from 'react-native-document-picker';

import api from '../../services/api';

import {Container, SelectFilesButton} from './styles';

interface FileInputProps {
  onSelect(data: []): [];
}

const FileInput: React.FC<FileInputProps> = ({onSelect, children}) => {
  async function pickFile() {
    try {
      const fileResponse = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });

      const formData = new FormData();

      let response;

      if (fileResponse[1]) {
        fileResponse.forEach((file) => {
          formData.append('files', file);
        });

        response = await api.post('/multiple-files', formData);

        const {id} = response.data[0];

        if (!id) {
          return;
        }
      } else {
        formData.append('file', fileResponse[0]);

        response = await api.post('/files', formData);

        const {id} = response.data;

        response.data = [response.data];

        if (!id) {
          return;
        }
      }

      const images = response.data;

      onSelect(images);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.tron.log('DocumentPicker', error);
      } else {
      }
    }
  }

  return (
    <Container>
      <SelectFilesButton onPress={pickFile}>{children}</SelectFilesButton>
    </Container>
  );
};

export default FileInput;
