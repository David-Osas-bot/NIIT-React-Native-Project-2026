import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './ChefNotificationsScreen.styles';

const NOTIFICATIONS = [
  {
    id: '1',
    name: 'Tanbir Ahmed',
    action: 'Placed a new order',
    time: '20 min ago',
    avatar: 'https://i.pravatar.cc/100?img=12',
    image: 'https://picsum.photos/seed/order1/100',
  },
  {
    id: '2',
    name: 'Salim Smith',
    action: 'left a 5 star review',
    time: '20 min ago',
    avatar: 'https://i.pravatar.cc/100?img=15',
    image: 'https://picsum.photos/seed/order2/100',
  },
  {
    id: '3',
    name: 'Royal Bengol',
    action: 'agreed to cancel',
    time: '20 min ago',
    avatar: 'https://i.pravatar.cc/100?img=33',
    image: 'https://picsum.photos/seed/order3/100',
  },
  {
    id: '4',
    name: 'Pabel Vuiya',
    action: 'Placed a new order',
    time: '20 min ago',
    avatar: 'https://i.pravatar.cc/100?img=51',
    image: 'https://picsum.photos/seed/order4/100',
  },
];

export default function ChefNotificationsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Text>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <View style={styles.tabsRow}>
        <View style={[styles.tab, styles.tabActive]}>
          <Text style={[styles.tabText, styles.tabTextActive]}>Notifications</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Messages (3)</Text>
        </View>
      </View>

      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationRow}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.textWrapper}>
              <Text style={styles.notificationText}>
                <Text style={styles.nameBold}>{item.name} </Text>
                {item.action}
              </Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.thumbnail} />
          </View>
        )}
      />
    </View>
  );
}