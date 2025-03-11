import { ScrollView, View, StyleSheet } from 'react-native';
import BannerCard from '../BannerCard';

// Types
interface Banner {
  id: string;
  title: string;
  imageUrl: string;
}

interface BannerListProps {
  data: Banner[];
}

const CategoryList = ({ data }: BannerListProps) => {
  return (
    <ScrollView
      horizontal
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.bannerContainer}>
        {data.map(({ id, title, imageUrl }) => (
          <BannerCard key={id} title={title} image={imageUrl} />
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 170,
  },
  bannerContainer: {
    flexDirection: 'row',
    gap: 16,
  },
});
