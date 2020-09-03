import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, Platform } from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import TWWUNITS from "../assets/TWW-units.json";
// import factionImages from "../assets/faction-images.json";

let { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default class UnitCarousel extends Component {
  constructor(props) {
    super(props);
    console.log(props.factionName);
    // this.state = {
    //   mainFaction: props.mainFactionName,
    //   hideUnits: props.hideUnits
    // };
  }
  _renderItem = ({ item, index }, parallaxProps) => {
    let element = item.factionName;
    let image = item.units[0].units[0].unitImage;
    let name = item.units[0].units[0].name;
    // console.log(this.state);
    // if (typeof this.mainFaction == "string") {
    //   if (this.mainFaction.includes(element)) {
    // if (this.hideUnits) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: image }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {name}
        </Text>
      </View>
    );
    // }
    //   }
    // }
  };
  render() {
    // console.log(TWWUNITS[1].units[0].units[0].unitImage)

    return (
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60} // offset left,right
        data={TWWUNITS}
        renderItem={this._renderItem}
        hasParallaxImages={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    // backgroundColor: "white",
    borderRadius: 8, //useless??
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
  title: {
    textAlign: "center",
  },
});
