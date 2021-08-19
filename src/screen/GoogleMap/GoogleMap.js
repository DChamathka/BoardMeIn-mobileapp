import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
//AIzaSyCoFcJJxjsCJVbcUXVompNX_zPOPJ-YqgQ
 const GoogleMap =()=> {
  return (
     <MapView  
          style={styles.mapStyle}  
          showsUserLocation={false}  
          zoomEnabled={true}  
          zoomControlEnabled={true}  
          initialRegion={{  
            latitude: 7.5554942,   
            longitude: 80.7137847,  
            latitudeDelta: 2.0,  
            longitudeDelta:2.001,  
          }}>  
  
         {/*  <Marker  
            coordinate={{ latitude: 28.579660, longitude: 77.321110 }}  
            title={"JavaTpoint"}  
            description={"Java Training Institute"}  
          />   */}
        </MapView>  
  );
}

const styles = StyleSheet.create({
  MainContainer: {  
    position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
    alignItems: 'center',  
    justifyContent: 'flex-end',  
  },  
  mapStyle: {  
    position: 'absolute',  
    top: 0,  
    left: 0,  
    right: 0,  
    bottom: 0,  
  },  
});

export default {component:GoogleMap ,name:"GoogleMap"}