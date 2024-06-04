// import ForgetPasswordScreen from "../screens/auth/ForgetPasswordScreen"
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
import UnathorizedUsersScreen from "../screens/auth/UnathorizedUsersScreen"
import ProfileScreen from "../screens/profile/ProfileScreen"
import LoadingScreen from "../screens/auth/LoadingScreen"
import SecondScreen from "../screens/home/SecondScreen"
import ThirdScreen from "../screens/home/ThirdScreen"
import DashboardScreen from "../screens/home/DashboardScreen"

// Authentication
const GetStartedStackScreen = ({ navigation })=> <GetStartedScreen navigation={navigation}/>
const LogInStackScreen = ({ navigation })=> <LogInScreen navigation={navigation}/>
const IntroStackScreen = ({ navigation })=> <IntroScreen navigation={navigation}/>
const NewPasswordStackScreen = ({ navigation,route })=> <NewPasswordScreen navigation={navigation} route={route}/>
const OTPStackScreen = ({ navigation,route })=> <OTPScreen navigation={navigation} route={route}/>
const SignUpStackScreen = ({ navigation })=> <SignUpScreen navigation={navigation}/>
// const ForgetPasswordStackScreen = ({ navigation })=> <ForgetPasswordScreen navigation={navigation}/>
const UnathorizedUsersStackScreen = ({ navigation })=> <UnathorizedUsersScreen navigation={navigation}/>
const LoadingStackScreen = ({ navigation })=> <LoadingScreen navigation={navigation}/>


// Home
const DashboardStackScreen = ({ navigation,route })=> <DashboardScreen navigation={navigation} route={route}/>
const HomeStackScreen = ({ navigation,route })=> <HomeScreen navigation={navigation} route={route}/>
const SecondStackScreen = ({ navigation,route })=> <SecondScreen navigation={navigation} route={route}/>
const ThirdStackScreen = ({ navigation,route })=> <ThirdScreen navigation={navigation} route={route}/>
const ResultsStackScreen = ({ navigation,route })=> <ResultsScreen navigation={navigation} route={route}/>
const DoneStackScreen = ({ navigation,route })=> <DoneScreen navigation={navigation} route={route}/>


// History
const PatientsStackScreen = ({ navigation,route })=> <PatientsScreen navigation={navigation} route={route}/>
const PatientStackScreen = ({ navigation,route })=> <PatientScreen navigation={navigation} route={route}/>
const GraphStackScreen = ({ navigation,route })=> <GraphScreen navigation={navigation} route={route}/>
const AddPatientStackScreen = ({ navigation,route })=> <AddPatientScreen navigation={navigation} route={route}/>

// New Doctors
const NewDoctorsStackScreen = ({ navigation,route })=> <NewDoctorsScreen navigation={navigation} route={route}/>

// Profile
const ProfileStackScreen = ({ navigation,route })=> <ProfileScreen navigation={navigation} route={route}/>

export default{
  GetStartedStackScreen,
  LogInStackScreen,
  IntroStackScreen,
  OTPStackScreen,
  SignUpStackScreen,
  NewPasswordStackScreen,
  DashboardStackScreen,
  HomeStackScreen,
  ResultsStackScreen,
  DoneStackScreen,
  PatientsStackScreen,
  PatientStackScreen,
  GraphStackScreen,
  NewDoctorsStackScreen,
  AddPatientStackScreen,
  UnathorizedUsersStackScreen,
  ProfileStackScreen,
  LoadingStackScreen,
  SecondStackScreen,
  ThirdStackScreen,
  }