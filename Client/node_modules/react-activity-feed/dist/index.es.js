import _objectSpread from '@babel/runtime/helpers/objectSpread';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/inherits';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _extends from '@babel/runtime/helpers/extends';
import React__default, { isValidElement, createElement, Fragment, createContext, Component, createRef, PureComponent } from 'react';
import stream from 'getstream';
import StreamAnalytics from 'stream-analytics';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import immutable from 'immutable';
import URL from 'url-parse';
import anchorme from 'anchorme';
import _truncate from 'lodash/truncate';
import twitter from 'twitter-text';
import Dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import minMax from 'dayjs/plugin/minMax';
import _isPlainObject from 'lodash/isPlainObject';
import _isEqual from 'lodash/isEqual';
import _remove from 'lodash/remove';
import i18n from 'i18next';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/nl';
import 'dayjs/locale/ru';
import 'dayjs/locale/tr';
import 'dayjs/locale/fr';
import 'dayjs/locale/hi';
import 'dayjs/locale/it';
import 'dayjs/locale/en';
import { IconButton, FileIcon, LoadingIndicator, Thumbnail, ImageDropzone, ImagePreviewer, FilePreviewer, ImageUploadButton, FileUploadButton } from 'react-file-utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle, faBookmark } from '@fortawesome/free-regular-svg-icons';
import Lightbox from 'react-images';
import { emojiIndex, Picker } from 'emoji-mart';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import _uniq from 'lodash/uniq';
import _debounce from 'lodash/debounce';
import _difference from 'lodash/difference';
import _includes from 'lodash/includes';
import PropTypes from 'prop-types';

Dayjs.extend(utc);
Dayjs.extend(minMax); // import type { UserResponse } from 'getstream';

function humanizeTimestamp(timestamp, tDateTimeParser) {
  // Following calculation is based on assumption that tDateTimeParser()
  // either returns momentjs or dayjs object.
  var time = tDateTimeParser(timestamp).add(Dayjs(timestamp).utcOffset(), 'minute'); // parse time as UTC

  var now = tDateTimeParser();
  return time.from(now);
}
var smartRender = function smartRender(ElementOrComponentOrLiteral, props, fallback) {
  if (ElementOrComponentOrLiteral === undefined) {
    ElementOrComponentOrLiteral = fallback;
  }

  if (isValidElement(ElementOrComponentOrLiteral)) {
    // Flow cast through any, to make flow believe it's a React.Element
    return ElementOrComponentOrLiteral;
  } // Flow cast through any to remove React.Element after previous check


  var ComponentOrLiteral = ElementOrComponentOrLiteral;

  if (typeof ComponentOrLiteral === 'string' || typeof ComponentOrLiteral === 'number' || typeof ComponentOrLiteral === 'boolean' || ComponentOrLiteral == null) {
    return ComponentOrLiteral;
  }

  return createElement(ComponentOrLiteral, props);
};
function userOrDefault(user) {
  var actor;
  var notFound = {
    id: '!not-found',
    created_at: '',
    updated_at: '',
    data: {
      name: 'Unknown',
      profileImage: ''
    }
  };

  if (!user || typeof user === 'string' || typeof user.error === 'string') {
    actor = notFound;
  } else {
    //$FlowBug
    actor = user;
  }

  return actor;
}

function generateRandomId() {
  // prettier-ignore
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function S4() {
  return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}

function dataTransferItemsHaveFiles(items) {
  if (!items || !items.length) {
    return false;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item.kind === 'file' || item.type === 'text/html') {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}

function getFileLikes(items) {
  var fileLikes = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;

      if (item.kind === 'file') {
        var file = item.getAsFile();

        if (file) {
          fileLikes.push(file);
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return fileLikes;
}

function dataTransferItemsToFiles(_x) {
  return _dataTransferItemsToFiles.apply(this, arguments);
}

function _dataTransferItemsToFiles() {
  _dataTransferItemsToFiles = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3(items) {
    var fileLikes, blobPromises, parser, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _loop, _iterator3, _step3;

    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(!items || !items.length)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", []);

          case 2:
            fileLikes = getFileLikes(items); // If there are files inside the DataTransferItem prefer those

            if (!fileLikes.length) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", fileLikes);

          case 5:
            // Otherwise extract images from html
            blobPromises = [];
            parser = new DOMParser();
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context3.prev = 10;

            _loop = function _loop() {
              var item = _step3.value;

              if (item.type === 'text/html') {
                blobPromises.push(new Promise(function (accept) {
                  item.getAsString(
                  /*#__PURE__*/
                  function () {
                    var _ref = _asyncToGenerator(
                    /*#__PURE__*/
                    _regeneratorRuntime.mark(function _callee2(s) {
                      var doc, imageTags, imagePromises, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _loop2, _iterator4, _step4, _ret;

                      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              doc = parser.parseFromString(s, 'text/html');
                              imageTags = doc.getElementsByTagName('img');
                              imagePromises = [];
                              _iteratorNormalCompletion4 = true;
                              _didIteratorError4 = false;
                              _iteratorError4 = undefined;
                              _context2.prev = 6;

                              _loop2 = function _loop2() {
                                var tag = _step4.value;

                                if (!tag.src) {
                                  return "continue";
                                }

                                imagePromises.push(_asyncToGenerator(
                                /*#__PURE__*/
                                _regeneratorRuntime.mark(function _callee() {
                                  var res, contentType, buf, blob;
                                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                      switch (_context.prev = _context.next) {
                                        case 0:
                                          _context.prev = 0;
                                          _context.next = 3;
                                          return fetch(tag.src);

                                        case 3:
                                          res = _context.sent;
                                          _context.next = 9;
                                          break;

                                        case 6:
                                          _context.prev = 6;
                                          _context.t0 = _context["catch"](0);
                                          return _context.abrupt("return");

                                        case 9:
                                          contentType = res.headers.get('Content-type') || 'application/octet-stream';
                                          _context.next = 12;
                                          return res.arrayBuffer();

                                        case 12:
                                          buf = _context.sent;
                                          blob = new Blob([buf], {
                                            type: contentType
                                          });
                                          fileLikes.push(blob);

                                        case 15:
                                        case "end":
                                          return _context.stop();
                                      }
                                    }
                                  }, _callee, null, [[0, 6]]);
                                }))());
                              };

                              _iterator4 = imageTags[Symbol.iterator]();

                            case 9:
                              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                                _context2.next = 16;
                                break;
                              }

                              _ret = _loop2();

                              if (!(_ret === "continue")) {
                                _context2.next = 13;
                                break;
                              }

                              return _context2.abrupt("continue", 13);

                            case 13:
                              _iteratorNormalCompletion4 = true;
                              _context2.next = 9;
                              break;

                            case 16:
                              _context2.next = 22;
                              break;

                            case 18:
                              _context2.prev = 18;
                              _context2.t0 = _context2["catch"](6);
                              _didIteratorError4 = true;
                              _iteratorError4 = _context2.t0;

                            case 22:
                              _context2.prev = 22;
                              _context2.prev = 23;

                              if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                                _iterator4["return"]();
                              }

                            case 25:
                              _context2.prev = 25;

                              if (!_didIteratorError4) {
                                _context2.next = 28;
                                break;
                              }

                              throw _iteratorError4;

                            case 28:
                              return _context2.finish(25);

                            case 29:
                              return _context2.finish(22);

                            case 30:
                              _context2.next = 32;
                              return Promise.all(imagePromises);

                            case 32:
                              accept();

                            case 33:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2, null, [[6, 18, 22, 30], [23,, 25, 29]]);
                    }));

                    return function (_x2) {
                      return _ref.apply(this, arguments);
                    };
                  }());
                }));
              }
            };

            for (_iterator3 = items[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              _loop();
            }

            _context3.next = 19;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](10);
            _didIteratorError3 = true;
            _iteratorError3 = _context3.t0;

          case 19:
            _context3.prev = 19;
            _context3.prev = 20;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 22:
            _context3.prev = 22;

            if (!_didIteratorError3) {
              _context3.next = 25;
              break;
            }

            throw _iteratorError3;

          case 25:
            return _context3.finish(22);

          case 26:
            return _context3.finish(19);

          case 27:
            _context3.next = 29;
            return Promise.all(blobPromises);

          case 29:
            return _context3.abrupt("return", fileLikes);

          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[10, 15, 19, 27], [20,, 22, 26]]);
  }));
  return _dataTransferItemsToFiles.apply(this, arguments);
}

function inputValueFromEvent(event) {
  if (!event) {
    return;
  }

  var target;

  if (event.currentTarget) {
    target = event.currentTarget;
  } else {
    target = event.target;
  } // Trick flow into believing the target maybe has a value field


  var inputTarget = target;
  return inputTarget.value;
}
function sanitizeURL(url) {
  if (url == null) {
    return url;
  }

  var proto = URL(url).protocol; // allow http, https, ftp
  // IMPORTANT: Don't allow data: protocol because of:
  // <a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgneHNzJyk7PC9zY3JpcHQ+" target="_blank">here</a>

  if (proto === 'https:' || proto === 'http:' || proto === 'ftp:') {
    return url;
  }

  return undefined;
}
var textRenderer = function textRenderer(text, parentClass, onClickMention, onClickHashtag) {
  if (text === undefined) return;
  return text.split(' ').map(function (word, i) {
    if (onClickMention && word.includes('@')) {
      var mention = twitter.extractMentions(word);
      if (!mention.length) return word;
      return createElement(Fragment, {
        key: "item-".concat(i)
      }, !word.startsWith("@".concat(mention[0])) && word.slice(0, word.indexOf(mention[0]) - 1), createElement("a", {
        onClick: function onClick() {
          return onClickMention && onClickMention(mention[0]);
        },
        className: "".concat(parentClass, "__mention")
      }, "@", mention[0]), !word.endsWith(mention[0]) && word.slice(word.indexOf(mention[0]) + mention[0].length));
    } else if (onClickHashtag && word.includes('#')) {
      var hashtag = twitter.extractHashtags(word);
      if (!hashtag.length) return word;
      return createElement(Fragment, {
        key: "item-".concat(i)
      }, !word.startsWith("#".concat(hashtag[0])) && word.slice(0, word.indexOf(hashtag[0]) - 1), createElement("a", {
        onClick: function onClick() {
          return onClickHashtag && onClickHashtag(hashtag[0]);
        },
        className: "".concat(parentClass, "__hashtag")
      }, "#", hashtag[0]), !word.endsWith(hashtag[0]) && word.slice(word.indexOf(hashtag[0]) + hashtag[0].length));
    }

    if (anchorme.validate.url(word) || anchorme.validate.email(word)) {
      var link = anchorme(word, {
        list: true
      });

      if (link[0].protocol !== 'http://' && link[0].protocol !== 'https://' && link[0].protocol !== 'mailto:') {
        return word;
      }

      var url = link[0].protocol + link[0].encoded;

      var urlText = _truncate(link[0].encoded, {
        length: 33
      });

      return createElement("a", {
        href: url,
        className: "".concat(parentClass, "__link"),
        target: "blank",
        rel: "noopener",
        key: "item-".concat(i)
      }, urlText);
    }

    return word;
  }).reduce(function (accu, elem) {
    return accu === null ? [elem] : [accu, ' ', elem];
  });
};

var FeedManager =
/*#__PURE__*/
function () {
  function FeedManager(props) {
    var _this = this;

    _classCallCheck(this, FeedManager);

    _defineProperty(this, "props", void 0);

    _defineProperty(this, "state", {
      activityOrder: [],
      activities: immutable.Map(),
      activityIdToPath: {},
      activityIdToPaths: {},
      reactionIdToPaths: {},
      reactionActivities: {},
      lastResponse: null,
      lastReverseResponse: null,
      refreshing: false,
      realtimeAdds: [],
      realtimeDeletes: [],
      subscription: null,
      unread: 0,
      unseen: 0,
      numSubscribers: 0,
      reactionsBeingToggled: {},
      childReactionsBeingToggled: {}
    });

    _defineProperty(this, "registeredCallbacks", void 0);

    _defineProperty(this, "setState", function (changed) {
      if (typeof changed === 'function') {
        changed = changed(_this.state);
      }

      _this.state = _objectSpread({}, _this.state, changed);

      _this.triggerUpdate();
    });

    _defineProperty(this, "trackAnalytics", function (label, activity, track) {
      var analyticsClient = _this.props.analyticsClient;

      if (!track) {
        return;
      }

      if (!analyticsClient) {
        console.warn('trackAnalytics was enabled, but analytics client was not initialized. ' + 'Please set the analyticsToken prop on StreamApp');
        return;
      }

      var feed = _this.props.client.feed(_this.props.feedGroup, _this.props.userId);

      analyticsClient.trackEngagement({
        label: label,
        feed_id: feed.id,
        content: {
          foreign_id: activity.foreign_id
        },
        location: _this.props.analyticsLocation
      });
    });

    _defineProperty(this, "getActivityPath", function (activity) {
      var activityId;

      if (typeof activity === 'string') {
        activityId = activity;
      } else {
        activityId = activity.id;
      }

      var activityPath = _this.state.activityIdToPath[activityId];

      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      if (activityPath === undefined) {
        return [activityId].concat(rest);
      }

      return [].concat(_toConsumableArray(activityPath), rest);
    });

    _defineProperty(this, "getActivityPaths", function (activity) {
      var activityId;

      if (typeof activity === 'string') {
        activityId = activity;
      } else {
        activityId = activity.id;
      }

      return _this.state.activityIdToPaths[activityId];
    });

    _defineProperty(this, "getReactionPaths", function (reaction) {
      var reactionId;

      if (typeof reaction === 'string') {
        reactionId = reaction;
      } else {
        reactionId = reaction.id;
      }

      return _this.state.reactionIdToPaths[reactionId];
    });

    _defineProperty(this, "onAddReaction",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(kind, activity, data) {
        var options,
            reaction,
            enrichedReaction,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
                _context.prev = 1;

                if (!_this.props.doReactionAddRequest) {
                  _context.next = 8;
                  break;
                }

                _context.next = 5;
                return _this.props.doReactionAddRequest(kind, activity, data, options);

              case 5:
                reaction = _context.sent;
                _context.next = 11;
                break;

              case 8:
                _context.next = 10;
                return _this.props.client.reactions.add(kind, activity, data, options);

              case 10:
                reaction = _context.sent;

              case 11:
                _context.next = 17;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](1);

                _this.props.errorHandler(_context.t0, 'add-reaction', {
                  kind: kind,
                  activity: activity,
                  feedGroup: _this.props.feedGroup,
                  userId: _this.props.userId
                });

                return _context.abrupt("return");

              case 17:
                _this.trackAnalytics(kind, activity, options.trackAnalytics);

                enrichedReaction = immutable.fromJS(_objectSpread({}, reaction, {
                  user: _this.props.user.full
                }));

                _this.setState(function (prevState) {
                  var activities = prevState.activities;
                  var reactionIdToPaths = prevState.reactionIdToPaths;
                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                    for (var _iterator = _this.getActivityPaths(activity)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var path = _step.value;

                      _this.removeFoundReactionIdPaths(activities.getIn(path).toJS(), reactionIdToPaths, path);

                      activities = activities.updateIn([].concat(_toConsumableArray(path), ['reaction_counts', kind]), function () {
                        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                        return v + 1;
                      }).updateIn([].concat(_toConsumableArray(path), ['own_reactions', kind]), function () {
                        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : immutable.List();
                        return v.unshift(enrichedReaction);
                      }).updateIn([].concat(_toConsumableArray(path), ['latest_reactions', kind]), function () {
                        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : immutable.List();
                        return v.unshift(enrichedReaction);
                      });

                      _this.addFoundReactionIdPaths(activities.getIn(path).toJS(), reactionIdToPaths, path);
                    }
                  } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                        _iterator["return"]();
                      }
                    } finally {
                      if (_didIteratorError) {
                        throw _iteratorError;
                      }
                    }
                  }

                  return {
                    activities: activities,
                    reactionIdToPaths: reactionIdToPaths
                  };
                });

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 13]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(this, "onRemoveReaction",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(kind, activity, id) {
        var options,
            _args2 = arguments;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : {};
                _context2.prev = 1;

                if (!_this.props.doReactionDeleteRequest) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 5;
                return _this.props.doReactionDeleteRequest(id);

              case 5:
                _context2.next = 9;
                break;

              case 7:
                _context2.next = 9;
                return _this.props.client.reactions["delete"](id);

              case 9:
                _context2.next = 15;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](1);

                _this.props.errorHandler(_context2.t0, 'delete-reaction', {
                  kind: kind,
                  activity: activity,
                  feedGroup: _this.props.feedGroup,
                  userId: _this.props.userId
                });

                return _context2.abrupt("return");

              case 15:
                _this.trackAnalytics('un' + kind, activity, options.trackAnalytics);

                _this.setState(function (prevState) {
                  var activities = prevState.activities;
                  var reactionIdToPaths = prevState.reactionIdToPaths;
                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                    for (var _iterator2 = _this.getActivityPaths(activity)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                      var path = _step2.value;

                      _this.removeFoundReactionIdPaths(activities.getIn(path).toJS(), reactionIdToPaths, path);

                      activities = activities.updateIn([].concat(_toConsumableArray(path), ['reaction_counts', kind]), function () {
                        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                        return v - 1;
                      }).updateIn([].concat(_toConsumableArray(path), ['own_reactions', kind]), function () {
                        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : immutable.List();
                        return v.remove(v.findIndex(function (r) {
                          return r.get('id') === id;
                        }));
                      }).updateIn([].concat(_toConsumableArray(path), ['latest_reactions', kind]), function () {
                        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : immutable.List();
                        return v.remove(v.findIndex(function (r) {
                          return r.get('id') === id;
                        }));
                      });

                      _this.addFoundReactionIdPaths(activities.getIn(path).toJS(), reactionIdToPaths, path);
                    }
                  } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                        _iterator2["return"]();
                      }
                    } finally {
                      if (_didIteratorError2) {
                        throw _iteratorError2;
                      }
                    }
                  }

                  return {
                    activities: activities,
                    reactionIdToPaths: reactionIdToPaths
                  };
                });

                if (_this.state.reactionActivities[id]) {
                  _this._removeActivityFromState(_this.state.reactionActivities[id]);
                }

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 11]]);
      }));

      return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(this, "onToggleReaction",
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(kind, activity, data) {
        var options,
            togglingReactions,
            currentReactions,
            last,
            _args3 = arguments;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
                togglingReactions = _this.state.reactionsBeingToggled[kind] || {};

                if (!togglingReactions[activity.id]) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return");

              case 4:
                togglingReactions[activity.id] = true;
                _this.state.reactionsBeingToggled[kind] = togglingReactions;
                currentReactions = _this.state.activities.getIn([].concat(_toConsumableArray(_this.getActivityPaths(activity)[0]), ['own_reactions', kind]), immutable.List());
                last = currentReactions.last();

                if (!last) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 11;
                return _this.onRemoveReaction(kind, activity, last.get('id'), options);

              case 11:
                _context3.next = 15;
                break;

              case 13:
                _context3.next = 15;
                return _this.onAddReaction(kind, activity, data, options);

              case 15:
                delete togglingReactions[activity.id];

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(this, "onAddChildReaction",
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(kind, reaction, data) {
        var options,
            childReaction,
            enrichedReaction,
            _args4 = arguments;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
                _context4.prev = 1;

                if (!_this.props.doChildReactionAddRequest) {
                  _context4.next = 8;
                  break;
                }

                _context4.next = 5;
                return _this.props.doChildReactionAddRequest(kind, reaction, data, options);

              case 5:
                childReaction = _context4.sent;
                _context4.next = 11;
                break;

              case 8:
                _context4.next = 10;
                return _this.props.client.reactions.addChild(kind, reaction, data, options);

              case 10:
                childReaction = _context4.sent;

              case 11:
                _context4.next = 17;
                break;

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](1);

                _this.props.errorHandler(_context4.t0, 'add-child-reaction', {
                  kind: kind,
                  reaction: reaction,
                  feedGroup: _this.props.feedGroup,
                  userId: _this.props.userId
                });

                return _context4.abrupt("return");

              case 17:
                // this.trackAnalytics(kind, reaction, options.trackAnalytics);
                enrichedReaction = immutable.fromJS(_objectSpread({}, childReaction, {
                  user: _this.props.user.full
                }));

                _this.setState(function (prevState) {
                  var activities = prevState.activities;
                  var _iteratorNormalCompletion3 = true;
                  var _didIteratorError3 = false;
                  var _iteratorError3 = undefined;

                  try {
                    for (var _iterator3 = _this.getReactionPaths(reaction)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                      var path = _step3.value;
                      activities = activities.updateIn([].concat(_toConsumableArray(path), ['children_counts', kind]), function () {
                        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                        return v + 1;
                      }).updateIn([].concat(_toConsumableArray(path), ['own_children', kind]), function () {
                        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : immutable.List();
                        return v.unshift(enrichedReaction);
                      }).updateIn([].concat(_toConsumableArray(path), ['latest_children', kind]), function () {
                        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : immutable.List();
                        return v.unshift(enrichedReaction);
                      });
                    }
                  } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                        _iterator3["return"]();
                      }
                    } finally {
                      if (_didIteratorError3) {
                        throw _iteratorError3;
                      }
                    }
                  }

                  return {
                    activities: activities
                  };
                });

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 13]]);
      }));

      return function (_x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(this, "onRemoveChildReaction",
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(kind, reaction, id) {
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 1;

                if (!_this.props.doChildReactionDeleteRequest) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 5;
                return _this.props.doChildReactionDeleteRequest(id);

              case 5:
                _context5.next = 9;
                break;

              case 7:
                _context5.next = 9;
                return _this.props.client.reactions["delete"](id);

              case 9:
                _context5.next = 15;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](1);

                _this.props.errorHandler(_context5.t0, 'delete-reaction', {
                  kind: kind,
                  reaction: reaction,
                  feedGroup: _this.props.feedGroup,
                  userId: _this.props.userId
                });

                return _context5.abrupt("return");

              case 15:
                // this.trackAnalytics('un' + kind, reaction, options.trackAnalytics);
                if (_this.state.reactionActivities[id]) {
                  _this._removeActivityFromState(_this.state.reactionActivities[id]);
                }

                return _context5.abrupt("return", _this.setState(function (prevState) {
                  var activities = prevState.activities;
                  var _iteratorNormalCompletion4 = true;
                  var _didIteratorError4 = false;
                  var _iteratorError4 = undefined;

                  try {
                    for (var _iterator4 = _this.getReactionPaths(reaction)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                      var path = _step4.value;
                      activities = activities.updateIn([].concat(_toConsumableArray(path), ['children_counts', kind]), function () {
                        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                        return v - 1;
                      }).updateIn([].concat(_toConsumableArray(path), ['own_children', kind]), function () {
                        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : immutable.List();
                        return v.remove(v.findIndex(function (r) {
                          return r.get('id') === id;
                        }));
                      }).updateIn([].concat(_toConsumableArray(path), ['children', kind]), function () {
                        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : immutable.List();
                        return v.remove(v.findIndex(function (r) {
                          return r.get('id') === id;
                        }));
                      });
                    }
                  } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                        _iterator4["return"]();
                      }
                    } finally {
                      if (_didIteratorError4) {
                        throw _iteratorError4;
                      }
                    }
                  }

                  return {
                    activities: activities
                  };
                }));

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 11]]);
      }));

      return function (_x13, _x14, _x15) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(this, "onToggleChildReaction",
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(kind, reaction, data) {
        var options,
            togglingReactions,
            currentReactions,
            last,
            _args6 = arguments;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                options = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
                togglingReactions = _this.state.childReactionsBeingToggled[kind] || {};

                if (!togglingReactions[reaction.id]) {
                  _context6.next = 4;
                  break;
                }

                return _context6.abrupt("return");

              case 4:
                togglingReactions[reaction.id] = true;
                _this.state.childReactionsBeingToggled[kind] = togglingReactions;
                currentReactions = _this.state.activities.getIn([].concat(_toConsumableArray(_this.getReactionPaths(reaction)[0]), ['own_children', kind]), immutable.List());
                last = currentReactions.last();

                if (!last) {
                  _context6.next = 13;
                  break;
                }

                _context6.next = 11;
                return _this.onRemoveChildReaction(kind, reaction, last.get('id'), options);

              case 11:
                _context6.next = 15;
                break;

              case 13:
                _context6.next = 15;
                return _this.onAddChildReaction(kind, reaction, data, options);

              case 15:
                delete togglingReactions[reaction.id];

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x16, _x17, _x18) {
        return _ref6.apply(this, arguments);
      };
    }());

    _defineProperty(this, "_removeActivityFromState", function (activityId) {
      return _this.setState(function (_ref7) {
        var activities = _ref7.activities,
            activityOrder = _ref7.activityOrder,
            activityIdToPath = _ref7.activityIdToPath,
            activityIdToPaths = _ref7.activityIdToPaths,
            reactionIdToPaths = _ref7.reactionIdToPaths;

        var path = _this.getActivityPath(activityId);

        var outerId = activityId;

        if (path.length > 1) {
          // It's an aggregated group we should update the paths of everything in
          // the list
          var groupArrayPath = path.slice(0, -1);
          activityIdToPath = _this.removeFoundActivityIdPath(activities.getIn(groupArrayPath).toJS(), activityIdToPath, groupArrayPath);
          activityIdToPaths = _this.removeFoundActivityIdPaths(activities.getIn(groupArrayPath).toJS(), activityIdToPaths, groupArrayPath);
          reactionIdToPaths = _this.removeFoundReactionIdPaths(activities.getIn(groupArrayPath).toJS(), reactionIdToPaths, groupArrayPath);
        } else {
          // Otherwise remove all things inside this activity from the path
          // objects
          activityIdToPaths = _this.removeFoundActivityIdPaths(activities.get(activityId).toJS(), activityIdToPaths, [activityId]);
          reactionIdToPaths = _this.removeFoundReactionIdPaths(activities.get(activityId).toJS(), reactionIdToPaths, [activityId]);
        }

        activities = activities.removeIn(path);

        if (path.length > 1) {
          var _groupArrayPath = path.slice(0, -1);

          if (activities.getIn(_groupArrayPath).size === 0) {
            outerId = path[0]; //
          } else {
            outerId = null;
          }

          activityIdToPath = _this.addFoundActivityIdPath(activities.getIn(_groupArrayPath).toJS(), activityIdToPath, _groupArrayPath);
          activityIdToPaths = _this.addFoundActivityIdPaths(activities.getIn(_groupArrayPath).toJS(), activityIdToPaths, _groupArrayPath);
          reactionIdToPaths = _this.addFoundReactionIdPaths(activities.getIn(_groupArrayPath).toJS(), reactionIdToPaths, _groupArrayPath);
        }

        if (outerId != null) {
          activityOrder = activityOrder.filter(function (id) {
            return id !== outerId;
          });
        }

        return {
          activities: activities,
          activityOrder: activityOrder,
          activityIdToPaths: activityIdToPaths,
          reactionIdToPaths: reactionIdToPaths,
          activityIdToPath: activityIdToPath
        };
      });
    });

    _defineProperty(this, "onRemoveActivity",
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee7(activityId) {
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;

                if (!_this.props.doActivityDeleteRequest) {
                  _context7.next = 6;
                  break;
                }

                _context7.next = 4;
                return _this.props.doActivityDeleteRequest(activityId);

              case 4:
                _context7.next = 8;
                break;

              case 6:
                _context7.next = 8;
                return _this.feed().removeActivity(activityId);

              case 8:
                _context7.next = 14;
                break;

              case 10:
                _context7.prev = 10;
                _context7.t0 = _context7["catch"](0);

                _this.props.errorHandler(_context7.t0, 'delete-activity', {
                  activityId: _this.props.feedGroup,
                  feedGroup: _this.props.feedGroup,
                  userId: _this.props.userId
                });

                return _context7.abrupt("return");

              case 14:
                return _context7.abrupt("return", _this._removeActivityFromState(activityId));

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 10]]);
      }));

      return function (_x19) {
        return _ref8.apply(this, arguments);
      };
    }());

    _defineProperty(this, "onMarkAsRead", function (group) {
      return _this._onMarkAs('read', group);
    });

    _defineProperty(this, "onMarkAsSeen", function (group) {
      return _this._onMarkAs('seen', group);
    });

    _defineProperty(this, "_onMarkAs",
    /*#__PURE__*/
    function () {
      var _ref9 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8(type, group) {
        var groupArray, markArg;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                markArg = group;

                if (group === true) {
                  groupArray = _this.state.activityOrder;
                } else if (Array.isArray(group)) {
                  groupArray = group.map(function (g) {
                    return g.id;
                  });
                  markArg = groupArray;
                } else {
                  markArg = group.id;
                  groupArray = [group.id];
                }

                _context8.prev = 2;
                _context8.next = 5;
                return _this.doFeedRequest(_defineProperty({
                  limit: 1,
                  id_lte: _this.state.activityOrder[0]
                }, 'mark_' + type, markArg));

              case 5:
                _context8.next = 10;
                break;

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](2);

                _this.props.errorHandler(_context8.t0, 'get-notification-counts', {
                  feedGroup: _this.props.feedGroup,
                  userId: _this.props.userId
                });

              case 10:
                _this.setState(function (prevState) {
                  var counterKey = 'un' + type;
                  var activities = prevState.activities;
                  var counter = prevState[counterKey];
                  var _iteratorNormalCompletion5 = true;
                  var _didIteratorError5 = false;
                  var _iteratorError5 = undefined;

                  try {
                    for (var _iterator5 = groupArray[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                      var groupId = _step5.value;
                      var markerPath = [groupId, 'is_' + type];

                      if (activities.getIn(markerPath) !== false) {
                        continue;
                      }

                      activities = activities.setIn(markerPath, true);
                      counter--;
                    }
                  } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                        _iterator5["return"]();
                      }
                    } finally {
                      if (_didIteratorError5) {
                        throw _iteratorError5;
                      }
                    }
                  }

                  return _defineProperty({
                    activities: activities
                  }, counterKey, counter);
                });

              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[2, 7]]);
      }));

      return function (_x20, _x21) {
        return _ref9.apply(this, arguments);
      };
    }());

    _defineProperty(this, "getOptions", function () {
      var extraOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var propOpts = _objectSpread({}, _this.props.options);

      var id_gt = extraOptions.id_gt,
          id_gte = extraOptions.id_gte,
          id_lt = extraOptions.id_lt,
          id_lte = extraOptions.id_lte,
          offset = extraOptions.offset;

      if (id_gt || id_gte || id_lt || id_lte || offset != null) {
        delete propOpts.id_gt;
        delete propOpts.id_gte;
        delete propOpts.id_lt;
        delete propOpts.id_lte;
        delete propOpts.offset;
        delete propOpts.refresh;
      }

      return _objectSpread({
        withReactionCounts: true,
        withOwnReactions: true,
        limit: 10
      }, propOpts, extraOptions);
    });

    _defineProperty(this, "doFeedRequest",
    /*#__PURE__*/
    function () {
      var _ref11 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee9(options) {
        return _regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!_this.props.doFeedRequest) {
                  _context9.next = 4;
                  break;
                }

                _context9.next = 3;
                return _this.props.doFeedRequest(_this.props.client, _this.props.feedGroup, _this.props.userId, options);

              case 3:
                return _context9.abrupt("return", _context9.sent);

              case 4:
                _context9.next = 6;
                return _this.feed().get(options);

              case 6:
                return _context9.abrupt("return", _context9.sent);

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      return function (_x22) {
        return _ref11.apply(this, arguments);
      };
    }());

    _defineProperty(this, "feed", function () {
      return _this.props.client.feed(_this.props.feedGroup, _this.props.userId);
    });

    _defineProperty(this, "responseToActivityMap", function (response) {
      return immutable.fromJS(response.results.reduce(function (map, a) {
        map[a.id] = a;
        return map;
      }, {}));
    });

    _defineProperty(this, "responseToActivityIdToPath", function (response) {
      if (response.results.length === 0 || response.results[0].activities === undefined) {
        return {};
      }

      var aggregatedResponse = response;
      var map = {};
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        var _loop = function _loop() {
          var group = _step6.value;
          group.activities.forEach(function (act, i) {
            map[act.id] = [group.id, 'activities', i];
          });
        };

        for (var _iterator6 = aggregatedResponse.results[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return map;
    });

    _defineProperty(this, "responseToActivityIdToPaths", function (response) {
      var previous = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var map = previous;
      var currentPath = [];

      function addFoundActivities(obj) {
        if (Array.isArray(obj)) {
          obj.forEach(function (v, i) {
            currentPath.push(i);
            addFoundActivities(v);
            currentPath.pop();
          });
        } else if (_isPlainObject(obj)) {
          if (obj.id && obj.actor && obj.verb && obj.object) {
            if (!map[obj.id]) {
              map[obj.id] = [];
            }

            map[obj.id].push([].concat(currentPath));
          }

          for (var k in obj) {
            currentPath.push(k);
            addFoundActivities(obj[k]);
            currentPath.pop();
          }
        }
      }

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = response.results[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var a = _step7.value;
          currentPath.push(a.id);
          addFoundActivities(a);
          currentPath.pop();
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return map;
    });

    _defineProperty(this, "feedResponseToReactionIdToPaths", function (response) {
      var previous = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var map = previous;
      var currentPath = [];

      function addFoundReactions(obj) {
        if (Array.isArray(obj)) {
          obj.forEach(function (v, i) {
            currentPath.push(i);
            addFoundReactions(v);
            currentPath.pop();
          });
        } else if (_isPlainObject(obj)) {
          if (obj.id && obj.kind && obj.data) {
            if (!map[obj.id]) {
              map[obj.id] = [];
            }

            map[obj.id].push([].concat(currentPath));
          }

          for (var k in obj) {
            currentPath.push(k);
            addFoundReactions(obj[k]);
            currentPath.pop();
          }
        }
      }

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = response.results[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var a = _step8.value;
          currentPath.push(a.id);
          addFoundReactions(a);
          currentPath.pop();
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return map;
    });

    _defineProperty(this, "reactionResponseToReactionIdToPaths", function (response, previous, basePath, oldLength) {
      var map = previous;

      var currentPath = _toConsumableArray(basePath);

      function addFoundReactions(obj) {
        if (Array.isArray(obj)) {
          obj.forEach(function (v, i) {
            currentPath.push(i);
            addFoundReactions(v);
            currentPath.pop();
          });
        } else if (_isPlainObject(obj)) {
          if (obj.id && obj.kind && obj.data) {
            if (!map[obj.id]) {
              map[obj.id] = [];
            }

            map[obj.id].push(_toConsumableArray(currentPath));
          }

          for (var k in obj) {
            currentPath.push(k);
            addFoundReactions(obj[k]);
            currentPath.pop();
          }
        }
      }

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = response.results[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var a = _step9.value;
          currentPath.push(oldLength);
          addFoundReactions(a);
          currentPath.pop();
          oldLength++;
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      return map;
    });

    _defineProperty(this, "removeFoundReactionIdPaths", function (data, previous, basePath) {
      var map = previous;

      var currentPath = _toConsumableArray(basePath);

      function removeFoundReactions(obj) {
        if (Array.isArray(obj)) {
          obj.forEach(function (v, i) {
            currentPath.push(i);
            removeFoundReactions(v);
            currentPath.pop();
          });
        } else if (_isPlainObject(obj)) {
          if (obj.id && obj.kind && obj.data) {
            if (!map[obj.id]) {
              map[obj.id] = [];
            }

            _remove(map[obj.id], function (path) {
              return _isEqual(path, currentPath);
            });
          }

          for (var k in obj) {
            currentPath.push(k);
            removeFoundReactions(obj[k]);
            currentPath.pop();
          }
        }
      }

      removeFoundReactions(data);
      return map;
    });

    _defineProperty(this, "removeFoundActivityIdPaths", function (data, previous, basePath) {
      var map = previous;

      var currentPath = _toConsumableArray(basePath);

      function addFoundActivities(obj) {
        if (Array.isArray(obj)) {
          obj.forEach(function (v, i) {
            currentPath.push(i);
            addFoundActivities(v);
            currentPath.pop();
          });
        } else if (_isPlainObject(obj)) {
          if (obj.id && obj.actor && obj.verb && obj.object) {
            if (!map[obj.id]) {
              map[obj.id] = [];
            }

            _remove(map[obj.id], function (path) {
              return _isEqual(path, currentPath);
            });
          }

          for (var k in obj) {
            currentPath.push(k);
            addFoundActivities(obj[k]);
            currentPath.pop();
          }
        }
      }

      addFoundActivities(data);
      return map;
    });

    _defineProperty(this, "removeFoundActivityIdPath", function (data, previous, basePath) {
      var map = previous;

      var currentPath = _toConsumableArray(basePath);

      data.forEach(function (obj, i) {
        currentPath.push(i);

        if (_isEqual(map[obj.id], currentPath)) {
          delete map[obj.id];
        }

        currentPath.pop();
      });
      return map;
    });

    _defineProperty(this, "addFoundReactionIdPaths", function (data, previous, basePath) {
      var map = previous;

      var currentPath = _toConsumableArray(basePath);

      function addFoundReactions(obj) {
        if (Array.isArray(obj)) {
          obj.forEach(function (v, i) {
            currentPath.push(i);
            addFoundReactions(v);
            currentPath.pop();
          });
        } else if (_isPlainObject(obj)) {
          if (obj.id && obj.kind && obj.data) {
            if (!map[obj.id]) {
              map[obj.id] = [];
            }

            map[obj.id].push(_toConsumableArray(currentPath));
          }

          for (var k in obj) {
            currentPath.push(k);
            addFoundReactions(obj[k]);
            currentPath.pop();
          }
        }
      }

      addFoundReactions(data);
      return map;
    });

    _defineProperty(this, "addFoundActivityIdPaths", function (data, previous, basePath) {
      var map = previous;

      var currentPath = _toConsumableArray(basePath);

      function addFoundActivities(obj) {
        if (Array.isArray(obj)) {
          obj.forEach(function (v, i) {
            currentPath.push(i);
            addFoundActivities(v);
            currentPath.pop();
          });
        } else if (_isPlainObject(obj)) {
          if (obj.id && obj.actor && obj.verb && obj.object) {
            if (!map[obj.id]) {
              map[obj.id] = [];
            }

            map[obj.id].push(_toConsumableArray(currentPath));
          }

          for (var k in obj) {
            currentPath.push(k);
            addFoundActivities(obj[k]);
            currentPath.pop();
          }
        }
      }

      addFoundActivities(data);
      return map;
    });

    _defineProperty(this, "addFoundActivityIdPath", function (data, previous, basePath) {
      var map = previous;
      data.forEach(function (obj, i) {
        map[obj.id] = [].concat(_toConsumableArray(basePath), [i]);
      });
      return map;
    });

    _defineProperty(this, "responseToReactionActivities", function (response) {
      if (response.results.length === 0) {
        return {};
      }

      var map = {};

      function setReactionActivities(activities) {
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = activities[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var a = _step10.value;

            if (a.reaction && a.reaction.id) {
              map[a.reaction.id] = a.id;
            }
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
              _iterator10["return"]();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }
      }

      if (response.results[0].activities === undefined) {
        setReactionActivities(response.results);
      } else {
        var aggregatedResponse = response;
        var _iteratorNormalCompletion11 = true;
        var _didIteratorError11 = false;
        var _iteratorError11 = undefined;

        try {
          for (var _iterator11 = aggregatedResponse.results[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var group = _step11.value;
            setReactionActivities(group.activities);
          }
        } catch (err) {
          _didIteratorError11 = true;
          _iteratorError11 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
              _iterator11["return"]();
            }
          } finally {
            if (_didIteratorError11) {
              throw _iteratorError11;
            }
          }
        }
      }

      return map;
    });

    _defineProperty(this, "refresh",
    /*#__PURE__*/
    function () {
      var _ref12 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee10(extraOptions) {
        var options, response, newState;
        return _regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                options = _this.getOptions(extraOptions);
                _context10.next = 3;
                return _this.setState({
                  refreshing: true
                });

              case 3:
                _context10.prev = 3;
                _context10.next = 6;
                return _this.doFeedRequest(options);

              case 6:
                response = _context10.sent;
                _context10.next = 14;
                break;

              case 9:
                _context10.prev = 9;
                _context10.t0 = _context10["catch"](3);

                _this.setState({
                  refreshing: false
                });

                _this.props.errorHandler(_context10.t0, 'get-feed', {
                  feedGroup: _this.props.feedGroup,
                  userId: _this.props.userId
                });

                return _context10.abrupt("return");

              case 14:
                newState = _objectSpread({
                  activityOrder: response.results.map(function (a) {
                    return a.id;
                  }),
                  activities: _this.responseToActivityMap(response),
                  activityIdToPath: _this.responseToActivityIdToPath(response),
                  activityIdToPaths: _this.responseToActivityIdToPaths(response),
                  reactionIdToPaths: _this.feedResponseToReactionIdToPaths(response),
                  reactionActivities: _this.responseToReactionActivities(response),
                  refreshing: false,
                  lastResponse: response,
                  realtimeAdds: [],
                  realtimeDeletes: []
                }, _this.unseenUnreadFromResponse(response));

                if (options.mark_seen === true) {
                  newState.unseen = 0;
                }

                if (options.mark_read === true) {
                  newState.unread = 0;
                }

                return _context10.abrupt("return", _this.setState(newState));

              case 18:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[3, 9]]);
      }));

      return function (_x23) {
        return _ref12.apply(this, arguments);
      };
    }());

    _defineProperty(this, "subscribe",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee11() {
      var feed;
      return _regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (!_this.props.notify) {
                _context11.next = 4;
                break;
              }

              feed = _this.feed();
              _context11.next = 4;
              return _this.setState(function (prevState) {
                if (prevState.subscription) {
                  return {};
                }

                var subscription = feed.subscribe(function (data) {
                  _this.setState(function (prevState) {
                    var numActivityDiff = data["new"].length - data.deleted.length;
                    return {
                      realtimeAdds: prevState.realtimeAdds.concat(data["new"]),
                      realtimeDeletes: prevState.realtimeDeletes.concat(data.deleted),
                      unread: prevState.unread + numActivityDiff,
                      unseen: prevState.unseen + numActivityDiff
                    };
                  });
                });
                subscription.then(function () {
                  console.log("now listening to changes in realtime for ".concat(_this.feed().id));
                }, function (err) {
                  console.error(err);
                });
                return {
                  subscription: subscription
                };
              });

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));

    _defineProperty(this, "unsubscribe",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee12() {
      var subscription;
      return _regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              subscription = _this.state.subscription;

              if (subscription) {
                _context12.next = 3;
                break;
              }

              return _context12.abrupt("return");

            case 3:
              _context12.next = 5;
              return subscription;

            case 5:
              if (!(_this.registeredCallbacks.length === 0)) {
                _context12.next = 15;
                break;
              }

              _context12.prev = 6;
              _context12.next = 9;
              return subscription.cancel();

            case 9:
              console.log("stopped listening to changes in realtime for ".concat(_this.feed().id));
              _context12.next = 15;
              break;

            case 12:
              _context12.prev = 12;
              _context12.t0 = _context12["catch"](6);
              console.error(_context12.t0);

            case 15:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[6, 12]]);
    })));

    _defineProperty(this, "hasNextPage", function () {
      var lastResponse = _this.state.lastResponse;
      return Boolean(lastResponse && lastResponse.next);
    });

    _defineProperty(this, "hasReverseNextPage", function () {
      var lastReverseResponse = _this.state.lastReverseResponse;
      return Boolean(lastReverseResponse && lastReverseResponse.next);
    });

    _defineProperty(this, "loadNextPage",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee13() {
      var lastResponse, cancel, nextURL, options, response;
      return _regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              lastResponse = _this.state.lastResponse;

              if (!(!lastResponse || !lastResponse.next)) {
                _context13.next = 3;
                break;
              }

              return _context13.abrupt("return");

            case 3:
              cancel = false;
              _context13.next = 6;
              return _this.setState(function (prevState) {
                if (prevState.refreshing) {
                  cancel = true;
                  return {};
                }

                return {
                  refreshing: true
                };
              });

            case 6:
              if (!cancel) {
                _context13.next = 8;
                break;
              }

              return _context13.abrupt("return");

            case 8:
              nextURL = new URL(lastResponse.next, true);
              options = _this.getOptions(nextURL.query);
              _context13.prev = 10;
              _context13.next = 13;
              return _this.doFeedRequest(options);

            case 13:
              response = _context13.sent;
              _context13.next = 21;
              break;

            case 16:
              _context13.prev = 16;
              _context13.t0 = _context13["catch"](10);

              _this.setState({
                refreshing: false
              });

              _this.props.errorHandler(_context13.t0, 'get-feed-next-page', {
                feedGroup: _this.props.feedGroup,
                userId: _this.props.userId
              });

              return _context13.abrupt("return");

            case 21:
              return _context13.abrupt("return", _this.setState(function (prevState) {
                var activities = prevState.activities.merge(_this.responseToActivityMap(response));

                var activityIdToPath = _objectSpread({}, prevState.activityIdToPath, _this.responseToActivityIdToPath(response));

                return {
                  activityOrder: prevState.activityOrder.concat(response.results.map(function (a) {
                    return a.id;
                  })),
                  activities: activities,
                  activityIdToPath: activityIdToPath,
                  activityIdToPaths: _this.responseToActivityIdToPaths(response, prevState.activityIdToPaths),
                  reactionIdToPaths: _this.feedResponseToReactionIdToPaths(response, prevState.reactionIdToPaths),
                  reactionActivities: _objectSpread({}, prevState.reactionActivities, _this.responseToReactionActivities(response)),
                  refreshing: false,
                  lastResponse: response
                };
              }));

            case 22:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[10, 16]]);
    })));

    _defineProperty(this, "loadReverseNextPage",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee14() {
      var lastReverseResponse, cancel, nextURL, options, response;
      return _regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              lastReverseResponse = _this.state.lastReverseResponse;

              if (!(!lastReverseResponse || !lastReverseResponse.next)) {
                _context14.next = 3;
                break;
              }

              return _context14.abrupt("return");

            case 3:
              cancel = false;
              _context14.next = 6;
              return _this.setState(function (prevState) {
                if (prevState.refreshing) {
                  cancel = true;
                  return {};
                }

                return {
                  refreshing: true
                };
              });

            case 6:
              if (!cancel) {
                _context14.next = 8;
                break;
              }

              return _context14.abrupt("return");

            case 8:
              nextURL = new URL(lastReverseResponse.next, true);
              options = _this.getOptions(nextURL.query);
              _context14.prev = 10;
              _context14.next = 13;
              return _this.doFeedRequest(options);

            case 13:
              response = _context14.sent;
              _context14.next = 21;
              break;

            case 16:
              _context14.prev = 16;
              _context14.t0 = _context14["catch"](10);

              _this.setState({
                refreshing: false
              });

              _this.props.errorHandler(_context14.t0, 'get-feed-next-page', {
                feedGroup: _this.props.feedGroup,
                userId: _this.props.userId
              });

              return _context14.abrupt("return");

            case 21:
              return _context14.abrupt("return", _this.setState(function (prevState) {
                var activities = prevState.activities.merge(_this.responseToActivityMap(response));

                var activityIdToPath = _objectSpread({}, prevState.activityIdToPath, _this.responseToActivityIdToPath(response));

                return {
                  activityOrder: response.results.map(function (a) {
                    return a.id;
                  }).concat(prevState.activityOrder),
                  activities: activities,
                  activityIdToPath: activityIdToPath,
                  activityIdToPaths: _this.responseToActivityIdToPaths(response, prevState.activityIdToPaths),
                  reactionIdToPaths: _this.feedResponseToReactionIdToPaths(response, prevState.reactionIdToPaths),
                  reactionActivities: _objectSpread({}, prevState.reactionActivities, _this.responseToReactionActivities(response)),
                  refreshing: false,
                  lastReverseResponse: response
                };
              }));

            case 22:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, null, [[10, 16]]);
    })));

    _defineProperty(this, "loadNextReactions",
    /*#__PURE__*/
    function () {
      var _ref17 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee15(activityId, kind, activityPath, oldestToNewest) {
        var options, orderPrefix, latestReactionsPath, nextUrlPath, refreshingPath, reactions_extra, nextUrl, refreshing, response;
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                options = {
                  activity_id: activityId,
                  kind: kind
                };
                orderPrefix = 'latest';

                if (oldestToNewest) {
                  orderPrefix = 'oldest';
                }

                if (!activityPath) {
                  activityPath = _this.getActivityPath(activityId);
                }

                latestReactionsPath = [].concat(_toConsumableArray(activityPath), [orderPrefix + '_reactions', kind]);
                nextUrlPath = [].concat(_toConsumableArray(activityPath), [orderPrefix + '_reactions_extra', kind, 'next']);
                refreshingPath = [].concat(_toConsumableArray(activityPath), [orderPrefix + '_reactions_extra', kind, 'refreshing']);
                reactions_extra = _this.state.activities.getIn([].concat(_toConsumableArray(activityPath), [orderPrefix + '_reactions_extra']));
                nextUrl = 'https://api.stream-io-api.com/';

                if (reactions_extra) {
                  nextUrl = reactions_extra.getIn([kind, 'next'], '');
                } else if (oldestToNewest) {
                  // If it's the first request and oldest to newest make sure
                  // order is reversed by this trick with a non existant id.
                  options.id_gt = 'non-existant-' + generateRandomId();
                }

                refreshing = _this.state.activities.getIn(refreshingPath, false);

                if (!(!nextUrl || refreshing)) {
                  _context15.next = 13;
                  break;
                }

                return _context15.abrupt("return");

              case 13:
                _this.setState(function (prevState) {
                  return {
                    activities: prevState.activities.setIn(refreshingPath, true)
                  };
                });

                options = _objectSpread({}, URL(nextUrl, true).query, options);
                _context15.prev = 15;

                if (!_this.props.doReactionsFilterRequest) {
                  _context15.next = 22;
                  break;
                }

                _context15.next = 19;
                return _this.props.doReactionsFilterRequest(options);

              case 19:
                response = _context15.sent;
                _context15.next = 25;
                break;

              case 22:
                _context15.next = 24;
                return _this.props.client.reactions.filter(options);

              case 24:
                response = _context15.sent;

              case 25:
                _context15.next = 32;
                break;

              case 27:
                _context15.prev = 27;
                _context15.t0 = _context15["catch"](15);

                _this.setState({
                  refreshing: false
                });

                _this.props.errorHandler(_context15.t0, 'get-reactions-next-page', {
                  options: options
                });

                return _context15.abrupt("return");

              case 32:
                _this.setState(function (prevState) {
                  return {
                    activities: prevState.activities.setIn(refreshingPath, false).setIn(nextUrlPath, response.next).updateIn(latestReactionsPath, function () {
                      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : immutable.List();
                      return v.concat(immutable.fromJS(response.results));
                    }),
                    reactionIdToPaths: _this.reactionResponseToReactionIdToPaths(response, prevState.reactionIdToPaths, latestReactionsPath, prevState.activities.getIn(latestReactionsPath, immutable.List()).toJS().length)
                  };
                });

              case 33:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[15, 27]]);
      }));

      return function (_x24, _x25, _x26, _x27) {
        return _ref17.apply(this, arguments);
      };
    }());

    _defineProperty(this, "refreshUnreadUnseen",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee16() {
      var response;
      return _regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              _context16.next = 3;
              return _this.doFeedRequest({
                limit: 0
              });

            case 3:
              response = _context16.sent;
              _context16.next = 10;
              break;

            case 6:
              _context16.prev = 6;
              _context16.t0 = _context16["catch"](0);

              _this.props.errorHandler(_context16.t0, 'get-notification-counts', {
                feedGroup: _this.props.feedGroup,
                userId: _this.props.userId
              });

              return _context16.abrupt("return");

            case 10:
              return _context16.abrupt("return", _this.setState(_this.unseenUnreadFromResponse(response)));

            case 11:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, null, [[0, 6]]);
    })));

    this.props = props;
    var initialOptions = this.getOptions();
    this.registeredCallbacks = [];
    var previousUrl = '';

    if (initialOptions.id_gte) {
      previousUrl = "?id_lt=".concat(initialOptions.id_gte);
    } else if (initialOptions.id_gt) {
      previousUrl = "?id_lte=".concat(initialOptions.id_gt);
    } else if (initialOptions.id_lte) {
      previousUrl = "?id_gt=".concat(initialOptions.id_lte);
    } else if (initialOptions.id_lt) {
      previousUrl = "?id_gte=".concat(initialOptions.id_lt);
    }

    this.state.lastReverseResponse = {
      next: previousUrl
    };
  }

  _createClass(FeedManager, [{
    key: "register",
    value: function register(callback) {
      this.registeredCallbacks.push(callback);
      this.subscribe();
    }
  }, {
    key: "unregister",
    value: function unregister(callback) {
      this.registeredCallbacks.splice(this.registeredCallbacks.indexOf(callback), 1);
      this.unsubscribe();
    }
  }, {
    key: "triggerUpdate",
    value: function triggerUpdate() {
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = this.registeredCallbacks[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var callback = _step12.value;
          callback();
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
            _iterator12["return"]();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }
    }
  }, {
    key: "unseenUnreadFromResponse",
    value: function unseenUnreadFromResponse(response) {
      var unseen = 0;
      var unread = 0;

      if (typeof response.unseen === 'number') {
        unseen = response.unseen;
      }

      if (typeof response.unread === 'number') {
        unread = response.unread;
      }

      return {
        unseen: unseen,
        unread: unread
      };
    }
  }]);

  return FeedManager;
}();

var handleError = function handleError(error, type, detail) {
  console.warn(error, type, detail);
};

var Details = "Details";
var Post = "Post";
var enTranslations = {
	"1 comment": "1 comment",
	"1 like": "1 like",
	"1 repost": "1 repost",
	Details: Details,
	"Load activities": "Load activities",
	"Load more": "Load more",
	"New Post": "New Post",
	"No data to display...": "No data to display...",
	"Pick your emoji": "Pick your emoji",
	Post: Post,
	"Start Typing...": "Start Typing...",
	"Type your post...": "Type your post...",
	"You have 1 new notification": "You have 1 new notification",
	"You have {{ notificationCount }} new notifications": "You have {{ notificationCount }} new notifications",
	"{{ actorName }} and 1 other commented on your {{ activityVerb }}": "{{ actorName }} and 1 other commented on your {{ activityVerb }}",
	"{{ actorName }} and 1 other followed you": "{{ actorName }} and 1 other followed you",
	"{{ actorName }} and 1 other liked your {{ activityVerb }}": "{{ actorName }} and 1 other liked your {{ activityVerb }}",
	"{{ actorName }} and 1 other reposted your {{ activityVerb }}": "{{ actorName }} and 1 other reposted your {{ activityVerb }}",
	"{{ actorName }} and {{ countOtherActors }} others commented on your {{ activityVerb }}": "{{ actorName }} and {{ countOtherActors }} others commented on your {{ activityVerb }}",
	"{{ actorName }} and {{ countOtherActors }} others followed you": "{{ actorName }} and {{ countOtherActors }} others followed you",
	"{{ actorName }} and {{ countOtherActors }} others liked your {{ activityVerb }}": "{{ actorName }} and {{ countOtherActors }} others liked your {{ activityVerb }}",
	"{{ actorName }} and {{ countOtherActors }} others reposted your {{ activityVerb }}": "{{ actorName }} and {{ countOtherActors }} others reposted your {{ activityVerb }}",
	"{{ actorName }} commented on your {{ activityVerb }}": "{{ actorName }} commented on your {{ activityVerb }}",
	"{{ actorName }} followed you": "{{ actorName }} followed you",
	"{{ actorName }} liked your {{ activityVerb }}": "{{ actorName }} liked your {{ activityVerb }}",
	"{{ actorName }} reposted your {{ activityVerb }}": "{{ actorName }} reposted your {{ activityVerb }}",
	"{{ countComments }} comments": "{{ countComments }} comments",
	"{{ countLikes }} likes": "{{ countLikes }} likes",
	"{{ countReposts }} reposts": "{{ countReposts }} reposts"
};

var Details$1 = "Details";
var Post$1 = "Verstuur";
var nlTranslations = {
	"1 comment": "1 reactie",
	"1 like": "1 vind-ik-leuk",
	"1 repost": "1 keer gedeeld",
	Details: Details$1,
	"Load activities": "Laad activiteiten",
	"Load more": "Meer laden",
	"New Post": "New Bericht",
	"No data to display...": "Geen data om weer te geven...",
	"Pick your emoji": "Kies je emoji",
	Post: Post$1,
	"Start Typing...": "Begin met typen...",
	"Type your post...": "Type je bericht...",
	"You have 1 new notification": "Je hebt 1 nieuw melding",
	"You have {{ notificationCount }} new notifications": "Je hebt {{ notificationCount }} nieuwe meldingen",
	"{{ actorName }} and 1 other commented on your {{ activityVerb }}": "{{ actorName }} en 1 ander reageerden op je {{ activityVerb }}",
	"{{ actorName }} and 1 other followed you": "{{ actorName }} en 1 ander volgen je",
	"{{ actorName }} and 1 other liked your {{ activityVerb }}": "{{ actorName }} en 1 ander vinden je {{ activityVerb }} leuk",
	"{{ actorName }} and 1 other reposted your {{ activityVerb }}": "{{ actorName }} en 1 ander hebben je {{ activityVerb }} gedeeld",
	"{{ actorName }} and {{ countOtherActors }} others commented on your {{ activityVerb }}": "{{ actorName }} en {{ countOtherActors }} anderen hebben op je {{ activityVerb }} gereageerd",
	"{{ actorName }} and {{ countOtherActors }} others followed you": "{{ actorName }} en {{ countOtherActors }} anderen volgen je",
	"{{ actorName }} and {{ countOtherActors }} others liked your {{ activityVerb }}": "{{ actorName }} en {{ countOtherActors }} anderen vinden je {{ activityVerb }} leuk",
	"{{ actorName }} and {{ countOtherActors }} others reposted your {{ activityVerb }}": "{{ actorName }} en {{ countOtherActors }} anderen hebben je {{ activityVerb }} bericht gedeeld",
	"{{ actorName }} commented on your {{ activityVerb }}": "{{ actorName }} heeft op je {{ activityVerb }} gereageerd",
	"{{ actorName }} followed you": "{{ actorName }} volgt je",
	"{{ actorName }} liked your {{ activityVerb }}": "{{ actorName }} vindt je {{ activityVerb }} leuk",
	"{{ actorName }} reposted your {{ activityVerb }}": "{{ actorName }} heeft je {{ activityVerb }} gedeeld",
	"{{ countComments }} comments": "{{ countComments }} reacties",
	"{{ countLikes }} likes": "{{ countLikes }} vind-ik-leuks",
	"{{ countReposts }} reposts": "{{ countReposts }} keer gedeeld"
};

var Details$2 = "Детали";
var Post$2 = "Отправить";
var ruTranslations = {
	"1 comment": "1 комментарий",
	"1 like": "1 лайк",
	"1 repost": "1 репост",
	Details: Details$2,
	"Load activities": "Загрузка активити",
	"Load more": "Загрузить еще",
	"New Post": "Новое пост",
	"No data to display...": "Нет данных для отображения...",
	"Pick your emoji": "Выберите emoji",
	Post: Post$2,
	"Start Typing...": "Начните набирать...",
	"Type your post...": "Напишите ваш пост...",
	"You have 1 new notification": "У вас одно уведомление",
	"You have {{ notificationCount }} new notifications": "У вас {{ notificationCount }} новых уведомлений",
	"{{ actorName }} and 1 other commented on your {{ activityVerb }}": "{{ actorName }} и еще 1 пользователь оставили комментарий на вашем {{ activityVerb }}",
	"{{ actorName }} and 1 other followed you": "{{ actorName }} и еще 1 пользователь зафоловили вас",
	"{{ actorName }} and 1 other liked your {{ activityVerb }}": "{{ actorName }} и еще 1 пользователю понравилась ваше {{ activityVerb }}",
	"{{ actorName }} and 1 other reposted your {{ activityVerb }}": "{{ actorName }} и еще 1 пользоватль зарепостил ваше {{ activityVerb }}",
	"{{ actorName }} and {{ countOtherActors }} others commented on your {{ activityVerb }}": "{{ actorName }} и {{ countOtherActors }} других пользователе оставили комментарии на вашем {{ activityVerb }}",
	"{{ actorName }} and {{ countOtherActors }} others followed you": "{{ actorName }} и {{ countOtherActors }} других пользователей зафоловили вас",
	"{{ actorName }} and {{ countOtherActors }} others liked your {{ activityVerb }}": "{{ actorName }} и {{ countOtherActors }} другим пользователям понравилась ваше {{ activityVerb }}",
	"{{ actorName }} and {{ countOtherActors }} others reposted your {{ activityVerb }}": "{{ actorName }} и {{ countOtherActors }} других пользователей зарепостили ваше {{ activityVerb }}",
	"{{ actorName }} commented on your {{ activityVerb }}": "{{ actorName }} оставил комментарий на вашем {{ activityVerb }}",
	"{{ actorName }} followed you": "{{ actorName }} зафоловили вас",
	"{{ actorName }} liked your {{ activityVerb }}": "{{ actorName }} понравилось ваше {{ activityVerb }}",
	"{{ actorName }} reposted your {{ activityVerb }}": "{{ actorName }} зарепостил ваше {{ activityVerb }}",
	"{{ countComments }} comments": "{{ countComments }} комментариев",
	"{{ countLikes }} likes": "{{ countLikes }} лайков",
	"{{ countReposts }} reposts": "{{ countReposts }} репостов"
};

var Details$3 = "Detaylar";
var Post$3 = "Yolla";
var trTranslations = {
	"1 comment": "1 yorum",
	"1 like": "1 beğeni",
	"1 repost": "1 paylaşım",
	Details: Details$3,
	"Load activities": "Aktiviteleri yükle",
	"Load more": "Daha fazla yükle",
	"New Post": "Yeni İleti",
	"No data to display...": "Gösterilecek veri yok...",
	"Pick your emoji": "Emoji seç",
	Post: Post$3,
	"Start Typing...": "Yazmaya Başla...",
	"Type your post...": "İletini yaz...",
	"You have 1 new notification": "1 yeni bildirimin var",
	"You have {{ notificationCount }} new notifications": "{{ notificationCount }} yeni bildirimin var",
	"{{ actorName }} and 1 other commented on your {{ activityVerb }}": "{{ actorName }} ve biri daha {{ activityVerb }} üzerine yorum yaptı",
	"{{ actorName }} and 1 other followed you": "{{ actorName }} ve biri daha seni takip etti",
	"{{ actorName }} and 1 other liked your {{ activityVerb }}": "{{ actorName }} ve biri daha senin {{ activityVerb }}'ini beğendi",
	"{{ actorName }} and 1 other reposted your {{ activityVerb }}": "{{ actorName }} ve biri daha senin {{ activityVerb }}'ini beğendi",
	"{{ actorName }} and {{ countOtherActors }} others commented on your {{ activityVerb }}": "{{ actorName }} ve {{ countOtherActors }} kişi daha {{ activityVerb }} üzerine yorum yaptı",
	"{{ actorName }} and {{ countOtherActors }} others followed you": "{{ actorName }} ve {{ countOtherActors }} kişi daha seni takip etti",
	"{{ actorName }} and {{ countOtherActors }} others liked your {{ activityVerb }}": "{{ actorName }} ve {{ countOtherActors }} kişi daha senin {{ activityVerb }}'ini beğendi",
	"{{ actorName }} and {{ countOtherActors }} others reposted your {{ activityVerb }}": "{{ actorName }} ve {{ countOtherActors }} kişi daha senin {{ activityVerb }}'ini paylaştı",
	"{{ actorName }} commented on your {{ activityVerb }}": "{{ actorName }} {{ activityVerb }}'ine yorum yaptı",
	"{{ actorName }} followed you": "{{ actorName }} seni takip etti",
	"{{ actorName }} liked your {{ activityVerb }}": "{{ actorName }} senin {{ activityVerb }}'ini beğendi",
	"{{ actorName }} reposted your {{ activityVerb }}": "{{ actorName }} senin {{ activityVerb }}'ini paylaştı",
	"{{ countComments }} comments": "{{ countComments }} yorum",
	"{{ countLikes }} likes": "{{ countLikes }} beğeni",
	"{{ countReposts }} reposts": "{{ countReposts }} paylaşım"
};

var Details$4 = "Voir les commentaires";
var Post$4 = "Publier";
var frTranslations = {
	"1 comment": "1 commentaire",
	"1 like": "1 J'aime",
	"1 repost": "1 partage",
	Details: Details$4,
	"Load activities": "Voir les nouvelles publications",
	"Load more": "voir plus",
	"New Post": "Nouvelle publication",
	"No data to display...": "Aucune donnée à afficher",
	"Pick your emoji": "Choisissez votre emoji",
	Post: Post$4,
	"Start Typing...": "Démarrez la saisie...",
	"Type your post...": "Tapez votre message",
	"You have 1 new notification": "Vous avez reçu 1 nouvelle notification",
	"You have {{ notificationCount }} new notifications": "Vous avez reçu {{ notificationCount }} nouvelles notifications",
	"{{ actorName }} and 1 other commented on your {{ activityVerb }}": "{{ actorName }} et 1 autre ont commenté votre {{ activityVerb }}",
	"{{ actorName }} and 1 other followed you": "{{ actorName }} et 1 autre vous suivent désormais",
	"{{ actorName }} and 1 other liked your {{ activityVerb }}": "{{ actorName }} et 1 autre ont aimé votre {{ activityVerb }}",
	"{{ actorName }} and 1 other reposted your {{ activityVerb }}": "{{ actorName }} et 1 autre ont partagé votre {{ activityVerb }}",
	"{{ actorName }} and {{ countOtherActors }} others commented on your {{ activityVerb }}": "{{ actorName }} et {{ countOtherActors }} autres ont commenté votre {{ activityVerb }}",
	"{{ actorName }} and {{ countOtherActors }} others followed you": "{{ actorName }} et {{ countOtherActors }} autres vous suivent désormais",
	"{{ actorName }} and {{ countOtherActors }} others liked your {{ activityVerb }}": "{{ actorName }} et {{ countOtherActors }} autres ont aimé votre {{ activityVerb }}",
	"{{ actorName }} and {{ countOtherActors }} others reposted your {{ activityVerb }}": "{{ actorName }} et {{ countOtherActors }} autres ont partagé votre {{ activityVerb }}",
	"{{ actorName }} commented on your {{ activityVerb }}": "{{ actorName }} a commenté votre {{ activityVerb }}",
	"{{ actorName }} followed you": "{{ actorName }} vous suit désormais",
	"{{ actorName }} liked your {{ activityVerb }}": "{{ actorName }} a aimé votre {{ activityVerb }}",
	"{{ actorName }} reposted your {{ activityVerb }}": "{{ actorName }} a partagé votre {{ activityVerb }}",
	"{{ countComments }} comments": "{{ countComments }} commentaires",
	"{{ countLikes }} likes": "{{ countLikes }} J'aime",
	"{{ countReposts }} reposts": "{{ countReposts }} partages"
};

var Details$5 = "डिटेल्स";
var Post$5 = "पोस्ट करे";
var hiTranslations = {
	"1 comment": "1 कमेंट",
	"1 like": "1 लाइक",
	"1 repost": "1 रिपोस्ट",
	Details: Details$5,
	"Load activities": "एक्टिविटीज को लोड करें",
	"Load more": "एक्टिविटीज को लोड करें",
	"New Post": "नया पोस्ट",
	"No data to display...": "कोई डेटा उपलब्ध नहीं है",
	"Pick your emoji": "अपनी इमोजी चुनिए",
	Post: Post$5,
	"Start Typing...": "टाइप करना शुरू करें ...",
	"Type your post...": "अपनी पोस्ट लिखें ...",
	"You have 1 new notification": "आपके पास 1 नई नोटिफिकेशन है",
	"You have {{ notificationCount }} new notifications": "आपके पास {{ notificationCount }} नई नोटिफिकेशन्स है",
	"{{ actorName }} and 1 other commented on your {{ activityVerb }}": "{{ actorName }} और १ और यूजर ने आपके {{ activityVerb }} के ऊपर कमेंट किया ",
	"{{ actorName }} and 1 other followed you": "{{ actorName }} और १ और यूजर ने आपको फॉलो किया",
	"{{ actorName }} and 1 other liked your {{ activityVerb }}": "{{ actorName }} और १ और यूजर ने आपके {{ activityVerb }} को लाइक किया",
	"{{ actorName }} and 1 other reposted your {{ activityVerb }}": "{{ actorName }} और १ और यूजर ने आपके {{ activityVerb }} को रिपोस्ट किया",
	"{{ actorName }} and {{ countOtherActors }} others commented on your {{ activityVerb }}": "{{ actorName }} और {{ countOtherActors }} और यूजर ने आपके {{ activityVerb }} पे कमेंट किया ",
	"{{ actorName }} and {{ countOtherActors }} others followed you": "{{ actorName }} और {{ countOtherActors }} और यूजर ने आपको फॉलो किया",
	"{{ actorName }} and {{ countOtherActors }} others liked your {{ activityVerb }}": "{{ actorName }} और {{ countOtherActors }} और यूजर ने आपके {{ activityVerb }} को लाइक किया",
	"{{ actorName }} and {{ countOtherActors }} others reposted your {{ activityVerb }}": "{{ actorName }} और {{ countOtherActors }} और यूजर ने आपके {{ activityVerb }} को रिपोस्ट किया ",
	"{{ actorName }} commented on your {{ activityVerb }}": "{{ actorName }} ने आपके {{ activityVerb }} के ऊपर कमेंट किया",
	"{{ actorName }} followed you": "{{ actorName }} ने आपको फॉलो किया",
	"{{ actorName }} liked your {{ activityVerb }}": "{{ actorName }} ने आपके {{ activityVerb }} को लाइक किया",
	"{{ actorName }} reposted your {{ activityVerb }}": "{{ actorName }} ने आपके {{ activityVerb }} को रिपोस्ट किया",
	"{{ countComments }} comments": "{{ countComments }} कमैंट्स",
	"{{ countLikes }} likes": "{{ countLikes }} लाइक्स",
	"{{ countReposts }} reposts": "{{ countReposts }} रेपोस्टस"
};

var Details$6 = "Dettagli";
var Post$6 = "Invia";
var itTranslations = {
	"1 comment": "1 commento",
	"1 like": "1 mi piace",
	"1 repost": "1 condivisione",
	Details: Details$6,
	"Load activities": "Carica attivitá",
	"Load more": "Carica altro",
	"New Post": "Nuovo post",
	"No data to display...": "Nessun dato da mostrare...",
	"Pick your emoji": "Scegli la tua emoji",
	Post: Post$6,
	"Start Typing...": "Inizia a scrivere...",
	"Type your post...": "Scrivi il tuo post...",
	"You have 1 new notification": "Hai una nuova notifica",
	"You have {{ notificationCount }} new notifications": "Hai {{ notificationCount }} nuove notifiche",
	"{{ actorName }} and 1 other commented on your {{ activityVerb }}": "{{ actorName }} e 1 altro hanno commentato il tuo {{ activityVerb }}",
	"{{ actorName }} and 1 other followed you": "{{ actorName }} e 1 altro hanno iniziato a seguirti",
	"{{ actorName }} and 1 other liked your {{ activityVerb }}": "A {{ actorName }} e 1 altro piace il tuo {{ activityVerb }}",
	"{{ actorName }} and 1 other reposted your {{ activityVerb }}": "{{ actorName }} e 1 altro hanno condiviso il tuo {{ activityVerb }}",
	"{{ actorName }} and {{ countOtherActors }} others commented on your {{ activityVerb }}": "{{ actorName }} e altri {{ countOtherActors }} hanno commentato il tuo {{ activityVerb }}",
	"{{ actorName }} and {{ countOtherActors }} others followed you": "{{ actorName }} e altri {{ countOtherActors }} hanno iniziato a seguirti",
	"{{ actorName }} and {{ countOtherActors }} others liked your {{ activityVerb }}": "A {{ actorName }} e altri {{ countOtherActors }} piace il tuo {{ activityVerb }}",
	"{{ actorName }} and {{ countOtherActors }} others reposted your {{ activityVerb }}": "{{ actorName }} e altri {{ countOtherActors }} hanno condiviso il tuo {{ activityVerb }}",
	"{{ actorName }} commented on your {{ activityVerb }}": "{{ actorName }} ha commentato il tuo {{ activityVerb }}",
	"{{ actorName }} followed you": "{{ actorName }} ha iniziato a seguirti",
	"{{ actorName }} liked your {{ activityVerb }}": "A {{ actorName }} piace il tuo {{ activityVerb }}",
	"{{ actorName }} reposted your {{ activityVerb }}": "{{ actorName }} ha condiviso il tuo {{ activityVerb }}",
	"{{ countComments }} comments": "{{ countComments }} commenti",
	"{{ countLikes }} likes": "{{ countLikes }} mi piace",
	"{{ countReposts }} reposts": "{{ countReposts }} condivisioni"
};

var defaultNS = 'translation';
var defaultLng = 'en';
Dayjs.extend(updateLocale);
Dayjs.updateLocale('nl', {
  calendar: {
    sameDay: '[vandaag om] LT',
    nextDay: '[morgen om] LT',
    nextWeek: 'dddd [om] LT',
    lastDay: '[gisteren om] LT',
    lastWeek: '[afgelopen] dddd [om] LT',
    sameElse: 'L'
  }
});
Dayjs.updateLocale('it', {
  calendar: {
    sameDay: '[Oggi alle] LT',
    nextDay: '[Domani alle] LT',
    nextWeek: 'dddd [alle] LT',
    lastDay: '[Ieri alle] LT',
    lastWeek: '[lo scorso] dddd [alle] LT',
    sameElse: 'L'
  }
});
Dayjs.updateLocale('hi', {
  calendar: {
    sameDay: '[आज] LT',
    nextDay: '[कल] LT',
    nextWeek: 'dddd, LT',
    lastDay: '[कल] LT',
    lastWeek: '[पिछले] dddd, LT',
    sameElse: 'L'
  },
  // Hindi notation for meridiems are quite fuzzy in practice. While there exists
  // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
  meridiemParse: /रात|सुबह|दोपहर|शाम/,
  meridiemHour: function meridiemHour(hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }

    if (meridiem === 'रात') {
      return hour < 4 ? hour : hour + 12;
    } else if (meridiem === 'सुबह') {
      return hour;
    } else if (meridiem === 'दोपहर') {
      return hour >= 10 ? hour : hour + 12;
    } else if (meridiem === 'शाम') {
      return hour + 12;
    }
  },
  meridiem: function meridiem(hour) {
    if (hour < 4) {
      return 'रात';
    } else if (hour < 10) {
      return 'सुबह';
    } else if (hour < 17) {
      return 'दोपहर';
    } else if (hour < 20) {
      return 'शाम';
    } else {
      return 'रात';
    }
  }
});
Dayjs.updateLocale('fr', {
  calendar: {
    sameDay: '[Aujourd’hui à] LT',
    nextDay: '[Demain à] LT',
    nextWeek: 'dddd [à] LT',
    lastDay: '[Hier à] LT',
    lastWeek: 'dddd [dernier à] LT',
    sameElse: 'L'
  }
});
Dayjs.updateLocale('tr', {
  calendar: {
    sameDay: '[bugün saat] LT',
    nextDay: '[yarın saat] LT',
    nextWeek: '[gelecek] dddd [saat] LT',
    lastDay: '[dün] LT',
    lastWeek: '[geçen] dddd [saat] LT',
    sameElse: 'L'
  }
});
Dayjs.updateLocale('ru', {
  calendar: {
    sameDay: '[Сегодня, в] LT',
    nextDay: '[Завтра, в] LT',
    lastDay: '[Вчера, в] LT'
  }
});
var en_locale = {
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')
};
var defaultStreami18nOptions = {
  language: 'en',
  disableDateTimeTranslations: false,
  debug: false,
  logger: function logger(msg) {
    return console.warn(msg);
  },
  dayjsLocaleConfigForLanguage: null,
  DateTimeParser: Dayjs
};
var Streami18n =
/*#__PURE__*/
function () {
  /**
   * dayjs.updateLocale('nl') also changes the global locale. We don't want to do that
   * when user calls registerTranslation() function. So intead we will store the locale configs
   * given to registerTranslation() function in `dayjsLocales` object, and register the required locale
   * with moment, when setLanguage is called.
   * */

  /**
   * Contructor accepts following options:
   *  - language (String) default: 'en'
   *    Language code e.g., en, tr
   *
   *  - translationsForLanguage (object)
   *    Translations object. Please check src/i18n/en.json for example.
   *
   *  - disableDateTimeTranslations (boolean) default: false
   *    Disable translations for datetimes
   *
   *  - debug (boolean) default: false
   *    Enable debug mode in internal i18n class
   *
   *  - logger (function) default: () => {}
   *    Logger function to log warnings/errors from this class
   *
   *  - dayjsLocaleConfigForLanguage (object) default: 'enConfig'
   *    [Config object](https://momentjs.com/docs/#/i18n/changing-locale/) for internal moment object,
   *    corresponding to language (param)
   *
   *  - DateTimeParser (function) Moment or Dayjs instance/function.
   *    Make sure to load all the required locales in this Moment or Dayjs instance that you will be provide to Streami18n
   *
   * @param {*} options
   */
  function Streami18n() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Streami18n);

    _defineProperty(this, "i18nInstance", i18n.createInstance());

    _defineProperty(this, "Dayjs", null);

    _defineProperty(this, "setLanguageCallback", function () {
      return null;
    });

    _defineProperty(this, "initialized", false);

    _defineProperty(this, "t", null);

    _defineProperty(this, "tDateTimeParser", null);

    _defineProperty(this, "translations", {
      en: _defineProperty({}, defaultNS, enTranslations),
      nl: _defineProperty({}, defaultNS, nlTranslations),
      ru: _defineProperty({}, defaultNS, ruTranslations),
      tr: _defineProperty({}, defaultNS, trTranslations),
      fr: _defineProperty({}, defaultNS, frTranslations),
      hi: _defineProperty({}, defaultNS, hiTranslations),
      it: _defineProperty({}, defaultNS, itTranslations)
    });

    _defineProperty(this, "dayjsLocales", {});

    _defineProperty(this, "localeExists", function (language) {
      if (_this.isCustomDateTimeParser) return true;
      return Object.keys(Dayjs.Ls).indexOf(language) > -1;
    });

    _defineProperty(this, "validateCurrentLanguage", function () {
      var availableLanguages = Object.keys(_this.translations);

      if (availableLanguages.indexOf(_this.currentLanguage) === -1) {
        _this.logger("Streami18n: '".concat(_this.currentLanguage, "' language is not registered.") + " Please make sure to call streami18n.registerTranslation('".concat(_this.currentLanguage, "', {...}) or ") + "use one the built-in supported languages - ".concat(_this.getAvailableLanguages()));

        _this.currentLanguage = defaultLng;
      }
    });

    _defineProperty(this, "geti18Instance", function () {
      return _this.i18nInstance;
    });

    _defineProperty(this, "getAvailableLanguages", function () {
      return Object.keys(_this.translations);
    });

    _defineProperty(this, "getTranslations", function () {
      return _this.translations;
    });

    var finalOptions = _objectSpread({}, defaultStreami18nOptions, options); // Prepare the i18next configuration.


    this.logger = finalOptions.logger;
    this.currentLanguage = finalOptions.language;
    this.DateTimeParser = finalOptions.DateTimeParser;

    try {
      // This is a shallow check to see if given parser is instance of Dayjs.
      // For some reason Dayjs.isDayjs(this.DateTimeParser()) doesn't work.
      if (this.DateTimeParser && this.DateTimeParser.extend) {
        this.DateTimeParser.extend(LocalizedFormat);
        this.DateTimeParser.extend(calendar);
        this.DateTimeParser.extend(localeData);
        this.DateTimeParser.extend(relativeTime);
      }
    } catch (error) {
      throw Error("Streami18n: Looks like you wanted to provide Dayjs instance, but something went wrong while adding plugins", error);
    }

    this.isCustomDateTimeParser = !!options.DateTimeParser;
    var translationsForLanguage = finalOptions.translationsForLanguage;

    if (translationsForLanguage) {
      this.translations[this.currentLanguage] = _defineProperty({}, defaultNS, translationsForLanguage);
    } // If translations don't exist for given language, then set it as empty object.


    if (!this.translations[this.currentLanguage]) {
      this.translations[this.currentLanguage] = _defineProperty({}, defaultNS, {});
    }

    this.i18nextConfig = {
      nsSeparator: false,
      keySeparator: false,
      fallbackLng: false,
      debug: finalOptions.debug,
      lng: this.currentLanguage,
      interpolation: {
        escapeValue: false
      },
      parseMissingKeyHandler: function parseMissingKeyHandler(key) {
        _this.logger("Streami18n: Missing translation for key: ".concat(key));

        return key;
      }
    };
    this.validateCurrentLanguage(this.currentLanguage);
    var dayjsLocaleConfigForLanguage = finalOptions.dayjsLocaleConfigForLanguage;

    if (dayjsLocaleConfigForLanguage) {
      this.addOrUpdateLocale(this.currentLanguage, _objectSpread({}, dayjsLocaleConfigForLanguage));
    } else if (!this.localeExists(this.currentLanguage)) {
      this.logger("Streami18n: Streami18n(...) - Locale config for ".concat(this.currentLanguage, " does not exist in momentjs.") + "Please import the locale file using \"import 'moment/locale/".concat(this.currentLanguage, "';\" in your app or ") + "register the locale config with Streami18n using registerTranslation(language, translation, customDayjsLocale)");
    }

    this.tDateTimeParser = function (timestamp) {
      if (finalOptions.disableDateTimeTranslations || !_this.localeExists(_this.currentLanguage)) {
        return _this.DateTimeParser(timestamp).locale(defaultLng);
      }

      return _this.DateTimeParser(timestamp).locale(_this.currentLanguage);
    };
  }
  /**
   * Initializes the i18next instance with configuration (which enables natural language as default keys)
   */


  _createClass(Streami18n, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.validateCurrentLanguage();
                _context.prev = 1;
                _context.next = 4;
                return this.i18nInstance.init(_objectSpread({}, this.i18nextConfig, {
                  resources: this.translations,
                  lng: this.currentLanguage
                }));

              case 4:
                this.t = _context.sent;
                this.initialized = true;
                return _context.abrupt("return", {
                  t: this.t,
                  tDateTimeParser: this.tDateTimeParser
                });

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                this.logger("Something went wrong with init:", _context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 9]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "getTranslators",

    /**
     * Returns current version translator function.
     */
    value: function () {
      var _getTranslators = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.initialized) {
                  _context2.next = 7;
                  break;
                }

                if (this.dayjsLocales[this.currentLanguage]) {
                  this.addOrUpdateLocale(this.currentLanguage, this.dayjsLocales[this.currentLanguage]);
                }

                _context2.next = 4;
                return this.init();

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 7:
                return _context2.abrupt("return", {
                  t: this.t,
                  tDateTimeParser: this.tDateTimeParser
                });

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getTranslators() {
        return _getTranslators.apply(this, arguments);
      }

      return getTranslators;
    }()
    /**
     * Register translation
     *
     * @param {*} language
     * @param {*} translation
     * @param {*} customDayjsLocale
     */

  }, {
    key: "registerTranslation",
    value: function registerTranslation(language, translation, customDayjsLocale) {
      if (!translation) {
        this.logger("Streami18n: registerTranslation(language, translation, customDayjsLocale) called without translation");
        return;
      }

      if (!this.translations[language]) {
        this.translations[language] = _defineProperty({}, defaultNS, translation);
      } else {
        this.translations[language][defaultNS] = translation;
      }

      if (customDayjsLocale) {
        this.dayjsLocales[language] = _objectSpread({}, customDayjsLocale);
      } else if (!this.localeExists(language)) {
        this.logger("Streami18n: registerTranslation(language, translation, customDayjsLocale) - " + "Locale config for ".concat(language, " does not exist in Dayjs.") + "Please import the locale file using \"import 'dayjs/locale/".concat(language, "';\" in your app or ") + "register the locale config with Streami18n using registerTranslation(language, translation, customDayjsLocale)");
      }

      if (this.initialized) {
        this.i18nInstance.addResources(language, defaultNS, translation);
      }
    }
  }, {
    key: "addOrUpdateLocale",
    value: function addOrUpdateLocale(key, config) {
      if (this.localeExists(key)) {
        Dayjs.updateLocale(key, _objectSpread({}, config));
      } else {
        // Merging the custom locale config with en config, so missing keys can default to english.
        Dayjs.locale(_objectSpread({
          name: key
        }, _objectSpread({}, en_locale, config)), null, true);
      }
    }
    /**
     * Changes the language.
     * @param {*} language
     */

  }, {
    key: "setLanguage",
    value: function () {
      var _setLanguage = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(language) {
        var t;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.currentLanguage = language;

                if (this.initialized) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return");

              case 3:
                _context3.prev = 3;
                _context3.next = 6;
                return this.i18nInstance.changeLanguage(language);

              case 6:
                t = _context3.sent;

                if (this.dayjsLocales[language]) {
                  this.addOrUpdateLocale(this.currentLanguage, this.dayjsLocales[this.currentLanguage]);
                }

                this.setLanguageCallback(t);
                return _context3.abrupt("return", t);

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](3);
                this.logger("Failed to set language:", _context3.t0);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 12]]);
      }));

      function setLanguage(_x) {
        return _setLanguage.apply(this, arguments);
      }

      return setLanguage;
    }()
    /**
     *
     * @param {*} callback
     */

  }, {
    key: "registerSetLanguageCallback",
    value: function registerSetLanguageCallback(callback) {
      this.setLanguageCallback = callback;
    }
  }]);

  return Streami18n;
}();

var StreamContext = createContext({
  changedUserData: function changedUserData() {},
  sharedFeedManagers: {},
  client: null
});
var TranslationContext = createContext({
  t: function t(msg) {
    return msg;
  },
  tDateTimeParser: function tDateTimeParser(input) {
    return Dayjs(input);
  }
});
function withTranslationContext(OriginalComponent) {
  var ContextAwareComponent = function ContextComponent(props) {
    return createElement(TranslationContext.Consumer, null, function (translationContext) {
      return OriginalComponent && createElement(OriginalComponent, _extends({}, translationContext, props));
    });
  };

  ContextAwareComponent.displayName = OriginalComponent.displayName || OriginalComponent.name || 'Component';
  ContextAwareComponent.displayName = ContextAwareComponent.displayName.replace('Base', '');
  return ContextAwareComponent;
}

/**
 * Manages the connection with Stream. Any components that should talk to
 * Stream should be a child of this component.
 */
var StreamApp =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StreamApp, _React$Component);

  function StreamApp(props) {
    var _this;

    _classCallCheck(this, StreamApp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StreamApp).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getUserInfo",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _this.state.user.getOrCreate(_this.props.defaultUserData);

            case 3:
              _context.next = 9;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);

              _this.props.errorHandler(_context.t0, 'get-user-info', {
                userId: _this.state.user.id
              });

              return _context.abrupt("return");

            case 9:
              _this.state.changedUserData();

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 5]]);
    })));

    _this.state = StreamApp.initClientState(props, {
      changedUserData: function changedUserData() {
        _this.setState({
          userData: _this.state.user.data
        });
      },
      t: null,
      tDateTimeParser: null
    });
    return _this;
  }

  _createClass(StreamApp, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.apiKey !== prevProps.apiKey || this.props.token !== prevProps.token || this.props.appId !== prevProps.appId) {
        this.getUserInfo();
      }
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var i18nInstance, streami18n, _ref2, t, tDateTimeParser;

        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.getUserInfo();
                i18nInstance = this.props.i18nInstance;

                if (i18nInstance && i18nInstance instanceof Streami18n) {
                  streami18n = i18nInstance;
                } else {
                  streami18n = new Streami18n({
                    language: 'en'
                  });
                }

                streami18n.registerSetLanguageCallback(function (t) {
                  _this2.setState({
                    t: t
                  });
                });
                _context2.next = 6;
                return streami18n.getTranslators();

              case 6:
                _ref2 = _context2.sent;
                t = _ref2.t;
                tDateTimeParser = _ref2.tDateTimeParser;
                this.setState({
                  t: t,
                  tDateTimeParser: tDateTimeParser
                });

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      if (!this.state.t) return null;

      var _this$state = this.state,
          t = _this$state.t,
          tDateTimeParser = _this$state.tDateTimeParser,
          streamContextValue = _objectWithoutProperties(_this$state, ["t", "tDateTimeParser"]);

      return createElement(StreamContext.Provider, {
        value: streamContextValue
      }, createElement(TranslationContext.Provider, {
        value: {
          t: t,
          tDateTimeParser: tDateTimeParser
        }
      }, createElement(Fragment, null, this.props.children || createElement(Fragment, null, createElement("div", {
        style: {
          width: 100 + '%',
          height: 100 + '%',
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          backgroundColor: '#008AFF',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol'
        }
      }, createElement("h3", null, "You are connected to:"), createElement("svg", {
        width: "117",
        height: "21",
        xmlns: "http://www.w3.org/2000/svg"
      }, createElement("g", {
        fill: "none",
        fillRule: "evenodd"
      }, createElement("path", {
        className: "stream",
        d: "M48.812 16.9c.168-.15.317-.317.448-.504.13-.187.196-.401.196-.644 0-.299-.107-.55-.322-.756a2.794 2.794 0 0 0-.784-.518 4.892 4.892 0 0 0-.966-.322c-.336-.075-.616-.14-.84-.196a13.04 13.04 0 0 1-1.736-.546 5.849 5.849 0 0 1-1.414-.784 3.53 3.53 0 0 1-.952-1.092c-.233-.42-.35-.92-.35-1.498 0-.541.13-1.05.392-1.526a4.35 4.35 0 0 1 1.05-1.26 5.156 5.156 0 0 1 1.54-.868 5.387 5.387 0 0 1 1.862-.322c.579 0 1.13.084 1.652.252.523.168.994.397 1.414.686.42.29.775.64 1.064 1.05.29.41.48.868.574 1.372l-2.436.588a2.036 2.036 0 0 0-.728-1.12c-.373-.299-.887-.448-1.54-.448a2.69 2.69 0 0 0-.7.098 2.41 2.41 0 0 0-.672.294c-.205.13-.378.29-.518.476-.14.187-.21.401-.21.644 0 .261.08.485.238.672.159.187.35.34.574.462.224.121.467.22.728.294.261.075.504.14.728.196.99.243 1.81.504 2.464.784.653.28 1.176.588 1.568.924.392.336.667.705.826 1.106.159.401.238.854.238 1.358a3.6 3.6 0 0 1-.406 1.68 4.22 4.22 0 0 1-1.12 1.358 5.304 5.304 0 0 1-1.708.896 6.912 6.912 0 0 1-2.142.322c-1.157 0-2.189-.285-3.094-.854-.905-.57-1.517-1.33-1.834-2.282l2.296-1.036c.299.653.681 1.097 1.148 1.33.467.233.999.35 1.596.35.747 0 1.372-.205 1.876-.616zm12.276 2.772a9.115 9.115 0 0 1-2.268.476c-.747.056-1.419-.051-2.016-.322-.597-.27-1.083-.747-1.456-1.428-.373-.681-.56-1.638-.56-2.87V9.313h-2.226V6.356h.609c.727 0 1.376-.177 1.834-.916.194-.313.22-.633.243-1.502V2.913h2.332v3.443h2.749v2.957h-2.75l-.075 6.635c0 .448.051.803.154 1.064.103.261.275.457.518.588.243.13.56.196.952.196.392 0 .868-.037 1.428-.112l.532 1.988zM69.676 8.78l-.392-.168a5.38 5.38 0 0 0-.392-.112 1.957 1.957 0 0 0-.476-.056c-.541 0-1.045.089-1.512.266a3.849 3.849 0 0 0-1.204.714 3.372 3.372 0 0 0-.798 1.05 2.866 2.866 0 0 0-.294 1.274L64.58 20h-2.716V6.288h2.156l.56 1.484a4.134 4.134 0 0 1 1.47-1.302c.607-.327 1.367-.49 2.282-.49.597 0 1.279.084 2.044.252l-.7 2.548zm7.048 11.256c-.97 0-1.88-.182-2.73-.546a7.032 7.032 0 0 1-2.226-1.498 6.99 6.99 0 0 1-1.498-2.24 6.957 6.957 0 0 1-.546-2.744c0-.97.173-1.885.518-2.744a7.226 7.226 0 0 1 1.4-2.24A6.526 6.526 0 0 1 73.7 6.526a5.91 5.91 0 0 1 2.52-.546c.915 0 1.76.159 2.534.476A5.203 5.203 0 0 1 80.77 7.94c.57.672 1.013 1.526 1.33 2.562.317 1.036.476 2.273.476 3.71h-9.968c.13.485.336.938.616 1.358.28.42.611.784.994 1.092.383.308.812.546 1.288.714.476.168.975.252 1.498.252.71 0 1.367-.13 1.974-.392a4.925 4.925 0 0 0 1.554-1.036l1.68 1.68c-.653.653-1.451 1.176-2.394 1.568-.943.392-1.974.588-3.094.588zM76.22 8.444c-.43 0-.835.084-1.218.252a3.89 3.89 0 0 0-1.064.7 4.32 4.32 0 0 0-.84 1.064c-.233.41-.406.859-.518 1.344h7.084a4.331 4.331 0 0 0-.308-1.288 3.311 3.311 0 0 0-1.75-1.806c-.401-.177-.863-.266-1.386-.266zm20.9-2.156V20h-2.296l-.42-1.84a4.424 4.424 0 0 1-1.792 1.4 5.49 5.49 0 0 1-2.212.476 6.326 6.326 0 0 1-2.618-.546 6.712 6.712 0 0 1-2.128-1.498 7.162 7.162 0 0 1-1.442-2.24 7.116 7.116 0 0 1-.532-2.744c0-.97.177-1.885.532-2.744a7.162 7.162 0 0 1 1.442-2.24 6.712 6.712 0 0 1 2.128-1.498A6.326 6.326 0 0 1 90.4 5.98c.747 0 1.465.145 2.156.434.69.29 1.307.742 1.848 1.358l.42-1.484h2.296zm-6.72 11.34c.541 0 1.055-.121 1.54-.364a3.94 3.94 0 0 0 1.26-.994c.355-.42.635-.91.84-1.47.205-.56.308-1.157.308-1.792s-.103-1.232-.308-1.792a4.834 4.834 0 0 0-.84-1.47 3.94 3.94 0 0 0-1.26-.994 3.398 3.398 0 0 0-1.54-.364c-.541 0-1.055.121-1.54.364a3.94 3.94 0 0 0-1.26.994c-.355.42-.635.91-.84 1.47a5.164 5.164 0 0 0-.308 1.792c0 .635.103 1.232.308 1.792.205.56.485 1.05.84 1.47.355.42.775.751 1.26.994s.999.364 1.54.364zM101.808 20h-2.716V6.288h2.156l.56 1.148a5.135 5.135 0 0 1 1.204-1.022c.467-.29 1.036-.434 1.708-.434.261 0 .555.033.882.098.327.065.663.177 1.008.336a4.3 4.3 0 0 1 .994.644c.317.27.588.62.812 1.05.317-.579.798-1.078 1.442-1.498.644-.42 1.33-.63 2.058-.63.485 0 .999.075 1.54.224.541.15 1.045.43 1.512.84.467.41.85.98 1.148 1.708.299.728.448 1.67.448 2.828V20h-2.548v-8.448c0-1.157-.238-1.965-.714-2.422-.476-.457-1.106-.686-1.89-.686-.597 0-1.12.252-1.568.756-.448.504-.672 1.297-.672 2.38V20h-2.548v-8.448c0-1.157-.238-1.965-.714-2.422-.476-.457-1.106-.686-1.89-.686-.56 0-1.05.215-1.47.644-.42.43-.667 1.101-.742 2.016V20z",
        fill: "#fff"
      }), createElement("path", {
        className: "stream-mark",
        d: "M26.15 6.428l12.802-.908a1 1 0 0 1 .883 1.581L30.88 19.576a1 1 0 0 1-.812.417H9.982a1 1 0 0 1-.811-.416L.19 7.102a1 1 0 0 1 .882-1.582l12.764.908L19.29.333a1 1 0 0 1 1.496.006l5.364 6.09zm2.68 11.587l-8.309-3.105v3.105h8.31zm-9.309 0V14.91l-8.309 3.105h8.31zm-.959-3.847l-8.489 3.17-6.246-8.682 14.735 5.512zm2.9 0l8.49 3.17 6.246-8.682-14.735 5.512zm-1.933-.724V2.994l-6.941 7.837 6.941 2.613zm.992 0V2.996l6.942 7.835-6.942 2.613zm-9.969-3.336l1.597-1.794-7.802-.56 6.205 2.354zm18.863 0l-1.597-1.794 7.803-.56-6.206 2.354z",
        fill: "#fff"
      }))))))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (state.client.apiKey !== props.apiKey || state.client.userToken !== props.token || state.client.appId !== props.appId) {
        return StreamApp.initClientState(props, state);
      }

      return null;
    }
  }]);

  return StreamApp;
}(Component);

_defineProperty(StreamApp, "defaultProps", {
  sharedFeeds: [{
    feedGroup: 'notification',
    notify: true,
    options: {
      mark_seen: true
    }
  }],
  defaultUserData: {
    name: 'Unknown'
  },
  errorHandler: handleError
});

_defineProperty(StreamApp, "Consumer", function StreamAppConsumer(props) {
  return createElement(StreamContext.Consumer, null, function (appCtx) {
    if (!props.children || !props.children.length) {
      return null;
    }

    if (!appCtx.client || !appCtx.user) {
      throw new Error('This component should be a child of a StreamApp component');
    }

    var Child = props.children;
    return Child(appCtx);
  });
});

_defineProperty(StreamApp, "initClientState", function (props, state) {
  var client = stream.connect(props.apiKey, props.token, props.appId, props.options || {});
  var analyticsClient;

  if (props.analyticsToken) {
    analyticsClient = new StreamAnalytics({
      apiKey: props.apiKey,
      token: props.analyticsToken
    });
    analyticsClient.setUser(client.userId);
  }

  var newState = _objectSpread({}, state, {
    client: client,
    user: client.currentUser,
    userData: client.currentUser.data,
    analyticsClient: analyticsClient,
    sharedFeedManagers: {},
    errorHandler: props.errorHandler,
    apiKey: props.apiKey,
    token: props.token,
    appId: props.appId
  });

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = props.sharedFeeds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var feedProps = _step.value;
      var manager = new FeedManager(_objectSpread({}, feedProps, newState));
      newState.sharedFeedManagers[manager.feed().id] = manager;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return newState;
});

var FeedContext = createContext({});
var Feed =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Feed, _React$Component);

  function Feed() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Feed);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Feed)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_appCtxWrapperFunc", function (appCtx) {
      return createElement(FeedInner, _extends({}, _this.props, appCtx));
    });

    return _this;
  }

  _createClass(Feed, [{
    key: "render",
    value: function render() {
      return createElement(StreamApp.Consumer, null, this._appCtxWrapperFunc);
    }
  }]);

  return Feed;
}(Component);

var FeedInner =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(FeedInner, _React$Component2);

  function FeedInner(props) {
    var _this2;

    _classCallCheck(this, FeedInner);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(FeedInner).call(this, props));

    _defineProperty(_assertThisInitialized(_this2), "boundForceUpdate", function () {
      return _this2.forceUpdate();
    });

    _defineProperty(_assertThisInitialized(_this2), "getCtx", function () {
      var manager = _this2.state.manager;
      var state = manager.state;
      return {
        getActivityPath: manager.getActivityPath,
        onToggleReaction: manager.onToggleReaction,
        onAddReaction: manager.onAddReaction,
        onRemoveReaction: manager.onRemoveReaction,
        onToggleChildReaction: manager.onToggleChildReaction,
        onAddChildReaction: manager.onAddChildReaction,
        onRemoveChildReaction: manager.onRemoveChildReaction,
        onRemoveActivity: manager.onRemoveActivity,
        onMarkAsRead: manager.onMarkAsRead,
        onMarkAsSeen: manager.onMarkAsSeen,
        hasDoneRequest: state.lastResponse != null,
        refresh: manager.refresh,
        refreshUnreadUnseen: manager.refreshUnreadUnseen,
        loadNextReactions: manager.loadNextReactions,
        loadNextPage: manager.loadNextPage,
        hasNextPage: manager.hasNextPage(),
        loadReverseNextPage: manager.loadReverseNextPage,
        hasReverseNextPage: manager.hasReverseNextPage(),
        feedGroup: _this2.props.feedGroup,
        userId: _this2.props.userId,
        activityOrder: state.activityOrder,
        activities: state.activities,
        realtimeAdds: state.realtimeAdds,
        realtimeDeletes: state.realtimeDeletes,
        refreshing: state.refreshing,
        unread: state.unread,
        unseen: state.unseen,
        feedManager: manager
      };
    });

    var feedId = props.client.feed(props.feedGroup, props.userId).id;
    var _manager = props.sharedFeedManagers[feedId];

    if (!_manager) {
      _manager = new FeedManager(props);
    }

    _this2.state = {
      manager: _manager
    };
    return _this2;
  }

  _createClass(FeedInner, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      return this.state.manager.register(this.boundForceUpdate);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var clientDifferent = this.props.client !== prevProps.client;
      var notifyDifferent = this.props.notify !== prevProps.notify;
      var feedDifferent = this.props.userId !== prevProps.userId || this.props.feedGroup !== prevProps.feedGroup;
      var optionsDifferent = !_isEqual(this.props.options, prevProps.options);
      var doFeedRequestDifferent = this.props.doFeedRequest !== prevProps.doFeedRequest;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      return this.state.manager.unregister(this.boundForceUpdate);
    }
  }, {
    key: "render",
    value: function render() {
      return createElement(FeedContext.Provider, {
        value: this.getCtx()
      }, this.props.children);
    }
  }]);

  return FeedInner;
}(Component);

var placeholder = "1519fc1dc6e473ee.png";

/**
 *
 * @example ./examples/Avatar.md
 */
var Avatar =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Avatar, _React$PureComponent);

  function Avatar() {
    _classCallCheck(this, Avatar);

    return _possibleConstructorReturn(this, _getPrototypeOf(Avatar).apply(this, arguments));
  }

  _createClass(Avatar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          size = _this$props.size,
          image = _this$props.image,
          alt = _this$props.alt,
          rounded = _this$props.rounded,
          circle = _this$props.circle;
      return React__default.createElement(React__default.Fragment, null, React__default.createElement("img", {
        style: size ? {
          width: "".concat(size, "px"),
          height: "".concat(size, "px")
        } : {},
        className: "raf-avatar ".concat(rounded ? 'raf-avatar--rounded' : '', " ").concat(circle ? 'raf-avatar--circle' : ''),
        onClick: this.props.onClick,
        src: image ? image : placeholder,
        alt: alt || ''
      }));
    }
  }]);

  return Avatar;
}(React__default.PureComponent);

/**
 * Component is described here.
 *
 * @example ./examples/UserBar.md
 */
var UserBar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(UserBar, _React$Component);

  function UserBar() {
    _classCallCheck(this, UserBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserBar).apply(this, arguments));
  }

  _createClass(UserBar, [{
    key: "render",
    value: function render() {
      var _this = this;

      var tDateTimeParser = this.props.tDateTimeParser;
      var time = this.props.time;

      if (time === undefined && this.props.timestamp != null) {
        time = humanizeTimestamp(this.props.timestamp, tDateTimeParser);
      }

      return createElement("div", {
        className: "raf-user-bar"
      }, this.props.avatar ? createElement(Avatar, {
        onClick: this.props.onClickUser,
        size: 50,
        circle: true,
        image: this.props.avatar
      }) : null, createElement("div", {
        className: "raf-user-bar__details"
      }, createElement("p", {
        className: "raf-user-bar__username",
        onClick: this.props.onClickUser
      }, this.props.username), this.props.AfterUsername, this.props.icon !== undefined ? createElement("img", {
        src: this.props.icon,
        alt: "icon"
      }) : null, this.props.subtitle ? createElement("p", {
        className: "raf-user-bar__subtitle"
      }, createElement("time", {
        dateTime: this.props.timestamp,
        title: this.props.timestamp
      }, this.props.subtitle)) : null), createElement(Fragment, null, smartRender(this.props.Right, {}, function () {
        return createElement("p", {
          className: "raf-user-bar__extra"
        }, createElement("time", {
          dateTime: _this.props.timestamp,
          title: _this.props.timestamp
        }, time));
      })));
    }
  }]);

  return UserBar;
}(Component);

var UserBar$1 = withTranslationContext(UserBar);

/**
 * Component is described here.
 *
 * @example ./examples/Card.md
 */
var Card =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Card);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Card)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "trimUrl", function (url) {
      var trimmedUrl;

      if (url !== undefined || url !== null) {
        trimmedUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
      }

      return trimmedUrl;
    });

    _defineProperty(_assertThisInitialized(_this), "_handleClose", function (e) {
      if (_this.props.handleClose) {
        _this.props.handleClose(e);
      }
    });

    return _this;
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          alt = _this$props.alt,
          images = _this$props.images,
          handleClose = _this$props.handleClose,
          nolink = _this$props.nolink;
      var image = this.props.image;

      if (!image && images && images.length) {
        image = images[0].image;
      }

      var url = sanitizeURL(this.props.url);
      var svg = '<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M465 5c5.53 0 10 4.47 10 10s-4.47 10-10 10-10-4.47-10-10 4.47-10 10-10zm3.59 5L465 13.59 461.41 10 460 11.41l3.59 3.59-3.59 3.59 1.41 1.41 3.59-3.59 3.59 3.59 1.41-1.41-3.59-3.59 3.59-3.59-1.41-1.41z" id="b"/><filter x="-30%" y="-30%" width="160%" height="160%" filterUnits="objectBoundingBox" id="a"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1"/></filter></defs><g transform="translate(-451 -1)" fill-rule="nonzero" fill="none"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="#FFF" fill-rule="evenodd" xlink:href="#b"/></g></svg>';
      return React__default.createElement("a", {
        href: !nolink ? url : null,
        target: "blank",
        rel: "noopener",
        className: "raf-card ".concat(image !== undefined ? 'raf-card--with-image' : '')
      }, handleClose && image ? React__default.createElement(IconButton, {
        onClick: function onClick(e) {
          return _this2._handleClose(e);
        }
      }, React__default.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: svg
        }
      })) : null, image !== undefined && React__default.createElement("div", {
        className: "raf-card__image"
      }, React__default.createElement("img", {
        src: image == null ? placeholder : image,
        alt: alt || this.props.title || this.props.description || ''
      })), React__default.createElement("div", {
        className: "raf-card__content"
      }, React__default.createElement("div", {
        className: "raf-card__content-left"
      }, React__default.createElement("p", {
        className: "raf-card__title"
      }, this.props.title), React__default.createElement("p", {
        className: "raf-card__url"
      }, this.trimUrl(url || '')), React__default.createElement("p", {
        className: "raf-card__description"
      }, this.props.description)), handleClose && image === undefined ? React__default.createElement("div", {
        className: "raf-card__content-right"
      }, React__default.createElement(IconButton, {
        onClick: function onClick(e) {
          return _this2._handleClose(e);
        }
      }, React__default.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: svg
        }
      }))) : null));
    }
  }]);

  return Card;
}(React__default.Component);

var Audio =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Audio, _React$Component);

  function Audio(props) {
    var _this;

    _classCallCheck(this, Audio);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Audio).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "audioRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "playAudio", function () {
      if (_this.audioRef.current !== null) {
        _this.audioRef.current.pause();

        _this.updateProgress();

        _this.setState({
          playing: true,
          updateProgress: setInterval(_this.updateProgress, 500)
        }); //$FlowFixMe


        _this.audioRef.current.play();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "pauseAudio", function () {
      if (_this.audioRef.current !== null) {
        _this.audioRef.current.pause();
      }

      _this.setState({
        playing: false
      });

      window.clearInterval(_this.state.updateProgress);
    });

    _defineProperty(_assertThisInitialized(_this), "updateProgress", function () {
      if (_this.audioRef.current !== null) {
        var position = _this.audioRef.current.currentTime;
        var duration = _this.audioRef.current.duration;
        var progress = 100 / duration * position;

        _this.setState({
          progress: progress
        });

        if (position === duration) {
          _this.pauseAudio();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleClose", function (e) {
      if (_this.props.handleClose) {
        _this.props.handleClose(e);
      }
    });

    _this.state = {
      open: false,
      playing: false,
      progress: 0,
      updateProgress: null
    };
    _this.audioRef = createRef();
    return _this;
  }

  _createClass(Audio, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.clearInterval(this.state.updateProgress);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var og = this.props.og;
      var svg = '<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M465 5c5.53 0 10 4.47 10 10s-4.47 10-10 10-10-4.47-10-10 4.47-10 10-10zm3.59 5L465 13.59 461.41 10 460 11.41l3.59 3.59-3.59 3.59 1.41 1.41 3.59-3.59 3.59 3.59 1.41-1.41-3.59-3.59 3.59-3.59-1.41-1.41z" id="b"/><filter x="-30%" y="-30%" width="160%" height="160%" filterUnits="objectBoundingBox" id="a"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1"/></filter></defs><g transform="translate(-451 -1)" fill-rule="nonzero" fill="none"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="#FFF" fill-rule="evenodd" xlink:href="#b"/></g></svg>';
      var audio = og.audios[0];
      var url = sanitizeURL(audio.secure_url || audio.audio);
      var image = ((og.images || [])[0] || {}).image;
      return createElement("div", {
        className: "raf-audio"
      }, createElement("div", {
        className: "raf-audio__wrapper"
      }, createElement("audio", {
        ref: this.audioRef
      }, createElement("source", {
        src: url,
        type: "audio/mp3"
      })), createElement("div", {
        className: "raf-audio__image"
      }, createElement("div", {
        className: "raf-audio__image--overlay"
      }, !this.state.playing ? createElement("div", {
        onClick: function onClick() {
          return _this2.playAudio();
        },
        className: "raf-audio__image--button"
      }, createElement(FontAwesomeIcon, {
        icon: faPlayCircle
      })) : createElement("div", {
        onClick: function onClick() {
          return _this2.pauseAudio();
        },
        className: "raf-audio__image--button"
      }, createElement(FontAwesomeIcon, {
        icon: faPauseCircle
      }))), createElement("img", {
        src: image,
        alt: "".concat(og.description)
      })), createElement("div", {
        className: "raf-audio__content"
      }, createElement("span", {
        className: "raf-audio__content--title"
      }, createElement("strong", null, og.title)), createElement("span", {
        className: "raf-audio__content--subtitle"
      }, og.description), createElement("div", {
        className: "raf-audio__content--progress"
      }, createElement("div", {
        style: {
          width: "".concat(this.state.progress, "%")
        }
      }))), this.props.handleClose ? createElement(IconButton, {
        onClick: function onClick(e) {
          return _this2._handleClose(e);
        }
      }, createElement("div", {
        dangerouslySetInnerHTML: {
          __html: svg
        }
      })) : null));
    }
  }]);

  return Audio;
}(Component);

/**
 * Component for rendering an Youtube or Vimeo embedded player
 * @example ./examples/Video.md
 */
var Video =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Video, _React$Component);

  function Video() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Video);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Video)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_handleClose", function (e) {
      if (_this.props.handleClose) {
        _this.props.handleClose(e);
      }
    });

    return _this;
  }

  _createClass(Video, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$og = this.props.og,
          videos = _this$props$og.videos,
          _this$props$og$images = _this$props$og.images,
          images = _this$props$og$images === void 0 ? [] : _this$props$og$images;
      var video = {};
      var svg = '<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M465 5c5.53 0 10 4.47 10 10s-4.47 10-10 10-10-4.47-10-10 4.47-10 10-10zm3.59 5L465 13.59 461.41 10 460 11.41l3.59 3.59-3.59 3.59 1.41 1.41 3.59-3.59 3.59 3.59 1.41-1.41-3.59-3.59 3.59-3.59-1.41-1.41z" id="b"/><filter x="-30%" y="-30%" width="160%" height="160%" filterUnits="objectBoundingBox" id="a"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1"/></filter></defs><g transform="translate(-451 -1)" fill-rule="nonzero" fill="none"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="#FFF" fill-rule="evenodd" xlink:href="#b"/></g></svg>';
      var CloseButton = Boolean(this.props.handleClose) && React__default.createElement(IconButton, {
        onClick: function onClick(e) {
          return _this2._handleClose(e);
        }
      }, React__default.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: svg
        }
      }));

      for (var i = 0; i < videos.length; i++) {
        if (videos[i].type === 'text/html' || videos[i].type === 'video/mp4') {
          video = videos[i];
          break;
        }
      }

      var url = sanitizeURL(video.secure_url || video.video);

      if (video.type === 'text/html') {
        return React__default.createElement("div", {
          className: "raf-video__frame"
        }, CloseButton, React__default.createElement("iframe", {
          title: 'embedded player',
          id: "ytplayer",
          type: video.type,
          width: video.width,
          height: video.height,
          src: url,
          frameBorder: "0"
        }));
      } else {
        var videoProps = {
          controls: true,
          // Try fetching length of video etc
          preload: 'metadata',
          poster: ''
        };

        if (images[0]) {
          if (images[0].secure_url) videoProps.poster = images[0].secure_url;else if (images[0].image) videoProps.poster = images[0].image;
        }

        var parsedUrl = new URL(url);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.props.urlsThatAreGifs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var gifUrl = _step.value;

            if (gifUrl === parsedUrl.host) {
              videoProps = {
                // Load the video right away
                preload: 'auto',
                // Display it like it's a gif
                autoPlay: true,
                muted: true,
                loop: true,
                controls: false,
                // On mobile don't open video fullscreen
                playsInline: true,
                'webkit-playsinline': 'webkit-playsinline'
              };
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return React__default.createElement("div", {
          className: "raf-video__video"
        }, React__default.createElement("video", _extends({
          className: "raf-video__video--video"
        }, videoProps), React__default.createElement("source", {
          src: url,
          type: video.type
        })), React__default.createElement("div", {
          className: "raf-video__video--content"
        }, React__default.createElement("div", {
          className: "raf-video__video--title"
        }, this.props.og.title), React__default.createElement("div", {
          className: "raf-video__video--description"
        }, this.props.og.description), React__default.createElement("div", {
          className: "raf-video__video--link"
        }, React__default.createElement("a", {
          href: sanitizeURL(this.props.og.url),
          target: "blank"
        }, this.props.og.site_name))), CloseButton);
      }
    }
  }]);

  return Video;
}(React__default.Component);

_defineProperty(Video, "defaultProps", {
  urlsThatAreGifs: ['i.giphy.com', 'i.imgur.com', 'media.giphy.com']
});

/**
 * Component is described here.
 *
 * @example ./examples/Gallery.md
 */
var Gallery =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Gallery, _React$Component);

  function Gallery(props) {
    var _this;

    _classCallCheck(this, Gallery);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Gallery).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "gotoPrevious", function () {
      _this.setState({
        currentImage: _this.state.currentImage - 1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "gotoNext", function () {
      _this.setState({
        currentImage: _this.state.currentImage + 1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "openLightbox", function (image) {
      _this.setState({
        lightboxIsOpen: true,
        currentImage: image
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeLightbox", function () {
      _this.setState({
        lightboxIsOpen: false,
        currentImage: 0
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getImages", function (images) {
      return images.map(function (item) {
        return {
          src: item
        };
      });
    });

    _this.state = {
      lightboxIsOpen: false,
      currentImage: 0
    };
    return _this;
  }

  _createClass(Gallery, [{
    key: "render",
    //  TODO: Provide way to add alt tags.
    value: function render() {
      var _this2 = this;

      var images = this.props.images;
      return createElement(Fragment, null, createElement("div", {
        className: "raf-gallery"
      }, images.slice(0, 5).map(function (image, i) {
        return createElement("div", {
          className: "img ".concat(i === 4 && images.length > 5 ? 'img--last' : ''),
          onClick: function onClick() {
            return _this2.openLightbox(i);
          },
          key: "image-".concat(i)
        }, createElement("img", {
          src: image,
          className: "raf-gallery__image ",
          alt: ""
        }), createElement(Fragment, null, i === 4 && images.length > 5 ? createElement("p", null, images.length - 4, " more") : null)) // </div>
        ;
      }), createElement(Lightbox, {
        backdropClosesModal: true,
        images: this.getImages(images),
        isOpen: this.state.lightboxIsOpen,
        onClickPrev: this.gotoPrevious,
        onClickNext: this.gotoNext,
        onClose: this.closeLightbox,
        currentImage: this.state.currentImage
      })));
    }
  }]);

  return Gallery;
}(Component);

/**
 * Component is described here.
 *
 * @example ./examples/Activity.md
 */
var Activity =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Activity, _React$Component);

  function Activity() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Activity);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Activity)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderHeader", function () {
      var tDateTimeParser = _this.props.tDateTimeParser;
      var actor = userOrDefault(_this.props.activity.actor);
      return React__default.createElement("div", {
        style: {
          padding: '8px 16px'
        }
      }, React__default.createElement(UserBar$1, {
        username: actor.data.name,
        avatar: actor.data.profileImage,
        onClickUser: _this._getOnClickUser(),
        subtitle: _this.props.HeaderRight != null ? humanizeTimestamp(_this.props.activity.time, tDateTimeParser) : undefined,
        timestamp: _this.props.activity.time,
        icon: _this.props.icon,
        Right: _this.props.HeaderRight
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onClickUser", function () {
      var onClickUser = _this.props.onClickUser;

      if (onClickUser) {
        return onClickUser(userOrDefault(_this.props.activity.actor));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderContent", function () {
      var text = _this.props.activity.text;

      if (text === undefined) {
        if (typeof _this.props.activity.object === 'string') {
          text = _this.props.activity.object;
        } else {
          text = '';
        }
      }

      text = text.trim();
      var _this$props$activity$ = _this.props.activity.attachments,
          attachments = _this$props$activity$ === void 0 ? {} : _this$props$activity$;
      return React__default.createElement("div", {
        className: "raf-activity__content"
      }, !!text && React__default.createElement("div", {
        style: {
          padding: '8px 16px'
        }
      }, React__default.createElement("p", null, textRenderer(text, 'raf-activity', _this.props.onClickMention, _this.props.onClickHashtag))), _this.props.activity.verb === 'repost' && _this.props.activity.object instanceof Object && React__default.createElement(Card, _this.props.activity.object.data), attachments && attachments.og && Object.keys(attachments.og).length > 0 && React__default.createElement("div", {
        style: {
          padding: '8px 16px'
        }
      }, attachments.og.videos ? React__default.createElement(Video, {
        og: attachments.og
      }) : attachments.og.audios ? React__default.createElement(Audio, {
        og: attachments.og
      }) : React__default.createElement(Card, attachments.og)), Boolean(_this.props.activity.image) && _this.props.activity.image !== undefined ? React__default.createElement("div", {
        style: {
          padding: '8px 0'
        }
      }, React__default.createElement(Gallery, {
        images: [_this.props.activity.image] // resizeMethod="resize"

      })) : null, attachments.images && Boolean(attachments.images.length) && React__default.createElement("div", {
        style: {
          padding: '8px 0'
        }
      }, React__default.createElement(Gallery, {
        images: attachments.images
      })), attachments.files && Boolean(attachments.files.length) && React__default.createElement("ol", {
        className: "raf-activity__attachments"
      }, attachments.files.map(function (_ref, i) {
        var name = _ref.name,
            url = _ref.url,
            mimeType = _ref.mimeType;
        return React__default.createElement("a", {
          href: sanitizeURL(url),
          download: true,
          key: i
        }, React__default.createElement("li", {
          className: "raf-activity__file"
        }, React__default.createElement(FileIcon, {
          mimeType: mimeType,
          filename: name
        }), " ", name));
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "renderFooter", function () {
      return null;
    });

    return _this;
  }

  _createClass(Activity, [{
    key: "_getOnClickUser",
    value: function _getOnClickUser() {
      return this.props.onClickUser ? this.onClickUser : undefined;
    }
  }, {
    key: "render",
    value: function render() {
      return React__default.createElement("div", {
        className: "raf-activity"
      }, React__default.createElement(React__default.Fragment, null, smartRender(this.props.Header, {}, this.renderHeader), smartRender(this.props.Content, {}, this.renderContent), smartRender(this.props.Footer, {}, this.renderFooter)));
    }
  }]);

  return Activity;
}(React__default.Component);

var Activity$1 = withTranslationContext(Activity);

/**
 *
 * @example ./examples/Link.md
 */
var Link =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, _getPrototypeOf(Link).apply(this, arguments));
  }

  _createClass(Link, [{
    key: "render",
    value: function render() {
      return createElement(Fragment, null, createElement("a", {
        href: this.props.to,
        className: "raf-link",
        onClick: this.props.onClick
      }, this.props.children));
    }
  }]);

  return Link;
}(Component);

/**
 * Component is described here.
 *
 * @example ./examples/NewActivitiesNotification.md
 */
var NewActivitiesNotification =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NewActivitiesNotification, _React$Component);

  function NewActivitiesNotification() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NewActivitiesNotification);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NewActivitiesNotification)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_labelFunction", function () {
      var _this$props = _this.props,
          adds = _this$props.adds,
          deletes = _this$props.deletes,
          labelSingle = _this$props.labelSingle,
          labelPlural = _this$props.labelPlural,
          labelFunction = _this$props.labelFunction,
          t = _this$props.t;
      var addCount = (adds || []).length;
      var deleteCount = (deletes || []).length;
      var count = addCount + deleteCount;

      if (labelFunction) {
        return labelFunction({
          count: count,
          addCount: addCount,
          deleteCount: deleteCount,
          labelSingle: labelSingle,
          labelPlural: labelPlural
        });
      }

      if (addCount === 0) {
        return null;
      }

      var singleNotificationText = '';
      var pluralNotificationText = '';

      if (labelSingle) {
        singleNotificationText = "You have 1 new ".concat(labelSingle);
      } else {
        singleNotificationText = t('You have 1 new notification');
      }

      if (labelPlural) {
        pluralNotificationText = "You have ".concat(addCount, " new ").concat(labelPlural);
      } else {
        pluralNotificationText = t('You have {{ notificationCount }} new notifications', {
          notificationCount: addCount
        });
      }

      return addCount > 1 ? pluralNotificationText : singleNotificationText;
    });

    return _this;
  }

  _createClass(NewActivitiesNotification, [{
    key: "render",
    value: function render() {
      var label = this._labelFunction();

      if (label === null) {
        return null;
      }

      return React__default.createElement("button", {
        className: "raf-new-activities-notification",
        type: "button",
        onClick: this.props.onClick
      }, React__default.createElement(Link, null, label));
    }
  }]);

  return NewActivitiesNotification;
}(React__default.Component);

_defineProperty(NewActivitiesNotification, "defaultProps", {
  adds: [],
  deletes: []
});

var NewActivitiesNotification$1 = withTranslationContext(NewActivitiesNotification);

/**
 *
 * @example ./examples/Button.md
 */
var Button =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _getPrototypeOf(Button).apply(this, arguments));
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          buttonStyle = _this$props.buttonStyle;
      return createElement("button", {
        className: "raf-button".concat(buttonStyle ? ' raf-button--' + buttonStyle : ''),
        onClick: this.props.onClick,
        onKeyPress: this.props.onKeyPress,
        type: this.props.type,
        disabled: this.props.disabled
      }, !this.props.loading ? children : createElement(LoadingIndicator, {
        backgroundColor: "rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.4)"
      }));
    }
  }]);

  return Button;
}(Component);

_defineProperty(Button, "defaultProps", {
  buttonStyle: 'info',
  type: 'button',
  disabled: false,
  loading: false
});

var LoadMoreButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoadMoreButton, _React$Component);

  function LoadMoreButton() {
    _classCallCheck(this, LoadMoreButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoadMoreButton).apply(this, arguments));
  }

  _createClass(LoadMoreButton, [{
    key: "render",
    value: function render() {
      var t = this.props.t;
      return createElement("div", {
        className: "raf-load-more-button"
      }, createElement(Button, {
        onClick: this.props.onClick,
        buttonStyle: "info",
        disabled: this.props.refreshing,
        loading: this.props.refreshing
      }, this.props.children ? this.props.children : t('Load more')));
    }
  }]);

  return LoadMoreButton;
}(Component);

var LoadMoreButton$1 = withTranslationContext(LoadMoreButton);

var LoadMorePaginator =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoadMorePaginator, _React$Component);

  function LoadMorePaginator() {
    _classCallCheck(this, LoadMorePaginator);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoadMorePaginator).apply(this, arguments));
  }

  _createClass(LoadMorePaginator, [{
    key: "render",
    value: function render() {
      return createElement(Fragment, null, !this.props.reverse && this.props.children, this.props.hasNextPage ? smartRender(this.props.LoadMoreButton, {
        refreshing: this.props.refreshing,
        onClick: this.props.loadNextPage
      }) : null, this.props.reverse && this.props.children);
    }
  }]);

  return LoadMorePaginator;
}(Component);

_defineProperty(LoadMorePaginator, "defaultProps", {
  LoadMoreButton: LoadMoreButton$1
});

var FeedPlaceholder =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FeedPlaceholder, _React$Component);

  function FeedPlaceholder() {
    _classCallCheck(this, FeedPlaceholder);

    return _possibleConstructorReturn(this, _getPrototypeOf(FeedPlaceholder).apply(this, arguments));
  }

  _createClass(FeedPlaceholder, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          t = _this$props.t,
          text = _this$props.text;
      return React__default.createElement("div", {
        className: "raf-feed-placeholder"
      }, React__default.createElement("p", null, text || t('No data to display...')));
    }
  }]);

  return FeedPlaceholder;
}(React__default.Component);

var FeedPlaceholder$1 = withTranslationContext(FeedPlaceholder);

/**
 * Renders a feed of activities, this component is a StreamApp consumer
 * and must always be a child of the `<StreamApp>` element
 * @example ./examples/FlatFeed.md
 */
var FlatFeed =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FlatFeed, _React$Component);

  function FlatFeed() {
    _classCallCheck(this, FlatFeed);

    return _possibleConstructorReturn(this, _getPrototypeOf(FlatFeed).apply(this, arguments));
  }

  _createClass(FlatFeed, [{
    key: "render",
    value: function render() {
      var _this = this;

      return createElement(Feed, {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
        options: this.props.options,
        notify: this.props.notify,
        doFeedRequest: this.props.doFeedRequest,
        doActivityDeleteRequest: this.props.doActivityDeleteRequest,
        doReactionAddRequest: this.props.doReactionAddRequest,
        doReactionDeleteRequest: this.props.doReactionDeleteRequest,
        doChildReactionAddRequest: this.props.doChildReactionAddRequest,
        doChildReactionDeleteRequest: this.props.doChildReactionDeleteRequest,
        doReactionsFilterRequest: this.props.doReactionsFilterRequest
      }, createElement(FeedContext.Consumer, null, function (feedCtx) {
        return createElement(FlatFeedInner, _extends({}, _this.props, feedCtx));
      }));
    }
  }]);

  return FlatFeed;
}(Component);

_defineProperty(FlatFeed, "defaultProps", {
  feedGroup: 'timeline',
  notify: false,
  Activity: Activity$1,
  Notifier: function Notifier(props) {
    return createElement(NewActivitiesNotification$1, _extends({
      labelPlural: "activities",
      labelSingle: "activity"
    }, props));
  },
  Placeholder: FeedPlaceholder$1,
  Paginator: LoadMorePaginator,
  LoadingIndicator: LoadingIndicator
});

var FlatFeedInner =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(FlatFeedInner, _React$Component2);

  function FlatFeedInner() {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, FlatFeedInner);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FlatFeedInner)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_this2), "listRef", createRef());

    _defineProperty(_assertThisInitialized(_this2), "_refresh",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var ref;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this2.props.refresh(_this2.props.options);

            case 2:
              ref = _this2.listRef;

              if (ref && ref.current) {
                ref.current.scrollToOffset({
                  offset: 0
                });
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this2), "_renderWrappedActivity", function (_ref2) {
      var item = _ref2.item;
      return createElement(ImmutableItemWrapper, {
        renderItem: _this2._renderActivity,
        item: item,
        feedGroup: _this2.props.feedGroup,
        userId: _this2.props.userId,
        key: item.get('id')
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "_childProps", function () {
      return {
        onToggleReaction: _this2.props.onToggleReaction,
        onAddReaction: _this2.props.onAddReaction,
        onRemoveReaction: _this2.props.onRemoveReaction,
        onToggleChildReaction: _this2.props.onToggleChildReaction,
        onAddChildReaction: _this2.props.onAddChildReaction,
        onRemoveChildReaction: _this2.props.onRemoveChildReaction,
        onRemoveActivity: _this2.props.onRemoveActivity,
        feedGroup: _this2.props.feedGroup,
        userId: _this2.props.userId
      };
    });

    _defineProperty(_assertThisInitialized(_this2), "_renderActivity", function (item) {
      var args = _objectSpread({
        activity: item
      }, _this2._childProps());

      return smartRender(_this2.props.Activity, _objectSpread({}, args));
    });

    return _this2;
  }

  _createClass(FlatFeedInner, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._refresh();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var notifierProps = {
        adds: this.props.realtimeAdds,
        deletes: this.props.realtimeDeletes,
        onClick: this._refresh,
        labelFunction: undefined
      };
      var _this$props = this.props,
          loadNextPage = _this$props.loadNextPage,
          hasNextPage = _this$props.hasNextPage,
          refreshing = _this$props.refreshing,
          hasDoneRequest = _this$props.hasDoneRequest,
          loadReverseNextPage = _this$props.loadReverseNextPage,
          hasReverseNextPage = _this$props.hasReverseNextPage,
          t = _this$props.t;

      if (hasReverseNextPage) {
        notifierProps.onClick = loadReverseNextPage;

        notifierProps.labelFunction = function () {
          return t('Load activities');
        };
      }

      if (this.props.activities.size === 0 && this.props.hasDoneRequest) {
        return createElement(Fragment, null, smartRender(this.props.Notifier, notifierProps), smartRender(this.props.Placeholder));
      }

      if (refreshing && !hasDoneRequest) {
        return createElement("div", {
          className: "raf-loading-indicator"
        }, smartRender(this.props.LoadingIndicator, {}));
      }

      return createElement(Fragment, null, smartRender(this.props.Notifier, notifierProps), smartRender(this.props.Paginator, {
        loadNextPage: loadNextPage,
        hasNextPage: hasNextPage,
        refreshing: refreshing,
        children: this.props.activityOrder.map(function (id) {
          return _this3._renderWrappedActivity({
            item: _this3.props.activities.get(id)
          });
        })
      }));
    }
  }]);

  return FlatFeedInner;
}(Component);

var ImmutableItemWrapper =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ImmutableItemWrapper, _React$PureComponent);

  function ImmutableItemWrapper() {
    _classCallCheck(this, ImmutableItemWrapper);

    return _possibleConstructorReturn(this, _getPrototypeOf(ImmutableItemWrapper).apply(this, arguments));
  }

  _createClass(ImmutableItemWrapper, [{
    key: "render",
    value: function render() {
      return this.props.renderItem(this.props.item.toJS());
    }
  }]);

  return ImmutableItemWrapper;
}(PureComponent);

var FlatFeed$1 = withTranslationContext(FlatFeed);

/**
 * Component is described here.
 *
 * @example ./examples/AvatarGroup.md
 */
var AvatarGroup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AvatarGroup, _React$Component);

  function AvatarGroup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AvatarGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AvatarGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClickUser", function (e, user) {
      var onClickUser = _this.props.onClickUser;

      if (onClickUser) {
        e.stopPropagation();
        return onClickUser(userOrDefault(user));
      }
    });

    return _this;
  }

  _createClass(AvatarGroup, [{
    key: "_getOnClickUser",
    value: function _getOnClickUser(user) {
      var _this2 = this;

      return this.props.onClickUser ? function (e) {
        return _this2.onClickUser(e, user);
      } : undefined;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React__default.createElement("div", {
        className: "raf-avatar-group"
      }, this.props.users && this.props.users.slice(0, this.props.limit).map(function (user, i) {
        return React__default.createElement("div", {
          className: "raf-avatar-group__avatar",
          key: "avatar-".concat(i)
        }, React__default.createElement(Avatar, {
          onClick: _this3._getOnClickUser(user),
          image: user && user.data.profileImage,
          size: _this3.props.avatarSize,
          circle: true
        }));
      }));
    }
  }]);

  return AvatarGroup;
}(React__default.Component);

_defineProperty(AvatarGroup, "defaultProps", {
  avatarSize: 30,
  limit: 5
});

/**
 * Component is described here.
 *
 * @example ./examples/AttachedActivity.md
 */
var AttachedActivity =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AttachedActivity, _React$Component);

  function AttachedActivity() {
    _classCallCheck(this, AttachedActivity);

    return _possibleConstructorReturn(this, _getPrototypeOf(AttachedActivity).apply(this, arguments));
  }

  _createClass(AttachedActivity, [{
    key: "render",
    value: function render() {
      var activity = this.props.activity;
      var images = activity.attachments !== undefined && activity.attachments.images !== undefined ? activity.attachments.images : [];
      var actor = userOrDefault(activity.actor);

      if (activity.verb === 'repost' || activity.verb === 'post' || activity.verb === 'comment') {
        return React__default.createElement("div", {
          className: "raf-attached-activity"
        }, images.length === 0 && React__default.createElement(React__default.Fragment, null, React__default.createElement("p", {
          className: "raf-attached-activity__author"
        }, React__default.createElement("strong", null, actor.data.name)), React__default.createElement("p", {
          className: "raf-attached-activity__content"
        }, activity.object)), images.length > 0 && React__default.createElement("div", {
          className: "raf-attached-activity__images"
        }, images.slice(0, 5).map(function (image, i) {
          return React__default.createElement(Thumbnail, {
            image: image,
            size: 50,
            key: "image-".concat(i)
          });
        })));
      }

      return null;
    }
  }]);

  return AttachedActivity;
}(React__default.Component);

/**
 * Simple wrapper for a small dropdown.
 *
 * @example ./examples/Dropdown.md
 */
var Dropdown =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown(props) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "dropdownBox", void 0);

    _defineProperty(_assertThisInitialized(_this), "hideMenu", function (e) {
      // $FlowFixMe
      if (!_this.dropdownBox.current.contains(e.target)) {
        _this.setState({
          open: false
        }, function () {
          document.removeEventListener('click', _this.hideMenu);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "showMenu", function (e) {
      e.stopPropagation();

      _this.setState({
        open: true
      }, function () {
        document.addEventListener('click', _this.hideMenu);
      });
    });

    _this.showMenu = _this.showMenu.bind(_assertThisInitialized(_this));
    _this.hideMenu = _this.hideMenu.bind(_assertThisInitialized(_this));
    _this.dropdownBox = createRef();
    _this.state = {
      open: false
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // $FlowFixMe
      document.removeEventListener('click', this.hideMenu);
    } // $FlowFixMe

  }, {
    key: "render",
    value: function render() {
      return createElement("div", {
        className: "raf-dropdown"
      }, createElement(IconButton, {
        onClick: this.showMenu
      }, createElement("svg", {
        className: "raf-dropdown__button",
        width: "12",
        height: "8",
        viewBox: "0 0 12 8",
        xmlns: "http://www.w3.org/2000/svg"
      }, createElement("path", {
        d: "M1.41 0L6 4.77 10.59 0 12 1.469l-6 6.25-6-6.25z",
        fill: "#A0B2B8",
        fillRule: "evenodd"
      }))), this.state.open && createElement("div", {
        className: "raf-dropdown__box",
        ref: this.dropdownBox
      }, this.props.children));
    }
  }]);

  return Dropdown;
}(Component);

/**
 * Component is described here.
 *
 * @example ./examples/Notification.md
 */
var Notification =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Notification, _React$Component);

  function Notification() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Notification);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Notification)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getUsers", function (activities) {
      return activities.map(function (item) {
        return userOrDefault(item.actor);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClickUser", function (e, actor) {
      var onClickUser = _this.props.onClickUser;

      if (onClickUser) {
        e.stopPropagation();
        return onClickUser(userOrDefault(actor));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClickNotification", function (e) {
      var onClickNotification = _this.props.onClickNotification;

      if (onClickNotification) {
        e.stopPropagation();
        return onClickNotification(_this.props.activityGroup);
      }
    });

    return _this;
  }

  _createClass(Notification, [{
    key: "_getOnClickUser",
    value: function _getOnClickUser(actor) {
      var _this2 = this;

      return this.props.onClickUser ? function (e) {
        return _this2.onClickUser(e, actor);
      } : undefined;
    }
  }, {
    key: "_getOnClickNotification",
    value: function _getOnClickNotification() {
      return this.props.onClickNotification ? this.onClickNotification : undefined;
    }
  }, {
    key: "render",
    value: function render() {
      var headerText, headerSubtext;
      var _this$props = this.props,
          activityGroup = _this$props.activityGroup,
          onMarkAsRead = _this$props.onMarkAsRead,
          t = _this$props.t,
          tDateTimeParser = _this$props.tDateTimeParser;
      var activities = activityGroup.activities;
      var latestActivity = activities[0];
      var lastActor = userOrDefault(latestActivity.actor);

      if (typeof latestActivity.object === 'string') {
        return null;
      }

      if (activities.length === 1) {
        switch (latestActivity.verb) {
          case 'like':
            headerText = t('{{ actorName }} liked your {{ activityVerb }}', {
              actorName: lastActor.data.name,
              activityVerb: latestActivity.object.verb
            });
            break;

          case 'repost':
            headerText = t('{{ actorName }} reposted your {{ activityVerb }}', {
              actorName: lastActor.data.name,
              activityVerb: latestActivity.object.verb
            });
            break;

          case 'follow':
            headerText = t('{{ actorName }} followed you', {
              actorName: lastActor.data.name
            });
            break;

          case 'comment':
            headerText = t('{{ actorName }} commented on your {{ activityVerb }}', {
              actorName: lastActor.data.name,
              activityVerb: latestActivity.object.verb
            });
            break;

          default:
            console.warn('No notification styling found for your verb, please create your own custom Notification group.');
        }
      } else if (activities.length > 1 && activities.length < 1 + 1 + 1) {
        switch (latestActivity.verb) {
          case 'like':
            headerText = t('{{ actorName }} and 1 other liked your {{ activityVerb }}', {
              actorName: lastActor.data.name,
              activityVerb: latestActivity.object.verb
            });
            break;

          case 'repost':
            headerText = t('{{ actorName }} and 1 other reposted your {{ activityVerb }}', {
              actorName: lastActor.data.name,
              activityVerb: latestActivity.object.verb
            });
            break;

          case 'follow':
            headerText = t('{{ actorName }} and 1 other followed you', {
              actorName: lastActor.data.name
            });
            break;

          case 'comment':
            headerText = t('{{ actorName }} and 1 other commented on your {{ activityVerb }}', {
              actorName: lastActor.data.name,
              activityVerb: latestActivity.object.verb
            });
            break;

          default:
            console.warn('No notification styling found for your verb, please create your own custom Notification group.');
        }
      } else {
        switch (latestActivity.verb) {
          case 'like':
            headerText = t('{{ actorName }} and {{ countOtherActors }} others liked your {{ activityVerb }}', {
              actorName: lastActor.data.name,
              activityVerb: latestActivity.object.verb
            });
            break;

          case 'repost':
            headerText = t('{{ actorName }} and {{ countOtherActors }} others reposted your {{ activityVerb }}', {
              actorName: lastActor.data.name,
              activityVerb: latestActivity.object.verb
            });
            break;

          case 'follow':
            headerText = t('{{ actorName }} and {{ countOtherActors }} others followed you', {
              actorName: lastActor.data.name
            });
            break;

          case 'comment':
            headerText = t('{{ actorName }} and {{ countOtherActors }} others commented on your {{ activityVerb }}', {
              actorName: lastActor.data.name,
              activityVerb: latestActivity.object.verb
            });
            break;

          default:
            console.warn('No notification styling found for your verb, please create your own custom Notification group.');
        }
      }

      return React__default.createElement("div", {
        onClick: this._getOnClickNotification(),
        className: 'raf-notification' + (activityGroup.is_read ? ' raf-notification--read' : '')
      }, React__default.createElement(Avatar, {
        onClick: this._getOnClickUser(lastActor),
        image: lastActor.data.profileImage,
        circle: true,
        size: 30
      }), React__default.createElement("div", {
        className: "raf-notification__content"
      }, React__default.createElement("div", {
        className: "raf-notification__header"
      }, React__default.createElement("strong", null, headerText), " ", headerSubtext, !activityGroup.is_read && onMarkAsRead && React__default.createElement(Dropdown, null, React__default.createElement("div", null, React__default.createElement(Link, {
        onClick: function onClick(e) {
          e.stopPropagation();
          onMarkAsRead(activityGroup);
        }
      }, "Mark\xA0as\xA0read")))), React__default.createElement("div", null, React__default.createElement("small", null, humanizeTimestamp(latestActivity.time, tDateTimeParser))), latestActivity.verb !== 'follow' ? React__default.createElement(AttachedActivity, {
        activity: latestActivity.object
      }) : null), React__default.createElement("div", {
        className: "raf-notification__extra"
      }, activities.length > 1 && latestActivity.verb === 'follow' ? React__default.createElement(AvatarGroup, {
        onClickUser: this.props.onClickUser,
        avatarSize: 30,
        users: this.getUsers(activities.slice(1, activities.length))
      }) : null));
    }
  }]);

  return Notification;
}(React__default.Component);

var Notification$1 = withTranslationContext(Notification);

/**
 * Renders a notificationfeed, this component is a StreamApp consumer and must
 * always be a child of the `<StreamApp>` element.
 * @example ./examples/NotificationFeed.md
 */
var NotificationFeed =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NotificationFeed, _React$Component);

  function NotificationFeed() {
    _classCallCheck(this, NotificationFeed);

    return _possibleConstructorReturn(this, _getPrototypeOf(NotificationFeed).apply(this, arguments));
  }

  _createClass(NotificationFeed, [{
    key: "render",
    value: function render() {
      var _this = this;

      return createElement(Feed, {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
        options: makeDefaultOptions(this.props.options),
        notify: this.props.notify,
        doFeedRequest: this.props.doFeedRequest,
        doActivityDeleteRequest: this.props.doActivityDeleteRequest,
        doReactionAddRequest: this.props.doReactionAddRequest,
        doReactionDeleteRequest: this.props.doReactionDeleteRequest,
        doChildReactionAddRequest: this.props.doChildReactionAddRequest,
        doChildReactionDeleteRequest: this.props.doChildReactionDeleteRequest
      }, createElement(FeedContext.Consumer, null, function (feedCtx) {
        return createElement(NotificationFeedInner, _extends({}, _this.props, feedCtx));
      }));
    }
  }]);

  return NotificationFeed;
}(Component);

_defineProperty(NotificationFeed, "defaultProps", {
  feedGroup: 'notification',
  Group: Notification$1,
  notify: false,
  Notifier: NewActivitiesNotification$1,
  Paginator: LoadMorePaginator,
  Placeholder: FeedPlaceholder$1
});

var makeDefaultOptions = function makeDefaultOptions(options) {
  var copy = _objectSpread({}, options);

  if (copy.mark_seen === undefined) {
    copy.mark_seen = true;
  }

  return copy;
};

var NotificationFeedInner =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(NotificationFeedInner, _React$Component2);

  function NotificationFeedInner() {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, NotificationFeedInner);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NotificationFeedInner)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_this2), "listRef", createRef());

    _defineProperty(_assertThisInitialized(_this2), "_refresh",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var ref;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this2.props.refresh(makeDefaultOptions(_this2.props.options));

            case 2:
              ref = _this2.listRef;

              if (ref && ref.current) {
                ref.current.scrollToOffset({
                  offset: 0
                });
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this2), "_renderWrappedGroup", function (_ref2) {
      var item = _ref2.item;
      return createElement(ImmutableItemWrapper$1, {
        renderItem: _this2._renderGroup,
        item: item,
        feedGroup: _this2.props.feedGroup,
        userId: _this2.props.userId,
        key: item.get('id')
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "_renderGroup", function (item) {
      var args = {
        activityGroup: item,
        feedGroup: _this2.props.feedGroup,
        userId: _this2.props.userId,
        onToggleReaction: _this2.props.onToggleReaction,
        onAddReaction: _this2.props.onAddReaction,
        onRemoveReaction: _this2.props.onRemoveReaction,
        onToggleChildReaction: _this2.props.onToggleChildReaction,
        onAddChildReaction: _this2.props.onAddChildReaction,
        onRemoveChildReaction: _this2.props.onRemoveChildReaction,
        onRemoveActivity: _this2.props.onRemoveActivity,
        onMarkAsRead: _this2.props.onMarkAsRead,
        onMarkAsSeen: _this2.props.onMarkAsSeen
      };
      return smartRender(_this2.props.Group, args);
    });

    return _this2;
  }

  _createClass(NotificationFeedInner, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._refresh();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.activities.clear();
      this.props.activityOrder.splice(0, this.props.activityOrder.length);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var notifierProps = {
        adds: this.props.realtimeAdds,
        deletes: this.props.realtimeDeletes,
        onClick: this._refresh
      };
      var _this$props = this.props,
          loadNextPage = _this$props.loadNextPage,
          hasNextPage = _this$props.hasNextPage,
          refreshing = _this$props.refreshing,
          hasDoneRequest = _this$props.hasDoneRequest;

      if (this.props.activities.size === 0 && hasDoneRequest) {
        return createElement(Fragment, null, smartRender(this.props.Notifier, notifierProps), smartRender(this.props.Placeholder));
      }

      if (refreshing && !hasDoneRequest) {
        return createElement("div", {
          style: {
            padding: 40,
            backgroundColor: 'rgb(247, 247, 247'
          }
        }, createElement(LoadingIndicator, null));
      }

      return createElement(Fragment, null, smartRender(this.props.Notifier, notifierProps), smartRender(this.props.Paginator, {
        loadNextPage: loadNextPage,
        hasNextPage: hasNextPage,
        refreshing: refreshing,
        children: this.props.activityOrder.map(function (id) {
          return _this3._renderWrappedGroup({
            item: _this3.props.activities.get(id)
          });
        })
      }));
    }
  }]);

  return NotificationFeedInner;
}(Component);

var ImmutableItemWrapper$1 =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ImmutableItemWrapper, _React$PureComponent);

  function ImmutableItemWrapper() {
    _classCallCheck(this, ImmutableItemWrapper);

    return _possibleConstructorReturn(this, _getPrototypeOf(ImmutableItemWrapper).apply(this, arguments));
  }

  _createClass(ImmutableItemWrapper, [{
    key: "render",
    value: function render() {
      return this.props.renderItem(this.props.item.toJS());
    }
  }]);

  return ImmutableItemWrapper;
}(PureComponent);

/**
 * Shows the detail of a single activity
 * @example ./examples/SinglePost.md
 */
var SinglePost =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SinglePost, _React$Component);

  function SinglePost() {
    _classCallCheck(this, SinglePost);

    return _possibleConstructorReturn(this, _getPrototypeOf(SinglePost).apply(this, arguments));
  }

  _createClass(SinglePost, [{
    key: "render",
    value: function render() {
      var _this = this;

      return React__default.createElement(React__default.Fragment, null, React__default.createElement(FlatFeed$1, {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
        options: _objectSpread({
          withRecentReactions: true
        }, this.props.options),
        analyticsLocation: this.props.analyticsLocation,
        Activity: this.props.Activity,
        doFeedRequest: function doFeedRequest(client, feedGroup, userId, options) {
          return client.feed(feedGroup, userId).getActivityDetail(_this.props.activityId, options);
        },
        doActivityDeleteRequest: this.props.doActivityDeleteRequest,
        doReactionAddRequest: this.props.doReactionAddRequest,
        doReactionDeleteRequest: this.props.doReactionDeleteRequest,
        doChildReactionAddRequest: this.props.doChildReactionAddRequest,
        doChildReactionDeleteRequest: this.props.doChildReactionDeleteRequest,
        doReactionsFilterRequest: this.props.doReactionsFilterRequest
      }));
    }
  }]);

  return SinglePost;
}(React__default.Component);

/**
 * Simple Components that renders a panel. To be combined with PanelHeader, PanelContent, PanelFooter. Used by the library to render the B2BActivity and StatusUpdateForm
 *
 * @example ./examples/Panel.md
 */
var Panel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Panel, _React$Component);

  function Panel() {
    _classCallCheck(this, Panel);

    return _possibleConstructorReturn(this, _getPrototypeOf(Panel).apply(this, arguments));
  }

  _createClass(Panel, [{
    key: "render",
    value: function render() {
      return createElement("div", {
        className: "raf-panel raf-panel--".concat(this.props.panelStyle)
      }, this.props.children);
    }
  }]);

  return Panel;
}(Component);

_defineProperty(Panel, "defaultProps", {
  panelStyle: 'rounded'
});

var PanelHeading =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PanelHeading, _React$Component);

  function PanelHeading() {
    _classCallCheck(this, PanelHeading);

    return _possibleConstructorReturn(this, _getPrototypeOf(PanelHeading).apply(this, arguments));
  }

  _createClass(PanelHeading, [{
    key: "render",
    value: function render() {
      return createElement("div", {
        className: "raf-panel-header"
      }, this.props.children);
    }
  }]);

  return PanelHeading;
}(Component);

var PanelFooter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PanelFooter, _React$Component);

  function PanelFooter() {
    _classCallCheck(this, PanelFooter);

    return _possibleConstructorReturn(this, _getPrototypeOf(PanelFooter).apply(this, arguments));
  }

  _createClass(PanelFooter, [{
    key: "render",
    value: function render() {
      return React__default.createElement("div", {
        className: "raf-panel-footer"
      }, this.props.children);
    }
  }]);

  return PanelFooter;
}(React__default.Component);

var PanelContent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PanelContent, _React$Component);

  function PanelContent() {
    _classCallCheck(this, PanelContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(PanelContent).apply(this, arguments));
  }

  _createClass(PanelContent, [{
    key: "render",
    value: function render() {
      return React__default.createElement("div", {
        className: "raf-panel-content"
      }, this.props.children);
    }
  }]);

  return PanelContent;
}(React__default.Component);

var AutocompleteItem = function AutocompleteItem(_ref) {
  var _ref$entity = _ref.entity,
      id = _ref$entity.id,
      _native = _ref$entity["native"];
  return createElement("div", null, _native, " ", id);
};
/**
 * Component is described here.
 *
 * @example ./examples/Textarea.md
 */


var Textarea =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Textarea, _React$Component);

  function Textarea() {
    _classCallCheck(this, Textarea);

    return _possibleConstructorReturn(this, _getPrototypeOf(Textarea).apply(this, arguments));
  }

  _createClass(Textarea, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          innerRef = _this$props.innerRef,
          trigger = _this$props.trigger;
      return createElement(ReactTextareaAutocomplete, {
        loadingComponent: LoadingIndicator,
        trigger: _objectSpread({
          ':': {
            dataProvider: function dataProvider(token) {
              var emojis = emojiIndex.search(token) || [];
              return emojis.slice(0, 10);
            },
            component: AutocompleteItem,
            output: function output(item) {
              return {
                key: item.id,
                text: item["native"],
                caretPosition: 'next'
              };
            }
          }
        }, trigger),
        innerRef: innerRef && function (el) {
          if (typeof innerRef === 'function') {
            innerRef(el);
          } else if (_this.props.innerRef != null) {
            innerRef.current = el;
          }
        },
        rows: this.props.rows,
        maxLength: this.props.maxLength,
        className: "raf-textarea__textarea",
        containerClassName: "raf-textarea",
        dropdownClassName: "raf-emojisearch",
        listClassName: "raf-emojisearch__list",
        itemClassName: "raf-emojisearch__item",
        placeholder: this.props.placeholder,
        onChange: this.props.onChange,
        onSelect: this.props.onChange,
        onPaste: this.props.onPaste,
        value: this.props.value
      });
    }
  }]);

  return Textarea;
}(Component);

_defineProperty(Textarea, "defaultProps", {
  rows: 3,
  placeholder: 'Share your opinion',
  trigger: {}
});

/**
 * Component is described here.
 *
 * @example ./examples/EmojiPicker.md
 */
var EmojiPicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EmojiPicker, _React$Component);

  function EmojiPicker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EmojiPicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EmojiPicker)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "emojiPicker", React__default.createRef());

    _defineProperty(_assertThisInitialized(_this), "state", {
      open: false
    });

    _defineProperty(_assertThisInitialized(_this), "hideMenu", function (e) {
      var current = _this.emojiPicker.current;

      if (current && !current.contains(e.target)) {
        _this.setState({
          open: false
        }, function () {
          document.removeEventListener('click', _this.hideMenu);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "showMenu", function (e) {
      e.preventDefault();

      _this.setState({
        open: true
      }, function () {
        document.addEventListener('click', _this.hideMenu);
      });
    });

    return _this;
  }

  _createClass(EmojiPicker, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.hideMenu);
    }
  }, {
    key: "render",
    value: function render() {
      var t = this.props.t;
      return React__default.createElement("div", {
        className: "raf-emoji-picker"
      }, ' ', this.state.open && React__default.createElement("div", {
        className: "raf-emoji-picker__container",
        ref: this.emojiPicker
      }, React__default.createElement(Picker, {
        emoji: "point_up",
        title: t('Pick your emoji'),
        onSelect: this.props.onSelect
      })), React__default.createElement("div", {
        role: "button",
        onClick: this.showMenu,
        className: "raf-emoji-picker__button"
      }, React__default.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 20 20",
        xmlns: "http://www.w3.org/2000/svg"
      }, React__default.createElement("path", {
        d: "M10 15.498c2.33 0 4.304-1.456 5.106-3.5H4.892c.802 2.044 2.777 3.5 5.107 3.5zm-3.5-6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-3.5 9a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm-.006-18C4.467-.002 0 4.475 0 9.998s4.468 10 9.995 10c5.526 0 10.005-4.477 10.005-10s-4.479-10-10.005-10z",
        fill: "#A0B2B8",
        fillRule: "nonzero"
      }))));
    }
  }]);

  return EmojiPicker;
}(React__default.Component);

var EmojiPicker$1 = withTranslationContext(EmojiPicker);

/**
 * Component is described here.
 *
 * @example ./examples/Title.md
 */
var Title =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Title, _React$Component);

  function Title() {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, _getPrototypeOf(Title).apply(this, arguments));
  }

  _createClass(Title, [{
    key: "render",
    value: function render() {
      return createElement("div", {
        className: "raf-title",
        style: {
          fontSize: this.props.size
        }
      }, this.props.children);
    }
  }]);

  return Title;
}(Component);

_defineProperty(Title, "defaultProps", {
  size: 18
});

/**
 * Component is described here.
 *
 * @example ./examples/StatusUpdateForm.md
 */
var StatusUpdateForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StatusUpdateForm, _React$Component);

  function StatusUpdateForm() {
    _classCallCheck(this, StatusUpdateForm);

    return _possibleConstructorReturn(this, _getPrototypeOf(StatusUpdateForm).apply(this, arguments));
  }

  _createClass(StatusUpdateForm, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          t = _this$props.t,
          Header = _this$props.Header;
      var HeaderComponent = Header ? Header : createElement(Title, null, t('New Post'));

      var forwardedProps = _objectSpread({}, this.props, {
        Header: HeaderComponent
      });

      return createElement(StreamApp.Consumer, null, function (appCtx) {
        return createElement(StatusUpdateFormInner, _extends({}, forwardedProps, appCtx));
      });
    }
  }]);

  return StatusUpdateForm;
}(Component);

_defineProperty(StatusUpdateForm, "defaultProps", {
  feedGroup: 'user',
  activityVerb: 'post',
  modifyActivityData: function modifyActivityData(d) {
    return d;
  }
});

var StatusUpdateFormInner =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(StatusUpdateFormInner, _React$Component2);

  function StatusUpdateFormInner(props) {
    var _this;

    _classCallCheck(this, StatusUpdateFormInner);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StatusUpdateFormInner).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_handleOgDebounced", void 0);

    _defineProperty(_assertThisInitialized(_this), "textInputRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "attachTextInputRef", function (el) {
      _this.textInputRef.current = el;

      if (typeof _this.props.innerRef === 'function') {
        _this.props.innerRef(el);
      } else if (_this.props.innerRef != null) {
        _this.props.innerRef.current = el;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      text: '',
      imageUploads: {},
      imageOrder: [],
      fileUploads: {},
      fileOrder: [],
      ogUrlOrder: [],
      ogStateByUrl: {},
      ogActiveUrl: null,
      submitting: false
    });

    _defineProperty(_assertThisInitialized(_this), "_dismissOg", function (og) {
      if (og && og.url != null) {
        _this.setState(function (prevState) {
          var ogStateByUrl = prevState.ogStateByUrl;

          for (var url in ogStateByUrl) {
            ogStateByUrl[url].dismissed = true;
          }

          return {
            ogActiveUrl: null,
            ogStateByUrl: ogStateByUrl
          };
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_text", function () {
      return _this.state.text.trim();
    });

    _defineProperty(_assertThisInitialized(_this), "_object", function () {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this._orderedImages()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var image = _step.value;

          if (image.url) {
            return image.url;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _this._text();
    });

    _defineProperty(_assertThisInitialized(_this), "_orderedImages", function () {
      return _this.state.imageOrder.map(function (id) {
        return _this.state.imageUploads[id];
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_uploadedImages", function () {
      return _this._orderedImages().filter(function (upload) {
        return upload.url;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_orderedFiles", function () {
      return _this.state.fileOrder.map(function (id) {
        return _this.state.fileUploads[id];
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_uploadedFiles", function () {
      return _this._orderedFiles().filter(function (upload) {
        return upload.url;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_orderedOgStates", function () {
      return _this.state.ogUrlOrder.map(function (url) {
        return _this.state.ogStateByUrl[url];
      }).filter(Boolean);
    });

    _defineProperty(_assertThisInitialized(_this), "_isOgScraping", function () {
      return _this._orderedOgStates().some(function (state) {
        return state.scrapingActive;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_availableOg", function () {
      return _this._orderedOgStates().map(function (state) {
        return state.data;
      }).filter(Boolean);
    });

    _defineProperty(_assertThisInitialized(_this), "_activeOg", function () {
      var ogActiveUrl = _this.state.ogActiveUrl;

      if (ogActiveUrl) {
        return _this.state.ogStateByUrl[ogActiveUrl].data;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_canSubmit", function () {
      return Boolean(_this._object()) && _this._orderedImages().every(function (upload) {
        return upload.state !== 'uploading';
      }) && _this._orderedFiles().every(function (upload) {
        return upload.state !== 'uploading';
      }) && !_this._isOgScraping() && !_this.state.submitting;
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmitForm",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(e) {
        var response;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();

                _this.setState({
                  submitting: true
                });

                _context.prev = 2;
                _context.next = 5;
                return _this.addActivity();

              case 5:
                response = _context.sent;
                _context.next = 13;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](2);

                _this.setState({
                  submitting: false
                });

                _this.props.errorHandler(_context.t0, 'add-activity', {
                  feedGroup: _this.props.feedGroup,
                  userId: _this.props.userId
                });

                return _context.abrupt("return");

              case 13:
                _this.setState({
                  text: '',
                  imageUploads: {},
                  imageOrder: [],
                  fileUploads: {},
                  fileOrder: [],
                  ogUrlOrder: [],
                  ogStateByUrl: {},
                  ogActiveUrl: null,
                  submitting: false
                });

                if (_this.props.onSuccess) {
                  _this.props.onSuccess(response);
                }

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 8]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_getTextAreaElement", function () {
      return _this.textInputRef.current;
    });

    _defineProperty(_assertThisInitialized(_this), "_onSelectEmoji", function (emoji) {
      return _this._insertText(emoji["native"]);
    });

    _defineProperty(_assertThisInitialized(_this), "_insertText",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(insertedText) {
        var newCursorPosition, textareaElement;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.setState(function (prevState) {
                  var prevText = prevState.text;

                  var textareaElement = _this._getTextAreaElement();

                  if (!textareaElement) {
                    return {
                      text: prevText + insertedText
                    };
                  } // Insert emoji at previous cursor position


                  var selectionStart = textareaElement.selectionStart,
                      selectionEnd = textareaElement.selectionEnd;
                  newCursorPosition = selectionStart + insertedText.length;
                  return {
                    text: prevText.slice(0, selectionStart) + insertedText + prevText.slice(selectionEnd)
                  };
                });

              case 2:
                textareaElement = _this._getTextAreaElement();

                if (!(!textareaElement || newCursorPosition == null)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return");

              case 5:
                // Update cursorPosition
                textareaElement.selectionStart = newCursorPosition;
                textareaElement.selectionEnd = newCursorPosition;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_uploadNewFiles", function (files) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var file = _step2.value;

          if (file.type.startsWith('image/')) {
            _this._uploadNewImage(file);
          } else if (file instanceof File) {
            _this._uploadNewFile(file);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_uploadNewImage",
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(file) {
        var id, reader;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = generateRandomId();
                _context3.next = 3;
                return _this.setState(function (prevState) {
                  prevState.imageUploads[id] = {
                    id: id,
                    file: file,
                    state: 'uploading'
                  };
                  return {
                    imageOrder: prevState.imageOrder.concat(id),
                    imageUploads: prevState.imageUploads
                  };
                });

              case 3:
                if (FileReader) {
                  // TODO: Possibly use URL.createObjectURL instead. However, then we need
                  // to release the previews when not used anymore though.
                  reader = new FileReader();

                  reader.onload = function (event) {
                    _this.setState(function (prevState) {
                      prevState.imageUploads[id].previewUri = event.target.result;
                      return {
                        imageUploads: prevState.imageUploads
                      };
                    });
                  };

                  reader.readAsDataURL(file);
                }

                return _context3.abrupt("return", _this._uploadImage(id));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_uploadNewFile",
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee4(file) {
        var id;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = generateRandomId();
                _context4.next = 3;
                return _this.setState(function (prevState) {
                  prevState.fileUploads[id] = {
                    id: id,
                    file: file,
                    state: 'uploading'
                  };
                  return {
                    fileOrder: prevState.fileOrder.concat(id),
                    fileUploads: prevState.fileUploads
                  };
                });

              case 3:
                return _context4.abrupt("return", _this._uploadFile(id));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_uploadImage",
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee5(id) {
        var img, file, response, alreadyRemoved;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                img = _this.state.imageUploads[id];

                if (img) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return");

              case 3:
                file = img.file;
                _context5.next = 6;
                return _this.setState(function (prevState) {
                  prevState.imageUploads[id].state = 'uploading';
                  return {
                    imageUploads: prevState.imageUploads
                  };
                });

              case 6:
                response = {};
                response = {};
                _context5.prev = 8;
                _context5.next = 11;
                return _this.props.client.images.upload(file);

              case 11:
                response = _context5.sent;
                _context5.next = 22;
                break;

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5["catch"](8);
                console.warn(_context5.t0);
                alreadyRemoved = false;
                _context5.next = 20;
                return _this.setState(function (prevState) {
                  var image = prevState.imageUploads[id];

                  if (!image) {
                    alreadyRemoved = true;
                    return {};
                  }

                  image.state = 'failed';
                  return {
                    imageUploads: prevState.imageUploads
                  };
                });

              case 20:
                if (!alreadyRemoved) {
                  _this.props.errorHandler(_context5.t0, 'upload-image', {
                    feedGroup: _this.props.feedGroup,
                    userId: _this.props.userId
                  });
                }

                return _context5.abrupt("return");

              case 22:
                _context5.next = 24;
                return _this.setState(function (prevState) {
                  img.state = 'finished';
                  img.url = response.file;
                  return {
                    imageUploads: prevState.imageUploads
                  };
                });

              case 24:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[8, 14]]);
      }));

      return function (_x5) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_uploadFile",
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee6(id) {
        var upload, file, response;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                upload = _this.state.fileUploads[id];

                if (upload) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return");

              case 3:
                file = upload.file;
                _context6.next = 6;
                return _this.setState(function (prevState) {
                  prevState.fileUploads[id].state = 'uploading';
                  return {
                    fileUploads: prevState.fileUploads
                  };
                });

              case 6:
                response = {};
                response = {};
                _context6.prev = 8;
                _context6.next = 11;
                return _this.props.client.files.upload(file);

              case 11:
                response = _context6.sent;
                _context6.next = 21;
                break;

              case 14:
                _context6.prev = 14;
                _context6.t0 = _context6["catch"](8);
                console.warn(_context6.t0);
                _context6.next = 19;
                return _this.setState(function (prevState) {
                  if (prevState.fileUploads[id]) {
                    prevState.fileUploads[id].state = 'failed';
                    return {
                      fileUploads: prevState.fileUploads
                    };
                  }

                  return {};
                });

              case 19:
                _this.props.errorHandler(_context6.t0, 'upload-image', {
                  feedGroup: _this.props.feedGroup,
                  userId: _this.props.userId
                });

                return _context6.abrupt("return");

              case 21:
                _context6.next = 23;
                return _this.setState(function (prevState) {
                  if (prevState.fileUploads[id]) {
                    prevState.fileUploads[id].state = 'finished';
                    prevState.fileUploads[id].url = response.file;
                    return {
                      fileUploads: prevState.fileUploads
                    };
                  }

                  return {};
                });

              case 23:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[8, 14]]);
      }));

      return function (_x6) {
        return _ref6.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_removeImage", function (id) {
      // TODO: cancel upload if still uploading
      _this.setState(function (prevState) {
        var img = prevState.imageUploads[id];

        if (!img) {
          return {};
        }

        delete prevState.imageUploads[id];
        return {
          imageUploads: prevState.imageUploads,
          imageOrder: prevState.imageOrder.filter(function (_id) {
            return id !== _id;
          })
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_removeFile", function (id) {
      // TODO: cancel upload if still uploading
      _this.setState(function (prevState) {
        var upload = prevState.fileUploads[id];

        if (!upload) {
          return {};
        }

        delete prevState.fileUploads[id];
        return {
          fileUploads: prevState.fileUploads,
          fileOrder: prevState.fileOrder.filter(function (_id) {
            return id !== _id;
          })
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onChange", function (event) {
      var text = inputValueFromEvent(event);

      if (text == null) {
        return;
      }

      _this.setState({
        text: text
      });

      _this._handleOgDebounced(text);
    });

    _this._handleOgDebounced = _debounce(_this.handleOG, 250, {
      leading: true,
      trailing: true
    });
    return _this;
  }

  _createClass(StatusUpdateFormInner, [{
    key: "handleOG",
    value: function handleOG(text) {
      var _this2 = this;

      var newUrls;
      var removedUrls;
      var urlInfos = anchorme(text, {
        list: true,
        exclude: function exclude(info) {
          return info.protocol !== 'https://' && info.protocol !== 'http://';
        }
      });

      var urls = _uniq(urlInfos.map(function (info) {
        return info.protocol + info.encoded;
      }));

      this.setState(function (prevState) {
        var oldUrls = prevState.ogUrlOrder;
        newUrls = _difference(urls, oldUrls);
        removedUrls = _difference(oldUrls, urls);
        var newState = {
          ogUrlOrder: urls
        };

        if (!_includes(urls, prevState.ogActiveUrl)) {
          // !urls.includes(prevState.ogActiveUrl) replaced with lodash
          newState.ogActiveUrl = null;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = urls[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var url = _step3.value;
              var ogState = prevState.ogStateByUrl[url];

              if (ogState && ogState.data && !ogState.dismissed) {
                newState.ogActiveUrl = url;
                break;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = removedUrls[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _url = _step4.value;
            delete prevState.ogStateByUrl[_url];
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = newUrls[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _url2 = _step5.value;
            prevState.ogStateByUrl[_url2] = {
              scrapingActive: true,
              dismissed: false
            };
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        newState.ogStateByUrl = prevState.ogStateByUrl;
        return newState;
      }, function () {
        newUrls.forEach(
        /*#__PURE__*/
        function () {
          var _ref7 = _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee7(url) {
            var resp;
            return _regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.prev = 0;
                    _context7.next = 3;
                    return _this2.props.client.og(url);

                  case 3:
                    resp = _context7.sent;
                    _context7.next = 11;
                    break;

                  case 6:
                    _context7.prev = 6;
                    _context7.t0 = _context7["catch"](0);
                    console.warn(_context7.t0);

                    _this2.setState(function (prevState) {
                      prevState.ogStateByUrl[url] = {
                        scrapingActive: false,
                        dismissed: false
                      };
                      return {
                        ogStateByUrl: prevState.ogStateByUrl
                      };
                    });

                    return _context7.abrupt("return");

                  case 11:
                    resp.url = url;

                    _this2.setState(function (prevState) {
                      prevState.ogStateByUrl[url] = {
                        scrapingActive: false,
                        data: resp,
                        dismissed: false
                      };
                      var newState = {
                        ogStateByUrl: prevState.ogStateByUrl
                      };

                      if (!prevState.ogActiveUrl) {
                        newState.ogActiveUrl = url;
                      }

                      return newState;
                    });

                  case 13:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, null, [[0, 6]]);
          }));

          return function (_x7) {
            return _ref7.apply(this, arguments);
          };
        }());
      });
    }
  }, {
    key: "addActivity",
    value: function () {
      var _addActivity = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee8() {
        var activity, uploadedImages, uploadedFiles, attachments, modifiedActivity;
        return _regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                activity = {
                  actor: this.props.client.currentUser,
                  verb: this.props.activityVerb,
                  object: this._object()
                };
                uploadedImages = this._uploadedImages();
                uploadedFiles = this._uploadedFiles();
                attachments = {
                  og: this._activeOg()
                };

                if (uploadedImages) {
                  attachments.images = uploadedImages.map(function (image) {
                    return image.url;
                  }).filter(Boolean);
                  activity.text = this._text();
                }

                if (uploadedFiles) {
                  attachments.files = uploadedFiles.map(function (upload) {
                    return {
                      // url will never actually be empty string because _uploadedFiles
                      // filters those out.
                      url: upload.url || '',
                      name: upload.file.name,
                      mimeType: upload.file.type
                    };
                  });
                }

                if (Object.keys(attachments).length > 0) {
                  activity.attachments = attachments;
                }

                modifiedActivity = this.props.modifyActivityData(activity);

                if (!this.props.doRequest) {
                  _context8.next = 14;
                  break;
                }

                _context8.next = 11;
                return this.props.doRequest(modifiedActivity);

              case 11:
                return _context8.abrupt("return", _context8.sent);

              case 14:
                _context8.next = 16;
                return this.props.client.feed(this.props.feedGroup, this.props.userId).addActivity(modifiedActivity);

              case 16:
                return _context8.abrupt("return", _context8.sent);

              case 17:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function addActivity() {
        return _addActivity.apply(this, arguments);
      }

      return addActivity;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var t = this.props.t;

      var activeOg = this._activeOg();

      var availableOg = this._availableOg();

      var userData = this.props.user.data || {};
      return createElement(Panel, null, createElement("form", {
        onSubmit: this.onSubmitForm
      }, createElement(ImageDropzone, {
        handleFiles: this._uploadNewFiles
      }, createElement(PanelHeading, null, this.props.Header), createElement(PanelContent, null, createElement("div", {
        style: {
          display: 'flex'
        }
      }, createElement(Fragment, null, userData.profileImage && createElement("div", {
        style: {
          marginRight: '16px'
        }
      }, createElement(Avatar, {
        image: // $FlowFixMe
        userData.profileImage || 'https://placehold.it/100x100',
        size: 50,
        circle: true
      }))), createElement(Textarea, {
        innerRef: this.textInputRef,
        placeholder: t('Type your post...'),
        value: this.state.text,
        onChange: this._onChange,
        trigger: this.props.trigger,
        onPaste:
        /*#__PURE__*/
        function () {
          var _ref8 = _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee9(event) {
            var items, plainTextPromise, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _loop, _iterator6, _step6, _ret, fileLikes, s;

            return _regeneratorRuntime.wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    items = event.clipboardData.items;

                    if (dataTransferItemsHaveFiles(items)) {
                      _context9.next = 3;
                      break;
                    }

                    return _context9.abrupt("return");

                  case 3:
                    event.preventDefault(); // Get a promise for the plain text in case no files are
                    // found. This needs to be done here because chrome cleans
                    // up the DataTransferItems after resolving of a promise.

                    _iteratorNormalCompletion6 = true;
                    _didIteratorError6 = false;
                    _iteratorError6 = undefined;
                    _context9.prev = 7;

                    _loop = function _loop() {
                      var item = _step6.value;

                      if (item.kind === 'string' && item.type === 'text/plain') {
                        plainTextPromise = new Promise(function (resolve) {
                          item.getAsString(function (s) {
                            resolve(s);
                          });
                        });
                        return "break";
                      }
                    };

                    _iterator6 = items[Symbol.iterator]();

                  case 10:
                    if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                      _context9.next = 17;
                      break;
                    }

                    _ret = _loop();

                    if (!(_ret === "break")) {
                      _context9.next = 14;
                      break;
                    }

                    return _context9.abrupt("break", 17);

                  case 14:
                    _iteratorNormalCompletion6 = true;
                    _context9.next = 10;
                    break;

                  case 17:
                    _context9.next = 23;
                    break;

                  case 19:
                    _context9.prev = 19;
                    _context9.t0 = _context9["catch"](7);
                    _didIteratorError6 = true;
                    _iteratorError6 = _context9.t0;

                  case 23:
                    _context9.prev = 23;
                    _context9.prev = 24;

                    if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                      _iterator6["return"]();
                    }

                  case 26:
                    _context9.prev = 26;

                    if (!_didIteratorError6) {
                      _context9.next = 29;
                      break;
                    }

                    throw _iteratorError6;

                  case 29:
                    return _context9.finish(26);

                  case 30:
                    return _context9.finish(23);

                  case 31:
                    _context9.next = 33;
                    return dataTransferItemsToFiles(items);

                  case 33:
                    fileLikes = _context9.sent;

                    if (!fileLikes.length) {
                      _context9.next = 37;
                      break;
                    }

                    _this3._uploadNewFiles(fileLikes);

                    return _context9.abrupt("return");

                  case 37:
                    if (!plainTextPromise) {
                      _context9.next = 42;
                      break;
                    }

                    _context9.next = 40;
                    return plainTextPromise;

                  case 40:
                    s = _context9.sent;

                    _this3._insertText(s);

                  case 42:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9, null, [[7, 19, 23, 31], [24,, 26, 30]]);
          }));

          return function (_x8) {
            return _ref8.apply(this, arguments);
          };
        }()
      })), this._isOgScraping() && createElement("div", {
        className: "raf-status-update-form__og-loading"
      }, createElement(LoadingIndicator, null), " Getting website data..."), activeOg && createElement("div", {
        style: {
          margin: '8px 0'
        }
      }, !activeOg.videos && !activeOg.audios ? createElement(Card, _extends({}, activeOg, {
        nolink: true,
        handleClose: function handleClose(e) {
          e.preventDefault();

          _this3._dismissOg(activeOg);
        }
      })) : createElement(Fragment, null, activeOg.videos ? createElement(Video, {
        og: activeOg,
        handleClose: function handleClose(e) {
          e.preventDefault();

          _this3._dismissOg(activeOg);
        }
      }) : null, activeOg.audios ? createElement(Audio, {
        og: activeOg,
        handleClose: function handleClose(e) {
          e.preventDefault();

          _this3._dismissOg(activeOg);
        }
      }) : null)), availableOg && availableOg.length > 1 && createElement(Fragment, null, createElement("ol", {
        className: "raf-status-update-form__url-list"
      }, availableOg.map(function (_ref9) {
        var url = _ref9.url,
            title = _ref9.title;
        return createElement("li", {
          className: "raf-status-update-form__url-list-item".concat(url === _this3.state.ogActiveUrl ? ' raf-status-update-form__url-list-item--active' : ''),
          onClick: function onClick() {
            return _this3.setState(function (prevState) {
              var ogState = prevState.ogStateByUrl[url];

              if (ogState) {
                ogState.dismissed = false;
              }

              return {
                ogActiveUrl: url,
                ogStateByUrl: prevState.ogStateByUrl
              };
            });
          },
          key: url
        }, createElement(FontAwesomeIcon, {
          icon: faBookmark
        }), ' ', title !== undefined ? title : url);
      }))), this.state.imageOrder.length > 0 && createElement(ImagePreviewer, {
        imageUploads: this.state.imageOrder.map(function (id) {
          return _this3.state.imageUploads[id];
        }),
        handleRemove: this._removeImage,
        handleRetry: this._uploadImage,
        handleFiles: this._uploadNewFiles
      }), this.state.fileOrder.length > 0 && createElement(FilePreviewer, {
        uploads: this.state.fileOrder.map(function (id) {
          return _this3.state.fileUploads[id];
        }),
        handleRemove: this._removeFile,
        handleRetry: this._uploadFile,
        handleFiles: this._uploadNewFiles
      })), createElement(PanelFooter, null, createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      }, createElement("div", {
        style: {
          flex: 1
        }
      }, createElement("div", {
        style: {
          marginRight: '32px',
          display: 'inline-block'
        }
      }, createElement(ImageUploadButton, {
        handleFiles: this._uploadNewFiles,
        multiple: true
      })), createElement("div", {
        style: {
          marginRight: '32px',
          display: 'inline-block'
        }
      }, createElement(FileUploadButton, {
        handleFiles: this._uploadNewFiles,
        multiple: true
      })), createElement(EmojiPicker$1, {
        onSelect: this._onSelectEmoji
      }), this.props.FooterItem), createElement(Button, {
        type: "submit",
        buttonStyle: "primary",
        loading: this.state.submitting,
        disabled: !this._canSubmit()
      }, t('Post')))))));
    }
  }]);

  return StatusUpdateFormInner;
}(Component);

var StatusUpdateForm$1 = withTranslationContext(StatusUpdateForm);

/**
 *
 * @example ./examples/IconBadge.md
 */
var IconBadge =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IconBadge, _React$Component);

  function IconBadge() {
    _classCallCheck(this, IconBadge);

    return _possibleConstructorReturn(this, _getPrototypeOf(IconBadge).apply(this, arguments));
  }

  _createClass(IconBadge, [{
    key: "render",
    value: function render() {
      return createElement("div", {
        className: "raf-icon-badge",
        role: "button",
        onClick: this.props.onClick
      }, this.props.children ? this.props.children : createElement("svg", {
        width: "17",
        height: "20",
        viewBox: "0 0 17 20",
        xmlns: "http://www.w3.org/2000/svg"
      }, createElement("path", {
        d: "M8.5 20c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6.5-6V8.5c0-3.07-2.13-5.64-5-6.32V1.5C10 .67 9.33 0 8.5 0S7 .67 7 1.5v.68c-2.87.68-5 3.25-5 6.32V14l-2 2v1h17v-1l-2-2zm-2 1H4V8.5C4 6.01 6.01 4 8.5 4S13 6.01 13 8.5V15z" // fill="#414D54"
        ,
        fillRule: "evenodd"
      })), !this.props.hidden && this.props.unseen > 0 ? createElement("div", {
        className: "raf-icon-badge__badge"
      }, this.props.showNumber ? createElement("p", null, this.props.unseen) : null) : null);
    }
  }]);

  return IconBadge;
}(Component);

/**
 * `DropdownPanel` is a more advanced component used to create a notification dropdown for instance, it comes with three parts: `Header`, `Content` and `Footer`. The content has a limited height and the `overflow` is set to `scroll`.
 *
 * @example ./examples/DropdownPanel.md
 */
var DropdownPanel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DropdownPanel, _React$Component);

  function DropdownPanel() {
    _classCallCheck(this, DropdownPanel);

    return _possibleConstructorReturn(this, _getPrototypeOf(DropdownPanel).apply(this, arguments));
  }

  _createClass(DropdownPanel, [{
    key: "render",
    value: function render() {
      return createElement("div", {
        className: "raf-dropdown-panel ".concat(this.props.arrow ? ' raf-dropdown-panel--arrow' : '', " ").concat(this.props.right ? ' raf-dropdown-panel--right raf-dropdown-panel--arrow-right' : 'raf-dropdown-panel--left raf-dropdown-panel--arrow-left')
      }, this.props.Header != null && createElement("div", {
        className: "raf-dropdown-panel__header"
      }, smartRender(this.props.Header, {}, null)), createElement("div", {
        className: "raf-dropdown-panel__content"
      }, this.props.children), this.props.Footer != null && createElement("div", {
        className: "raf-dropdown-panel__footer"
      }, smartRender(this.props.Footer, {}, null)));
    }
  }]);

  return DropdownPanel;
}(Component);

_defineProperty(DropdownPanel, "defaultProps", {
  arrow: false,
  left: true,
  right: false
});

/**
 * IMPORTANT: Changing most of the props below doesn't result in the desired
 * effect. These settings related to feed management should be changed in the
 * `sharedFeeds` prop of the [`StreamApp`](#streamapp) component.
 * @example ./examples/NotificationDropdown.md
 */
var NotificationDropdown =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NotificationDropdown, _React$Component);

  function NotificationDropdown() {
    _classCallCheck(this, NotificationDropdown);

    return _possibleConstructorReturn(this, _getPrototypeOf(NotificationDropdown).apply(this, arguments));
  }

  _createClass(NotificationDropdown, [{
    key: "render",
    value: function render() {
      var _this = this;

      return createElement(Feed, {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
        options: makeDefaultOptions$1({
          mark_seen: false
        }),
        doFeedRequest: this.props.doFeedRequest
      }, createElement(FeedContext.Consumer, null, function (feedCtx) {
        return createElement(NotificationDropdownInner, _extends({}, _this.props, feedCtx));
      }));
    }
  }]);

  return NotificationDropdown;
}(Component);

_defineProperty(NotificationDropdown, "defaultProps", {
  feedGroup: 'notification',
  Group: Notification$1,
  notify: true,
  Notifier: NewActivitiesNotification$1,
  Paginator: LoadMorePaginator,
  Placeholder: FeedPlaceholder$1,
  width: 475
});

var NotificationDropdownInner =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(NotificationDropdownInner, _React$Component2);

  function NotificationDropdownInner(props) {
    var _this2;

    _classCallCheck(this, NotificationDropdownInner);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(NotificationDropdownInner).call(this, props));

    _defineProperty(_assertThisInitialized(_this2), "dropdownRef", void 0);

    _defineProperty(_assertThisInitialized(_this2), "_refresh",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this2.props.refresh(makeDefaultOptions$1(_this2.props.options));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this2), "openDropdown", function () {
      _this2.setState({
        open: true
      }, function () {
        //$FlowFixMe
        document.addEventListener('click', _this2.closeDropdown, false);
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "closeDropdown", function (e) {
      if (_this2.dropdownRef.current !== null && !_this2.dropdownRef.current.contains(e.target)) {
        _this2.setState({
          open: false
        }, function () {
          //$FlowFixMe
          document.removeEventListener('click', _this2.closeDropdown, false);
        });
      }
    });

    _this2.state = {
      open: false
    };
    _this2.dropdownRef = createRef();
    return _this2;
  }

  _createClass(NotificationDropdownInner, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.refreshUnreadUnseen();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      //$FlowFixMe
      document.removeEventListener('click', this.closeDropdown, false);
    }
  }, {
    key: "render",
    value: function render() {
      return createElement("div", {
        style: {
          position: 'relative',
          display: 'inline-block'
        }
      }, createElement(IconBadge, {
        unseen: this.props.unseen,
        onClick: this.openDropdown,
        showNumber: true,
        hidden: !this.props.notify
      }, this.props.Icon && smartRender(this.props.Icon, {}, null)), createElement("div", {
        ref: this.dropdownRef,
        style: {
          position: 'absolute',
          left: this.props.right ? '' : '-22px',
          right: this.props.right ? -29 : 0,
          top: 35,
          width: '100vw',
          maxWidth: this.props.width,
          zIndex: 9999,
          visibility: this.state.open ? 'visible' : 'hidden',
          transform: this.state.open ? 'translateY(0px)' : 'translateY(10px)',
          opacity: this.state.open ? '1' : '0',
          transition: 'all .2s ease-out'
        }
      }, this.state.open && createElement(DropdownPanel, {
        arrow: true,
        right: this.props.right,
        Header: this.props.Header,
        Footer: this.props.Footer
      }, createElement(NotificationFeed, {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
        options: this.props.options,
        Group: this.props.Group,
        notify: this.props.notify,
        Notifier: this.props.Notifier,
        Paginator: this.props.Paginator,
        Placeholder: this.props.Placeholder,
        doFeedRequest: this.props.doFeedRequest,
        doActivityDeleteRequest: this.props.doActivityDeleteRequest,
        doReactionAddRequest: this.props.doReactionAddRequest,
        doReactionDeleteRequest: this.props.doReactionDeleteRequest,
        doChildReactionAddRequest: this.props.doChildReactionAddRequest,
        doChildReactionDeleteRequest: this.props.doChildReactionDeleteRequest,
        analyticsLocation: this.props.analyticsLocation
      }))));
    }
  }]);

  return NotificationDropdownInner;
}(Component);

var makeDefaultOptions$1 = function makeDefaultOptions(options) {
  var copy = _objectSpread({}, options);

  if (copy.mark_seen === undefined) {
    copy.mark_seen = true;
  }

  return copy;
};

var InfiniteScroll =
/*#__PURE__*/
function (_Component) {
  _inherits(InfiniteScroll, _Component);

  function InfiniteScroll(props) {
    var _this;

    _classCallCheck(this, InfiniteScroll);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InfiniteScroll).call(this, props));
    _this.scrollListener = _this.scrollListener.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(InfiniteScroll, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.pageLoaded = this.props.pageStart;
      this.attachScrollListener();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.attachScrollListener();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.detachScrollListener();
      this.detachMousewheelListener();
    } // Set a defaut loader for all your `InfiniteScroll` components

  }, {
    key: "setDefaultLoader",
    value: function setDefaultLoader(loader) {
      this.defaultLoader = loader;
    }
  }, {
    key: "detachMousewheelListener",
    value: function detachMousewheelListener() {
      var scrollEl = window;

      if (this.props.useWindow === false) {
        scrollEl = this.scrollComponent.parentNode;
      }

      scrollEl.removeEventListener('mousewheel', this.mousewheelListener, this.props.useCapture);
    }
  }, {
    key: "detachScrollListener",
    value: function detachScrollListener() {
      var scrollEl = window;

      if (this.props.useWindow === false && this.props.getScrollParent) {
        scrollEl = this.props.getScrollParent().current;
      } else if (this.props.useWindow === false) {
        scrollEl = this.getParentElement(this.scrollComponent);
      }

      scrollEl.removeEventListener('scroll', this.scrollListener, this.props.useCapture);
      scrollEl.removeEventListener('resize', this.scrollListener, this.props.useCapture);
    }
  }, {
    key: "getParentElement",
    value: function getParentElement(el) {
      return el && el.parentNode;
    }
  }, {
    key: "filterProps",
    value: function filterProps(props) {
      return props;
    }
  }, {
    key: "attachScrollListener",
    value: function attachScrollListener() {
      if (!this.props.hasMore || this.props.isLoading || !this.getParentElement(this.scrollComponent)) {
        return;
      }

      var scrollEl = window;

      if (this.props.useWindow === false && this.props.getScrollParent) {
        scrollEl = this.props.getScrollParent().current;
      } else if (this.props.useWindow === false) {
        scrollEl = this.getParentElement(this.scrollComponent);
      }

      scrollEl.addEventListener('mousewheel', this.mousewheelListener, this.props.useCapture);
      scrollEl.addEventListener('scroll', this.scrollListener, this.props.useCapture);
      scrollEl.addEventListener('resize', this.scrollListener, this.props.useCapture);

      if (this.props.initialLoad) {
        this.scrollListener();
      }
    }
  }, {
    key: "mousewheelListener",
    value: function mousewheelListener(e) {
      // Prevents Chrome hangups
      // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
      if (e.deltaY === 1) {
        e.preventDefault();
      }
    }
  }, {
    key: "scrollListener",
    value: function scrollListener() {
      var el = this.scrollComponent;
      var scrollEl = window;
      var parentNode = this.getParentElement(el);
      var offset;

      if (this.props.useWindow) {
        var doc = document.documentElement || document.body.parentNode || document.body;
        var scrollTop = scrollEl.pageYOffset !== undefined ? scrollEl.pageYOffset : doc.scrollTop;

        if (this.props.isReverse) {
          offset = scrollTop;
        } else {
          offset = this.calculateOffset(el, scrollTop);
        }
      } else if (this.props.isReverse) {
        offset = parentNode.scrollTop;
      } else {
        offset = el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
      } // Here we make sure the element is visible as well as checking the offset


      if (offset < Number(this.props.threshold) && el && el.offsetParent !== null) {
        this.detachScrollListener(); // Call loadMore after detachScrollListener to allow for non-async loadMore functions

        if (typeof this.props.loadMore === 'function') {
          this.props.loadMore(this.pageLoaded += 1);
        }
      }
    }
  }, {
    key: "calculateOffset",
    value: function calculateOffset(el, scrollTop) {
      if (!el) {
        return 0;
      }

      return this.calculateTopPosition(el) + (el.offsetHeight - scrollTop - window.innerHeight);
    }
  }, {
    key: "calculateTopPosition",
    value: function calculateTopPosition(el) {
      if (!el) {
        return 0;
      }

      return el.offsetTop + this.calculateTopPosition(el.offsetParent);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var renderProps = this.filterProps(this.props);

      var children = renderProps.children,
          element = renderProps.element,
          hasMore = renderProps.hasMore,
          initialLoad = renderProps.initialLoad,
          isReverse = renderProps.isReverse,
          loader = renderProps.loader,
          loadMore = renderProps.loadMore,
          pageStart = renderProps.pageStart,
          ref = renderProps.ref,
          threshold = renderProps.threshold,
          useCapture = renderProps.useCapture,
          useWindow = renderProps.useWindow,
          isLoading = renderProps.isLoading,
          props = _objectWithoutProperties(renderProps, ["children", "element", "hasMore", "initialLoad", "isReverse", "loader", "loadMore", "pageStart", "ref", "threshold", "useCapture", "useWindow", "isLoading"]);

      delete props.getScrollParent;

      props.ref = function (node) {
        _this2.scrollComponent = node;

        if (ref) {
          ref(node);
        }
      };

      var childrenArray = [children];

      if (isLoading) {
        if (loader) {
          isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
        } else if (this.defaultLoader) {
          isReverse ? childrenArray.unshift(this.defaultLoader) : childrenArray.push(this.defaultLoader);
        }
      }

      return React__default.createElement(element, props, childrenArray);
    }
  }]);

  return InfiniteScroll;
}(Component);

_defineProperty(InfiniteScroll, "propTypes", {
  children: PropTypes.node.isRequired,
  element: PropTypes.node,
  hasMore: PropTypes.bool,
  initialLoad: PropTypes.bool,
  isReverse: PropTypes.bool,
  loader: PropTypes.node,
  loadMore: PropTypes.func.isRequired,
  getScrollParent: PropTypes.func,
  pageStart: PropTypes.number,
  ref: PropTypes.func,
  threshold: PropTypes.number,
  useCapture: PropTypes.bool,
  useWindow: PropTypes.bool
});

_defineProperty(InfiniteScroll, "defaultProps", {
  element: 'div',
  hasMore: false,
  initialLoad: true,
  pageStart: 0,
  ref: null,
  threshold: 250,
  useWindow: true,
  isReverse: false,
  useCapture: false,
  loader: null
});

var InfiniteScrollPaginator =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InfiniteScrollPaginator, _React$Component);

  function InfiniteScrollPaginator() {
    _classCallCheck(this, InfiniteScrollPaginator);

    return _possibleConstructorReturn(this, _getPrototypeOf(InfiniteScrollPaginator).apply(this, arguments));
  }

  _createClass(InfiniteScrollPaginator, [{
    key: "render",
    value: function render() {
      return createElement(InfiniteScroll, {
        loadMore: this.props.loadNextPage,
        hasMore: this.props.hasNextPage,
        isLoading: this.props.refreshing,
        isReverse: this.props.reverse,
        threshold: this.props.threshold,
        getScrollParent: this.props.getScrollParent,
        useWindow: this.props.useWindow,
        loader: createElement(Fragment, {
          key: "loading-indicator"
        }, smartRender(this.props.Loader))
      }, this.props.children);
    }
  }]);

  return InfiniteScrollPaginator;
}(Component);

_defineProperty(InfiniteScrollPaginator, "defaultProps", {
  Loader: createElement(LoadingIndicator, null),
  threshold: 250,
  useWindow: true
});

/**
 * Component is described here.
 *
 * @example ./examples/ReactionIcon.md
 */
var ReactionIcon =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactionIcon, _React$Component);

  function ReactionIcon() {
    _classCallCheck(this, ReactionIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReactionIcon).apply(this, arguments));
  }

  _createClass(ReactionIcon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          counts = _this$props.counts,
          kind = _this$props.kind,
          height = _this$props.height,
          width = _this$props.width,
          labelSingle = _this$props.labelSingle,
          labelPlural = _this$props.labelPlural,
          onPress = _this$props.onPress,
          icon = _this$props.icon,
          t = _this$props.t;
      var count = null;

      if (counts && kind) {
        count = counts[kind] || 0;
      }

      if (!count) count = 0;
      var label;

      if (labelSingle && labelPlural) {
        label = count === 1 ? "1 ".concat(labelSingle) : "".concat(count, " ").concat(labelPlural);
      }

      if (!labelSingle || !labelPlural) {
        switch (kind) {
          case 'like':
            label = count === 1 ? t('1 like') : t('{{ countLikes }} likes', {
              countLikes: count
            });
            break;

          case 'repost':
            label = count === 1 ? t('1 repost') : t('{{ countReposts }} reposts', {
              countReposts: count
            });
            break;

          case 'comment':
            label = count === 1 ? t('1 comment') : t('{{ countComments }} comments', {
              countComments: count
            });
            break;

          default:
            break;
        }
      }

      return createElement("div", {
        className: "raf-reaction-icon",
        onClick: onPress
      }, icon ? createElement("img", {
        className: "raf-reaction-icon__image",
        src: icon,
        alt: ""
      }) : null, count != null ? createElement("p", {
        className: "raf-reaction-icon__label"
      }, label) : null);
    }
  }]);

  return ReactionIcon;
}(Component);

var ReactionIcon$1 = withTranslationContext(ReactionIcon);

/**
 * A generic component that can be used to toggle a reaction and display it's
 * current state. Mostly used for reactions such as like and repost.
 * The [source for
 * LikeButton](https://github.com/GetStream/react-activity-feed/blob/master/src/components/LikeButton.js)
 * is a good example of the usage of this component.
 *
 * @example ./examples/ReactionToggleIcon.md
 */
var ReactionToggleIcon =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactionToggleIcon, _React$Component);

  function ReactionToggleIcon() {
    _classCallCheck(this, ReactionToggleIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReactionToggleIcon).apply(this, arguments));
  }

  _createClass(ReactionToggleIcon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          inactiveIcon = _this$props.inactiveIcon,
          activeIcon = _this$props.activeIcon,
          own_reactions = _this$props.own_reactions,
          kind = _this$props.kind,
          restProps = _objectWithoutProperties(_this$props, ["inactiveIcon", "activeIcon", "own_reactions", "kind"]);

      var icon = inactiveIcon;

      if (own_reactions && own_reactions[kind] && own_reactions[kind].length) {
        icon = activeIcon;
      }

      return React__default.createElement("div", {
        className: "raf-reaction-toggle-icon"
      }, React__default.createElement(ReactionIcon$1, _extends({
        icon: icon,
        kind: kind
      }, restProps)));
    }
  }]);

  return ReactionToggleIcon;
}(React__default.Component);

var likebuttonActive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAARCAYAAAA/mJfHAAAAAXNSR0IArs4c6QAAAUxJREFUOBGtk89Kw0AQxudLi4Zmo1ARPIgtnvoAPfoCevZPn0LoG9QX8OBBvHtpohcP4s2zIsUHEMR4EPEgWGqFVDPORhaibGPFLCQzu/PNb3YzG6IJhxfct1UQdfLkyAuamAqjdWYKiRllB82XzVrPxLK2nJ3YfD+MVpKEDyWWFv4gR9l0es0ZF9Dr/vFDQ3Z0Iq6b6gCeUpXr1Le8xsLmw6eF5D0+Y+aqyQPzzfPaXN/Mf1orTEBqyG+nIq5/SwBZv5XRWBugulHIxBtGlGtBMQj7g61aG173jo34tVVP4V4QjaRzvzbH5Gk7PePPWo/5V5D0Od5erQ7ssGzJCXww3XaApBAYEy50zUJgJWlAUbDLfmvpqhiYU9rTID3+d0zQY2N58egLNQ4GDI0gz8plPeg1MTIa685kcYc0UH5s60NIAJy7bmXXgLT9BOn0XD2NtcXgAAAAAElFTkSuQmCC";

var likebuttonInactive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAARCAYAAAA/mJfHAAAAAXNSR0IArs4c6QAAAUpJREFUOBGtk7FKA0EQhmeWLQSDiWKhnaVYH8TCUoiKptLKFPcKeQN9gRQpgmVUsDgrcwQ9BK9VRHwAwdpaJGACO85EllxkXS4kA8fMzv7z3ewsC5DT2p2kfh4nJz45+jbtHkMOOY6ICEFhEO5XXuxe1qvswhVfxPdbBHA5BLFAGSy4dJLzwq7iZN2AuQGiOREjIim98Cqxy/6FRd10pU90y6ClUSG91fY2P0fr8cgJi9K00DPfXZaujckJnLOyGucF8MBl2EdW5PMM6BNgK6xW6tju3PF8fy2s7gzhDBswTNt8Hq91qeg85qQg6e54t/zlhOXpJKshxHe+aTMTGN/4o8BnAtOgWwKbaMhS8Nf4eE+1g+1nyU/dGQI17Q+mgyF8bKwuX/thCD0r8HkEPAuCYGA1zs4UqFNgoDxs18fFhkEPpcX5hgWJ/wEycGS98JuJ8gAAAABJRU5ErkJggg==";

/**
 * Like button ready to be embedded as Activity footer
 * @example ./examples/LikeButton.md
 */
var LikeButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LikeButton, _React$Component);

  function LikeButton() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LikeButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LikeButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_onPress", function () {
      var _this$props = _this.props,
          activity = _this$props.activity,
          reaction = _this$props.reaction,
          onToggleReaction = _this$props.onToggleReaction,
          onToggleChildReaction = _this$props.onToggleChildReaction;

      if (reaction && onToggleChildReaction) {
        return onToggleChildReaction('like', reaction, {}, {});
      }

      return onToggleReaction('like', activity, {}, {});
    });

    return _this;
  }

  _createClass(LikeButton, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          activity = _this$props2.activity,
          reaction = _this$props2.reaction;
      var counts, own_reactions;

      if (reaction && this.props.onToggleChildReaction) {
        counts = reaction.children_counts;
        own_reactions = reaction.own_children;
      } else {
        if (reaction) {
          console.warn('reaction is passed to the LikeButton but ' + 'onToggleChildReaction is not, falling back to liking the activity');
        }

        counts = activity.reaction_counts;
        own_reactions = activity.own_reactions;
      }

      return createElement(ReactionToggleIcon, {
        counts: counts,
        own_reactions: own_reactions,
        kind: "like",
        onPress: this._onPress,
        activeIcon: likebuttonActive,
        inactiveIcon: likebuttonInactive,
        labelSingle: "like",
        labelPlural: "likes"
      });
    }
  }]);

  return LikeButton;
}(Component);

var repostButtonActive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAKlJREFUOBHdk8ENgzAMRTHqDXaArdptoNvAVrBDe071I/3oFwkhxzdysS0nz9+J0zSVq1/3WY+2Gnj8lNKksGoQiirMqKJbtkTfa83sHVKkBR8awP++xqLymNOYHUDN5znMIUWEoEA1SCEhENoB4IYLr8aXQ3t/l60j7+29gADByHsB3J9BUQhgFoXwJ5TWKLHW5n+lqljBC8yKMKUYee/h0/1Qdpq8SPwAJWhChOoqSnsAAAAASUVORK5CYII=";

var repostButtonInactive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAKlJREFUOBHdk8ENgzAMRTHqbnCBFdpNoJvACnBpp0v1I/3oFwkhxzdysS0nz9+J0zSVa92/sx5tNfD4KaVJYdUgFFWYUcWyfRJ9rzWzd0iRFnxoAP819kXlMacxO4Ca59DNIUWEoEA1SCEhENoB4IYLr8aXQ3t/l60j7+29gADByHsB3J9BUQhgFoXwJ5TWKLHW5n+lqljBC8yKMKUYee/h0/1Qdpq8SPwAvNZE146X6PUAAAAASUVORK5CYII=";

/**
 * A repost button ready to be embedded as Activity footer
 * @example ./examples/RepostButton.md
 */
var RepostButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RepostButton, _React$Component);

  function RepostButton() {
    _classCallCheck(this, RepostButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(RepostButton).apply(this, arguments));
  }

  _createClass(RepostButton, [{
    key: "render",
    value: function render() {
      var _this = this;

      if (this.props.userId != null) {
        return createElement(RepostButtonInner, this.props);
      }

      return createElement(StreamApp.Consumer, null, function (appCtx) {
        return createElement(RepostButtonInner, _extends({}, _this.props, {
          userId: appCtx.user.id
        }));
      });
    }
  }]);

  return RepostButton;
}(Component);

_defineProperty(RepostButton, "defaultProps", {
  feedGroup: 'user'
});

var RepostButtonInner =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(RepostButtonInner, _React$Component2);

  function RepostButtonInner() {
    _classCallCheck(this, RepostButtonInner);

    return _possibleConstructorReturn(this, _getPrototypeOf(RepostButtonInner).apply(this, arguments));
  }

  _createClass(RepostButtonInner, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          feedGroup = _this$props.feedGroup,
          userId = _this$props.userId,
          activity = _this$props.activity,
          onToggleReaction = _this$props.onToggleReaction;
      return createElement(ReactionToggleIcon, {
        counts: activity.reaction_counts,
        own_reactions: activity.own_reactions,
        kind: "repost",
        onPress: function onPress() {
          return onToggleReaction('repost', activity, {}, {
            targetFeeds: ["".concat(feedGroup, ":").concat(userId)]
          });
        },
        activeIcon: repostButtonActive,
        inactiveIcon: repostButtonInactive
      });
    }
  }]);

  return RepostButtonInner;
}(Component);

var RepostButton$1 = withTranslationContext(RepostButton);

/**
 * Simple Flex wrapper for centering UI elements. To be expanded in the future.
 *
 * @example ./examples/Flex.md
 */
var Flex =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Flex, _React$Component);

  function Flex() {
    _classCallCheck(this, Flex);

    return _possibleConstructorReturn(this, _getPrototypeOf(Flex).apply(this, arguments));
  }

  _createClass(Flex, [{
    key: "render",
    value: function render() {
      return createElement("div", {
        className: "raf-flex",
        style: _objectSpread({
          justifyContent: this.props.j,
          alignItems: this.props.a,
          justifySelf: this.props.js,
          flexDirection: this.props.d,
          flexWrap: this.props.w
        }, this.props.style)
      }, this.props.children);
    }
  }]);

  return Flex;
}(Component);

_defineProperty(Flex, "defaultProps", {
  d: 'row',
  w: 'nowrap'
});

/**
 * Wrapper with LikeButton and Repost Button used by the Standard Activity.
 *
 * @example ./examples/ActivityFooter.md
 */
var ActivityFooter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ActivityFooter, _React$Component);

  function ActivityFooter() {
    _classCallCheck(this, ActivityFooter);

    return _possibleConstructorReturn(this, _getPrototypeOf(ActivityFooter).apply(this, arguments));
  }

  _createClass(ActivityFooter, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activity = _this$props.activity,
          onToggleReaction = _this$props.onToggleReaction;
      return createElement("div", {
        className: "raf-activity-footer"
      }, createElement("div", {
        className: "raf-activity-footer__left"
      }), createElement("div", {
        className: "raf-activity-footer__right"
      }, createElement(Flex, {
        a: "center"
      }, createElement(LikeButton, {
        activity: activity,
        onToggleReaction: onToggleReaction
      }), createElement(RepostButton$1, this.props))));
    }
  }]);

  return ActivityFooter;
}(Component);

_defineProperty(ActivityFooter, "defaultProps", {
  feedGroup: 'user'
});

/**
 * Component is described here.
 *
 * @example ./examples/FollowButton.md
 */
var FollowButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FollowButton, _React$Component);

  function FollowButton(props) {
    var _this;

    _classCallCheck(this, FollowButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FollowButton).call(this, props));
    _this.state = {
      followed: _this.props.followed || false
    };
    return _this;
  }

  _createClass(FollowButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onClick = _this$props.onClick,
          followed = _this$props.followed;
      return React__default.createElement("div", {
        className: "raf-follow-button ".concat(followed ? 'raf-follow-button--active' : ''),
        role: "button",
        onClick: onClick
      }, followed ? 'Following' : 'Follow');
    }
  }]);

  return FollowButton;
}(React__default.Component);

var ReactionList =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(ReactionList, _React$PureComponent);

  function ReactionList() {
    _classCallCheck(this, ReactionList);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReactionList).apply(this, arguments));
  }

  _createClass(ReactionList, [{
    key: "render",
    value: function render() {
      var _this = this;

      return createElement(FeedContext.Consumer, null, function (appCtx) {
        return createElement(ReactionListInner, _extends({}, _this.props, appCtx));
      });
    }
  }]);

  return ReactionList;
}(PureComponent);

_defineProperty(ReactionList, "defaultProps", {
  Paginator: LoadMorePaginator,
  oldestToNewest: false,
  reverseOrder: false
});

var ReactionListInner =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactionListInner, _React$Component);

  function ReactionListInner() {
    var _getPrototypeOf2;

    var _this2;

    _classCallCheck(this, ReactionListInner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ReactionListInner)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this2), "renderReaction", function (reaction) {
      var Reaction = _this2.props.Reaction;
      return smartRender(Reaction, {
        reaction: reaction
      });
    });

    return _this2;
  }

  _createClass(ReactionListInner, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          activityId = _this$props.activityId,
          activities = _this$props.activities,
          reactionKind = _this$props.reactionKind,
          getActivityPath = _this$props.getActivityPath,
          oldestToNewest = _this$props.oldestToNewest;

      if (!oldestToNewest) {
        return;
      }

      var activityPath = this.props.activityPath || getActivityPath(activityId);
      var orderPrefix = 'oldest';
      var reactions_extra = activities.getIn([].concat(_toConsumableArray(activityPath), [orderPrefix + '_reactions_extra']));

      if (reactions_extra) {
        return;
      }

      return this.props.loadNextReactions(activityId, reactionKind, activityPath, oldestToNewest);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          activityId = _this$props2.activityId,
          activities = _this$props2.activities,
          reactionKind = _this$props2.reactionKind,
          getActivityPath = _this$props2.getActivityPath,
          oldestToNewest = _this$props2.oldestToNewest,
          reverseOrder = _this$props2.reverseOrder;
      var activityPath = this.props.activityPath || getActivityPath(activityId);
      var orderPrefix = 'latest';

      if (oldestToNewest) {
        orderPrefix = 'oldest';
      }

      var reactionsOfKind = activities.getIn([].concat(_toConsumableArray(activityPath), [orderPrefix + '_reactions', reactionKind]), immutable.List());

      if (reverseOrder) {
        reactionsOfKind = reactionsOfKind.reverse();
      }

      var reactions_extra = activities.getIn([].concat(_toConsumableArray(activityPath), [orderPrefix + '_reactions_extra']));
      var nextUrl = 'https://api.stream-io-api.com/';

      if (reactions_extra) {
        nextUrl = reactions_extra.getIn([reactionKind, 'next'], '');
      }

      var refreshing = activities.getIn([].concat(_toConsumableArray(activityPath), [orderPrefix + '_reactions_extra', reactionKind, 'refreshing']), false);
      return smartRender(this.props.Paginator, {
        loadNextPage: function loadNextPage() {
          return _this3.props.loadNextReactions(activityId, reactionKind, activityPath, oldestToNewest);
        },
        hasNextPage: Boolean(nextUrl),
        refreshing: refreshing,
        reverse: reverseOrder,
        children: createElement(Fragment, null, reactionsOfKind.map(function (reaction) {
          return createElement(ImmutableItemWrapper$2, {
            key: reaction.get('id'),
            item: reaction,
            renderItem: _this3.renderReaction
          });
        }))
      });
    }
  }]);

  return ReactionListInner;
}(Component);

var ImmutableItemWrapper$2 =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(ImmutableItemWrapper, _React$PureComponent2);

  function ImmutableItemWrapper() {
    _classCallCheck(this, ImmutableItemWrapper);

    return _possibleConstructorReturn(this, _getPrototypeOf(ImmutableItemWrapper).apply(this, arguments));
  }

  _createClass(ImmutableItemWrapper, [{
    key: "render",
    value: function render() {
      return this.props.renderItem(this.props.item.toJS());
    }
  }]);

  return ImmutableItemWrapper;
}(PureComponent);

/**
 * Component is described here.
 *
 * @example ./examples/CommentItem.md
 */
var CommentItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CommentItem, _React$Component);

  function CommentItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CommentItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CommentItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_user", function () {
      var user = _this.props.comment.user;
      return user;
    });

    _defineProperty(_assertThisInitialized(_this), "onClickUser", function () {
      var onClickUser = _this.props.onClickUser;

      if (onClickUser) {
        return onClickUser(_this._user());
      }
    });

    return _this;
  }

  _createClass(CommentItem, [{
    key: "_getOnClickUser",
    value: function _getOnClickUser() {
      return this.props.onClickUser ? this.onClickUser : undefined;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          comment = _this$props.comment,
          tDateTimeParser = _this$props.tDateTimeParser;
      return React__default.createElement("div", {
        className: "raf-comment-item"
      }, React__default.createElement(Flex, {
        a: "flex-start",
        style: {
          padding: '8px 0'
        }
      }, comment.user.data.profileImage && React__default.createElement(Avatar, {
        onClick: this._getOnClickUser(),
        image: comment.user.data.profileImage,
        circle: true,
        size: 25
      })), React__default.createElement(Flex, {
        d: "column",
        style: {
          flex: 1,
          margin: '0 8px'
        }
      }, React__default.createElement("div", {
        className: "raf-comment-item__content"
      }, React__default.createElement("time", {
        dateTime: comment.created_at,
        title: comment.created_at
      }, React__default.createElement("small", null, humanizeTimestamp(comment.created_at, tDateTimeParser))), React__default.createElement("p", null, React__default.createElement("span", {
        onClick: this._getOnClickUser(),
        className: "raf-comment-item__author"
      }, comment.user.data.name), ' ', textRenderer(comment.data.text, 'raf-comment-item', this.props.onClickMention, this.props.onClickHashtag)))));
    }
  }]);

  return CommentItem;
}(React__default.Component);

var CommentItem$1 = withTranslationContext(CommentItem);

/**
 * CommentList uses ReactionList under the hood to render a list of comments.
 *
 * @example ./examples/CommentList.md
 */
var CommentList =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CommentList, _React$PureComponent);

  function CommentList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CommentList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CommentList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_Reaction", function (_ref) {
      var reaction = _ref.reaction;
      return smartRender(_this.props.CommentItem, {
        comment: reaction
      });
    });

    return _this;
  }

  _createClass(CommentList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Paginator = _this$props.Paginator,
          activityId = _this$props.activityId,
          activityPath = _this$props.activityPath,
          oldestToNewest = _this$props.oldestToNewest,
          reverseOrder = _this$props.reverseOrder;
      return React__default.createElement(React__default.Fragment, null, React__default.createElement(ReactionList, {
        Paginator: Paginator,
        activityId: activityId,
        reactionKind: 'comment',
        Reaction: this._Reaction,
        activityPath: activityPath,
        oldestToNewest: oldestToNewest,
        reverseOrder: reverseOrder
      }));
    }
  }]);

  return CommentList;
}(React__default.PureComponent);

_defineProperty(CommentList, "defaultProps", {
  Paginator: LoadMorePaginator,
  CommentItem: CommentItem$1,
  oldestToNewest: false,
  reverseOrder: false
});

/**
 * Component is described here.
 *
 * @example ./examples/CommentField.md
 */
var CommentField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CommentField, _React$Component);

  function CommentField() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CommentField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CommentField)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "textareaRef", React__default.createRef());

    _defineProperty(_assertThisInitialized(_this), "state", {
      text: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmitForm",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(e) {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();

                if (!(_this.state.text !== '')) {
                  _context.next = 12;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return _this.props.onAddReaction('comment', _this.props.activity, {
                  text: _this.state.text
                });

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return");

              case 10:
                _this.setState({
                  text: ''
                });

                if (_this.props.onSuccess) {
                  _this.props.onSuccess();
                }

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 7]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_onChange", function (event) {
      var text = inputValueFromEvent(event);

      if (text == null) {
        return;
      }

      _this.setState({
        text: text
      });
    });

    return _this;
  }

  _createClass(CommentField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.textareaRef.current) {
        this.textareaRef.current.addEventListener('keydown', function (e) {
          if (e.which === 13 && _this2.textareaRef.current && _this2.textareaRef.current.nextSibling === null) {
            _this2.onSubmitForm(e);
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          t = _this$props.t,
          placeholder = _this$props.placeholder;
      return React__default.createElement("form", {
        onSubmit: this.onSubmitForm,
        className: "raf-comment-field"
      }, this.props.image ? React__default.createElement(Avatar, {
        image: this.props.image,
        circle: true,
        size: 39
      }) : null, React__default.createElement("div", {
        className: "raf-comment-field__group"
      }, React__default.createElement(Textarea, {
        rows: 1,
        value: this.state.text,
        placeholder: placeholder || t('Start Typing...'),
        onChange: this._onChange,
        trigger: this.props.trigger,
        onPaste: function onPaste() {
          return null;
        },
        maxLength: 280,
        innerRef: this.textareaRef
      }), React__default.createElement(Button, {
        buttonStyle: "primary",
        disabled: this.state.text === '',
        type: "submit"
      }, t('Post'))));
    }
  }]);

  return CommentField;
}(React__default.Component);

var CommentField$1 = withTranslationContext(CommentField);

/**
 * Component is described here.
 *
 * @example ./examples/DataLabel.md
 */
var DataLabel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DataLabel, _React$Component);

  function DataLabel() {
    _classCallCheck(this, DataLabel);

    return _possibleConstructorReturn(this, _getPrototypeOf(DataLabel).apply(this, arguments));
  }

  _createClass(DataLabel, [{
    key: "render",
    value: function render() {
      return createElement("div", {
        className: "raf-data-label"
      }, createElement("span", {
        className: "raf-data-label__label"
      }, this.props.label), createElement("span", {
        className: "raf-data-label__data"
      }, this.props.data));
    }
  }]);

  return DataLabel;
}(Component);

_defineProperty(DataLabel, "defaultProps", {
  label: 'label',
  data: 'data'
});

export { FlatFeed$1 as FlatFeed, NotificationFeed, SinglePost, StatusUpdateForm$1 as StatusUpdateForm, Activity$1 as Activity, Notification$1 as Notification, NotificationDropdown, NewActivitiesNotification$1 as NewActivitiesNotification, InfiniteScrollPaginator, LoadMorePaginator, ActivityFooter, AttachedActivity, UserBar$1 as UserBar, Card, Gallery, Avatar, AvatarGroup, Dropdown, Link, Video, Audio, LikeButton, RepostButton$1 as RepostButton, ReactionIcon$1 as ReactionIcon, ReactionToggleIcon, IconBadge, FollowButton, CommentList, ReactionList, CommentItem$1 as CommentItem, CommentField$1 as CommentField, Button, DataLabel, Textarea, EmojiPicker$1 as EmojiPicker, Title, Panel, PanelHeading, PanelFooter, PanelContent, Streami18n, Feed, FeedContext, StreamContext, TranslationContext, withTranslationContext, StreamApp, enTranslations, nlTranslations, ruTranslations, trTranslations, frTranslations, hiTranslations, itTranslations };
//# sourceMappingURL=index.es.js.map
