import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";

import {
  Card,
  CardItem,
  Thumbnail,
  Body,
  Left,
  Right,
  Button,
  Icon,
  Input,
  Footer,
  FooterTab
} from "native-base";
import { db } from '../config';
import { updatePost } from '../services/DataService';


let itemsRef = db.ref("/items");

class CardComponent extends Component {
    constructor(){
        super();
        this.state = {
          items: [],
          name: null,
          description: null,
          imgURL: null,
          postID: null
        }
       }
     
       componentDidMount() {
         let query = itemsRef.orderByChild("name").equalTo(this.props.name);
           query.once('value', (snapshot) => {
           let data = snapshot.val();
               if(data){
                 let firebaseData = Object.values(data);
                 this.setState({students: firebaseData},()=>{
                   this.state.students.map((element) => {
                     this.setState({
                       name: element.name,
                       description: element.description,
                       imgURL: element.imgURL,
                     });
                   });
                 });
               }
          });
       }
     
       setName = (value) =>{
         this.setState({ name: value });
       }
     
       setDescription = (value) =>{
         this.setState({ description: value });
       }
     
       setImgURL = (value) => {
         this.setState({ imgURL: value });
       }
     
     
       updateData = () =>{
         if(this.state.name && this.state.description && this.state.imgURL){
           if(isNaN(this.state.imgURL)){
             Alert.alert('Status','Invalid format of picture!');
           }
            else{
              updatePost(this.state.name && this.state.description && this.state.imgURL);
            }
         } else{
            Alert.alert('Status','Empty Field(s)!');
         }
       }

    render() {
    // const images = {
    //   "1": require("../assets/feed_images/1.jpg"),
    //   "2": require("../assets/feed_images/2.jpg"),
    //   "3": require("../assets/feed_images/3.png")
    // };

    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={require("../assets/insta-logo.png")} />
            <Body>
                <Text>{this.state.postID}</Text>
              <Text>Name </Text>
              <Input onChangeText={this.state.setName} value={this.state.name} />
              <Text note>May 20, 2019</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={images[this.props.imageSource]} //source ={this.setImgURL} value={this.state.imgURL}
            style={{ height: 200, width: null, flex: 1 }}
          />
        </CardItem>
        <CardItem style={{ height: 45 }}>
          <Left>
            <Button transparent>
              <Icon name="heart-empty" style={{ color: "black" }} />
            </Button>
            <Button transparent>
              <Icon name="chatbubbles" style={{ color: "black" }} />
            </Button>
            <Button transparent>
              <Icon name="send" style={{ color: "black" }} />
            </Button>
          </Left>
        </CardItem>

        <CardItem style={{ height: 20 }}>
          <Text>{this.props.likes} Likes</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{ fontWeight: "900" }}>Description </Text>
            <Text>
            <Input onChangeText={this.state.setDescription} value={this.state.description} />
            </Text>
          </Body>
        </CardItem>
        <Button block last style={{marginTop: 50}} onPress={this.updateData}>
            <Text style={{fontWeight: "bold"}}>Update</Text>
          </Button>
          <Footer>
          <FooterTab>
          <Button vertical onPress={() => {Actions.Feed();}}>             
              <Icon name="home" />
              <Text>Back to Feed</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Card>
    );
  }
}
export default CardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
