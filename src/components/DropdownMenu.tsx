import React, {useRef} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import More from '../constants/icons/More';

interface Props {
  testID: string;
  options: {}[];
  height?: number;
  onOptionSelect: (option: any) => void;
  color?: string;
}

const DropdownMenu = ({
  testID,
  options,
  height = 80,
  onOptionSelect,
  color = '#000',
}: Props) => {
  const dropdownRef = useRef(null);

  return (
    <ModalDropdown
      testID={testID}
      ref={dropdownRef}
      options={options}
      isFullWidth={true}
      dropdownTextStyle={{color: '#fff'}}
      dropdownStyle={[styles.dropdown, {height: height, borderColor: '#fff'}]}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      renderRow={(option, index) => (
        <TouchableWithoutFeedback
          onPress={() => {
            dropdownRef.current && dropdownRef.current.hide();
            onOptionSelect(option);
          }}>
          <View style={styles.dropdownOptionContainer}>
            <Text style={{marginRight: 10}}>{option.icon}</Text>
            <Text style={{color: color}}>{option.text}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}>
      <View style={styles.moreIcon}>
        <Text>
          <More />
        </Text>
      </View>
    </ModalDropdown>
  );
};

const styles = StyleSheet.create({
  dropdownIconBox: {
    width: 38,
    height: 38,
    borderRadius: 1000,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: 140,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 10,
    marginRight: 10,
  },
  dropdownOptionContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreIcon: {
    marginRight: 10,
    backgroundColor: '#848593',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
export default DropdownMenu;
