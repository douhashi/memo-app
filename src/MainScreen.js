import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { List, FAB } from 'react-native-paper';
import format from 'date-fns/format';
import { useNavigation } from '@react-navigation/native';
import { save } from './store';
import { loadAll} from './store';

export const MainScreen = () => {
  const navigation = useNavigation();
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      const newMemos = await loadAll(); // (2)
      setMemos(newMemos);
    };

    const unsubscribe = navigation.addListener('focus', initialize); // (1)

    return unsubscribe;
  }, [navigation]);

  const onPressAdd = () => {
    navigation.navigate('Compose'); // (3)
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={memos} // (1)
        keyExtractor={item => `${item.createdAt}`} // (2)
        renderItem={({ item }) => ( // (3)
          <List.Item // (4)
            title={item.text}
            titleNumberOfLines={5}
            description={`作成日時: ${format(item.createdAt, 'yyyy.MM.dd HH:mm')}`}
            descriptionStyle={{ textAlign: 'right' }}
          />
        )}
      />
      <FAB
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        icon="plus"
        onPress={onPressAdd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

