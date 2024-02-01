import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function DynamicallySelectedPickerListItem({
  item,
  allItemsColor,
  fontSize,
  horizontal,
  height,
  fontFamily = 'Arial'
}) {
  return /*#__PURE__*/React.createElement(View, {
    style: horizontal ? {
      ...styles.viewWrapper,
      width: height
    } : {
      ...styles.viewWrapper,
      height: height
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      fontSize: fontSize,
      color: item.itemColor ? item.itemColor : allItemsColor,
      fontFamily: fontFamily
    }
  }, item.label));
}
const styles = StyleSheet.create({
  viewWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=DynamicallySelectedPickerListItem.js.map