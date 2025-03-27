import { colors, spacing } from '@/themes';
import { useClickOutside } from 'react-native-click-outside';
import { useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

import { Text } from '@/components';
import { SelectOption } from '@/interfaces';
import React from 'react';

interface DropdownProps {
  data: SelectOption[];
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

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  const handleOpenDropdown = () => {
    setIsOpen(true);
  };

  const handleSelect = (item: string) => {
    onSelect(item);
    handleCloseDropdown();
  };

  const ref = useClickOutside<View>(() => setIsOpen(false));

  return (
    <>
      <View style={styles.container} ref={ref}>
        {/* Dropdown Button */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={handleOpenDropdown}
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
      </View>
      {/* Dropdown List */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        style={{ justifyContent: 'center', backgroundColor: '#000' }}
      >
        <Pressable style={styles.overlay} onPress={handleCloseDropdown}>
          <View style={styles.list}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text size="sm">{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '80%',
    borderRadius: spacing[2],
    backgroundColor: colors.white1,
    maxHeight: 300,
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
