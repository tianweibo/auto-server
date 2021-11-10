const indicatorExcel = {
    指标名称: 'indicator_name',
    指标代码: 'indicator_code',
    指标类型:'indicator_type',
    一级指标: 'indicator_level',
    指标标签: 'indicator_label',
    备注:'note',
    创建时间:'create_time',
    创建人:'create_people'
};
const eventExcel = {
    事件名称: 'event_name',
    事件代码: 'event_code',
    触发类型:'event_trigger_mode',
    触发时机: 'trigger_time',
    备注:'note',
    事件标签: 'event_label',
    属性:'general_attr',
    创建人:'create_people'
};

const triggerMode={ //触发类型
    open:"open",
    click:"click",
    slide:"slide",
    callback:"callback",
    jump:"jump",
    play:"play"
}
module.exports={
	eventExcel ,indicatorExcel,triggerMode
}