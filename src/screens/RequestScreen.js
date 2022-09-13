import React,{useState,useContext,useEffect,useRef,useMemo,useCallback} from 'react'
import { StyleSheet, Image,View,Text,Dimensions,TouchableOpacity} from 'react-native'
import BottomSheet, { BottomSheetFlatList,BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { Avatar,Icon} from 'react-native-elements';
import MapComponent from '../components/MapComponent'
import { colors,parameters } from '../global/styles'
import { rideData ,timeData } from '../global/data';
import { OriginContext,DestinationContext,ServiceContext } from '../contexts/contexts';
import CustomStatusBar from '../components/CustomStatusBar';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


export default function RequestScreen({navigation,route}) {
    const {pickupSet,conform,state} = route.params
    const {origin,dispatchOrigin} = useContext(OriginContext)
    const {destination,dispatchDestination} = useContext(DestinationContext)
    const {service} = useContext(ServiceContext)

    const [userOrigin,setUserOrigin] = useState({latitude:origin.latitude, longitude:origin.longitude})
    const [userDestination,setUserDestination] = useState({latitude:destination.latitude,longitude:destination.longitude}) 
    const [showConformButton,setShowConformButton] = useState(false)
    // const [showBottomSheet,setShowBottomSheet] = useState(true)                                           
   const [travelTime,setTravelTime] = useState(null)
   const [areaSelected,setAreaSelected] = useState(false)
   const [serviceType,setServiceType] = useState({name: service.name,value: service.value})
                                                
   const snapPoints1 = useMemo(()=>['60%'],[])
   const handleSheetChange1  = useCallback((index)=>{},[])
   const handleSheetChange2  = useCallback((index)=>{},[])

   const bottomsheet1 =useRef(1) 
   const bottomsheet2 =useRef(2) 

   const handleSelectedClose = (time) => {
    bottomsheet2.current?.close()
    setTravelTime(time)
    setShowConformButton(true)
   }

   const handleSelectedDestination = async(item) => {
    await dispatchDestination({type:"ADD_DESTINATION",payload:{
        latitude:item.lat,
        longitude:item.lng,
        address:item.area,
        name:item.area
    }})
    bottomsheet1.current?.close()
    setAreaSelected(true)
    
   }

   const handleReset = async() => {
    await dispatchDestination({type:"ADD_DESTINATION",payload:{
        latitude:null,
        longitude:null,
        address:null,
        name:null
    }})
    setAreaSelected(false)
    setTravelTime(null)
    setShowConformButton(false)
    navigation.setParams({
        conform: false,pickupSet: true
      });
   }

   const handleConform = () => {
    handleReset()
    navigation.navigate("ConformedScreen")
   }
 


useEffect(()=>{
    setUserOrigin({latitude:origin.latitude,
        longitude:origin.longitude,address: origin.address});
    setUserDestination({latitude:destination.latitude,
        longitude:destination.longitude,address: destination.address})    
},[origin,destination])




const renderFlatListItems = useCallback(({item})=>(
    <View>
          <View style ={styles.view10}>
            <View style ={styles.view11}>
            <Icon 
                    type ="material-community"
                    name ="clock-time-four"
                    color ={colors.white}
                    size ={18}
                    />
            </View>
            <View>
                {/* <Text style ={{fontSize:15,color:colors.grey1}}>{item.street}</Text>  */}
                
                <TouchableOpacity onPress={() => {handleSelectedDestination(item)}}>
                  <Text style ={{color:colors.grey4}}>{item.area}</Text> 
                </TouchableOpacity>
            </View>
        </View>
    </View>
),[])



const renderTimeItems = useCallback(({item})=>(
    <View>
          <View style ={styles.view10}>
            <View style ={styles.view11}>
            <Icon 
                    type ="material-community"
                    name ="clock-time-four"
                    color ={colors.white}
                    size ={18}
                    />
            </View>
            <View>
                {/* <Text style ={{fontSize:15,color:colors.grey1}}>{item.street}</Text>  */}
                <TouchableOpacity onPress={() => {handleSelectedClose(item.time)}}>
                <Text style ={{color:colors.grey4}}>{item.time}</Text>
                </TouchableOpacity>
                 
            </View>
        </View>
    </View>
),[])


    return (
        <View style ={styles.container}>
            <CustomStatusBar backgroundColor="white" />
            <View style ={styles.view1}> 
                <Icon 
                    type ="material-community"
                    name ="arrow-left"
                    color ={colors.grey1}
                    size ={32} 
                    onPress={() => {navigation.goBack()}}
                />
            </View>
            <View style = {styles.view2}>
                <TouchableOpacity>
                    <View style ={styles.view3}>
                        <Avatar 
                            rounded
                            avatarStyle ={{}}
                            size ={30}
                            source = {require('../../assets/blankProfilePic.jpg')}
                            />
                          <Text style ={{marginLeft:5}}>Service Type: {serviceType.name}</Text>
                          <Icon 
                              type ="material-community"
                              name ="chevron-down"
                              color ={colors.grey1}
                              size ={26}
                            />
                    </View>
                </TouchableOpacity>
                <View style ={styles.view4}>
                    <View>
                        <Image 
                            style = {styles.image1}
                            source ={require("../../assets/transit.png")}
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress ={()=>navigation.navigate("DestinationScreen",{destination: false})}>
                            <View style = {styles.view6}>
                                {userOrigin.latitude === null ? <Text style ={styles.text1}>From where..</Text> : <Text style ={styles.text1}>{userOrigin.address}</Text>}
                            </View>
                        </TouchableOpacity>
                        <View style ={styles.view7}>
                        <TouchableOpacity onPress ={()=>navigation.navigate("DestinationScreen",{destination: true})}>
                            <View style ={styles.view5}>
                                {userDestination.latitude === null ? <Text style ={styles.text10}>To ...</Text> : <Text style ={styles.text10}>{userDestination.address}</Text>}
                            </View>
                        </TouchableOpacity>
                        <View style ={styles.view8}>
                            <Icon 
                                type ="material-community"
                                name ="plus-thick"
                                color ={colors.black}
                                size ={25}
                                />   
                        </View>
                    </View>
                    </View>
                   
                </View>
                {showConformButton && (

                    <View style={{position: "relative",bottom: -50,width: '96%',borderRadius: 5,backgroundColor: "lightgrey",marginHorizontal: 5,borderColor: "red"}}>
                       <View style={{alignItems: "flex-start",justifyContent: "center",margin: 5}}>
                            {serviceType.name === "Ride" && <Text style={styles.text5}>Service Type : Ride</Text>}
                            {serviceType.name === "Package" && <Text style={styles.text5}>Service Type : Package @weight Of Package : {serviceType.value}</Text>}
                            {serviceType.name === "Reserve" && <Text style={styles.text5}>Service Type : Reserve @Reserve Date : {serviceType.value.toDateString()}</Text>}
                            <Text style={styles.text5}>From : {userOrigin.address}</Text>
                            <Text style={styles.text5}>Drop : {userDestination.address}</Text>
                            <Text style={styles.text5}>Boarding Time: {travelTime}</Text>
                            <TouchableOpacity onPress={() => {handleReset()}} style={{height: 25,backgroundColor: "red",alignItems: "center",position: "absolute",bottom: 0,right: 4,borderRadius: 10,}}>
                                <Text style={{textAlign: "center",fontWeight: "bold",color: "white",paddingHorizontal: 10,paddingTop: 5}}>Reset</Text>
                            </TouchableOpacity>
                       </View>
                    </View>
                )}
               
            </View>
            <View style={{height: '65%',width: '100%'}}>
            <MapComponent userOrigin ={userOrigin} userDestination = {userDestination} />
            </View>
            
            <View style={{width: '100%',height: 50,marginBottom: 20,marginTop: 5,marginBottom: 10,borderWidth: 0.5}}>
                {showConformButton ? 
                (
                <TouchableOpacity style={{width: '100%',backgroundColor: "black",alignItems: "center",height: '100%',justifyContent: "center"}} onPress={() => {handleConform()}}>
                    <Text style={{color: "white",fontSize: 16,fontWeight: "bold"}}>Conform</Text>
                </TouchableOpacity>
                ) : (
                <View style={{width: '100%',backgroundColor: "lightgrey",alignItems: "center",height: '100%',justifyContent: "center"}}>
                        <Text style={{color: "grey",fontSize: 16,fontWeight: "bold"}}>Conform</Text>
                </View>
                )}
            </View>

            {pickupSet !== undefined && pickupSet &&
            <BottomSheet
                ref={bottomsheet1}
                snapPoints = {snapPoints1}
                onChange={handleSheetChange1}
                >
                <BottomSheetFlatList 
                  keyboardShouldPersistTaps = 'always'  
                  data={rideData}
                  keyExtractor = {item=>item.id}
                  renderItem={renderFlatListItems}
                  contentContainerStyle ={styles.contentContainer}
                  ListHeaderComponent={<View style ={styles.view10}>
                                <View style ={styles.view11}>
                                    <Icon 
                                        type ="material-community"
                                        name ="star"
                                        color ={colors.white}
                                        size ={20}
                                        />
                                </View>
                                <View>
                                   <Text style ={styles.text9}>Your Saved Places</Text> 
                                </View>
                        </View>}
                ListFooterComponent={
                    <View>
                        <View style ={styles.view10}>
                            <View style ={styles.view11}>
                            <Icon 
                                    type ="material-community"
                                    name ="map-marker"
                                    color ={colors.white}
                                    size ={20}
                                    />
                            </View>
                            <View>
                                <Text style ={styles.text9}>Set New location on map</Text> 
                            </View>
                        </View>
                    </View> 
                }        
                />
            </BottomSheet>
             }

             {
                conform !== undefined && conform || areaSelected ? (
                    <BottomSheet
                    ref={bottomsheet2}
                    snapPoints = {snapPoints1}
                    onChange={handleSheetChange2}
    
                    >
                    <BottomSheetFlatList 
                      keyboardShouldPersistTaps = 'always'  
                      data={timeData}
                      keyExtractor = {item=>item.id}
                      renderItem={renderTimeItems}
                      contentContainerStyle ={styles.contentContainer}
                      ListHeaderComponent={
                      <View style ={styles.view10}>
                            <View style ={styles.view11}>
                                <Icon 
                                    type ="material-community"
                                    name ="star"
                                    color ={colors.white}
                                    size ={20}
                                    />
                            </View>
                            <View>
                                <Text style ={styles.text9}>Select Time from Given time</Text> 
                            </View>
                    </View>}
                         
                    />
                </BottomSheet>

                ): null
             }
          
        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop:parameters.statusBarHeight
       
      },
      contentContainer: {
        flex: 1,
        alignItems: 'center',
       
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
        zIndex: 8
        
      },

      view2:{
        height:SCREEN_HEIGHT*0.21,
        alignItems:"center",
        zIndex: 5,
        backgroundColor:colors.white
      },
      
      view3:{
          flexDirection:"row",
          alignItems:"center",
          marginTop:2,   
          marginBottom:10,
          backgroundColor: colors.white,
          //height:30,
          zIndex:10,
           
        
      },
      view4:{
            flexDirection:"row",
            alignItems:"center",
            
      },
      view5:{
          backgroundColor:colors.grey7,
          width:SCREEN_WIDTH*0.70,
          height:40,
          justifyContent:"center",
          marginTop:10,
          
      },
      view6:{
        backgroundColor:colors.grey6,
        width:SCREEN_WIDTH*0.70,
        height:40,
        justifyContent:"center",
        marginTop:10,
        paddingLeft:0
    },
      text1:{
          marginLeft:10,
          fontSize:16,
          color:colors.grey1
      },
    
      image1:{  height:70,
                width:30,
                marginRight:10,
                marginTop:10
            },
     view7:{
         flexDirection:"row",
         alignItems:"center"
     },
     view8:{
         marginLeft:10
     },
     view10:{
        alignItems:"center",
        flex:5,
        flexDirection:"row",
        paddingVertical:10,
        borderBottomColor:colors.grey5,
        borderBottomWidth:1,
        paddingHorizontal:15
     },
     view11:{
        backgroundColor:colors.grey,
        height:30,
        width:30,
        borderRadius:15,
        alignItems:"center",
        justifyContent:"center",
        marginRight:15,
        marginTop:15,
     },

     contentContainer: {
        backgroundColor: 'white',
      },

    view12:{
        alignItems:"center",
        paddingVertical:10,
        borderBottomWidth:1,
        borderBottomColor:colors.grey4
    },

    text2:{
        fontSize:18,
        color:colors.grey1
    },
    text3:{
        fontSize:16,
        color:colors.black,
        fontWeight:"bold",
        marginRight:5,
     
    },

    text4:{color:colors.grey2,
        marginTop:4
                },

    view13:{
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:"space-between",
        paddingHorizontal:15,
        paddingVertical:5
    },

    button1:{
        height:40,
        width:100,
        backgroundColor:colors.grey6,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
     },

    button2:{
        height:50,
        backgroundColor:colors.grey10,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginHorizontal:30
     },

    
  
     button1Text:{
       
       fontSize:17,
       marginTop:-2,
       color:colors.black
  
     },

     button2Text:{
        color:colors.white,
        fontSize:23,
        marginTop:-2,
       
   
      },

      
    view14:{
     
    
      alignItems:"center",
      flex:5,
      flexDirection:"row"
    },
    view15:{
      backgroundColor:colors.grey6,
      height:40,
      width:40,
      borderRadius:20,
      alignItems:"center",
      justifyContent:"center",
      marginRight:20
      
    },

    view16:{
        flexDirection:"row",
        alignItems:"baseline"
    },

    text5:{
        fontSize:12,
        color:colors.black,
        marginLeft:3,
        fontWeight:"bold",
        paddingBottom:1
        
    },
    
    view17:{
        
      },

    view18:{
      
    

      },

    view19:{flex:1.7,
        alignItems:"flex-end",
      
    },

    icon:{paddingBottom:2},

    image2:{height:60,width:60 },

    view20:{marginRight:10 },

    text6:{
        fontSize:15,
        color:colors.black,
        fontWeight:"bold", 
    },

    view21:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginHorizontal:30,
        marginTop:15
    },

 view22:{
        alignItems:"center",
        marginBottom:-20
 },

 sectionHeaderContainer: {
    backgroundColor: "white",
    marginTop:30,
    paddingLeft:15
  },

 text7 : {
    fontSize:28,
    color:colors.black,
    marginRight:5,
 
},

text8:{
    fontSize:15,
    color:colors.grey2,
    textDecorationLine:"line-through"
 
 
},

button3:{
   
    height:60,
    backgroundColor:colors.black,
    alignItems:"center",
    justifyContent:"center",
    width:SCREEN_WIDTH-110,
    marginBottom:10
 },

view23:{
   flexDirection:"row", 
   backgroundColor:colors.cardbackground,
  // elevation:10,
   justifyContent:"space-between",
   alignItems:"flex-end",
   paddingHorizontal:20,
   height:80,
  
},

button2Image:{
    height:55,
    width:55,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:colors.grey6,
    marginBottom:10,
    
}
,
text9:{fontSize:15,
       color:colors.grey1
    },


    map:{
        marginVertical: 0,
        width:SCREEN_WIDTH,
        zIndex: -1
      }, 
      
      centeredView: {
        zIndex:14
      },
      modalView: {
        marginHorizontal: 20,
        marginVertical:60,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical:20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex:16
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
        marginTop:20
    },

   text10:{color:colors.grey2,
           paddingLeft:10
        }
    
})




