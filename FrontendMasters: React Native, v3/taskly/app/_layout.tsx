import { Tabs } from "expo-router";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../theme";

export default function Layout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorCerulean }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "todo list",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6
                            name="list-ul"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="counter"
                options={{
                    title: "Counter",
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign
                            name="clockcircleo"
                            size={size}
                            color={color}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="idea"
                options={{
                    title: "Idea",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5
                            name="lightbulb"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
