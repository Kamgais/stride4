import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-SemiBold': require('../assets/fonts/Roboto-Bold.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
      <Stack.Screen name="(auth)" options={{headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{headerShown: false }} />
      {/* <Stack.Screen name="register" options={{ title: 'Login', headerShown: false }}/> */}
    
      
      </Stack>
    </ThemeProvider>
  );
}
