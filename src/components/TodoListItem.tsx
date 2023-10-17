import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import DropdownMenu from './DropdownMenu';
import Edit from '../constants/icons/Edit';
import Delete from '../constants/icons/Delete';
import {useNavigation} from '@react-navigation/native';

interface Props {
  info: {
    id: number;
    title: string;
    body: string;
    userId: number;
  };
  onDeletePost: (postId: number) => void;
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
export default function TodoListItem({info, onDeletePost}: Props) {
  const navigation = useNavigation();
  const [modalShow, setModalShow] = useState(false);
  const [editingOject, setEditingObject] = useState({
    title: '',
    body: '',
  });
  const [editedInfo, setEditedInfo] = useState(info);
  {
    /*This function will handle the request for deleting the post */
  }
  {
    /*I have implemented the logic of the DELETE method that will work for Real server if we had, 
    Because we don't have real server so I filtered the list as well to show the user that 
    we remove a post from the list. */
  }
  const handleConfirmDelete = () => {
    try {
      onDeletePost(info.id);
      fetch(`https://jsonplaceholder.typicode.com/posts/${info.id}`, {
        method: 'DELETE',
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        ToastAndroid.show(
          'The post has been deleted successfully',
          ToastAndroid.LONG,
        );
      });
    } catch (error) {
      ToastAndroid.show(
        `There was a problem deleting the post  ${error}`,
        ToastAndroid.LONG,
      );
    }
  };
  {
    /*This function will open the modal and add title and body to the modal inputs */
  }
  const onModalShowEditorHandler = () => {
    setEditingObject({title: editedInfo.title, body: editedInfo.body});
    setModalShow(true);
  };
  {
    /*This function will handle the request for editing the title and body { I have implemented the real method logic and editing for ui as well. 
      Because data won't be updated in the server} */
  }
  const onEditHandler = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${info.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            id: info.id,
            title: editingOject.title,
            body: editingOject.body,
            userId: info.userId,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );
      const data = await response.json();
      setEditedInfo(data);
      if (response.ok) {
        ToastAndroid.show(
          'The post has been edited successfully',
          ToastAndroid.LONG,
        );
        setModalShow(false);
      }
    } catch (error) {
      ToastAndroid.show(
        `There was a problem to editing the post  ${error}`,
        ToastAndroid.LONG,
      );
    }
  };
  const onTodoOptionSelect = (option: any) => {
    switch (option.text) {
      case 'Edit Post':
        return onModalShowEditorHandler();
      case 'Delete Post':
        return Alert.alert(
          'Warning !',
          'Are you sure you want to delete this post?',
          [{text: 'Cancel'}, {text: 'Delete', onPress: handleConfirmDelete}],
        );
    }
  };
  const {title, body} = info;
  return (
    <View testID="TodoListItem" style={styles.container}>
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
          testID="dropdown-menu"
          options={todoDropdownOptions}
          onOptionSelect={onTodoOptionSelect}
        />
      </View>
      <Text style={[styles.title, {marginTop: -4}]}>{editedInfo.title}</Text>
      <Modal
        transparent={true}
        animationType={'none'}
        visible={modalShow}
        onRequestClose={() => {
          console.log('close modal');
        }}>
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => {
            setModalShow(false);
          }}>
          <View style={styles.modalFooter}>
            <Text
              style={[
                styles.title,
                {
                  marginLeft: 0,
                  alignSelf: 'center',
                  marginTop: 0,
                  fontSize: 20,
                },
              ]}>
              Edit title and body
            </Text>
            <Text style={[styles.title, {marginLeft: 0}]}>Title</Text>
            <TextInput
              style={styles.input}
              numberOfLines={2}
              onChangeText={text =>
                setEditingObject({title: text, body: editingOject.body})
              }
              value={editingOject.title}
              textAlignVertical="top"
              multiline={true}
            />
            <Text style={[styles.title, {marginLeft: 0}]}>Body</Text>
            <TextInput
              style={styles.input}
              onChangeText={text =>
                setEditingObject({title: editingOject.title, body: text})
              }
              numberOfLines={5}
              value={editingOject.body}
              textAlignVertical="top"
              multiline={true}
            />
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => onEditHandler()}>
              <Text style={styles.title}>Edit</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
          {editedInfo.body}
        </Text>
      </View>
    </View>
  );
}
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
  },
  modalBackground: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  modalFooter: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#CECFDE',
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 8,
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  editBtn: {
    alignSelf: 'flex-end',
    height: 40,
    width: Dimensions.get('screen').width * 0.15,
    backgroundColor: '#409CE3',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
