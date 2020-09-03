import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { createAppContainer } from "react-navigation";
import { TextInput } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import FactionCarousel from "./FactionCarousel";
import UnitCards from "./UnitCards";
let unitData = {
  showUnit: false,
  faction: "",
  factionID: 0,
  catagory: "",
  catagoryID: 0,
};

class HomeScreen extends React.Component {
  setData = (data) => {
    this.data = data;
    unitData = data;
  };
  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground
        source={{ uri: "https://mfiles.alphacoders.com/747/747552.jpg" }}
        style={{ width: "100%", height: "100%" }}
      >
        <FactionCarousel action={this.setData} nav={navigation} />
      </ImageBackground>
    );
  }
}
class unitCardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = unitData;
  }
  render() {
    const { navigation } = this.props;

    return (
      <ImageBackground
        source={{ uri: "https://mfiles.alphacoders.com/747/747552.jpg" }}
        style={{ width: "100%", height: "100%" }}
      >
        <UnitCards
          key={unitData.catagoryID + unitData.factionID}
          data={unitData}
          nav={navigation}
        />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewPadding: {
    padding: 50,
  },
});
const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          defaultHandler();
        },
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={"ios-home"} />
          </View>
        ),
      },
    },
    unitCard: {
      screen: unitCardScreen,
      navigationOptions: {
        tabBarLabel: "unit cards",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-images"}
            />
          </View>
        ),
        activeColor: "#f60c0d",
        inactiveColor: "#f65a22",
        barStyle: { backgroundColor: "#f69b31" },
      },
    },
  },
  {
    initialRouteName: "Home",
    activeColor: "#f0edf6",
    inactiveColor: "#226557",
    barStyle: { backgroundColor: "#3BAD87" },
  }
);

export default createAppContainer(TabNavigator);
