import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import TodoListItem from '../components/TodoListItem';
import Search from '../constants/icons/Search';
import CirclePlus from '../constants/icons/CirclePlus';
import {useNavigation} from '@react-navigation/native';

const MainScreen = () => {
  const navigation = useNavigation();
  const [postData, setPostData] = useState();
  const [searchItem, setSearchItem] = useState('');
  const [previousPosts, setPreviousPosts] = useState(postData);
  const [searchWords, setSearchWords] = useState('');

  useMemo(() => {
    const createPost = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
          {
            method: 'GET',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          },
        );
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    createPost();
  }, [searchWords]);

  const titleSearchHandler = (text: string) => {
    const searchedPosts = postData.filter((post: any) => {
      return post.title
        .toString()
        .toLowerCase()
        .includes(text.toString().toLowerCase());
    });

    setPostData(searchWords ? searchedPosts : previousPosts);
  };
  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.mainTitle}>Todo App</Text>
        <TouchableOpacity
          style={styles.plusIcon}
          onPress={() => navigation.navigate('AddNewDataScreen' as never)}>
          <CirclePlus />
        </TouchableOpacity>
      </View>
      <View style={styles.searchInputBox}>
        <TextInput
          style={{width: '92%'}}
          onChangeText={text => {
            setSearchWords(text);
          }}
          value={searchWords}
          cursorColor="#B3B3B8"
        />
        <TouchableOpacity
          onPress={() => {
            titleSearchHandler(searchWords);
          }}>
          <Search />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <FlatList
          data={postData}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <TodoListItem info={item} />;
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <SafeAreaView
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.mainTitle}>
                  Sorry, No post found with {searchWords} title !
                </Text>
              </SafeAreaView>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  searchInputBox: {
    width: Dimensions.get('screen').width * 0.95,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  plusIcon: {
    marginRight: 4,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default MainScreen;
