import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import HTTP from './src/utils/axios';

exports.funcs = {
    uploadImage: async (uri, title) => {
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();
        formData.append('photo', {
          uri,
          name: `${title}.${fileType}`,
          type: `image/${fileType}`,
        });
        const options = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          };
        return await HTTP.post(`/upload`, formData, options);
    },
    
    uploadMultipleImages: async (uris, title) => {
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
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };
      return await (await HTTP.post(`/upload-multiple`, formData, options));
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