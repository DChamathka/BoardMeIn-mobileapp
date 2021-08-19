//issue in image import
import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  Alert, 
  ScrollView, 
  FlatList, 
  Button,
  Dimensions } from 'react-native'
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen')

const Category = ({imagelink,title,count,onPress} ) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
          <Image style={styles.cardImage} source={imagelink} />
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.title}>
                {title}
              </Text>
              <Text style={styles.count}>
                {count}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}


const styles = StyleSheet.create({

  /******** card **************/
  card: {
    margin: 0,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    backgroundColor: '#DCDCDC'
  },
  cardContent: {
    paddingVertical: heightScreen * 0.01,
    paddingHorizontal: widthScreen * 0.021,
    // overlay efect
    flex: 1,
    height: 200,
    width: null,
    position: 'absolute',
    zIndex: 100,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  cardImage: {
    flex: 1,
    height: heightScreen* 0.25,
    width: null
  },
  /******** card components **************/
  title: {
    fontSize: 22,
    color: '#ffffff',
    marginTop: 10,
    fontWeight: 'bold'
  },
  count: {
    fontSize: 13,
    color: '#ffffff',
    marginTop: 5
  },
})
export default Category