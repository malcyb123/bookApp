import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Account from './components/Account';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Session } from '@supabase/supabase-js';

// Screens for Drawer Navigation
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function AccountScreen({ session }: { session: Session }) {
  return <Account session={session} />;
}

// Stack and Drawer Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
      <Stack.Screen name="SignIn" component={Auth} options={{ headerShown: false }} />
    </Stack.Navigator>
  );

  const AppDrawer = () => (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="Account"
        children={() => <AccountScreen session={session!} />}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );

  return (
    <NavigationContainer>
      {session && session.user ? <AppDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
}
