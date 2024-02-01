"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DynamicallySelectedPicker;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeLinearGradient = _interopRequireDefault(require("react-native-linear-gradient"));
var _DynamicallySelectedPickerListItem = _interopRequireDefault(require("./DynamicallySelectedPickerListItem"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const itemDefaults = [{
  label: 'No items',
  value: 0,
  itemColor: 'red'
}];
function DynamicallySelectedPicker({
  items = itemDefaults,
  onScroll,
  onScrollBeginDrag,
  onScrollEndDrag,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  renderItem = _DynamicallySelectedPickerListItem.default,
  width = 300,
  height = 300,
  horizontal = false,
  initialSelectedIndex = 0,
  transparentItemRows = 3,
  allItemsColor = '#000',
  fontFamily = 'Arial',
  fontSize,
  selectedItemBorderColor = '#cecece',
  renderGradientOverlay = true,
  topGradientColors = ['rgba( 255, 255, 255, 1 )', 'rgba( 255, 255, 255, 0.9 )', 'rgba( 255, 255, 255, 0.7 )', 'rgba( 255, 255, 255, 0.5 )'],
  bottomGradientColors = ['rgba( 255, 255, 255, 0.5 )', 'rgba( 255, 255, 255, 0.7 )', 'rgba( 255, 255, 255, 0.9 )', 'rgba( 255, 255, 255, 1 )'],
  nestedScrollEnabled = false
}) {
  // work out the size of each 'slice' so it fits in the size of the view
  const itemSize = Math.ceil((horizontal ? width : height) / (transparentItemRows * 2 + 1));
  const [itemIndex, setItemIndex] = (0, _react.useState)(initialSelectedIndex);

  // create a reference to the scroll view so we can control it's fine scroll
  const scrollViewRef = /*#__PURE__*/(0, _react.createRef)();
  const scrollToInitialPosition = () => {
    scrollViewRef.current?.scrollTo(horizontal ? {
      x: itemSize * initialSelectedIndex,
      animated: false
    } : {
      y: itemSize * initialSelectedIndex,
      animated: false
    });
  };
  function fakeItems(n = 3) {
    const itemsArr = [];
    for (let i = 0; i < n; i++) {
      itemsArr[i] = {
        value: -1,
        label: '',
        fakeItem: true
      };
    }
    return itemsArr;
  }
  function allItemsLength() {
    return extendedItems().length - transparentItemRows * 2;
  }
  function onScrollListener(event) {
    if (onScroll != null) {
      const index = getItemIndex(event);
      if (itemIndex !== index && index >= 0 && index < allItemsLength()) {
        setItemIndex(index);
        onScroll({
          index
        });
      }
    }
  }
  function onMomentumScrollBeginListener(event) {
    if (onMomentumScrollBegin != null) {
      const index = getItemIndex(event);
      if (index >= 0 && index < allItemsLength()) {
        setItemIndex(index);
        onMomentumScrollBegin({
          index
        });
      }
    }
  }
  function onMomentumScrollEndListener(event) {
    if (onMomentumScrollEnd != null) {
      const index = getItemIndex(event);
      if (index >= 0 && index < allItemsLength()) {
        setItemIndex(index);
        onMomentumScrollEnd({
          index
        });
      }
    }
  }
  function onScrollBeginDragListener(event) {
    if (onScrollBeginDrag != null) {
      const index = getItemIndex(event);
      if (index >= 0 && index < allItemsLength()) {
        setItemIndex(index);
        onScrollBeginDrag({
          index
        });
      }
    }
  }
  function onScrollEndDragListener(event) {
    if (onScrollEndDrag != null) {
      const index = getItemIndex(event);
      if (index >= 0 && index < allItemsLength()) {
        setItemIndex(index);
        onScrollEndDrag({
          index
        });
      }
    }
  }
  function getItemIndex(event) {
    const offset = horizontal ? event.nativeEvent.contentOffset.x : event.nativeEvent.contentOffset.y;
    return Math.round(offset / itemSize);
  }
  function extendedItems() {
    return [...fakeItems(transparentItemRows), ...items, ...fakeItems(transparentItemRows)];
  }
  const position = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  };
  const border = {
    width: 1
  };

  // calculate the gradient size
  const gradientSize = Math.round(((horizontal ? width : height) - itemSize) / 2);
  const PickerListItem = renderItem;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      height,
      width
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    ref: scrollViewRef,
    nestedScrollEnabled: nestedScrollEnabled,
    onLayout: scrollToInitialPosition,
    showsVerticalScrollIndicator: false,
    showsHorizontalScrollIndicator: false,
    onMomentumScrollBegin: onMomentumScrollBeginListener,
    onMomentumScrollEnd: onMomentumScrollEndListener,
    onScrollBeginDrag: onScrollBeginDragListener,
    onScrollEndDrag: onScrollEndDragListener,
    onScroll: onScrollListener,
    scrollEventThrottle: 20,
    horizontal: horizontal,
    snapToInterval: itemSize
  }, extendedItems().map((item, index) => {
    return /*#__PURE__*/_react.default.createElement(PickerListItem, {
      key: index,
      item: item,
      fakeItem: item.fakeItem ? item.fakeItem : false,
      isSelected: itemIndex + transparentItemRows === index,
      allItemsColor: allItemsColor,
      fontSize: fontSize ? fontSize : itemSize / 2,
      fontFamily: fontFamily,
      horizontal: horizontal,
      height: itemSize
    });
  })), horizontal ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderGradientOverlay && /*#__PURE__*/_react.default.createElement(_reactNativeLinearGradient.default, {
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 1,
      y: 0
    },
    colors: topGradientColors,
    style: [styles.gradientHorizontalWrapper, {
      left: position.left,
      width: gradientSize
    }],
    pointerEvents: "none"
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.gradientHorizontalWrapper, {
      left: gradientSize,
      borderLeftWidth: border.width,
      borderLeftColor: selectedItemBorderColor
    }],
    pointerEvents: "none"
  }), renderGradientOverlay && /*#__PURE__*/_react.default.createElement(_reactNativeLinearGradient.default, {
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 1,
      y: 0
    },
    colors: bottomGradientColors,
    style: [styles.gradientHorizontalWrapper, {
      right: position.right,
      width: gradientSize
    }],
    pointerEvents: "none"
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.gradientHorizontalWrapper, {
      right: gradientSize,
      borderRightWidth: border.width,
      borderRightColor: selectedItemBorderColor
    }],
    pointerEvents: "none"
  })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderGradientOverlay && /*#__PURE__*/_react.default.createElement(_reactNativeLinearGradient.default, {
    colors: topGradientColors,
    style: [styles.gradientVerticalWrapper, {
      top: position.top,
      height: gradientSize
    }],
    pointerEvents: "none"
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.gradientVerticalWrapper, {
      top: gradientSize,
      borderBottomWidth: border.width,
      borderBottomColor: selectedItemBorderColor
    }],
    pointerEvents: "none"
  }), renderGradientOverlay && /*#__PURE__*/_react.default.createElement(_reactNativeLinearGradient.default, {
    colors: bottomGradientColors,
    style: [styles.gradientVerticalWrapper, {
      bottom: position.bottom,
      height: gradientSize
    }],
    pointerEvents: "none"
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.gradientVerticalWrapper, {
      bottom: gradientSize,
      borderTopWidth: border.width,
      borderTopColor: selectedItemBorderColor
    }],
    pointerEvents: "none"
  })));
}
const styles = _reactNative.StyleSheet.create({
  listItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradientVerticalWrapper: {
    position: 'absolute',
    width: '100%'
  },
  gradientHorizontalWrapper: {
    position: 'absolute',
    height: '100%'
  }
});
//# sourceMappingURL=DynamicallySelectedPicker.js.map