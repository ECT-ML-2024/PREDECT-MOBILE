import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import RadioGroup from 'react-native-radio-buttons-group';


import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import useApi from '../../hooks/useApi';
import register from '../../api/register';
import routes from '../../navigations/routes';
import AppTextInputPassword from '../../components/AppTextInputPassword';


const ReviewSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().min(5).required(),
    password: yup.string().min(6).required()
  })

  const setData =[
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Male',
        value: 'male'
    },
    {
        id: '2',
        label: 'Female',
        value: 'female'
    }
]
function EditProfileScreen({navigation}) {
    const {width,user,logIn} =useAuth();
    const registerApi =useApi(register.updateUserProfile)
    const [active,setActive]=useState(false);
    const [sex, setSex] = useState(user.sex=='male'?'1':'2');
    const radioButtons = useMemo(() => (setData), []);

    const handleSubmit = async ({email,password,username}) =>{
        setActive(true);
        const result = await registerApi.request({email:email.trim(),password:password.trim(),sex:setData[sex-1].value,username:username.trim(),doctorId:user._id});
        if(!result.ok){
            console.log(result.data)
          setActive(false);
          return;
        };
        setActive(false);
        alert("Account has been updated successful!");
        logIn(result.data)
        // navigation.goBack();
    }

return (
<View style={styles.container}>
    <View style={{width:width*0.9}}>
        <View style={{width:width*0.25,height:width*0.25}}>
            <Image style={{width:'100%',height:'100%'}} source={require('../../assets/images/avatar.png')}/>
        </View>
        <AppText fontSize={width*0.06} color={colors.secondary} fontFamily='PoppinsSemiBold'>Update Profile</AppText>
    </View>

    <Formik
          initialValues={{email:user.email, password:user.password,username:user.username}}
          validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
          >
            {(props)=>(<>
                <View style={{width:width*0.9,marginTop:'10%'}}>
                    <AppTextInput placeholder={'Name'} 
                    onChangeText={props.handleChange('username')}
                    onBlur={props.handleBlur('username')}
                    value={props.values.username}
                    touched={props.touched.username}
                    errors={props.errors.username}/>

                    <AppTextInput placeholder={'Email'}
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                    touched={props.touched.email}
                    errors={props.errors.email}/>

                    <AppTextInputPassword placeholder={'Password'}
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                    value={props.values.password}
                    touched={props.touched.password}
                    errors={props.errors.password}/>
                    <RadioGroup 
                        radioButtons={radioButtons} 
                        onPress={setSex}
                        selectedId={sex}
                        layout='row'
                    />
                </View>

                <AppButton text={'Submit'} width={width*0.9} marginTop={'7%'}
                onPress={props.handleSubmit} active={active}/>
            </>)}</Formik>
</View>
);
}

export default EditProfileScreen;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center',
 backgroundColor:colors.primary
}
});