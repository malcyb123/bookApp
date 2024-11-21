import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Account from './components/Account';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Session } from '@supabase/supabase-js';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const AccountStack = ({ session }: { session: Session }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="AccountMain"
      children={() => <Account session={session} />} 
      options={({ navigation }) => ({
        title: 'Account',
        headerRight: () => (
          <Text
            style={{ marginRight: 10, color: 'blue' }}
            onPress={() => navigation.goBack()}
          >
            ✖ Close
          </Text>
        ),
      })}
    />
  </Stack.Navigator>
);

const AppDrawer = ({ session }: { session: Session }) => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen
      name="Account"
      children={() => <AccountStack session={session!} />}
    />
  </Drawer.Navigator>
);

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

  return (
    <NavigationContainer>
      {session && session.user ? <AppDrawer session={session} /> : <AuthStack />}
    </NavigationContainer>
  );
}
