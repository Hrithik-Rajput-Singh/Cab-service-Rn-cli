import React,{useRef,useContext,useState} from 'react'
import { StyleSheet, Text, View,Dimensions,TouchableOpacity,} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Avatar,Icon} from 'react-native-elements';
import { colors,parameters } from '../global/styles'
import {GOOGLE_MAPS_APIKEY} from "@env";
import { OriginContext,DestinationContext } from '../contexts/contexts';
import CustomStatusBar from '../components/CustomStatusBar';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const DestinationScreen = ({navigation,route}) => {
    
    const {destination} = route.params
    const {dispatchOrigin} = useContext(OriginContext)
    const {dispatchDestination} = useContext(DestinationContext)

    const textInput1 = useRef(4);
    const textInput2 = useRef(5);

    // const[destination,setDestination] = useState(false)

    return (
        <>
            <View style = {styles.view2}>
                <CustomStatusBar backgroundColor="White" />
                <View style ={styles.view1}> 
                    <Icon 
                        type ="material-community"
                        name ="arrow-left"
                        color ={colors.grey1}
                        size ={32}
                        onPress ={()=>navigation.goBack()} 
                    />
                </View>
                <TouchableOpacity>
                    <View style ={{top:25,alignItems:"center"}}>
                        <View style ={styles.view3}>
                            <Avatar 
                                rounded
                                avatarStyle ={{}}
                                size ={30}
                                source = {require('../../assets/blankProfilePic.jpg')}
                                />
                            <Text style ={{marginLeft:5}}>Choose City Name..</Text>
                            <Icon 
                                type ="material-community"
                                name ="chevron-down"
                                color ={colors.grey1}
                                size ={26}
                                />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            
            {destination === false &&

            <GooglePlacesAutocomplete
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: "en", // language of the results
                }}
                
                onPress= {(data,details = null)=>{
                    dispatchOrigin({type:"ADD_ORIGIN",payload:{
                        latitude:details.geometry.location.lat,
                        longitude:details.geometry.location.lng,
                        address:details.formatted_address,
                        name:details.name
                    }})
                    navigation.navigate("RequestScreen",{pickupSet :true,state: 0})
                }}
                onFail={(error) => console.error(error)}
                listViewDisplayed={false}
                
                styles = {autoComplete}
                        nearbyPlacesAPI = 'GooglePlacesSearch'
                        placeholder ="From..."
                        debounce ={400}
                        ref ={textInput1}
                        minLength ={2}
                        enablePoweredByContainer = {false}
                        fetchDetails ={true}
                        autoFocus ={true}
                />
            }

            {destination === true &&
            <GooglePlacesAutocomplete 
            query={{
                key: GOOGLE_MAPS_APIKEY,
                language: "en", // language of the results
              }}
        
              onFail={(error) => console.error(error)}
              listViewDisplayed={false}
              
              styles = {autoComplete}
                    nearbyPlacesAPI = 'GooglePlacesSearch'
                    placeholder ="From..."
                    debounce ={400}
                    ref ={textInput1}
                    minLength ={2}
                    enablePoweredByContainer = {false}
                    fetchDetails ={true}
                    autoFocus ={true}

                onPress= {(data,details = null)=>{
                    dispatchDestination({type:"ADD_DESTINATION",payload:{
                        latitude:details.geometry.location.lat,
                        longitude:details.geometry.location.lng,
                        address:details.formatted_address,
                        name:details.name
                     
                    }})
                    // console.log("name",details.name)
                    // console.log('address',details.formatted_address)

                    navigation.navigate("RequestScreen",{conform: true,pickupSet: false,state: 1})
                }}

            />
            }
        </>
    )
}

export default DestinationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop:parameters.statusBarHeight
    },
    
    view1:{
      position:"absolute",
      top:25,
      left:12,
      backgroundColor:colors.white,
      height:40,
      width:40,
      borderRadius:20,
      justifyContent:"center",
      alignItems:"center",
      marginTop:2, 
      zIndex: 10
      
    },
    
    view3:{
      flexDirection:"row",
      alignItems:"center",
      marginTop:2,   
      marginBottom:10,
      backgroundColor: colors.white,
      height:30,
      zIndex: 10
    },
    
    view2:{backgroundColor:colors.white,
          zIndex:4,
          paddingBottom:10,
          
        },
    
        view24:{
          flexDirection:"row",
          justifyContent:"space-between",
         marginVertical:15,
          paddingHorizontal:20   
      }, 
      
      view25:{
          flexDirection:'row',
         alignItems:"baseline"
      },
      
      flatlist:{
          marginTop:20,
          zIndex:17,
          elevation:8
      },    
    
    });
    
    
    const autoComplete = {
    
        textInput:{
            backgroundColor: colors.grey6,
            height: 50,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
            borderWidth:1,
            marginHorizontal:15,
        },
        container: {
           paddingTop:20,
          flex: 1,
          backgroundColor:colors.white
              },
      
        textInputContainer: {
          flexDirection: 'row',
        },
  
  }
  