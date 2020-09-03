import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Platform,
  ImageBackground,
  Image,
} from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import TWWUNITS from "../assets/TWW-units.json";
import icons from "../assets/icons.json";
let { width: screenWidth, height: screenHeight } = Dimensions.get("window");
export default class UnitCards extends Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    this.navigation = props.nav;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  renderUnitStats(item) {
    this.item = item;
    let data = [];
    data.push(<Text key={Object.keys(item)[1]}>{item.name}</Text>);
    for (let index = 2; index < Object.keys(item).length - 1; index++) {
      let element = Object.keys(item)[index];
      for (let i = 0; i < Object.keys(item[element]).length; i++) {
        let stat = Object.keys(item[element])[i];
        if (
          item[element][stat] != "" &&
          !item[element][stat].includes("Resist")
        ) {
          data.push(
            <Text key={item[element][stat] + i + index}>
              <Image
                style={styles.statIcon}
                source={{
                  uri: icons[element][stat],
                }}
              />
              {Object.keys(item[element])[i] + ": " + item[element][stat]}
            </Text>
          );
        }
      }
    }
    return data;
  }
  _renderCatagory = ({ item, index }) => {
    return (
      <View>
        <View style={{ alignItems: "center" }}>
          <Image style={styles.unitImage} source={{ uri: item.unitImage }} />
          <View
            style={{
              width: screenWidth - screenWidth / 3,
              height: screenHeight - screenHeight / 3,
            }}
          >
            <ImageBackground
              style={styles.unitCardSize}
              source={require("../assets/unitcard.png")}
            >
              <View style={styles.unitCardPadding}>
                <FlatList
                  data={this.renderUnitStats(item)}
                  renderItem={({ item }) => item}
                />
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.imageContainer}>
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - screenWidth / 3} // offset left,right
          data={
            TWWUNITS[this.state.factionID].units[this.state.catagoryID].units
          }
          renderItem={this._renderCatagory}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    // backgroundColor: "white",
    borderRadius: 8,
  },
  unitImage: {
    width: screenWidth / 6,
    height: screenWidth / 3,
  },
  unitCardPadding: {
    paddingLeft: screenWidth * 0.05,
    paddingTop: screenWidth * 0.05,
    paddingBottom: screenWidth * 0.05,
  },
  unitCardSize: {
    width: screenWidth * 0.65,
    height: screenHeight * 0.6,
    resizeMode: "contain",
  },
  statIcon: { resizeMode: "contain", width: 15, height: 15 },
});
