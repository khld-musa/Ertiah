import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  Text,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';

const {width} = Dimensions.get('window');

const uri = 'https://www.eeb.ertiah.com';

const Loading = () => {
  return (
    <View style={styles.loadingWrapper}>
      <ActivityIndicator animating={true} size="large" color="#0000ff" />
    </View>
  );
};

const Error = () => {
  return (
    <View style={styles.loadingWrapper}>
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection !</Text>
      </View>
      <Image style={styles.image} source={require('./assets/bad.png')} />
    </View>
  );
};

const App = () => {
  const webview = useRef(null);
  const canGoBackRef = useRef(false);
  const onAndroidBackPress = () => {
    if (canGoBackRef.current && webview.current) {
      webview.current.goBack();
      return true;
    }
    return false;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, []);
  const onNavigationStateChange = ({canGoBack}) => {
    canGoBackRef.current = canGoBack;
  };
  const reload = () => webview.current.reload();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.wrapper}>
      <WebView
        ref={webview}
        source={{uri}}
        style={styles.webView}
        onNavigationStateChange={onNavigationStateChange}
        javaScriptEnabled
        domStorageEnabled
        renderLoading={() => <Loading />}
        renderError={() => <Error reload={reload} />}
        startInLoadingState
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    color: '#fefefe',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
  loadingWrapper: {
    backgroundColor: '#fff',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    marginBottom: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginLeft: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  retry: {
    alignSelf: 'center',
    paddingHorizontal: '10px',
    paddingVertical: '5px',
  },
  webview: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: '#4ecdc4',
    flex: 1,
  },
  image: {
    height: '40%',
    width: '70%',
    marginBottom: 50,
  },
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0,
  },
  offlineText: {color: '#fff'},
  button: {
    backgroundColor: '#4ecdc4',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '40%',
    marginTop: 50,
  },
});

export default App;