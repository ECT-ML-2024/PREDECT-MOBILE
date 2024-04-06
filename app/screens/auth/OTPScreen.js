import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import useApi from '../../hooks/useApi';
import register from '../../api/register';
import routes from '../../navigations/routes';

function OTPScreen({navigation,route}) {
    const {email} = route.params;
    const { width } = useAuth();
    const verifyCodeApi=useApi(register.verifyCode);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [active, setActive] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    const inputRefs = useRef([]);

    useEffect(() => {
        if (code[code.length - 1] !== '' && code.every(char => char !== '')) {
            handleSubmit();
        }
    }, [code]);

    const handleInputChange = (index, text) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Move focus to the next input field if available
        if (text.length === 1 && index < code.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };
    

    async function handleSubmit(){
        setActive(true);
        console.log(email)
        const otp = code.filter(char => char !== '').join('');
        const results =await verifyCodeApi.request({code:otp,email});

        if(results.data.status){
            navigation.replace(routes.NEW_FORGET_PASSWORD,{
                code:results.data.code,
                email:email
            });
        }else{
            setErrorMsg('code mismatch')
        }
        console.log(results.data.status)

        setActive(false)
    };
    

    return (
        <View style={styles.container}>
            <View style={{ width: width * 0.9 }}>

                <AppText fontSize={width * 0.06} width={width * 0.4} color={colors.secondary} fontFamily='PoppinsSemiBold'>OTP <AppText fontSize={width * 0.06} >your password?</AppText></AppText>
                <AppText>Enter your email address. We will send a verification code to your email.</AppText>
            </View>

            <View style={{ width: width * 0.9, marginTop: '10%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.7, alignSelf: 'center' }}>
                    {code.map((char, index) => (
                        <View key={index} style={styles.Input}>
                            <TextInput
                                ref={ref => inputRefs.current[index] = ref}
                                style={[styles.text, { fontSize: width * 0.05 }]}
                                textAlign='center'
                                maxLength={1}
                                placeholder=''
                                keyboardType='numeric' // Set keyboardType to numeric to restrict input to numbers
                                value={char}
                                onChangeText={text => handleInputChange(index, text)}
                            />
                        </View>
                    ))}
                </View>
            </View>
            {errorMsg&&<AppText marginTop='5%' color={'red'}>{errorMsg}</AppText>}
            <AppButton text={'Send'} width={width * 0.9} marginTop={!errorMsg?'15%':'10%'} onPress={handleSubmit} active={active}/>

        </View>
    );
}

export default OTPScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary
    },
    Input: {
        padding: '3%',
        backgroundColor: colors.textInputBG,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'PoppinsSemiBold',
        color: colors.secondary,
    }
});