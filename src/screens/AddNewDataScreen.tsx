import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BackArrow from '../constants/icons/BackArrow';
import {useNavigation} from '@react-navigation/native';

const AddNewDataScreen = () => {
  const navigation = useNavigation();

  {
    /*User would be able to add the new data if the server would be real.
    Right now I only implemented the logic and UI of adding new data. 
    If our server would be real, when we add the new data the new data will appear in Main screen */
  }
  const createPost = async (values: any, {resetForm}) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify({
            id: values.id,
            title: values.title,
            body: values.body,
            userId: values.userId,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );
      const data = await response.json();
      console.log('data', data);

      if (response.ok) {
        resetForm();
        ToastAndroid.show('Your post added successfully', ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show(
        `Sorry, This error occurred${error}`,
        ToastAndroid.LONG,
      );
    }
  };

  const validationSchema = Yup.object().shape({
    id: Yup.string()
      .required('Id is required, Please add the Id')
      .label('The id should be number'),
    userId: Yup.string().required(
      'UserId is required, Please Enter the user Id',
    ),
    title: Yup.string().required('Title is required, Please add the title'),
    body: Yup.string().required('Body is required, Please add the body'),
  });

  return (
    <SafeAreaView testID="add-new-data-text" style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.navigate('MainScreen' as never)}>
          <BackArrow />
        </TouchableOpacity>

        <Text
          style={[
            styles.text,
            {
              fontSize: 20,
              fontWeight: '700',
              alignSelf: 'center',
              marginTop: 5,
              marginLeft: Dimensions.get('screen').width * 0.3,
            },
          ]}>
          Add New Data
        </Text>
      </View>

      <Formik
        validationSchema={validationSchema}
        initialValues={{id: '', userId: '', title: '', body: ''}}
        onSubmit={createPost}
        validateOnMount={true}>
        {({values, errors, handleBlur, touched, handleChange, submitForm}) => {
          const {id, userId, title, body} = values;
          return (
            <>
              <TouchableOpacity
                onPress={() => Keyboard.dismiss()}
                activeOpacity={0}
                style={{marginTop: 20}}>
                <View style={styles.inputRow}>
                  <Text style={styles.text}>ID</Text>
                  <TextInput
                    testID="id-input"
                    style={[styles.input, {height: 45}]}
                    value={id}
                    numberOfLines={1}
                    onBlur={handleBlur('id')}
                    onChangeText={handleChange('id')}
                  />
                  {errors ? (
                    <Text style={styles.error}>{touched.id && errors.id}</Text>
                  ) : null}
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.text}>UserId</Text>
                  <TextInput
                    testID="user-id-input"
                    style={[styles.input, {height: 45}]}
                    value={userId}
                    numberOfLines={1}
                    onBlur={handleBlur('userId')}
                    onChangeText={handleChange('userId')}
                  />
                  {errors ? (
                    <Text style={styles.error}>
                      {touched.userId && errors.userId}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.text}>Title</Text>
                  <TextInput
                    testID="title-input"
                    style={styles.input}
                    value={title}
                    numberOfLines={3}
                    onBlur={handleBlur('title')}
                    onChangeText={handleChange('title')}
                    textAlignVertical="top"
                    multiline={true}
                    onSubmitEditing={() => Keyboard.dismiss()}
                  />
                  {errors ? (
                    <Text style={styles.error}>
                      {touched.title && errors.title}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.text}>Body</Text>
                  <TextInput
                    testID="body-input"
                    style={styles.input}
                    numberOfLines={5}
                    onBlur={handleBlur('body')}
                    onChangeText={handleChange('body')}
                    value={body}
                    textAlignVertical="top"
                    multiline={true}
                  />
                  {errors ? (
                    <Text style={styles.error}>
                      {touched.body && errors.body}
                    </Text>
                  ) : null}
                </View>
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() => {
                    submitForm();
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>Submit</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  backArrow: {
    marginLeft: 10,
  },
  input: {
    width: '95%',
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 8,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  inputRow: {
    width: Dimensions.get('screen').width * 1,
    alignSelf: 'center',
  },
  text: {
    marginHorizontal: 10,
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    marginBottom: 10,
  },
  submitBtn: {
    width: Dimensions.get('screen').width * 0.6,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#409CE3',
    alignSelf: 'center',
    borderRadius: 15,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
  },
});
export default AddNewDataScreen;
