import ForgetPasswordScreen from "../screens/auth/ForgetPasswordScreen"
import GetStartedScreen from "../screens/auth/GetStartedScreen"
import IntroScreen from "../screens/auth/IntroScreen"
import LogInScreen from "../screens/auth/LogInScreen"
import NewPasswordScreen from "../screens/auth/NewPasswordScreen"
import OTPScreen from "../screens/auth/OTPScreen"
import SignUpScreen from "../screens/auth/SignUpScreen"
import AddPatientScreen from "../screens/history/AddPatientScreen"
import GraphScreen from "../screens/history/GraphScreen"
import PatientScreen from "../screens/history/PatientScreen"
import PatientsScreen from "../screens/history/PatientsScreen"
import DoneScreen from "../screens/home/DoneScreen"
import HomeScreen from "../screens/home/HomeScreen"
import ResultsScreen from "../screens/home/ResultsScreen"
import NewDoctorsScreen from "../screens/newdoctors/DoctorsScreen"

// Authentication
const GetStartedStackScreen = ({ navigation })=> <GetStartedScreen navigation={navigation}/>
const LogInStackScreen = ({ navigation })=> <LogInScreen navigation={navigation}/>
const IntroStackScreen = ({ navigation })=> <IntroScreen navigation={navigation}/>
const NewPasswordStackScreen = ({ navigation })=> <NewPasswordScreen navigation={navigation}/>
const OTPStackScreen = ({ navigation })=> <OTPScreen navigation={navigation}/>
const SignUpStackScreen = ({ navigation })=> <SignUpScreen navigation={navigation}/>
const ForgetPasswordStackScreen = ({ navigation })=> <ForgetPasswordScreen navigation={navigation}/>


// Home
const HomeStackScreen = ({ navigation,route })=> <HomeScreen navigation={navigation} route={route}/>
const ResultsStackScreen = ({ navigation,route })=> <ResultsScreen navigation={navigation} route={route}/>
const DoneStackScreen = ({ navigation,route })=> <DoneScreen navigation={navigation} route={route}/>


// History
const PatientsStackScreen = ({ navigation,route })=> <PatientsScreen navigation={navigation} route={route}/>
const PatientStackScreen = ({ navigation,route })=> <PatientScreen navigation={navigation} route={route}/>
const GraphStackScreen = ({ navigation,route })=> <GraphScreen navigation={navigation} route={route}/>
const AddPatientStackScreen = ({ navigation,route })=> <AddPatientScreen navigation={navigation} route={route}/>

// New Doctors
const NewDoctorsStackScreen = ({ navigation,route })=> <NewDoctorsScreen navigation={navigation} route={route}/>
  
export default{
  GetStartedStackScreen,
  LogInStackScreen,
  IntroStackScreen,
  OTPStackScreen,
  SignUpStackScreen,
  ForgetPasswordStackScreen,
  NewPasswordStackScreen,
  HomeStackScreen,
  ResultsStackScreen,
  DoneStackScreen,
  PatientsStackScreen,
  PatientStackScreen,
  GraphStackScreen,
  NewDoctorsStackScreen,
  AddPatientStackScreen

  }