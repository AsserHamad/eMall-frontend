import React from 'react';
import { View } from 'react-native';
import Gallery from 'react-native-image-gallery';
import ImageViewer from 'react-native-image-zoom-viewer';
import Header from '../components/Header';
import { useLanguage } from '../hooks/language';

export default ({route}) => {
  const language = useLanguage();
  const en = language === 'en';
    return (
      <View style={{flex: 1}}>
        <Header details={{title: en ? 'Gallery' : 'معرض رسوم'}} />
        <ImageViewer
          style={{ backgroundColor: 'black' }}
          imageUrls={route.params.images.map(im => ({url: im}))}
        />
      </View>
    );
  }