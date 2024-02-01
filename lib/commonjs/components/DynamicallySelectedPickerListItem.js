"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DynamicallySelectedPickerListItem;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function DynamicallySelectedPickerListItem({
  item,
  allItemsColor,
  fontSize,
  horizontal,
  height,
  fontFamily = 'Arial'
}) {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: horizontal ? {
      ...styles.viewWrapper,
      width: height
    } : {
      ...styles.viewWrapper,
      height: height
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      fontSize: fontSize,
      color: item.itemColor ? item.itemColor : allItemsColor,
      fontFamily: fontFamily
    }
  }, item.label));
}
const styles = _reactNative.StyleSheet.create({
  viewWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=DynamicallySelectedPickerListItem.js.map