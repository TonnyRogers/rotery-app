import React from 'react';
import DocumentPicker from 'react-native-document-picker';

import {Container, SelectFilesButton} from './styles';

interface FileInputProps {
  onSelect(): [];
}

const FileInput: React.FC<FileInputProps> = ({onSelect, children}) => {
  async function pickFile() {
    try {
      const fileResponse = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });

      // const customFile = {
      //   name: fileResponse.name,
      //   type: fileResponse.type,
      //   uri: fileResponse.uri,
      //   size: fileResponse.size,
      // };

      // setProfileImage(customFile);

      // const formData = new FormData();
      // formData.append('file', fileResponse);

      // const response = await api.post('/profile/avatar', formData);

      // const {id} = response.data;

      // if (!id) {
      //   setProfileImage({uri: ''});
      //   return;
      // }

      // dispatch(updateProfileImageRequest(id));

      onSelect(fileResponse);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.tron.log('DocumentPicker', error); // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        // setProfileImage({uri: ''});
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
