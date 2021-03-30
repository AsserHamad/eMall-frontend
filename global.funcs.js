import Constants from 'expo-constants';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

exports.funcs = {
    uploadImage: async (uri, title, token) => {
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();
        formData.append('photo', {
          uri,
          name: `${title}.${fileType}`,
          type: `image/${fileType}`,
        });
        const options = {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json',
              token,
              'Content-Type': 'multipart/form-data',
            },
          };
        return await (await fetch(`${Constants.manifest.extra.apiUrl}/upload`, options)).json();
    },
    
    uploadMultipleImages: async (uris, title, token) => {
      let formData = new FormData();
      const arr = [];
      uris.forEach(uri => {
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const info = {uri: uri, name: `${title}.${fileType}`, type: `image/${fileType}`}
        arr.push(info);
        formData.append('photos[]', info);
      })
      const options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            token,
            'Content-Type': 'multipart/form-data',
          },
        };
      return await (await fetch(`${Constants.manifest.extra.apiUrl}/upload-multiple`, options)).json();
  },

  chooseImage: async (func, aspect) => {
    (async () => {
      if(Platform.OS !== 'web'){
          const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
          if(status !== 'granted') {
              const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
              if (newPermission.status === 'granted') {
                  ImagePicker.launchImageLibraryAsync({
                      mediaTypes: ImagePicker.MediaTypeOptions.All,
                      aspect,
                      allowsEditing: true,
                      quality: 1,
                    })
                    .then(res => {
                        if(!res.cancelled) {
                          func(res.uri);
                        }
                    })
              }
              else alert('Sorry, we need camera roll permission to pick an image!')
          } else {
              ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  aspect,
                  allowsEditing: true,
                  quality: 1,
                })
                .then(res => {
                    if(!res.cancelled) {
                        func(res.uri);
                    }
                })
          }
      }
    })();
  }
}