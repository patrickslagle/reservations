import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Icon } from 'native-base'
import { Camera, Permissions } from 'expo';



//insert SERVER URL
const SERVER_URL = 'http://192.168.0.161:8080/generatePalette' //type hostname -I in CL to find your IP



class Autoshoot extends React.Component {
  state = {
    photo: null
  }
  takePicture = ()=> {
    this.camera.takePictureAsync({
      quality: 0.1,
      base64: true,
      exif: false
    }).then(photo => {
      console.log('photo ', photo.uri);
      this.uploadPicture(photo);
      //this set state will make the taken picture be shown
      this.setState({photo});
    })
  }

  uploadPicture = (photo) => {
    console.log('upload?!');
    if(photo){
      let data = new FormData();
      data.append('picture', {
        uri: photo.uri,
        name: 'myImg.jpg',
        type: 'image/jpg'
      });
      console.log(photo.uri);
      return fetch(SERVER_URL,{
        body: JSON.stringify({
          name: 'Test',
          color: photo.base64,
        }),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
      .then(response => {
        console.log('success!'); 
        
        response.json()})
      .catch(err => console.log('error: ', err));
    }
  }
  render() {
    const {photo} = this.state;

    //if there is a photo taken, photo will be shown. Otherwise, camera is shown. 
    return (
      <View style={{ flex: 1, width: '100%'}}>
      {photo ? (
        <ImageBackground style={{flex:1}} source={{uri:photo.uri}}/>):
      (
        <Camera 
        style={{flex: 1 }}
          type={Camera.Constants.Type.back}
          ref={cam => this.camera = cam}>
          <View style={{flex: 1, paddingHorizontal: 10, marginBottom: 15}}>
            <View style={{flex: 1}}>
              <MaterialCommunityIcons name="circle-outline" onPress={this.takePicture} style={{ color: 'white',justifyContent: 'flex-end',alignContent: 'flex-end', alignItems: 'flex-end', fontSize : 100 } }></MaterialCommunityIcons>
              <Icon name="ios-images" style={{ color: 'white', fontSize: 36 }} />
            </View>
          </View>
        </Camera>  
      )} 
      </View>
    );
  }
}

export default class StartCamera extends React.Component {
  //initialize state
  state = {
    cameraPermission: null
  };

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA)
      .then(({ status }) =>
        this.setState({
          cameraPermission: status === 'granted'
        })
      );
  }

  render() {
    const { cameraPermission } = this.state;

    //Render one of 3 things depending on permissions
    return (
      <View style={styles.container}>
        {cameraPermission === null ? (<Text>Waiting for permission...</Text>) : cameraPermission === false}
        {cameraPermission === false ? (<Text>Permission denied</Text>) : (<Autoshoot/>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
