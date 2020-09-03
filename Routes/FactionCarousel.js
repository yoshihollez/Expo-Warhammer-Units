import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import factionImages from "../assets/faction-images.json";
import TWWUNITS from "../assets/TWW-units.json";
// import icons from "../assets/icons.json";
let { width: screenWidth, height: screenHeight } = Dimensions.get("window");
export default class FactionCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.nav,
      showUnit: false,
      faction: "",
      factionID: 0,
      catagory: "",
      catagoryID: 0,
    };
  }
  _renderItem = ({ item, index }) => {
    let catagory = [];

    for (let index = 0; index < TWWUNITS.length; index++) {
      let element = TWWUNITS[index];
      if (
        item.mainFaction.includes(element.factionName.replace(/(_)/gm, " "))
      ) {
        let i;
        for (i = 0; i < element.units.length; i++) {
          if (typeof element.units[i].catagory == "string") {
            catagory.push({
              key: i.toString(),
              catagoryName: element.units[i].catagory
                .replace(/(_)/gm, " ")
                .replace(/"."/g, ""),
              faction: item.mainFaction,
              factionID: index,
              catagoryID: i,
            });
          }
        }

        return (
          <View>
            <View style={{ alignItems: "center" }}>
              <Image
                style={styles.factionImage}
                source={{ uri: item.factionImage }}
              />
            </View>
            <Text style={styles.title}>{item.factionName}</Text>
            <View style={styles.unitCardSize}>
              <ImageBackground
                style={styles.unitCardPadding}
                source={require("../assets/unitcard.png")}
              >
                <FlatList
                  data={catagory}
                  renderItem={({ item }) => (
                    <Text
                      onPress={() => {
                        this.props.action({
                          showUnit: true,
                          faction: item.faction,
                          factionID: item.factionID,
                          catagory: item.catagoryName,
                          catagoryID: item.catagoryID,
                        }),
                          this.state.navigation.navigate("unitCard", {
                            data: {
                              showUnit: true,
                              faction: item.faction,
                              factionID: item.factionID,
                              catagory: item.catagoryName,
                              catagoryID: item.catagoryID,
                            },
                          });
                      }}
                      style={styles.catagories}
                      key={item.key}
                    >
                      {item.catagoryName}
                    </Text>
                  )}
                />
              </ImageBackground>
            </View>
          </View>
        );
      }
    }

    return <View></View>;
  };
  render() {
    return (
      <View style={styles.imageContainer}>
        <Carousel
          layout={"tinder"}
          sliderWidth={screenWidth}
          sliderHeight={screenHeight}
          itemWidth={screenWidth - screenWidth / 3} // offset left,right
          data={factionImages}
          renderItem={this._renderItem}
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
  title: {
    color: "red",
    textAlign: "center",
  },
  catagories: {
    height: screenWidth / 8,
  },
  factionImage: {
    resizeMode: "contain",
    padding: screenWidth * 0.05,
    width: screenWidth * 0.6,
    height: screenHeight * 0.25,
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
});
