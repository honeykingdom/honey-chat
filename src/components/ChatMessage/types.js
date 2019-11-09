import pt from 'prop-types';

import { MESSAGE_TYPES } from '../../utils/constants';
import {
  twitchEmoteType,
  bttvEmoteType,
  ffzEmoteType,
  emojiType,
  mentionType,
  linkType,
} from '../../utils/formatMessage';

export const messageType = pt.shape({
  type: pt.oneOf([MESSAGE_TYPES.MESSAGE]).isRequired,
  message: pt.string.isRequired,
  messageArray: pt.arrayOf(
    pt.oneOfType([
      pt.string,
      pt.shape({}),
      twitchEmoteType,
      bttvEmoteType,
      ffzEmoteType,
      emojiType,
      mentionType,
      linkType, // TODO: fix warning with link type
    ]),
  ).isRequired,
  tags: pt.shape({
    badgeInfo: pt.shape({
      subscriber: pt.string,
    }),
    badges: pt.shape({}),
    color: pt.string,
    displayName: pt.string.isRequired,
    emotes: pt.shape({}),
    flags: pt.string,
    id: pt.string,
    mod: pt.bool,
    roomId: pt.string,
    tmiSentId: pt.oneOfType([pt.string, pt.number]),
    userId: pt.string,
  }).isRequired,
  badges: pt.arrayOf(
    pt.shape({
      alt: pt.string,
      label: pt.string,
      src: pt.string.isRequired,
      srcSet: pt.string,
    }),
  ),
  user: pt.string.isRequired,
  isHistory: pt.bool,
  isAction: pt.bool,
  isDeleted: pt.bool,
});

export const noticeType = pt.shape({
  type: pt.oneOf([MESSAGE_TYPES.NOTICE_MESSAGE]).isRequired,
  message: pt.string.isRequired,
  channel: pt.string.isRequired,
  tags: pt.shape({
    msgId: pt.string.isRequired,
  }).isRequired,
});

export const userNoticeType = pt.shape({
  type: pt.oneOf([MESSAGE_TYPES.USER_NOTICE_MESSAGE]).isRequired,
  message: pt.string,
  channel: pt.string.isRequired,
  tags: pt.shape({
    badgeInfo: pt.shape({
      subscriber: pt.string,
    }),
    badges: pt.shape({}),
    color: pt.string,
    displayName: pt.string.isRequired,
    emotes: pt.shape({}),
    id: pt.string,
    login: pt.string,
    mod: pt.bool,
    msgId: pt.string,
    systemMsg: pt.string,
    tmiSentId: pt.oneOfType([pt.string, pt.number]),
    userId: pt.string,
    msgParamCumulativeMonths: pt.number,
    msgParamDisplayName: pt.string,
    msgParamLogin: pt.string,
    msgParamMonths: pt.number,
    msgParamPromoGiftTotal: pt.number,
    msgParamPromoName: pt.string,
    msgParamRecipientDisplayName: pt.string,
    msgParamRecipientId: pt.string,
    msgParamRecipientUserName: pt.string,
    msgParamSenderLogin: pt.string,
    msgParamSenderName: pt.string,
    msgParamShouldShareStreak: pt.bool,
    msgParamStreakMonths: pt.number,
    msgParamSubPlan: pt.string,
    msgParamSubPlanName: pt.string,
    msgParamViewerCount: pt.number,
    msgParamRitualName: pt.string,
    msgParamThreshold: pt.number,
  }).isRequired,
});
