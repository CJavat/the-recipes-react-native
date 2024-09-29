import {Button, Image, Text, View} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';

import {DashboardLayout} from '../../layouts/DashboardLayout';
import {useState} from 'react';

//TODO: TERMINAR SCREEN
export const UpdateImageScreen = () => {
  const [image, setImage] = useState(''); //! Borrar al terminar componente

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 700,
      height: 700,
      cropping: true, // Permite el recorte
    }).then((image: ImageOrVideo) => {
      //TODO: Convertir el archivo en FILE y después enviarlo como FormData al updatePhoto de user.action
      setImage(image.path); //! Borrar al terminar componente

      const file = createFile(image);
      console.log('Archivo convertido:', file);
    });
  };

  const createFile = (image: ImageOrVideo) => {
    const {path, mime} = image; // Obtener la ruta y tipo MIME
    const filename = path.split('/').pop(); // Obtener el nombre del archivo

    const file = {
      uri: path, // URI local de la imagen
      type: mime, // Tipo de archivo (MIME)
      name: filename, // Nombre del archivo
    };

    return file;
  };

  return (
    <DashboardLayout>
      <Text>UpdateImageScreen</Text>

      <Button title="Seleccionar Imagen" onPress={pickImage} />

      {
        //! Borrar al terminar componente
        image && (
          <Image source={{uri: image}} style={{width: 300, height: 400}} />
        )
      }
    </DashboardLayout>
  );
};
