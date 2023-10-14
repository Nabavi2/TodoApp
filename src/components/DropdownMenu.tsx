import React, {useRef} from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';
import More from '../constants/icons/More';

interface Props {
  options: {}[];
  height?: number;
  marginLeft: number;
  onOptionSelect: (option) => void;
}

const DropdownMenu = ({
  options,
  height = 125,
  marginLeft = 10,
  onOptionSelect,
}: Props) => {
  const dropdownRef = useRef(null);

  return (
    <ModalDropdown
      ref={dropdownRef}
      options={options}
      isFullWidth={true}
      dropdownTextStyle={styles.dropdownText}
      dropdownStyle={[styles.dropdown, {height: height, borderColor: '#fff'}]}
      renderSeparator={() => null}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      renderRow={(option, index) => (
        <TouchableWithoutFeedback
          onPress={() => {
            dropdownRef.current.hide();
            onOptionSelect(option);
          }}>
          <View style={styles.dropdownOptionContainer}>
            <Text style={{marginRight: 10}}>{option.icon}</Text>
            <Text
              style={{
                color:
                  option.text == 'End' || option.text == 'Remove'
                    ? 'red'
                    : '#000',
              }}>
              {option.text}
            </Text>
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

export default DropdownMenu;

const styles = StyleSheet.create({
  dropdownIconBox: {
    width: 38,
    height: 38,
    borderRadius: 1000,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownText: {
    fontFamily: 'Exo-Medium',
    color: '#fff',
  },
  dropdown: {
    width: 140,
    height: 120,
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
    // paddingTop: 18,
    marginTop: 5,
  },
});
