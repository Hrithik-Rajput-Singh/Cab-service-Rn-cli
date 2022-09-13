import React,{useState,useRef,useEffect,useMemo,useCallback, useContext} from 'react'
import { StyleSheet, Text, View,Dimensions ,ScrollView,Image,FlatList,TouchableOpacity} from 'react-native'
import { Icon} from 'react-native-elements'
import MapView ,{Marker} from 'react-native-maps'; 
import { Button, Overlay,Slider} from 'react-native-elements';
import { Animated } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ServiceContext } from '../contexts/contexts';
import CustomStatusBar from '../components/CustomStatusBar';

// import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
// import {GOOGLE_MAPS_APIKEY} from "@env";


const SCREEN_WIDTH = Dimensions.get('window').width
import { colors,parameters } from '../global/styles'
import { filterData,carsAround } from '../global/data'
import { mapStyle} from "../global/mapStyle"

const HomeScreen = ({navigation}) => {

const {dispatchService} = useContext(ServiceContext)
const [latlng,setLatLng] = useState({})
const [launchModalOf,setLaunchModalOf] = useState(null)
const [visible, setVisible] = useState(false);
const [sliderValue,setSliderValue] = useState(0)
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);



const _map = useRef(1);
const bottomsheet1 =useRef(1) 
const bottomsheet2 =useRef(2) 
const snapPoints1 = useMemo(()=>['30%'],[])
const handleSheetChange1  = useCallback((index)=>{},[])
const handleSheetChange2  = useCallback((index)=>{},[])


const handleModal = (name) => {
  if(name === "Ride"){
    handleServiceType("Ride",0)
  }else{
  setLaunchModalOf(name)
  setVisible(!visible);
  }
}

const handleServiceType = async(name,value) => {
  await dispatchService({type:"SERVICE",payload:{
    name: name,
    value: value
}})
navigation.navigate("RequestScreen",{state: 0})  //in req screen params come from destination screen and pickup or drop throw error thats why set dummy state here to not throw error
}


const handleConform = (reference,name,value) => {
  reference.current?.close()
  handleServiceType(name,value)
 }


 const DateConfirm = (date) => {
   setDatePickerVisibility(false);
   handleConform(bottomsheet2,"Reserve",date)
  //  console.warn("A date has been picked: ", date);
 };



// useEffect(()=>{
//   Geocoder.init(GOOGLE_MAPS_APIKEY);

//   const loadingCurrenLocation = async () => {
//     if (Platform.OS === 'ios') {
//       const getAuth = await Geolocation.requestAuthorization('whenInUse');
//       if (getAuth === 'granted') {
//         // do something if granted...
//         getCurrentLocation();
//       }
//     } else {
//       //there is something depricated in andirod check while building andriod
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Device current location permission',
//             message: 'Allow app to get your current location',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           getCurrentLocation();
//         } else {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     }
//   };

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         Geocoder.from(position.coords.latitude, position.coords.longitude)
//           .then(json => {
//             var addressComponent = json.results[0].address_components;
//           //   geoExtractingData(addressComponent);
//           console.log("adcom",addressComponent)
//           })
//           .catch(error => console.warn(error));
//       },
//       error => {
//         console.log('map error: ', error);
//         console.log(error.code, error.message);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   };


//     loadingCurrenLocation();

//   },[])


    return (
        <View style ={styles.container}>
          <CustomStatusBar backgroundColor={colors.blue}/>
            <View style ={styles.header}>
                <View style ={styles.icon1}>
                    <Icon type = "material-community"
                          name ="menu"
                          color = {colors.white}
                          size = {40}
                    />
                </View>
            </View>
            <ScrollView bounces ={false}>
                <View style ={styles.home}>
                    <Text style = {styles.text1}>Destress your commute</Text>
                    <View style ={styles.view1}>
                        <View  style ={styles.view8}>
                            <Text style ={styles.text2}>Read a book.Take a nap. Stare out the window</Text>
                            <TouchableOpacity onPress ={()=>{handleServiceType("Ride",0)}}>
                                <View style ={styles.button1}>
                                    <Text style = {styles.button1Text}>Ride with Uber</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Image 
                                style ={styles.image1}
                                source = {require('../../assets/uberCar.png')}
                            />
                        </View>
                    </View>
                </View>

                <View style={{alignItems: 'center',width: '96%'}}>
                        <FlatList 
                            numRows ={3}
                            horizontal = {true}
                            showsHorizontalScrollIndicator ={false}
                            data ={filterData}
                            keyExtractor = {(item)=>item.id}
                            renderItem = { ({item})=>(
                                <View style = {styles.card}>
                                    <View style ={styles.view2}>
                                       <TouchableOpacity onPress={() => {handleModal(item.name)}}>
                                         <Image style ={styles.image2} source = {item.image} />
                                       </TouchableOpacity> 
                                    </View>
                                    <View>
                                        <Text style ={styles.title}>{item.name}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                    <View style ={styles.view3}>
                        <Text style ={styles.text3}> Where to ?</Text>  
                        <View style ={styles.view4}>
                            <Icon type = "material-community"
                                name ="clock-time-four"
                                color = {colors.grey1}
                                size = {26}
                             /> 
                             <Text style ={{marginLeft:5}}>Now</Text> 
                             <Icon type = "material-community"
                                name ="chevron-down"
                                color = {colors.grey1}
                                size = {26}
                             />  
                        </View>     
                    </View>
                    <View style ={styles.view5}>
                        <View style ={styles.view6}>
                            <View style ={styles.view7}>
                                <Icon type = "material-community"
                                    name ="map-marker"
                                    color = {colors.black}
                                    size = {22}
                                />
                            </View>
                            <View>
                                <Text style ={{fontSize:18,color:colors.black}}>Delhi</Text>
                                <Text style ={{color:colors.grey3}}>Near Railway station</Text>
                            </View>
                        </View>
                        <View>
                            <Icon type = "material-community"
                                        name ="chevron-right"
                                        color = {colors.grey}
                                        size = {26}
                                    />
                            </View>
                    </View>

                    <View style ={{...styles.view5,borderBottomWidth:0}}>
                        <View style ={styles.view6}>
                            <View style ={styles.view7}>
                                <Icon type = "material-community"
                                    name ="map-marker"
                                    color = {colors.black}
                                    size = {22}
                                />
                            </View>
                            <View>
                                <Text style ={{fontSize:18,color:colors.black}}>Mumbai</Text>
                                <Text style ={{color:colors.grey3}}>New Airport</Text>
                            </View>
                        </View>
                        <View>
                            <Icon type = "material-community"
                                        name ="chevron-right"
                                        color = {colors.grey}
                                        size = {26}
                                    />
                            </View>
                    </View>  

                    <Text style ={styles.text4}> Around you</Text>

                    <View style ={{alignItems:"center",justifyContent:"center"}}>
                       <MapView
                            ref = {_map}
                            style = {styles.map}
                            customMapStyle ={mapStyle}
                            showsUserLocation ={true}
                            followsUserLocation = {true}
                            initialRegion = {{...carsAround[0],latitudeDelta:0.008,longitudeDelta:0.008}}
                           
                        >
                            {carsAround.map((item,index)=>
                            <Marker coordinate = {item} key= {index.toString()}>
                                <Image 
                                    source = {require('../../assets/carMarker.png')}
                                    style ={styles.carsAround}
                                    resizeMode = "cover"
                                />
                            </Marker>
                            )

                            }

                       </MapView>         
                    </View>
            </ScrollView>
            {/* <StatusBar  backgroundColor = "#2058c0"  /> */}

            {
                visible &&  (
                  <>
                  {launchModalOf === "Package" && (
                    <BottomSheet
                    ref={bottomsheet1}
                    snapPoints = {snapPoints1}
                    index={0}
                    onChange={handleSheetChange1}
                    >
                      <View style={{ alignItems: 'stretch', justifyContent: 'center',width: '100%',backgroundColor: "lightgrey"  }}>
                      <Text style={{textAlign: 'center',marginVertical: 10,fontWeight: "bold",fontSize: 18,color: 'grey'}}>ENTER THE WEIGHT OF YOUR PACKAGE</Text>
                        <Slider
                          value={sliderValue}
                          onValueChange={(value) => setSliderValue(value)}
                          maximumValue={50}
                          minimumValue={0}
                          style={{width: '92%',marginHorizontal: 5}}
                          step={1}
                          
                        />
                        <Text style={{textAlign: 'center',marginTop: 10,fontWeight: "bold",fontSize: 18}}> {sliderValue} kilogram</Text>
                        <View style={{backgroundColor: "black",marginTop: 10,alignItems: 'center',padding: 10,width: '100%'}}>
                        <TouchableOpacity style={{}} onPress={() => {handleConform(bottomsheet1,"Package",sliderValue)}}>
                            <Text style={{color: "white",fontSize: 20,fontWeight: "bold",textAlign: 'center'}}>Conform</Text>
                        </TouchableOpacity>

                        </View>
                      </View>
                    
                    </BottomSheet>
                    )}

                    {launchModalOf === "Reserve" && (
                        <BottomSheet
                        ref={bottomsheet2}
                        snapPoints = {snapPoints1}
                        index={0}
                        onChange={handleSheetChange2}
                        >
                          <View style={{ alignItems: 'stretch', justifyContent: 'center',width: '100%',backgroundColor: "lightgrey" }}>
                            <Text style={{textAlign: 'center',marginVertical: 10,fontWeight: "bold",fontSize: 18,color: 'grey'}}>ENTER THE SCHEDUELE DATE</Text>

                            <Button title="SELECT DATE" onPress={() => {setDatePickerVisibility(true)}} style={{marginHorizontal: 10,marginTop: 30}} />
                            <DateTimePickerModal
                              isVisible={isDatePickerVisible}
                              mode="date"
                              onConfirm={DateConfirm}
                              onCancel={() => {setDatePickerVisibility(false)}}
                            />
                          </View>
                        
                        </BottomSheet>

                    )}

                   
                    </>
                )
             }

           
            
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
        paddingBottom:30,
        // paddingTop:parameters.statusBarHeight
    },
    header:{
      backgroundColor:colors.blue,
      height:parameters.headerHeight,
      alignItems:"flex-start"
     
    },
    
    image1:{
     
      height:100,
      width:100,
    
    },
    
    image2:{height:60,width:60,
            borderRadius:30,
          },
    
    home:{
     backgroundColor:colors.blue,
     paddingLeft:20,
     
    },
    
    text1:{
     color:colors.white,
     fontSize:21,
     paddingBottom:20,
     paddingTop:20
    },
    
    text2:{
     color:colors.white,
     fontSize:16
    },
    
    view1:{
     flexDirection:"row",
     flex:1,
     paddingTop:30
    },
    
    button1:{
      height:40,
      width:150,
      backgroundColor:colors.black,
      borderRadius:20,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20
    },
    
    button1Text:{
     color:colors.white,
     fontSize:17,
     marginTop:-2
    
    },
    card:{
     alignItems:"center",
     margin:SCREEN_WIDTH/22,
    
    },
    
    view2:{marginBottom:5,
          borderRadius:15,
          backgroundColor:colors.grey6
        },
    
        title:{
          color:colors.black,
          fontSize:16
        },
    view3:{flexDirection:"row",
             marginTop :5,
             height:50,
             backgroundColor:colors.grey6,
             alignItems:"center",
             justifyContent:"space-between",
            marginHorizontal:15
            
             },
    text3:{marginLeft:15,
            fontSize:20,
            color:colors.black
      },
    
    view4:{ flexDirection:"row",
            alignItems:"center",
            marginRight:15,
            backgroundColor:"white",
            paddingHorizontal:10,
            paddingVertical:2,
            borderRadius:20
            },
    
    view5:{ flexDirection:"row",
    alignItems:"center",
    backgroundColor:"white",
    paddingVertical:25,
    justifyContent:"space-between",
    marginHorizontal:15,
    borderBottomColor:colors.grey4,
    borderBottomWidth:1,
    flex:1
    },
    
    view6:{
    
    
    alignItems:"center",
    flex:5,
    flexDirection:"row"
    },
    view7:{
    backgroundColor:colors.grey6,
    height:40,
    width:40,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
    marginRight:20
    
    },
    
    map:{
       
    height: 150,
     marginVertical: 0,
     width:SCREEN_WIDTH*0.92
    },
    
    text4:{ fontSize:20,
          color:colors.black,
          marginLeft:20,
          marginBottom:20
        },
    
    icon1:  {marginLeft:10,
           marginTop:5
          },

    view8: {flex:4,
          marginTop:-25
        } ,
    carsAround: {
    width: 28,
    height: 14,
    
    }, 
    
    location: {
      width: 16,
      height: 16,
      borderRadius:8,
      backgroundColor:colors.blue,
      alignItems:"center",
      justifyContent:"center"
      
      }, 
      
    view9:{width:4,
    height:4,
    borderRadius:2,
    backgroundColor:"white"
    }


})
