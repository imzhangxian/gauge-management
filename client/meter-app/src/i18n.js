import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            'menu.signout': 'Sign out',
            'menu.meters': 'Meters',
            'menu.tasks': 'Tasks',
            'menu.charts': 'Charts',
            'menu.setting': 'Setting',
            'meter.search.placeholder': 'Input search criteria, e.g. number, name ...', 
            'meter.search.button.clear': 'Clear', 
            'th.number': 'Number', 
            'th.name': 'Name', 
            'th.address': 'Address',
            'th.update_on': 'Updated On',
            'title.meter': 'Meter',
            'title.readings.history': 'Historical Readings', 
            'label.input_reading': 'Input and Upload Reading', 
            'button.read': 'Read', 
            'button.close': 'Close', 
            'title.charts': 'Charts', 
            'title.setting': 'Setting', 
            'button.signin': 'Sign In', 
            'sign.failed.msg': 'Sign in faied. Please check username/password.',
            'title.task': 'Task',
            'button.create_order': 'Create Workorder',
            'title.workorder': 'Create Work order', 
            'dialog.title.create_workorder': 'Create Work order', 
            'option.placeholder.wotype': '--- select work order type ---', 
            'button.create': 'Create',
            'button.back': '<< Back',
            'task.checker.placeholder': 'Select Checker',
            'task.approver.placeholder': 'Select Approver',
            'taskform.button.submit': 'Submit',
            'taskform.button.approve': 'Approve',
            'taskform.button.reject': 'Reject',
            'task.err.missing_checker': 'Error: must select a checker!',
            'task.err.missing_approver': 'Error: must select an approver!',
            'fixed.last.entry': ''
        }
    },
    cn: {
        translation: {
            'menu.signout': '退出登录',
            'menu.meters': '表计读数',
            'menu.tasks': '任务工单',
            'menu.charts': '图表报告',
            'menu.setting': '偏好设置',
            'meter.search.placeholder': '搜索表计，输入编号、名称等', 
            'meter.search.button.clear': '清除', 
            'th.number': '编号', 
            'th.name': '名称', 
            'th.address': '地址',
            'th.updated_on': '更新时间',
            'title.meter': '表计',
            'title.readings.history': '历史读数', 
            'label.input_reading': '请抄报读数', 
            'button.read': '抄报', 
            'button.close': '关闭', 
            'title.charts': '图表', 
            'title.setting': '设置', 
            'button.signin': '登录', 
            'sign.failed.msg': '登录失败，请检查用户名/口令',
            'title.task': '任务',
            'button.create_order': '新建工单',
            'title.workorder': '工单', 
            'dialog.title.create_workorder': '创建工单', 
            'option.placeholder.wotype': '--- 选择工单类型 ---', 
            'button.create': '创建',
            'button.back': '<< 返回',
            'task.checker.placeholder': '请选择校对人员',
            'task.approver.placeholder': '请选择审核人员',
            'taskform.button.submit': '提交',
            'taskform.button.approve': '通过',
            'taskform.button.reject': '驳回',
            'task.err.missing_checker': '未选择校对人员！',
            'task.err.missing_approver': '未选择审核人员！',
            'fixed.last.entry': ''
        }
    }
};

i18n
    .use(initReactI18next) 
    .init({
        resources,
        lng: "cn", 
        interpolation: {
            escapeValue: false 
        }
    })

export default i18n
