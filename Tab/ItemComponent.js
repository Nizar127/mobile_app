import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TextInput
} from "react-native";
import {
  Card,
  Container,
  Button,
  CardItem,
  Thumbnail,
  Body,
  Left,
  Content,
  Item,
  Input,
  Right,
  Icon,
  Fab
} from "native-base";
import PropTypes from "prop-types";

let SCREEN_WIDTH = Dimensions.get('window').width
let SCREEN_HEIGHT = Dimensions.get('window').height

export default class ItemComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      comment: "",
      text: "",
      activeImage: null
      // active: "false"
    };
  }

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  onPress = (name) => {
    this.props.onPress(name);
  }

  onLongPress = (name) => {
    this.props.onLongPress(name);
  }

  submit = () => {
    this.setState({
      comment: String(this.state.text)
    });
  };

  constructor() {
    super()
    this.state = {
      activeImage: null
    }
  }
  componentWillMount() {
    this.allImages = {}
    this.oldPosition = {}
    this.position = new Animated.ValueXY()
    this.dimensions = new Animated.ValueXY()
    this.animation = new Animated.Value(0)
    this.activeImageStyle = null
  }

  openImage = (index) => {

    this.allImages[index].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX
      this.oldPosition.y = pageY
      this.oldPosition.width = width
      this.oldPosition.height = height

      this.position.setValue({
        x: pageX,
        y: pageY
      })

      this.dimensions.setValue({
        x: width,
        y: height
      })

      this.setState({
        activeImage: images[index]
      }, () => {
        this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {

          Animated.parallel([
            Animated.timing(this.position.x, {
              toValue: dPageX,
              duration: 300
            }),
            Animated.timing(this.position.y, {
              toValue: dPageY,
              duration: 300
            }),
            Animated.timing(this.dimensions.x, {
              toValue: dWidth,
              duration: 300
            }),
            Animated.timing(this.dimensions.y, {
              toValue: dHeight,
              duration: 300
            }),
            Animated.timing(this.animation, {
              toValue: 1,
              duration: 300
            })
          ]).start()
        })
      })
    })
  }
  closeImage = () => {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 300
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        duration: 250
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: 250
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: 250
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 250
      })
    ]).start(() => {
      this.setState({
        activeImage: null
      })
    })
  }
  render() {
    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y
    }

    const animatedContentY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0]
    })

    const animatedContentOpacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1]
    })

    const animatedContentStyle = {
      opacity: animatedContentOpacity,
      transform: [{
        translateY: animatedContentY
      }]
    }

    const animatedCrossOpacity = {
      opacity: this.animation
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.itemsList}>
          {this.props.items.map((data, index) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => this.openImage(index)}
                key={image.id}>
                <Animated.View
                  style={{ height: SCREEN_HEIGHT - 150, width: SCREEN_WIDTH, padding: 15 }}
                >
                  <Image
                    ref={(image) => (this.allImages[index] = image)}
                    source={image.src}
                    style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
              <Card>
                <CardItem key={index} onPress={() => this.onPress(data.name)} onLongPress={() => this.onLongPress(data.name)}>
                  <Left>
                    <Thumbnail source={require("../assets/insta-logo.png")} />
                    <Body>
                      <Text>{item.name}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <View key={index}>
                  <Image
                    source={{ uri: item.imgURL }}
                    style={styles.imageStyle}
                  />
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
                  {/* <View style={{ flex: 1, paddingTop: 45 }}>
                    <Fab
                      active={this.state.active}
                      containerStyle={{}}
                      style={{ backgroundColor: "#5067FF" }}
                      position="bottomRight"
                      onPress={() =>
                        this.setState({ active: !this.state.active })
                      }
                    >
                      <Icon name="share" />
                      <Button style={{ backgroundColor: "#34A34F" }}>
                        <Icon name="logo-whatsapp" />
                      </Button>
                      <Button style={{ backgroundColor: "#3B5998" }}>
                        <Icon name="logo-facebook" />
                      </Button>
                      <Button disabled style={{ backgroundColor: "#DD5144" }}>
                        <Icon name="mail" />
                      </Button>
                    </Fab>
                  </View> */}
                  <CardItem>
                    <Text style={styles.itemText}>{item.description}</Text>
                  </CardItem>

                  <Content>
                    <Item>
                      <Input
                        placeholder="Comment"
                        onChangeText={text => this.setState({ text })}
                      />
                      <Button>
                        <Icon
                          transparent
                          active
                          name="paper-plane"
                          onPress={this.submit}
                        />
                      </Button>
                    </Item>
                  </Content>
                  <Text> {this.state.comment}</Text>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
      <View style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage ? "auto" : "none"}
        >
          <View style={{ flex: 2, zIndex: 1001 }} ref={(view) => (this.viewImage = view)}>
            <Animated.Image
              source={this.state.activeImage ? this.state.activeImage.src : null}
              style={[{ resizeMode: 'cover', top: 0, left: 0, height: null, width: null }, activeImageStyle]}
            >
            </Animated.Image>
            <TouchableWithoutFeedback onPress={() => this.closeImage()}>
              <Animated.View style={[{ position: 'absolute', top: 30, right: 30 }, animatedCrossOpacity]}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>X</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
          <Animated.View style={[{ flex: 1, zIndex: 1000, backgroundColor: 'white', padding: 20, paddingTop: 50 }, animatedContentStyle]}>
            <Text style={{ fontSize: 24, paddingBottom: 10 }}>Fakhrul, Application Developer</Text>
            <Text> Have been in startup community for more than 5 years.</Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  itemsList: {
    paddingTop: 100,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  itemText: {
    fontSize: 20,
    textAlign: "center"
  },
  imageStyle: {
    height: 300,
    resizeMode: "cover"
  }
});
