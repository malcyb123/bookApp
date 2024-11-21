import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import Account from "./components/Account";
import { View, Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Session } from "@supabase/supabase-js";

import { Ionicons} from "@expo/vector-icons";
import BookTrack from "./components/BookTrack/BookTrack";
import HomeScreen from "./components/Home/HomeScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const AuthStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={Auth}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  const AppTabs = ({ session }: { session: Session }) => (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="BookTrack"
        component={BookTrack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        children={(props) => <Account {...props} session={session} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      {session && session.user ? <AppTabs session={session} /> : <AuthStack />}
    </NavigationContainer>
  );
}
