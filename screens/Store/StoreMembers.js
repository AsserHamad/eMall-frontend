import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import TextLato from '../../components/utils/TextLato';
import Constants from 'expo-constants';
import Icon from '../../components/utils/Icon';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import StoreNavbar from '../../components/StoreNavbar/StoreNavbar';
import { Table, Row } from 'react-native-table-component';
import { gStyles } from '../../global.style';
import { useLanguage, useLanguageText } from '../../hooks/language';

const [width, height] = [Dimensions.get('window').width, Dimensions.get('window').height];
const arr = [
    {num: 0, title: "manageMembers"},
    {num: 1, title: "editStore"},
    {num: 2, title: "manageProducts"},
    {num: 3, title: "manageAds"},
    {num: 4, title: "withdrawFunds"},
    {num: 5, title: "editPage"}
];

const StoreMembers = ({navigation}) => {
    const token = useSelector(state => state.authReducer.token);
    const seller = useSelector(state => state.authReducer.account);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const language = useLanguage();
    const en = language === 'en';
    const text = useLanguageText('sellerMembers');
    const containsAuthority = (num) => seller.authorities.filter(auth => auth === num).length > 0;
    useEffect(() => {
        fetch(`${Constants.manifest.extra.apiUrl}/seller/members`, {headers: {token}})
        .then(res => res.json())
        .then(res => {
            setMembers(res);
        });
    }, [refresh]);
    
    useEffect(() => {
        setLoading(false);
    }, [members])

    return (
        <View style={styles.container}>
            <StoreNavbar title={text.title} />
            <ScrollView>
            <ScrollView contentContainerStyle={{paddingBottom: height * 0.03}} horizontal>
                {loading ?
                    <View style={{width, marginVertical: height * 0.2}}>
                        <ActivityIndicator size={RFPercentage(5)} color={gStyles.color_0} />
                    </View>
                :
                <Table borderStyle={{ borderColor: '#c8e1ff'}} style={styles.table}>
                    <Row data={[<TextLato bold style={styles.tableTitle}>{text.memberName}</TextLato>, ...arr.map(elem => <TextLato bold style={styles.tableTitle}>{text[elem.title]}</TextLato>)]} textStyle={{fontSize: RFPercentage(1.5), textAlign: 'center'}} style={styles.head} />
                    {members.map(member => {
                        const name = member._id === seller._id ? `${member.name} (You)` : member.name;
                        const included = arr.map(elem => <MemberCheckbox token={token} setRefresh={setRefresh} member={member} authority={elem} seller={seller} containsAuthority={containsAuthority} />);
                        const nameComponent = (
                            <View key={Math.random()}>
                                <TextLato style={styles.rowText}>{name}</TextLato>
                                <TextLato italic style={styles.rowSubtitle}>{member.title}</TextLato>
                            </View>
                        );
                        return (
                            <Row key={Math.random()} data={[nameComponent, ...included]} style={styles.row} textStyle={{fontSize: RFPercentage(1.5), textAlign: 'center'}} />
                            )
                        })
                }
            <TouchableOpacity 
                activeOpacity={containsAuthority(0) ? 0.7 : 1}
                style={{...styles.addButton, backgroundColor: containsAuthority(0) ? 'white' : '#aaa'}}
                title={'Add Member'}
                onPress={() => containsAuthority(0) ? navigation.push('AddMember', {setRefresh}) : null}>
                    <Icon type={'AntDesign'} color={containsAuthority(0) ? 'black' : '#ddd'} name={containsAuthority(0) ? 'plus' : 'lock'} />
                    <TextLato style={{color: containsAuthority(0) ? 'black' : '#ddd', marginLeft: width * 0.03}}>{text.addMember}</TextLato>
            </TouchableOpacity>
                </Table>
            }
            </ScrollView>
            </ScrollView>
            <Image source={{uri: 'https://imgur.com/AKIpAie.png'}} style={{width, aspectRatio: 734/553, position: 'absolute', bottom: 0}} />
        </View>
    )
}

const MemberCheckbox = ({member, authority, seller, containsAuthority, setRefresh, token}) => {
    const [isChecked, setChecked] = useState(member.authorities.filter(memNum => memNum === authority.num).length > 0);
    const [loading, setLoading] = useState(false);


    const disabled = member._id === seller._id || !containsAuthority(0);
    const updateAuthorities = () => {
        let authorities = isChecked ?
            member.authorities.filter(auth => auth !== authority.num):
            member.authorities.concat(authority.num).sort();
        setChecked(checked => !checked);
        fetch(`${Constants.manifest.extra.apiUrl}/seller/members`, {
            method: 'put',
            headers: {'Content-Type': 'application/json', token},
            body: JSON.stringify({
                member: {
                    _id: member._id,
                    authorities: authorities
                }
            })
        })
        .catch(err => console.log(err));
    }
    return (
        <View key={Math.random()} style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
                activeOpacity={disabled ? 1 : 0.1} 
                style={
                    {...styles.checkBox,
                    borderColor: disabled ? '#aaa' : isChecked ? gStyles.color_2 : gStyles.color_0}}
                onPress={() => disabled ? null : updateAuthorities()}>
                    {loading ? <ActivityIndicator size={20} color={gStyles.color_2} />
                    : isChecked && <Icon type="AntDesign" name="check" size={20} color={disabled ? '#aaa' : isChecked ? gStyles.color_2 : gStyles.color_0} />}
            </TouchableOpacity>
            {/* <CheckBox
                isChecked={isChecked}
                disabled={disabled}
                onToggle={() => disabled ? null : setChecked(check => !check)}
                checkColor={disabled ? '#888' : isChecked ? '#4630EB' : undefined}
                /> */}
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    table: {
        shadowColor: "#000",
        marginHorizontal: width * 0.03,
        paddingHorizontal: width * 0.02,
        marginVertical: height * 0.01,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
    tableTitle: {
        fontSize: RFPercentage(1.7),
        textAlign: 'center',
    },
    rowText: {
        fontSize: RFPercentage(1.8),
        textAlign: 'center'
    },
    rowSubtitle: {
        fontSize: RFPercentage(1.5),
        textAlign: 'center',
        color: '#999'

    },
    checkbox: {
    },
    head: { 
        height: 50, 
        width: width * 2.5,
        borderRadius: 200,
    },
    row: {
        height: 60, 
        width: width * 2.5,
        borderRadius: 200,
    },
    addButton: {
        marginTop: height * 0.02,
        width: width * 0.5,
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#aaa',
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.04,
        marginBottom: height * 0.02
    },
    checkBox: {
        width: 30,
        aspectRatio: 1,
        borderWidth: 3,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StoreMembers;