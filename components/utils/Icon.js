import React from 'react';
import { 
    Feather,
    FontAwesome,
    FontAwesome5,
    Fontisto,
    MaterialCommunityIcons,
    Ionicons,
    AntDesign,
    MaterialIcons,
    Entypo
} from '@expo/vector-icons';
import { View } from 'react-native';

export default ({type, name, color, size, style}) => {
    switch(type) {
        case 'Feather': 
            return <View style={{...style}}>
                        <Feather name={name} color={color} size={size} />
                    </View>;
        case 'FontAwesome': 
            return <View style={{...style}}>
                        <FontAwesome name={name} color={color} size={size} />
                    </View>;
        case 'FontAwesome5': 
            return <View style={{...style}}>
                        <FontAwesome5 name={name} color={color} size={size} />
                    </View>;
        case 'MaterialCommunityIcons': 
            return <View style={{...style}}>
                        <MaterialCommunityIcons name={name} color={color} size={size} />
                    </View>;
        case 'Ionicons': 
            return <View style={{...style}}>
                        <Ionicons name={name} color={color} size={size} />
                    </View>;
        case 'AntDesign': 
            return <View style={{...style}}>
                        <AntDesign name={name} color={color} size={size} />
                    </View>;
        case 'MaterialIcons': 
            return <View style={{...style}}>
                        <MaterialIcons name={name} color={color} size={size} />
                    </View>;
        case 'Fontisto': 
            return <View style={{...style}}>
                        <Fontisto name={name} color={color} size={size} />
                    </View>;
        case 'Entypo': 
            return <View style={{...style}}>
                        <Entypo name={name} color={color} size={size} />
                    </View>;
    }
}