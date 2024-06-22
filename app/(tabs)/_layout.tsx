import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { View } from "react-native"

export default function TabLayout() {
  return (
  <Tabs
  screenOptions={{
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 27,
        left: 10,
        right: 10,
        height: 72,
        elevation: 0,
        backgroundColor: "#8BC0DE",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    }
  }}
  >
    <Tabs.Screen name="index" 
     
    options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
            <View style={{
                alignItems: "center",
                paddingTop: 10
            }}>
                <Ionicons
                name="home-outline"
                size={35}
                color={ 'white'}
                />
            </View>
        )

    }}/>
    <Tabs.Screen name="calendar"
      options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
            <View style={{
                alignItems: "center",
                paddingTop: 10
            }}>
                <Ionicons
                name="calendar-outline"
                size={35}
                color={ 'white'}
                />
            </View>
        )

    }}
    />
      <Tabs.Screen name="add"
    options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
            <View style={{
                alignItems: "center",
               justifyContent:"center",
               height: 76,
               width: 76,
               borderRadius: 999,
               backgroundColor: 'black',
               marginBottom:26,
               borderWidth: 4,
               borderColor: 'white'
            }}>
                <Ionicons
                name="add-outline"
                size={45}
                color={ 'white'}
                />
            </View>
        )

    }}
    />
    <Tabs.Screen name="statistic"
     options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
            <View style={{
                alignItems: "center",
                paddingTop: 10
            }}>
                <Ionicons
                name="stats-chart-outline"
                size={35}
                color={ 'white'}
                />
            </View>
        )

    }}
    />
    <Tabs.Screen name="settings"
    options={{
        headerShown: false,
        tabBarIcon: ({focused}) => (
            <View style={{
                alignItems: "center",
                paddingTop: 10
            }}>
                <Ionicons
                name="settings-outline"
                size={35}
                color={ 'white'}
                />
            </View>
        )

    }}
    />
    
  </Tabs>
  )
}
