import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });
};

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [isReady, setIsReady] = useState(false);

  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 20 * 2
    );

    useEffect(() => {
        const onChange = () => {
            const width = Dimensions.get("window").width - 20 * 2;
            setdimensions(width);
        };
        Dimensions.addEventListener("change", onChange);
    }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
    };
    
if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
    
return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../assets/imges/photoBG.png")}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "android" && "padding" }>
        <View style={{ ...styles.backdrop, marginBottom: isShowKeyboard ? -455 : 0 }}>
          <View style={styles.avatar}>
                <TouchableOpacity style={styles.addAvatar}>
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </TouchableOpacity>   
               </View>  
          <View style={styles.form}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Регистрация</Text>
              </View>
          <View>
              <TextInput style={styles.input} textAlign={"center"} placeholder={"Логин"}
                      placeholderTextColor={"#BDBDBD"} onFocus={() => setIsShowKeyboard(true)}
                      value={state.login}
                      onChangeText={(value) =>
                      setstate((prevState) => ({ ...prevState, login: value }))}/>
          </View>
           <View style={{ marginTop: 16 }}>
              <TextInput style={styles.input} textAlign={"center"} placeholder={"Адрес электронной почты"}
                      placeholderTextColor={"#BDBDBD"} onFocus={() => setIsShowKeyboard(true)}
                            value={state.email}
                            onChangeText={(value) =>
                            setstate((prevState) => ({ ...prevState, email: value }))
                  }/>
          </View>
           <View style={{ marginTop: 16 }}>
              <TextInput style={styles.input} textAlign={"center"} placeholder={"Пароль"}
                      placeholderTextColor={"#BDBDBD"} secureTextEntry={true} value={state.password}        
                            onFocus={() => setIsShowKeyboard(true)}
                            onChangeText={(value) =>
                            setstate((prevState) => ({ ...prevState, password: value }))
                      }/>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={keyboardHide}>
                    <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                <Text style={styles.accessText}>Уже есть аккаунт? Войти</Text> 
        </View>
         </View>
         </KeyboardAvoidingView>
      </ImageBackground>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    textAlign: "left",
      padding: 16,
  },
  form: {
    marginHorizontal: 16,
  },
  header: {
    alignItems: "center",
    },
  headerTitle: {
    color: "#212121",
    marginTop: 32,
    marginBottom: 32,
    fontSize: 30,
    textAlign: "center",
    placeholderTextColor: "#BDBDBD",
    fontFamily: "Roboto-Bold",
    },
   backdrop: {
    marginTop: "50%",
    backgroundColor: "#fff",
    width: 375,
    height: 549,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
   avatar: {
    marginTop: -60,
    marginLeft: 128,
    alignItems: "flex-end",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    },
 addAvatar: {
    marginTop: 81, 
    marginRight: -12,
  },
 btn: {
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 100,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
      marginHorizontal: 10,
      ...Platform.select({
          ios: {
              backgroundColor: "#FF6C00",
              borderColor: "transparent",
          },
          android: {
              backgroundColor: "#FF6C00",
              borderColor: "transparent",
          },
      }),
  },
  btnTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    },
 accessText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});

