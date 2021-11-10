/*
 Navicat Premium Data Transfer

 Source Server         : glxt
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : baseform

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 30/08/2021 17:39:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for application
-- ----------------------------
DROP TABLE IF EXISTS `application`;
CREATE TABLE `application` (
  `application_id` int NOT NULL AUTO_INCREMENT,
  `application_dep_platform` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用部署平台',
  `application_type` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用类型',
  `application_label` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '应用标签',
  `note` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
  `apply_time` datetime DEFAULT NULL,
  `state` int DEFAULT '1',
  `application_use` int DEFAULT '1' COMMENT '是否启用',
  `is_interactive` int DEFAULT '1' COMMENT '是否互动应用',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '更新人',
  `create_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `platform_app` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '应用名称',
  `platform_app_code` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '应用代码',
  `platform_app_version` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '应用版本',
  `platform_business` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用平台',
  `platform_business_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用平台label',
  `application_dep_platform_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用部署平台label',
  `application_type_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '应用类型label',
  `application_label_label` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '应用标签label',
  PRIMARY KEY (`application_id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of application
-- ----------------------------
BEGIN;
INSERT INTO `application` VALUES (85, 'crm_enbrands', 'PC', '3', 'testkankan', NULL, 1, 1, 0, '2021-08-09 10:35:03', '2021-08-09 10:35:03', NULL, 'admin', 'testPlatSelf', 'plat_self', '1.1.1', 'JD', '京东', 'Enbrands', 'PC', '全部通用');
INSERT INTO `application` VALUES (87, 'crm_enbrands', 'program-zfb', '54', '戴森互动报名抽奖淘宝侧', NULL, 1, 1, 1, '2021-08-18 16:16:51', '2021-08-18 17:22:47', '邓思琳', '邓思琳', '戴森互动报名抽奖', 'dyson_signup_lottery', '1.0', 'TB', '淘宝', 'Enbrands', '支付宝小程序', '');
INSERT INTO `application` VALUES (88, 'crm_jd', 'H5', '54,48,49,50,51,52', '戴森互动报名抽奖京东侧', NULL, 1, 1, 1, '2021-08-20 17:01:07', '2021-08-24 14:03:13', '邓思琳', '邓思琳', '戴森互动报名抽奖', 'dyson_signup_lottery_jingdong', '1.0', 'JD', '京东', '智客', 'H5', '活动抽奖,拉新,促活,转化,复购,传播');
INSERT INTO `application` VALUES (91, 'crm_enbrands', 'PC', '48,49,50', '测试使用', NULL, 1, 1, 0, '2021-08-26 16:56:02', '2021-08-26 17:33:00', '邓思琳', '邓思琳', '埋点管理平台', 'mdglpt', '1.1.1', 'BD', '百度', 'Enbrands', 'PC', '拉新,促活,转化');
COMMIT;

-- ----------------------------
-- Table structure for applicationIndicator
-- ----------------------------
DROP TABLE IF EXISTS `applicationIndicator`;
CREATE TABLE `applicationIndicator` (
  `application_id` int NOT NULL,
  `indicator_id` int NOT NULL,
  PRIMARY KEY (`application_id`,`indicator_id`),
  UNIQUE KEY `applicationIndicator_indicator_id_application_id_unique` (`application_id`,`indicator_id`),
  KEY `indicator_id` (`indicator_id`),
  CONSTRAINT `applicationindicator_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `application` (`application_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `applicationindicator_ibfk_2` FOREIGN KEY (`indicator_id`) REFERENCES `indicator` (`indicator_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of applicationIndicator
-- ----------------------------
BEGIN;
INSERT INTO `applicationIndicator` VALUES (85, 439);
INSERT INTO `applicationIndicator` VALUES (87, 439);
INSERT INTO `applicationIndicator` VALUES (88, 439);
INSERT INTO `applicationIndicator` VALUES (85, 440);
INSERT INTO `applicationIndicator` VALUES (87, 449);
INSERT INTO `applicationIndicator` VALUES (88, 449);
INSERT INTO `applicationIndicator` VALUES (85, 450);
INSERT INTO `applicationIndicator` VALUES (87, 451);
INSERT INTO `applicationIndicator` VALUES (88, 451);
INSERT INTO `applicationIndicator` VALUES (87, 473);
INSERT INTO `applicationIndicator` VALUES (88, 473);
INSERT INTO `applicationIndicator` VALUES (87, 474);
INSERT INTO `applicationIndicator` VALUES (88, 474);
INSERT INTO `applicationIndicator` VALUES (91, 477);
INSERT INTO `applicationIndicator` VALUES (91, 478);
INSERT INTO `applicationIndicator` VALUES (91, 479);
INSERT INTO `applicationIndicator` VALUES (91, 480);
INSERT INTO `applicationIndicator` VALUES (91, 481);
INSERT INTO `applicationIndicator` VALUES (91, 482);
COMMIT;

-- ----------------------------
-- Table structure for attribute
-- ----------------------------
DROP TABLE IF EXISTS `attribute`;
CREATE TABLE `attribute` (
  `attribute_id` int NOT NULL AUTO_INCREMENT,
  `attribute_name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '属性名称',
  `attribute_code` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '属性代码',
  `data_type` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '数据类型',
  `data_type_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '数据类型label',
  `desc` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '单位格式说明',
  `attribute_source` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '属性来源',
  `attribute_label` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '属性标签',
  `attribute_label_label` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '属性标签label',
  `note` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
  `is_common` int DEFAULT '1' COMMENT '1公共属性 0自定义属性',
  `create_time` datetime DEFAULT NULL,
  `create_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `update_time` datetime DEFAULT NULL,
  `update_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '更新人',
  `state` int DEFAULT '1',
  `enum_data` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`attribute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of attribute
-- ----------------------------
BEGIN;
INSERT INTO `attribute` VALUES (1, '返回状态', 'is_success', 'Boolean', 'Boolean', 'True/False', '数据字典', '45,37', '会员,全部通用', NULL, 1, '2021-07-06 16:29:45', 'Jiangxinyu', NULL, 'Jiangxinyu', 1, '[{\"value\":\"0\",\"label\":\"成功\"},{\"value\":\"!0\",\"label\":\"失败\"}]');
INSERT INTO `attribute` VALUES (2, '商品ID', 'goods_id', 'String', 'String', '商品ID', '上报值本身', '37,46', '全部通用,品牌', NULL, 1, '2021-07-06 16:29:50', 'Jiangxinyu', NULL, 'Jiangxinyu', 1, NULL);
INSERT INTO `attribute` VALUES (3, '会员状态', 'is_member', 'Boolean', 'Boolean', 'True/False', '上报值本身', '45', '会员', NULL, 1, '2021-07-06 16:29:54', 'Jiangxinyu', NULL, 'Jiangxinyu', 1, NULL);
COMMIT;

-- ----------------------------
-- Table structure for basicData
-- ----------------------------
DROP TABLE IF EXISTS `basicData`;
CREATE TABLE `basicData` (
  `fid` varchar(40) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(20) DEFAULT NULL,
  `value` varchar(40) DEFAULT NULL,
  `state` int DEFAULT '1',
  `bz` varchar(255) DEFAULT NULL,
  `label` varchar(20) DEFAULT NULL,
  `is_lower` int DEFAULT '1',
  `children` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=282 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of basicData
-- ----------------------------
BEGIN;
INSERT INTO `basicData` VALUES ('0', 104, '一级', 'event_trigger_mode', 1, NULL, '触发类型', 0, NULL);
INSERT INTO `basicData` VALUES ('event_trigger_mode', 105, '触发类型', 'open', 1, NULL, 'open', 1, NULL);
INSERT INTO `basicData` VALUES ('event_trigger_mode', 106, '触发类型', 'click', 1, NULL, 'click', 1, NULL);
INSERT INTO `basicData` VALUES ('event_trigger_mode', 107, '触发类型', 'slide', 1, NULL, 'slide', 1, NULL);
INSERT INTO `basicData` VALUES ('event_trigger_mode', 108, '触发类型', 'callback', 1, NULL, 'callback', 1, NULL);
INSERT INTO `basicData` VALUES ('event_trigger_mode', 109, '触发类型', 'jump', 1, NULL, 'jump', 1, NULL);
INSERT INTO `basicData` VALUES ('event_trigger_mode', 110, '触发类型', 'play', 1, NULL, 'play', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 204, '一级', 'platform_business', 1, NULL, '业务平台', 0, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 205, '业务平台', 'TB', 1, NULL, '淘宝', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 206, '业务平台', 'JD', 1, NULL, '京东', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 207, '业务平台', 'TM', 1, NULL, '天猫', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 208, '业务平台', 'WX', 1, NULL, '微信', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 209, '业务平台', 'JZONE', 1, NULL, '京微通', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 210, '业务平台', 'BD', 1, NULL, '百度', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 211, '业务平台', 'DY', 1, NULL, '抖音', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_business', 212, '业务平台', 'YZ', 1, NULL, '有赞', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 213, '一级', 'application_dep_platform', 1, NULL, '应用部署平台', 0, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 214, '应用部署平台', 'platform-ali', 1, NULL, '客户运营平台-阿里版', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 215, '应用部署平台', 'platform-jd', 1, NULL, ' 客户运营平台-京东版', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 216, '应用部署平台', 'platform-jdy', 1, NULL, '客户运营平台-京东云版', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 217, '应用部署平台', 'crm_enbrands', 1, NULL, 'Enbrands', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 218, '应用部署平台', 'crm_jd', 1, NULL, '智客', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 219, '应用部署平台', 'crm_dy', 1, NULL, '抖音', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 220, '应用部署平台', 'crm_sn', 1, NULL, '苏宁', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 221, '应用部署平台', 'crm_jzone', 1, NULL, '京微通', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 222, '一级', 'platform_system', 1, NULL, '应用类型', 0, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 223, '应用类型', 'IOS', 1, NULL, 'IOS', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 224, '应用类型', 'Android', 1, NULL, 'Android', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 225, '应用类型', 'PC', 1, NULL, 'PC', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 226, '应用类型', 'H5', 1, NULL, 'H5', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 227, '应用类型', 'program-wx', 1, NULL, '微信小程序', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 228, '应用类型', 'program-dd', 1, NULL, '钉钉小程序', 1, NULL);
INSERT INTO `basicData` VALUES ('platform_system', 229, '应用类型', 'program-zfb', 1, NULL, '支付宝小程序', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 231, '一级', 'role', 1, NULL, '角色', 0, NULL);
INSERT INTO `basicData` VALUES ('role', 232, '角色', '10', 1, NULL, '管理员', 1, NULL);
INSERT INTO `basicData` VALUES ('role', 233, '角色', '1', 1, NULL, '普通用户', 1, NULL);
INSERT INTO `basicData` VALUES ('application_dep_platform', 234, '应用部署平台', 'crm_yz', 1, NULL, '有赞', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 235, '一级', 'indicator_type_level', 1, NULL, '指标类型', 0, NULL);
INSERT INTO `basicData` VALUES ('indicator_type_level', 236, '指标类型', 'frequency', 1, NULL, '次数', 1, NULL);
INSERT INTO `basicData` VALUES ('indicator_type_level', 237, '指标类型', 'people', 1, NULL, '人数', 1, NULL);
INSERT INTO `basicData` VALUES ('indicator_type_level', 238, '指标类型', 'retained', 1, NULL, '留存', 1, NULL);
INSERT INTO `basicData` VALUES ('indicator_type_level', 239, '指标类型', 'time', 1, NULL, '时长', 1, NULL);
INSERT INTO `basicData` VALUES ('indicator_type_level', 240, '指标类型', 'other', 1, NULL, '其他统计', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 241, '次数', 'cyhdcs', 1, NULL, '参与活动次数', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 242, '次数', 'pv', 1, NULL, 'PV', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 243, '次数', 'hdfxcs', 1, NULL, '活动分享次数', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 244, '次数', 'fcyqcs', 1, NULL, '发出邀请次数', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 245, '次数', 'jsyqcs', 1, NULL, '接受邀请次数', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 246, '次数', 'appdkcs', 1, NULL, 'APP打开次数', 1, NULL);
INSERT INTO `basicData` VALUES ('frequency', 247, '次数', 'qtfwcs', 1, NULL, '其他访问次数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 248, '人数', 'uv', 1, NULL, 'UV', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 249, '人数', 'cyhdrs', 1, NULL, '参与活动人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 250, '人数', 'gzdprs', 1, NULL, '关注店铺人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 251, '人数', 'scdprs', 1, NULL, '收藏店铺人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 252, '人数', 'scsprs', 1, NULL, '收藏商品人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 253, '人数', 'jgsprs', 1, NULL, '加购商品人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 254, '人数', 'fcyqrs', 1, NULL, '发出邀请人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 255, '人数', 'jsyqrs', 1, NULL, '接受邀请人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 256, '人数', 'hdfxrs', 1, NULL, '活动分享人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 257, '人数', 'xzhyrs', 1, NULL, '新增会员人数', 1, NULL);
INSERT INTO `basicData` VALUES ('people', 258, '人数', 'qtrs', 1, NULL, '其他人数', 1, NULL);
INSERT INTO `basicData` VALUES ('time', 259, '时长', 'ympjtlsj', 1, NULL, '页面平均停留时间', 1, NULL);
INSERT INTO `basicData` VALUES ('retained', 260, '留存', 'clrs', 1, NULL, '存留人数', 1, NULL);
INSERT INTO `basicData` VALUES ('other', 261, '其他统计', 'other', 1, NULL, '其他', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 262, '一级', 'data_type', 1, NULL, '数据类型', 0, NULL);
INSERT INTO `basicData` VALUES ('data_type', 263, '数据类型', 'String', 1, NULL, 'String', 1, NULL);
INSERT INTO `basicData` VALUES ('data_type', 264, '数据类型', 'Int', 1, NULL, 'Int', 1, NULL);
INSERT INTO `basicData` VALUES ('data_type', 265, '数据类型', 'Double', 1, NULL, 'Double', 1, NULL);
INSERT INTO `basicData` VALUES ('data_type', 266, '数据类型', 'Float', 1, NULL, 'Float', 1, NULL);
INSERT INTO `basicData` VALUES ('data_type', 267, '数据类型', 'Boolean', 1, NULL, 'Boolean', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 270, '一级', 'statis_time_range', 1, NULL, '统计时间范围', 0, NULL);
INSERT INTO `basicData` VALUES ('statis_time_range', 271, '统计时间范围', 'yesterday', 1, NULL, '昨天', 1, NULL);
INSERT INTO `basicData` VALUES ('statis_time_range', 272, '统计时间范围', '7days_before', 1, NULL, '前7天', 1, NULL);
INSERT INTO `basicData` VALUES ('statis_time_range', 273, '统计时间范围', '14days_before', 1, NULL, '前14天', 1, NULL);
INSERT INTO `basicData` VALUES ('statis_time_range', 274, '统计时间范围', '30days_before', 1, NULL, '前30天', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 275, '一级', 'second_indicator', 1, NULL, '二级指标', 0, NULL);
INSERT INTO `basicData` VALUES ('second_indicator', 276, '二级指标', 'history_cumulative', 1, NULL, '历史累计', 1, NULL);
INSERT INTO `basicData` VALUES ('second_indicator', 277, '二级指标', 'historical_average', 1, NULL, '历史平均', 1, NULL);
INSERT INTO `basicData` VALUES ('second_indicator', 278, '二级指标', 'historic_peak', 1, NULL, '历史峰值', 1, NULL);
INSERT INTO `basicData` VALUES ('second_indicator', 279, '二级指标', 'no_show', 1, NULL, '不展示', 1, NULL);
INSERT INTO `basicData` VALUES ('0', 280, '一级', 'time_range', 0, NULL, '时间范围', 1, NULL);
INSERT INTO `basicData` VALUES ('time_range', 281, '时间范围', 'recent_14day', 1, NULL, '最近14天', 1, NULL);
COMMIT;

-- ----------------------------
-- Table structure for card
-- ----------------------------
DROP TABLE IF EXISTS `card`;
CREATE TABLE `card` (
  `card_id` varchar(255) COLLATE utf8_bin NOT NULL,
  `indicator_id` int DEFAULT NULL COMMENT '指标id',
  `indicator_name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标名称',
  `indicator_show_name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标显示名称',
  `indicator_desc` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标说明',
  `time_dimension` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '时间维度',
  `time_dimension_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '时间维度label',
  `sequential` int DEFAULT '1' COMMENT '环比',
  `indicator_level` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '二级指标',
  `indicator_level_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '二级指标label',
  `state` int DEFAULT '1',
  `events` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标下对应的事件codes',
  `show_type` int DEFAULT '1' COMMENT '1次数0人数',
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of card
-- ----------------------------
BEGIN;
INSERT INTO `card` VALUES ('0FD9964B-6527-4894-8F70-89EA05E9FA93', 479, '指标次数列表-埋点', '指标list', '指标list', '7days_before', '前7天', 1, 'historic_peak', '历史峰值', 1, 'zhibiao_maidian', 1);
INSERT INTO `card` VALUES ('15039BFF-C0FD-4977-A1CC-C7334FCB983C', 439, 'PV', '活动PV', '', '7days_before', '前7天', 1, 'history_cumulative', '历史累计', 1, 'pageview', 1);
INSERT INTO `card` VALUES ('367E84B4-214E-4D9F-AA49-F2B72003416A', 478, '事件页面次数-埋点', '事件', '事件', '7days_before', '前7天', 1, 'historical_average', '历史平均', 1, 'sjymMaidian', 1);
INSERT INTO `card` VALUES ('3854BCF8-D7A3-4CF3-96A2-8B3DE4E3C65B', 481, '指标总次数-埋点', '指标all', '指标all', '7days_before', '前7天', 1, 'historic_peak', '历史峰值', 1, 'zhibiao_maidian,zhibiaocreate_maidian', 1);
INSERT INTO `card` VALUES ('4C11F4B3-B6F4-4C9A-8728-D2095F475B88', 474, '老会员成功参与活动人数', '老会员参与活动人数', '', '7days_before', '前7天', 1, 'history_cumulative', '历史累计', 1, 'old_member_join_act_callback', 1);
INSERT INTO `card` VALUES ('4D7F0544-822F-4490-86FE-C85D1B314E3D', 440, '参与活动次数', '参与活动次数', '参与活动次数', '14days_before', '前14天', 1, 'history_cumulative', '历史累计', 1, 'pageview,page', 0);
INSERT INTO `card` VALUES ('56BFAAFA-4A95-4A34-B4F6-D6FAEBD2ECCC', 482, '应用次数-埋点', '应用', '应用', '7days_before', '前7天', 1, 'history_cumulative', '历史累计', 1, 'yingyong_maidian', 1);
INSERT INTO `card` VALUES ('5FDB7DC3-5207-4B62-9404-2E36251C1CF1', 439, 'PV', 'pv', '', '14days_before', '前14天', 1, 'history_cumulative', '历史累计', 1, 'pageview', 1);
INSERT INTO `card` VALUES ('9006B5FF-2354-43E5-86F7-329E686346C3', 450, '参与活动人数', '参与活动人数', '参与活动人数', 'yesterday', '昨天', 1, 'historical_average', '历史平均', 1, 'button,page', 1);
INSERT INTO `card` VALUES ('A8B503F1-80ED-467E-9FF9-6721970719DD', 473, '新会员成功参与活动人数', '新会员参与活动人数', '', '7days_before', '前7天', 1, 'history_cumulative', '历史累计', 1, 'new_member_join_act_callback', 0);
INSERT INTO `card` VALUES ('BC548201-8F46-4DB1-86F4-B200AAA93335', 480, '指标创建次数-埋点', '指标create', '指标create', '7days_before', '前7天', 1, 'historical_average', '历史平均', 1, 'zhibiaocreate_maidian', 1);
INSERT INTO `card` VALUES ('CB3F8306-6A27-42F3-8571-9857E91CCA66', 449, 'UV', '活动UV', '', '7days_before', '前7天', 1, 'history_cumulative', '历史累计', 1, '', 1);
INSERT INTO `card` VALUES ('D0CF31D9-3B79-4BE7-8769-3CD075CCB2FF', 449, 'UV', 'uv', '', '14days_before', '前14天', 1, 'history_cumulative', '历史累计', 1, '', 1);
INSERT INTO `card` VALUES ('DB1D4473-2B3C-4690-B4BC-BEC77C1603BA', 439, 'PV', 'pv', 'pv', '7days_before', '前7天', 1, 'historic_peak', '历史峰值', 1, 'pageview', 1);
INSERT INTO `card` VALUES ('F1E6BD34-6864-4A79-8BD6-7500D7E588B2', 477, '总访问人数-埋点', '总访问人数', '访问人数', '7days_before', '前7天', 1, 'history_cumulative', '历史累计', 1, 'sjymMaidian,yingyong_maidian,zhibiao_maidian,zhibiaocreate_maidian', 1);
COMMIT;

-- ----------------------------
-- Table structure for event
-- ----------------------------
DROP TABLE IF EXISTS `event`;
CREATE TABLE `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '事件名称',
  `event_code` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '事件代码',
  `event_trigger_mode` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '触发类型',
  `trigger_time` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '触发时机',
  `event_label` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '事件标签',
  `note` text COLLATE utf8_bin COMMENT '备注',
  `general_attr` text COLLATE utf8_bin COMMENT '通用属性',
  `create_time` datetime DEFAULT NULL,
  `state` int DEFAULT '1',
  `update_time` datetime DEFAULT NULL,
  `update_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '更新人',
  `create_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `event_trigger_mode_label` varchar(60) COLLATE utf8_bin DEFAULT NULL COMMENT '触发类型label',
  `event_label_label` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '事件标签label',
  PRIMARY KEY (`event_id`),
  UNIQUE KEY `event_name` (`event_name`),
  UNIQUE KEY `event_name_2` (`event_name`),
  UNIQUE KEY `event_name_3` (`event_name`),
  UNIQUE KEY `event_name_4` (`event_name`),
  UNIQUE KEY `event_name_5` (`event_name`),
  UNIQUE KEY `event_name_6` (`event_name`),
  UNIQUE KEY `event_name_7` (`event_name`),
  UNIQUE KEY `event_name_8` (`event_name`),
  UNIQUE KEY `event_name_9` (`event_name`),
  UNIQUE KEY `event_name_10` (`event_name`),
  UNIQUE KEY `event_name_11` (`event_name`),
  UNIQUE KEY `event_name_12` (`event_name`),
  UNIQUE KEY `event_name_13` (`event_name`),
  UNIQUE KEY `event_name_14` (`event_name`),
  UNIQUE KEY `event_name_15` (`event_name`),
  UNIQUE KEY `event_name_16` (`event_name`),
  UNIQUE KEY `event_name_17` (`event_name`),
  UNIQUE KEY `event_name_18` (`event_name`),
  UNIQUE KEY `event_name_19` (`event_name`),
  UNIQUE KEY `event_name_20` (`event_name`),
  UNIQUE KEY `event_name_21` (`event_name`),
  UNIQUE KEY `event_name_22` (`event_name`),
  UNIQUE KEY `event_name_23` (`event_name`),
  UNIQUE KEY `event_name_24` (`event_name`),
  UNIQUE KEY `event_name_25` (`event_name`),
  UNIQUE KEY `event_name_26` (`event_name`),
  UNIQUE KEY `event_name_27` (`event_name`),
  UNIQUE KEY `event_name_28` (`event_name`),
  UNIQUE KEY `event_name_29` (`event_name`),
  UNIQUE KEY `event_name_30` (`event_name`),
  UNIQUE KEY `event_name_31` (`event_name`),
  UNIQUE KEY `event_name_32` (`event_name`),
  UNIQUE KEY `event_name_33` (`event_name`),
  UNIQUE KEY `event_name_34` (`event_name`),
  UNIQUE KEY `event_name_35` (`event_name`),
  UNIQUE KEY `event_name_36` (`event_name`),
  UNIQUE KEY `event_name_37` (`event_name`),
  UNIQUE KEY `event_name_38` (`event_name`),
  UNIQUE KEY `event_name_39` (`event_name`),
  UNIQUE KEY `event_name_40` (`event_name`),
  UNIQUE KEY `event_name_41` (`event_name`),
  UNIQUE KEY `event_name_42` (`event_name`),
  UNIQUE KEY `event_name_43` (`event_name`),
  UNIQUE KEY `event_name_44` (`event_name`),
  UNIQUE KEY `event_name_45` (`event_name`),
  UNIQUE KEY `event_name_46` (`event_name`),
  UNIQUE KEY `event_name_47` (`event_name`),
  UNIQUE KEY `event_name_48` (`event_name`),
  UNIQUE KEY `event_name_49` (`event_name`),
  UNIQUE KEY `event_name_50` (`event_name`),
  UNIQUE KEY `event_name_51` (`event_name`),
  UNIQUE KEY `event_name_52` (`event_name`),
  UNIQUE KEY `event_name_53` (`event_name`),
  UNIQUE KEY `event_name_54` (`event_name`)
) ENGINE=InnoDB AUTO_INCREMENT=379 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of event
-- ----------------------------
BEGIN;
INSERT INTO `event` VALUES (330, '落地页统计', 'pageview', 'open', '访问落地页', '29,30', '针对小程序而言，就是在小程序的onLoad周期函数中，上报该事件。\r\n\r\n针对vue而言，就是在vue项目中的mounted周期函数中，上报该事件。\r\n\r\n针对react项目而言，就是在react的componentDidMount中，上报该事件。\r\n\r\n针对react的Hook中，一般在一个依赖参数为空的 useEffect 的回调中，上报该事件。', '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, 'Jiangxinyu', 'open', '全部通用,互动通用');
INSERT INTO `event` VALUES (331, '前往页面', 'page', 'jump', '页面跳转', '29', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, 'Jiangxinyu', 'jump', '全部通用');
INSERT INTO `event` VALUES (332, '打开app', 'app', 'open', '打开应用', '29', '统计一个app打开的次数。这里的app，一般是某一个单独的应用，对于前端同学来说，就是一个单独的项目仓库。', '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, 'Jiangxinyu', 'open', '全部通用');
INSERT INTO `event` VALUES (333, '打开详情页', 'detail', 'open', '打开一个详情页面时', '30', '该事件与商品详情页（event_code = goods_detail）区别是，任何打开详情页的行为都是使用该事件进行统计。 而 goods_detail 的事件一般用来描述电商的详情页。同时他们的 event_parameters 中的参数不一样。', '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, 'Jiangxinyu', 'open', '互动通用');
INSERT INTO `event` VALUES (334, '打开商品详情页', 'goods_detail', 'open', '打开一个商品详情页面时', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, 'Jiangxinyu', 'open', '');
INSERT INTO `event` VALUES (335, '会员登陆', 'login', 'click', '点击登录按钮', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, 'Jiangxinyu', 'click', '');
INSERT INTO `event` VALUES (336, '点击参与活动', 'join_act_click', 'click', '点击参互活动', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, 'Jiangxinyu', 'click', '');
INSERT INTO `event` VALUES (337, '成功参与活动', 'join_act_callback', 'callback', '参与活动成功的回调事件', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, 'Jiangxinyu', 'callback', '');
INSERT INTO `event` VALUES (338, '点击店铺收藏', 'favor_click', 'click', '点击收藏店铺', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, 'Jiangxinyu', 'click', '');
INSERT INTO `event` VALUES (339, '成功店铺收藏', 'favor_callback', 'callback', '回调收藏店铺', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, 'Jiangxinyu', 'callback', '');
INSERT INTO `event` VALUES (340, '点击店铺关注', 'follow_click', 'click', '点击店铺关注', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, 'Jiangxinyu', 'click', '');
INSERT INTO `event` VALUES (341, '成功店铺关注', 'follow_callback', 'callback', '成功店铺关注', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, 'Jiangxinyu', 'callback', '');
INSERT INTO `event` VALUES (342, '点击活动签到', 'sign_click', 'click', '点击活动签到', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'click', '');
INSERT INTO `event` VALUES (343, '成功活动签到', 'sign_callback', 'callback', '成功活动签到', '', 'event_type使用click/callback的场景：签到一般会有一个签到的按钮，点击该按钮的时候，使用click；签到成功/失败的回调，使用callback。', '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'callback', '');
INSERT INTO `event` VALUES (344, '完善个人信息', 'perfect_userinfo', 'callback', '完善个人信息提交成功事件', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'callback', '');
INSERT INTO `event` VALUES (345, '点击注册入会', 'register_click', 'click', '点击注册入会', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'click', '');
INSERT INTO `event` VALUES (346, '成功注册入会', 'register_callback', 'callback', '成功注册入会', '', 'event_type使用click/callback的场景：入会一般会有一个入会的按钮，点击该按钮的时候，使用click；入会其实也是一个过程，当入会成功之后，会到达一个入会成功/入会失败的页面，这个时候，使用callback。', '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'callback', '');
INSERT INTO `event` VALUES (347, '完成抽奖', 'wheel', 'callback', '完成抽奖回调', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'callback', '');
INSERT INTO `event` VALUES (348, '点击加入购物车', 'add_cart_click', 'click', '点击加入购物车', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'click', '');
INSERT INTO `event` VALUES (349, '成功加入购物车', 'add_cart_callback', 'callback', '成功加入购物车', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'callback', '');
INSERT INTO `event` VALUES (350, '点击收藏商品', 'favor_goods_click', 'click', '点击收藏商品', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'click', '');
INSERT INTO `event` VALUES (351, '成功收藏商品', 'favor_goods_callback', 'callback', '成功收藏商品', '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'callback', '');
INSERT INTO `event` VALUES (352, '点击分享页面', 'share_click', 'click', '点击分享页面', '', '只要点击分享的按钮就进行事件上报', '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'click', '');
INSERT INTO `event` VALUES (353, '成功分享页面', 'share_callback', 'callback', '成功分享页面', '', '分享成功/失败的回调中上报事件', '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'callback', '');
INSERT INTO `event` VALUES (354, '发送邀请', 'invite', 'click', NULL, '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'click', '');
INSERT INTO `event` VALUES (355, '接受邀请', 'be_invited', 'click', NULL, '', NULL, '', '2021-07-12 18:20:14', 1, '2021-07-12 18:20:14', NULL, NULL, 'click', '');
INSERT INTO `event` VALUES (372, '新会员成功参加活动', 'new_member_join_act_callback', 'callback', '新会员参加活动成功后触发', '29', '新会员成功参加活动', NULL, '2021-08-18 16:17:11', 1, '2021-08-18 16:17:11', NULL, '邓思琳', 'callback', '全部通用');
INSERT INTO `event` VALUES (373, '老会员成功参加活动', 'old_member_join_act_callback', 'callback', '老会员参加活动成功后触发', '29,30,31,32,33,34,35', '老会员成功参加活动', NULL, '2021-08-18 16:17:30', 1, '2021-08-24 14:00:21', NULL, '邓思琳', 'callback', '全部通用,互动通用,天策通用,CRM通用,互动定制,天策定制,CRM定制');
INSERT INTO `event` VALUES (374, '0824', 'o_l_d', 'open', '1', '33,34,35,29,30,32,31', NULL, NULL, '2021-08-24 14:01:10', 1, '2021-08-25 15:56:05', 'admin', NULL, 'open', '互动定制,天策定制,CRM定制,全部通用,互动通用,CRM通用,天策通用');
INSERT INTO `event` VALUES (375, '事件页面-埋点', 'sjymMaidian', 'open', '打开页面', '29', NULL, NULL, '2021-08-26 17:05:47', 1, '2021-08-26 17:31:41', '邓思琳', '邓思琳', 'open', '全部通用');
INSERT INTO `event` VALUES (376, '应用页面-埋点', 'yingyong_maidian', 'open', 'open', '29', NULL, NULL, '2021-08-26 17:06:37', 1, '2021-08-26 17:31:32', '邓思琳', '邓思琳', 'open', '全部通用');
INSERT INTO `event` VALUES (377, '指标页面-埋点', 'zhibiao_maidian', 'open', '2222', '29', NULL, NULL, '2021-08-26 17:07:31', 1, '2021-08-26 17:31:20', '邓思琳', '邓思琳', 'open', '全部通用');
INSERT INTO `event` VALUES (378, '指标创建-埋点', 'zhibiaocreate_maidian', 'open', '2222', '29,30,31,32,33,34,35', NULL, NULL, '2021-08-26 17:08:25', 1, '2021-08-26 17:58:27', 'admin', '邓思琳', 'open', '全部通用,互动通用,天策通用,CRM通用,互动定制,天策定制,CRM定制');
COMMIT;

-- ----------------------------
-- Table structure for eventAttribute
-- ----------------------------
DROP TABLE IF EXISTS `eventAttribute`;
CREATE TABLE `eventAttribute` (
  `event_id` int NOT NULL,
  `attribute_id` int NOT NULL,
  PRIMARY KEY (`event_id`,`attribute_id`),
  UNIQUE KEY `eventAttribute_event_id_attribute_id_unique` (`event_id`,`attribute_id`),
  KEY `attribute_id` (`attribute_id`),
  CONSTRAINT `eventattribute_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `eventattribute_ibfk_2` FOREIGN KEY (`attribute_id`) REFERENCES `attribute` (`attribute_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of eventAttribute
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for indicator
-- ----------------------------
DROP TABLE IF EXISTS `indicator`;
CREATE TABLE `indicator` (
  `indicator_id` int NOT NULL AUTO_INCREMENT,
  `indicator_name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标名称',
  `indicator_type` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '指标类型',
  `indicator_level` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '一级指标',
  `indicator_code` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标代码',
  `indicator_label` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标标签',
  `note` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL,
  `state` int DEFAULT '1',
  `update_time` datetime DEFAULT NULL,
  `update_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '更新人',
  `create_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `indicator_type_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '指标类型label',
  `indicator_level_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '一级指标label',
  `indicator_label_label` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标标签label',
  `relationship_event` int DEFAULT '1' COMMENT '事件关系',
  PRIMARY KEY (`indicator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=483 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of indicator
-- ----------------------------
BEGIN;
INSERT INTO `indicator` VALUES (439, 'PV', 'frequency', 'pv', 'pv', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '次数', 'PV', NULL, 1);
INSERT INTO `indicator` VALUES (440, '参与活动次数', 'frequency', 'cyhdcs', 'join_act_pv_click', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '次数', '参与活动次数', NULL, 1);
INSERT INTO `indicator` VALUES (441, '参与活动成功次数', 'frequency', 'cyhdcs', 'join_act_pv_callback', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '次数', '参与活动次数', NULL, 1);
INSERT INTO `indicator` VALUES (442, '活动分享次数', 'frequency', 'hdfxcs', 'share_pv_click', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '次数', '活动分享次数', NULL, 1);
INSERT INTO `indicator` VALUES (443, '活动分享成功次数', 'frequency', 'hdfxcs', 'share_pv_callback', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '次数', '活动分享次数', NULL, 1);
INSERT INTO `indicator` VALUES (444, '发出邀请次数', 'frequency', 'fcyqcs', 'invite_pv', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '次数', '发出邀请次数', NULL, 1);
INSERT INTO `indicator` VALUES (445, '接受邀请次数', 'frequency', 'jsyqcs', 'invited_pv', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '次数', '接受邀请次数', NULL, 1);
INSERT INTO `indicator` VALUES (446, 'APP打开次数', 'frequency', 'appdkcs', 'app_pv', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '次数', 'APP打开次数', NULL, 1);
INSERT INTO `indicator` VALUES (447, NULL, 'frequency', 'qtfwcs', NULL, '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, NULL, '次数', '其他访问次数', NULL, 1);
INSERT INTO `indicator` VALUES (448, NULL, 'frequency', NULL, NULL, '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, NULL, '次数', '其他点击次数', NULL, 1);
INSERT INTO `indicator` VALUES (449, 'UV', 'people', 'uv', 'uv', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', 'UV', NULL, 1);
INSERT INTO `indicator` VALUES (450, '参与活动人数', 'people', 'cyhdrs', 'join_act_uv_click', '', NULL, '2021-07-12 18:21:30', 1, '2021-08-09 11:19:01', 'admin', 'Jiangxinyu', '人数', '参与活动人数', '', 1);
INSERT INTO `indicator` VALUES (451, '参与活动成功人数', 'people', 'cyhdrs', 'join_act_uv_callback', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '参与活动人数', NULL, 1);
INSERT INTO `indicator` VALUES (452, '关注店铺人数', 'people', 'gzdprs', 'follow_shop_uv_click', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '关注店铺人数', NULL, 1);
INSERT INTO `indicator` VALUES (453, '关注店铺成功人数', 'people', 'gzdprs', 'follow_shop_uv_callback', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '关注店铺人数', NULL, 1);
INSERT INTO `indicator` VALUES (454, '收藏店铺人数', 'people', 'scdprs', 'favor_shop_uv_click', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '收藏店铺人数', NULL, 1);
INSERT INTO `indicator` VALUES (455, '收藏店铺成功人数', 'people', 'scdprs', 'favor_shop_uv_callback', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '收藏店铺人数', NULL, 1);
INSERT INTO `indicator` VALUES (456, '收藏商品人数', 'people', 'scsprs', 'favor_goods_uv_click', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '收藏商品人数', NULL, 1);
INSERT INTO `indicator` VALUES (457, '收藏商品成功人数', 'people', 'scsprs', 'favor_goods_uv_callback', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '收藏商品人数', NULL, 1);
INSERT INTO `indicator` VALUES (458, '加购商品人数', 'people', 'jgsprs', 'add_cart_uv_click', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '加购商品人数', NULL, 1);
INSERT INTO `indicator` VALUES (459, '加购商品成功人数', 'people', 'jgsprs', 'add_cart_uv_callback', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '加购商品人数', NULL, 1);
INSERT INTO `indicator` VALUES (460, '发出邀请人数', 'people', 'fcyqrs', 'invite_uv', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '发出邀请人数', NULL, 1);
INSERT INTO `indicator` VALUES (461, '接受邀请人数', 'people', 'jsyqrs', 'invited_uv', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '接受邀请人数', NULL, 1);
INSERT INTO `indicator` VALUES (462, '活动分享人数', 'people', 'hdfxrs', 'share_uv_click', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '活动分享人数', NULL, 1);
INSERT INTO `indicator` VALUES (463, '活动分享成功人数', 'people', 'hdfxrs', 'share_uv_callback', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '活动分享人数', NULL, 1);
INSERT INTO `indicator` VALUES (464, '新增会员人数', 'people', 'xzhyrs', 'membership_uv_click', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '新增会员人数', NULL, 1);
INSERT INTO `indicator` VALUES (465, '新增会员成功人数', 'people', 'xzhyrs', 'membership_uv_callback', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '人数', '新增会员人数', NULL, 1);
INSERT INTO `indicator` VALUES (466, NULL, 'people', 'qtrs', NULL, '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, NULL, '人数', '其他人数', NULL, 1);
INSERT INTO `indicator` VALUES (467, '页面平均停留时间', 'time', 'ympjtlsj', 'page_length', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '时长', '页面平均停留时间', NULL, 1);
INSERT INTO `indicator` VALUES (468, '存留人数', 'retained', 'clrs', 'survivors', '', NULL, '2021-07-12 18:21:30', 1, '2021-07-12 18:21:30', NULL, 'Jiangxinyu', '留存', '存留人数', NULL, 1);
INSERT INTO `indicator` VALUES (473, '新会员成功参与活动人数', 'people', 'cyhdrs', 'new_join_act_pv_callback', '20', NULL, '2021-08-18 17:21:45', 1, '2021-08-18 17:21:45', NULL, '邓思琳', '人数', '参与活动人数', '参与用户', 0);
INSERT INTO `indicator` VALUES (474, '老会员成功参与活动人数', 'people', 'cyhdrs', 'old_join_act_pv_callback', '20,21,22,23,115,116,24,25,26,27,121', '老会员成功参与活动人数', '2021-08-18 17:22:26', 1, '2021-08-25 15:53:53', NULL, '邓思琳', '人数', '参与活动人数', '', 0);
INSERT INTO `indicator` VALUES (475, '0825指标', 'frequency', 'cyhdcs', 'no_', '20,21,22,23,115,116,24,25,26,27,121', NULL, '2021-08-24 14:02:35', 1, '2021-08-24 14:02:35', NULL, NULL, '次数', '参与活动次数', '参与用户1,会员1,被邀用户,访问用户,指标标签1,1,2,3,4,5,6,7,8,9,0,,认知,兴趣,转化,忠诚,12222222', 1);
INSERT INTO `indicator` VALUES (476, '关联', 'frequency', 'cyhdcs', 'no_no', '20,21,23,22,115,116,24,25,26,27,121', NULL, '2021-08-25 16:15:09', 1, '2021-08-25 16:15:09', NULL, NULL, '次数', '参与活动次数', '参与用户1,会员1,访问用户,被邀用户,指标标签1,1,2,3,4,5,6,7,8,9,0,,认知,兴趣,转化,忠诚,12222222', 0);
INSERT INTO `indicator` VALUES (477, '总访问人数-埋点', 'frequency', 'cyhdcs', 'zfwrsMaidian', '20,21', NULL, '2021-08-26 17:03:27', 1, '2021-08-26 17:32:34', '邓思琳', '邓思琳', '次数', '参与活动次数', '参与用户1,会员1', 0);
INSERT INTO `indicator` VALUES (478, '事件页面次数-埋点', 'frequency', 'cyhdcs', 'shijainyemian_maidian', '20', NULL, '2021-08-26 17:10:15', 1, '2021-08-26 17:32:15', '邓思琳', '邓思琳', '次数', '参与活动次数', '参与用户1', 1);
INSERT INTO `indicator` VALUES (479, '指标次数列表-埋点', 'frequency', 'pv', 'zhibiaoyemian_maidian', '20', NULL, '2021-08-26 17:11:22', 1, '2021-08-26 17:32:09', '邓思琳', '邓思琳', '次数', 'PV', '参与用户1', 1);
INSERT INTO `indicator` VALUES (480, '指标创建次数-埋点', 'frequency', 'cyhdcs', 'zhibaiochuangjian_maidian', '20', NULL, '2021-08-26 17:12:07', 1, '2021-08-26 17:32:02', '邓思琳', '邓思琳', '次数', '参与活动次数', '参与用户1', 1);
INSERT INTO `indicator` VALUES (481, '指标总次数-埋点', 'frequency', 'pv', 'zhibiaozongcishu_maidian', '20', NULL, '2021-08-26 17:12:48', 1, '2021-08-26 17:31:56', '邓思琳', '邓思琳', '次数', 'PV', '参与用户1', 1);
INSERT INTO `indicator` VALUES (482, '应用次数-埋点', 'frequency', 'pv', 'yingyongcishu_maidian', '20,21,22,23,115,116,24,25,26,27,121', NULL, '2021-08-26 17:13:31', 1, '2021-08-26 18:12:45', 'admin', '邓思琳', '次数', 'PV', '参与用户1,会员1,被邀用户,访问用户,指标标签1,1,2,3,4,5,6,7,8,9,0,,认知,兴趣,转化,忠诚,12222222', 1);
COMMIT;

-- ----------------------------
-- Table structure for indicatorEvent
-- ----------------------------
DROP TABLE IF EXISTS `indicatorEvent`;
CREATE TABLE `indicatorEvent` (
  `indicator_id` int NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`indicator_id`,`event_id`),
  UNIQUE KEY `indicatorEvent_indicator_id_event_id_unique` (`indicator_id`,`event_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `indicatorevent_ibfk_1` FOREIGN KEY (`indicator_id`) REFERENCES `indicator` (`indicator_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `indicatorevent_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of indicatorEvent
-- ----------------------------
BEGIN;
INSERT INTO `indicatorEvent` VALUES (439, 330);
INSERT INTO `indicatorEvent` VALUES (440, 330);
INSERT INTO `indicatorEvent` VALUES (441, 330);
INSERT INTO `indicatorEvent` VALUES (440, 331);
INSERT INTO `indicatorEvent` VALUES (450, 336);
INSERT INTO `indicatorEvent` VALUES (473, 372);
INSERT INTO `indicatorEvent` VALUES (476, 372);
INSERT INTO `indicatorEvent` VALUES (441, 373);
INSERT INTO `indicatorEvent` VALUES (474, 373);
INSERT INTO `indicatorEvent` VALUES (476, 373);
INSERT INTO `indicatorEvent` VALUES (477, 375);
INSERT INTO `indicatorEvent` VALUES (478, 375);
INSERT INTO `indicatorEvent` VALUES (477, 376);
INSERT INTO `indicatorEvent` VALUES (482, 376);
INSERT INTO `indicatorEvent` VALUES (477, 377);
INSERT INTO `indicatorEvent` VALUES (479, 377);
INSERT INTO `indicatorEvent` VALUES (481, 377);
INSERT INTO `indicatorEvent` VALUES (477, 378);
INSERT INTO `indicatorEvent` VALUES (480, 378);
INSERT INTO `indicatorEvent` VALUES (481, 378);
COMMIT;

-- ----------------------------
-- Table structure for report
-- ----------------------------
DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '更新人',
  `create_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `state` int DEFAULT '1',
  `report_name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '报表名称',
  `application_id` int DEFAULT NULL,
  `data_state` int DEFAULT '0' COMMENT '数据状态',
  PRIMARY KEY (`report_id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `application` (`application_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of report
-- ----------------------------
BEGIN;
INSERT INTO `report` VALUES (58, '2021-08-09 10:56:37', '2021-08-11 17:04:49', 'admin', 'admin', 1, 'testplatForm', 85, 0);
INSERT INTO `report` VALUES (59, '2021-08-18 16:24:11', '2021-08-19 11:14:56', '邓思琳', '邓思琳', 1, '戴森互动报名抽奖', 87, 0);
INSERT INTO `report` VALUES (63, '2021-08-24 14:59:32', '2021-08-24 14:59:32', NULL, '邓思琳', 1, '戴森互动抽奖京东', 88, 0);
INSERT INTO `report` VALUES (68, '2021-08-27 09:27:29', '2021-08-27 09:27:29', NULL, 'admin', 1, 'test-maidian', 91, 0);
COMMIT;

-- ----------------------------
-- Table structure for reportBetween
-- ----------------------------
DROP TABLE IF EXISTS `reportBetween`;
CREATE TABLE `reportBetween` (
  `report_id` int NOT NULL,
  `card_ids` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `table_ids` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `trend_ids` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of reportBetween
-- ----------------------------
BEGIN;
INSERT INTO `reportBetween` VALUES (58, '4D7F0544-822F-4490-86FE-C85D1B314E3D,9006B5FF-2354-43E5-86F7-329E686346C3,DB1D4473-2B3C-4690-B4BC-BEC77C1603BA', '6D37339D-E6A4-46A7-9F22-D022159EAAF7,A4FBCDF9-003C-48B4-9D11-68B7292D42D8,E551910D-B03E-400B-948A-B2544C8BB0CA', 'DA586065-6317-4EBD-AB45-D543EAED4AF0,DCF5C60D-6C96-480E-AF26-57FE2E1B2E0E,EF5BE4D9-BA49-4951-9834-D28DBA5C4F3A');
INSERT INTO `reportBetween` VALUES (59, '15039BFF-C0FD-4977-A1CC-C7334FCB983C,A8B503F1-80ED-467E-9FF9-6721970719DD,CB3F8306-6A27-42F3-8571-9857E91CCA66,4C11F4B3-B6F4-4C9A-8728-D2095F475B88', '79A729A2-91D3-4B1C-A60E-1BA21E651E4A,CCC927F0-16AA-469F-BF95-55D0C149748F', 'A1D3F2EF-5FA8-40F6-87DB-A2DEE392DFF8,B226754B-B1A3-4263-9945-489DEE0C03FD,FD8B0B39-CA39-41E5-A2F4-576904617390,C5323229-9E8F-4798-B775-693F437ED7AF,7611D0B7-FC8B-4B04-B528-BA1EF18DDB5E');
INSERT INTO `reportBetween` VALUES (63, '5FDB7DC3-5207-4B62-9404-2E36251C1CF1,D0CF31D9-3B79-4BE7-8769-3CD075CCB2FF', '107AF236-5127-4F4A-AAB3-18EB047B67E0', 'CB156C5F-A586-40E5-B6CF-F5D543547E15');
INSERT INTO `reportBetween` VALUES (68, 'F1E6BD34-6864-4A79-8BD6-7500D7E588B2,367E84B4-214E-4D9F-AA49-F2B72003416A,0FD9964B-6527-4894-8F70-89EA05E9FA93,BC548201-8F46-4DB1-86F4-B200AAA93335,3854BCF8-D7A3-4CF3-96A2-8B3DE4E3C65B,56BFAAFA-4A95-4A34-B4F6-D6FAEBD2ECCC', 'FE232D4C-C88E-4310-AAAE-2C4C0C3D24CD,0A414C02-1D7A-4A00-AC46-CE3098EBC0D8,9A0047D1-83FC-49A2-A20B-F13C052F11CB,A241E8C0-19FD-4350-BF81-A6768D5DB6F0,F25C17FE-F61F-4591-A73F-98682A5B8016,BA78ADB5-8BFC-4851-8B5C-CA1390697EF8', 'E96D2877-E5F0-4642-95BC-983749136C48,CB2DC4A4-B800-4781-8E92-4AF3EACCCA70,ECA89EE6-B4A5-4493-BDE5-9AD83EA5FFE5,25302E88-B1D9-47A7-98CC-F09F13500448,E9A4F7A9-EC24-4AEE-8269-5EE2F4AE6CE9,B0DACEE9-58C4-4D1E-A909-7AAECDB0D60F');
COMMIT;

-- ----------------------------
-- Table structure for table
-- ----------------------------
DROP TABLE IF EXISTS `table`;
CREATE TABLE `table` (
  `table_id` varchar(50) COLLATE utf8_bin NOT NULL,
  `indicator_id` int DEFAULT NULL COMMENT '指标id',
  `indicator_name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标名称',
  `indicator_show_name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标显示名称',
  `indicator_desc` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标说明',
  `time_dimension` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '时间维度',
  `time_dimension_label` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '时间维度label',
  `is_import` int DEFAULT '1' COMMENT '是否支持导出',
  `state` int DEFAULT '1',
  `events` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标下对应的事件codes',
  `show_type` int DEFAULT '1' COMMENT '1次数0人数',
  PRIMARY KEY (`table_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of table
-- ----------------------------
BEGIN;
INSERT INTO `table` VALUES ('0A414C02-1D7A-4A00-AC46-CE3098EBC0D8', 478, '事件页面次数-埋点', 'event', 'event', 'accord_day', '按天', 1, 1, 'sjymMaidian', 1);
INSERT INTO `table` VALUES ('107AF236-5127-4F4A-AAB3-18EB047B67E0', 439, 'PV', 'pv', '', 'accord_day', '按天', 1, 1, 'pageview', 1);
INSERT INTO `table` VALUES ('6D37339D-E6A4-46A7-9F22-D022159EAAF7', 450, '参与活动人数', '参与活动人数', '参与活动人数', 'accord_day', '按天', 1, 1, '', 1);
INSERT INTO `table` VALUES ('79A729A2-91D3-4B1C-A60E-1BA21E651E4A', 473, '新会员成功参与活动人数', '新会员成功参与活动人数', '', 'accord_day', '按天', 1, 1, 'new_member_join_act_callback', 1);
INSERT INTO `table` VALUES ('9A0047D1-83FC-49A2-A20B-F13C052F11CB', 479, '指标次数列表-埋点', 'indicator-list', 'indicator-list', 'accord_day', '按天', 1, 1, 'zhibiao_maidian', 1);
INSERT INTO `table` VALUES ('A241E8C0-19FD-4350-BF81-A6768D5DB6F0', 480, '指标创建次数-埋点', 'indicator-creat', 'indicator-create', 'accord_day', '按天', 1, 1, 'zhibiaocreate_maidian', 1);
INSERT INTO `table` VALUES ('A4FBCDF9-003C-48B4-9D11-68B7292D42D8', 439, 'PV', 'PV', 'pv', 'accord_day', '按天', 1, 1, 'pageview', 1);
INSERT INTO `table` VALUES ('BA78ADB5-8BFC-4851-8B5C-CA1390697EF8', 482, '应用次数-埋点', 'app', 'app', 'accord_day', '按天', 1, 1, 'yingyong_maidian', 1);
INSERT INTO `table` VALUES ('CCC927F0-16AA-469F-BF95-55D0C149748F', 474, '老会员成功参与活动人数', '老会员成功参与活动人数', '', 'accord_day', '按天', 1, 1, 'old_member_join_act_callback', 1);
INSERT INTO `table` VALUES ('E551910D-B03E-400B-948A-B2544C8BB0CA', 440, '参与活动次数', '参与活动次数', '参与活动次数', 'accord_day', '按天', 1, 1, 'pageview,page', 1);
INSERT INTO `table` VALUES ('F25C17FE-F61F-4591-A73F-98682A5B8016', 481, '指标总次数-埋点', 'indicator-all', 'indicator-all', 'accord_day', '按天', 1, 1, 'zhibiao_maidian,zhibiaocreate_maidian', 1);
INSERT INTO `table` VALUES ('FE232D4C-C88E-4310-AAAE-2C4C0C3D24CD', 477, '总访问人数-埋点', 'all', 'all', 'accord_day', '按天', 1, 1, 'sjymMaidian,yingyong_maidian,zhibiao_maidian,zhibiaocreate_maidian', 1);
COMMIT;

-- ----------------------------
-- Table structure for theLabel
-- ----------------------------
DROP TABLE IF EXISTS `theLabel`;
CREATE TABLE `theLabel` (
  `fid` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `label` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `state` int DEFAULT '1',
  `is_lower` int DEFAULT '1',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '更新人',
  `create_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `number` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of theLabel
-- ----------------------------
BEGIN;
INSERT INTO `theLabel` VALUES (0, 1, '标签', '指标标签', 1, 0, NULL, '2021-08-10 15:04:06', 'admin', 'admin', 0);
INSERT INTO `theLabel` VALUES (0, 2, '标签', '事件标签', 1, 0, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (0, 3, '标签', '属性标签', 1, 0, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (0, 4, '标签', '应用标签', 1, 0, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (1, 10, '指标标签', '指标分析对象', 1, 0, NULL, '2021-08-10 15:04:22', 'admin', 'admin', 0);
INSERT INTO `theLabel` VALUES (1, 11, '指标标签', '指标所属阶段', 1, 0, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (10, 20, '指标分析对象', '参与用户', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (10, 22, '指标分析对象', '被邀用户', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (10, 23, '指标分析对象', '访问用户', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (11, 24, '指标所属阶段', '认知', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (11, 25, '指标所属阶段', '兴趣', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (11, 26, '指标所属阶段', '转化', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (11, 27, '指标所属阶段', '忠诚', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (2, 28, '事件标签', '事件通用性', 1, 0, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (28, 29, '事件通用性', '全部通用', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (28, 30, '事件通用性', '互动通用', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (28, 31, '事件通用性', '天策通用', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (28, 32, '事件通用性', 'CRM通用', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (28, 33, '事件通用性', '互动定制', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (28, 34, '事件通用性', '天策定制', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (28, 35, '事件通用性', 'CRM定制', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (3, 36, '属性标签', '属性通用性', 1, 0, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (36, 37, '属性通用性', '全部通用', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (36, 38, '属性通用性', '互动通用', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (36, 39, '属性通用性', '天策通用', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (36, 40, '属性通用性', 'CRM通用', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (36, 41, '属性通用性', '互动定制', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (36, 42, '属性通用性', '天策定制', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (36, 43, '属性通用性', 'CRM定制', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (3, 44, '属性标签', '属性对象', 1, 0, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (44, 45, '属性对象', '会员', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (44, 46, '属性对象', '品牌', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (4, 47, '应用标签', '互动应用价值', 1, 0, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (47, 48, '互动应用价值', '拉新', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (47, 49, '互动应用价值', '促活', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (47, 50, '互动应用价值', '转化', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (47, 51, '互动应用价值', '复购', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (47, 52, '互动应用价值', '传播', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (4, 53, '应用标签', '互动应用类型', 1, 0, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (53, 54, '互动应用类型', '活动抽奖', 1, 1, NULL, NULL, NULL, 'admin', 1);
INSERT INTO `theLabel` VALUES (53, 55, '互动应用类型', '裂变引流', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (53, 56, '互动应用类型', '商业促销', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (53, 57, '互动应用类型', '长期活动', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (53, 58, '互动应用类型', '投票活动', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (53, 59, '互动应用类型', '答题活动', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (53, 60, '互动应用类型', '现场活动', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (4, 61, '应用标签', '大促阶段', 1, 0, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (61, 62, '大促阶段', '蓄水', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (61, 63, '大促阶段', '第一波', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (61, 64, '大促阶段', '第二波', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (4, 65, '应用标签', '所属业务线', 1, 0, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (65, 66, '所属业务线', '商家平台', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (65, 67, '所属业务线', '数据策略', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (65, 68, '所属业务线', '互动营销', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (65, 69, '所属业务线', '客户运营', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (4, 70, '应用标签', '所属互动', 1, 0, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 71, '所属互动', '签到', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 72, '所属互动', '大转盘', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 73, '所属互动', '关注店铺', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 74, '所属互动', '收集会员信息', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 75, '所属互动', '问卷调查', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 76, '所属互动', '疯狂老虎机', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 77, '所属互动', '排队', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 78, '所属互动', '品牌环游', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 79, '所属互动', '翻卡抽奖', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 80, '所属互动', '许愿购物袋', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 81, '所属互动', '试用活动', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 82, '所属互动', '九宫格', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 83, '所属互动', '文章互动', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 84, '所属互动', '团购', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 85, '所属互动', '答题有礼', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 86, '所属互动', '裂变宝', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 87, '所属互动', '派小样', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 88, '所属互动', '大促搭配购', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 89, '所属互动', '导购助手', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 90, '所属互动', '兑换活动', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 91, '所属互动', '邀请预购裂变', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 92, '所属互动', '邀请注册裂变', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 93, '所属互动', '邀请好友签到', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 94, '所属互动', '邀请好友注册', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 95, '所属互动', '邀请好友关注店铺', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 96, '所属互动', '邀请好友抽奖', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 97, '所属互动', '邀请好友完善信息', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 98, '所属互动', '分享签到', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 99, '所属互动', '分享注册', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 100, '所属互动', '分享关注店铺', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 101, '所属互动', '分享抽奖', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (70, 102, '所属互动', '分享收集会员信息', 1, 1, NULL, NULL, NULL, 'admin', 0);
INSERT INTO `theLabel` VALUES (0, 135, '标签', '小程序', 1, 0, '2021-08-26 11:31:22', '2021-08-26 11:31:22', NULL, '李武帝', 0);
COMMIT;

-- ----------------------------
-- Table structure for trend
-- ----------------------------
DROP TABLE IF EXISTS `trend`;
CREATE TABLE `trend` (
  `trend_id` varchar(50) COLLATE utf8_bin NOT NULL,
  `indicator_id` int DEFAULT NULL COMMENT '指标id',
  `indicator_name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标名称',
  `indicator_show_name` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标显示名称',
  `indicator_desc` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标说明',
  `time_scope` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '时间范围',
  `state` int DEFAULT '1',
  `time_scope_label` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '时间范围label',
  `events` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '指标下对应的事件codes',
  `show_type` int DEFAULT '1' COMMENT '1次数0人数',
  PRIMARY KEY (`trend_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of trend
-- ----------------------------
BEGIN;
INSERT INTO `trend` VALUES ('25302E88-B1D9-47A7-98CC-F09F13500448', 480, '指标创建次数-埋点', 'indicator-creat', 'indicator-create', 'recent_14day', 1, '最近14天', 'zhibiaocreate_maidian', 1);
INSERT INTO `trend` VALUES ('7611D0B7-FC8B-4B04-B528-BA1EF18DDB5E', 474, '老会员成功参与活动人数', '老会员参与活动人数', '', 'recent_14day', 1, '最近14天', 'old_member_join_act_callback', 0);
INSERT INTO `trend` VALUES ('A1D3F2EF-5FA8-40F6-87DB-A2DEE392DFF8', 439, 'PV', 'PV', '', 'recent_14day', 1, '最近14天', 'pageview', 1);
INSERT INTO `trend` VALUES ('B0DACEE9-58C4-4D1E-A909-7AAECDB0D60F', 482, '应用次数-埋点', 'app', 'app', 'recent_14day', 1, '最近14天', 'yingyong_maidian', 1);
INSERT INTO `trend` VALUES ('B226754B-B1A3-4263-9945-489DEE0C03FD', 449, 'UV', 'UV', '', 'recent_14day', 1, '最近14天', '', 1);
INSERT INTO `trend` VALUES ('C5323229-9E8F-4798-B775-693F437ED7AF', 473, '新会员成功参与活动人数', '新会员参与活动人数', '', 'recent_14day', 1, '最近14天', 'new_member_join_act_callback', 1);
INSERT INTO `trend` VALUES ('CB156C5F-A586-40E5-B6CF-F5D543547E15', 439, 'PV', 'pv', '', 'recent_14day', 1, '最近14天', 'pageview', 1);
INSERT INTO `trend` VALUES ('CB2DC4A4-B800-4781-8E92-4AF3EACCCA70', 478, '事件页面次数-埋点', 'event', 'event', 'recent_14day', 1, '最近14天', 'sjymMaidian', 1);
INSERT INTO `trend` VALUES ('DA586065-6317-4EBD-AB45-D543EAED4AF0', 439, 'PV', 'pv', 'pv', 'recent_14day', 1, '最近14天', 'pageview', 1);
INSERT INTO `trend` VALUES ('DCF5C60D-6C96-480E-AF26-57FE2E1B2E0E', 440, '参与活动次数', '参与活动次数', '参与活动次数', 'recent_14day', 1, '最近14天', 'pageview,page', 1);
INSERT INTO `trend` VALUES ('E96D2877-E5F0-4642-95BC-983749136C48', 477, '总访问人数-埋点', 'all', 'all', 'recent_14day', 1, '最近14天', 'sjymMaidian,yingyong_maidian,zhibiao_maidian,zhibiaocreate_maidian', 1);
INSERT INTO `trend` VALUES ('E9A4F7A9-EC24-4AEE-8269-5EE2F4AE6CE9', 481, '指标总次数-埋点', 'indicator-all', 'indicator-all', 'recent_14day', 1, '最近14天', 'zhibiao_maidian,zhibiaocreate_maidian', 1);
INSERT INTO `trend` VALUES ('ECA89EE6-B4A5-4493-BDE5-9AD83EA5FFE5', 479, '指标次数列表-埋点', 'indicator-list', 'indicator-list', 'recent_14day', 1, '最近14天', 'zhibiao_maidian', 1);
INSERT INTO `trend` VALUES ('EF5BE4D9-BA49-4951-9834-D28DBA5C4F3A', 450, '参与活动人数', '参与活动人数', '参与活动人数', 'recent_14day', 1, '最近14天', '', 1);
INSERT INTO `trend` VALUES ('FD8B0B39-CA39-41E5-A2F4-576904617390', 451, '参与活动成功人数', '活动', '', 'recent_14day', 1, '最近14天', '', 1);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `realname` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role` int DEFAULT '1',
  `status` int DEFAULT '1',
  `remark` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role_name` varchar(11) COLLATE utf8_bin DEFAULT '普通用户',
  `user_use` int DEFAULT '1' COMMENT '是否启用',
  `update_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '更新人',
  `create_people` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '创建人',
  `state` int DEFAULT '1',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'admin', 'admin', 'BEA15426B7AF9DC91F3F583AFDD6443D', NULL, NULL, 10, 1, NULL, '普通用户', 0, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (2, '付远征', '付远征', '80941D42AA9A041FCD75A26DD6A506BC', NULL, '1329019191', 10, 1, NULL, '普通用户', 1, 'admin', 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (3, '高文婧', '高文婧', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (4, '蒋馨玉 ', '蒋馨玉 ', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (5, '李小双', '李小双', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (6, '井晓杰  ', '井晓杰  ', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (7, '刘婧', '刘婧', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (8, '杨琛璐', '杨琛璐', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (9, '李嘉', '李嘉', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (10, '李文氽', '李文氽', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (11, '邓晓冬', '邓晓冬', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (12, '刘兵', '刘兵', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (13, '李培林', '李培林', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (14, '谢武', '谢武', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (15, '张扬', '张扬', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (16, '梁瑜', '梁瑜', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (17, '魏霖', '魏霖', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (18, '曾诗芸', '曾诗芸', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (19, '王杰', '王杰', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (20, '王超', '王超', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (21, '杨宝鹏', '杨宝鹏', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (22, '柯遵炎', '柯遵炎', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (23, '李武帝', '李武帝', '80941D42AA9A041FCD75A26DD6A506BC', NULL, NULL, 10, 1, NULL, '普通用户', 1, NULL, 'admin', 1, NULL, NULL);
INSERT INTO `user` VALUES (31, 'tianwb', '我我我我我', '80941D42AA9A041FCD75A26DD6A506BC', NULL, '13290177883', 10, 1, '333333', '普通用户', 1, NULL, '李武帝', 1, '2021-08-27 14:46:54', '2021-08-27 14:46:54');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
