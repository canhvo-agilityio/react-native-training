import { colors, spacing } from '@/themes';
import { useClickOutside } from 'react-native-click-outside';
import { useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import { Text } from '@/components';

interface DropdownProps {
  data: string[];
  value?: string;
  placeholder?: string;
  errorMessage?: string;
  onSelect: (item: string) => void;
}

const Select = ({
  data,
  value,
  placeholder = 'Select an option',
  errorMessage,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: string) => {
    onSelect(item);
    setIsOpen(false);
  };

  const ref = useClickOutside<View>(() => setIsOpen(false));

  return (
    <View style={styles.container} ref={ref}>
      {/* Dropdown Button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text size="sm">{value || placeholder}</Text>
        <Text>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {errorMessage && (
        <Text variant="error" size="base" style={styles.errorMessage}>
          {errorMessage}
        </Text>
      )}

      {/* Dropdown List */}
      {isOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            scrollEnabled={true}
            style={styles.list}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <Text size="sm">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white1,
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderColor: colors.border.borderPrimary,
  },
  dropdown: {
    maxHeight: 150,
    marginTop: spacing[1],
    backgroundColor: colors.white1,
    borderRadius: spacing[2],
    borderWidth: 1,
    borderColor: colors.border.borderPrimary,
    overflow: 'hidden',
  },
  list: {
    maxHeight: 150, // Đảm bảo danh sách cuộn được
  },
  dropdownItem: {
    padding: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.borderPrimary,
  },
  errorMessage: {
    position: 'absolute',
    bottom: -spacing[4.5],
  },
});

export default Select;
