import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import More from '../constants/icons/More';
import DropdownMenu from './DropdownMenu';
import Edit from '../constants/icons/Edit';
import Delete from '../constants/icons/Delete';
import {useNavigation} from '@react-navigation/native';
import CirclePlus from '../constants/icons/CirclePlus';

interface Props {
  info: {
    id: number;
    title: string;
    body: string;
    userId: number;
  };
}
const todoDropdownOptions = [
  {
    text: 'Edit Post',
    icon: <Edit />,
  },
  {
    text: 'Delete Post',
    icon: <Delete />,
  },
];
const TodoListItem = ({info}: Props) => {
  const navigation = useNavigation();
  const handleConfirmDelete = () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        ToastAndroid.show(
          'The post has been deleted successfully',
          ToastAndroid.LONG,
        );
      })
      .catch(error => {
        ToastAndroid.show(
          `There was a problem deleting the post  ${error}`,
          ToastAndroid.LONG,
        );
      });
  };
  const onTodoOptionSelect = (option: any) => {
    switch (option.text) {
      case 'Edit Post':
        return navigation.navigate('EditScreen' as never);
      case 'Delete Delete':
        return Alert.alert(
          'Warning !',
          'Are you sure you want to delete this post?',
          [{text: 'Cancel'}, {text: 'Delete', onPress: handleConfirmDelete}],
        );
    }
  };
  const {title, body} = info;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.title, {fontWeight: '700', fontSize: 18}]}>
          Title:
        </Text>
        <DropdownMenu
          options={todoDropdownOptions}
          onOptionSelect={onTodoOptionSelect}
          height={80}
          marginLeft={10}
        />
      </View>
      <Text style={[styles.title, {marginTop: -4}]}>{title}</Text>

      <View>
        <Text style={[styles.title]}>Body:</Text>
        <Text
          style={{
            color: '#000',
            margin: 10,
            fontWeight: '400',
            fontSize: 15,
            // marginRight: 30,
            marginTop: -10,
          }}>
          {body}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width * 0.95,
    borderRadius: 10,
    elevation: 0.5,
    backgroundColor: '#B3B3B8',
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    margin: 10,
  },
  moreIcon: {
    marginRight: 10,
    backgroundColor: '#848593',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 18,
  },
});
export default TodoListItem;
