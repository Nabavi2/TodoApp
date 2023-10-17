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

const MainScreen = (props: any) => {
  const navigation = useNavigation();
  const [postData, setPostData] = useState([]);
  const [previousPosts, setPreviousPosts] = useState(postData);
  const [searchWords, setSearchWords] = useState('');
  const [error, setError] = useState();
  const [searchedPosts, setSearchedPosts] = useState(null);

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
        setError(error);
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
    setSearchedPosts(searchedPosts);
    setPostData(searchWords ? searchedPosts : previousPosts);
  };
  const handleDeleteItem = (postId: number) => {
    const updatedPosts = postData.filter((post: any) => post.id !== postId);
    setPostData(updatedPosts);
  };
  return (
    <SafeAreaView testID="MainScreen" style={{flex: 1, paddingHorizontal: 10}}>
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
          placeholder="Search..."
        />
        <TouchableOpacity
          testID="search-button"
          onPress={() => {
            titleSearchHandler(searchWords);
          }}>
          <Search />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        {postData && (
          <FlatList
            data={postData}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TodoListItem info={item} onDeletePost={handleDeleteItem} />
              );
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
                  <Text style={styles.mainTitle}>Sorry, No post found !</Text>
                </SafeAreaView>
              );
            }}
          />
        )}
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
