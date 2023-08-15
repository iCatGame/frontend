import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Settings = (profile) => {

    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col content-center items-center justify-center gap-4 max-w-2xl mx-auto border rounded-lg p-20 bg-white drop-shadow-2xl">
            <h1 className="text-2xl font-semibold text-center">设置</h1>
            <div className="relative overflow-hidden flex flex-col gap-18 p-20 bg-gray-200 rounded-lg w-full content-center items-center justify-center">
            <Form
                labelCol={{
                span: 4,
                }}
                wrapperCol={{
                span: 14,
                }}
                layout="horizontal"
                style={{
                maxWidth: 600,
                }}
            >
                <Form.Item label="昵称">
                <Input />
                </Form.Item>
                <Form.Item label="简介">
                <Input />
                </Form.Item>
                <Form.Item label="头像" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" listType="picture-card">
                    <div>
                    <PlusOutlined />
                    <div
                        style={{
                        marginTop: 8,
                        }}
                    >
                        Upload
                    </div>
                    </div>
                </Upload>
                </Form.Item>
                <Form.Item label="封面" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" listType="picture-card">
                    <div>
                    <PlusOutlined />
                    <div
                        style={{
                        marginTop: 8,
                        }}
                    >
                        Upload
                    </div>
                    </div>
                </Upload>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <button onClick={null} className={`rounded-xl px-8 py-3 text-neutral-100 font-[500] transition tracking-wide w-[200px] outline-none ${isSuccess ? 'bg-amber-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                  {isSuccess ? "设置成功！" : "设置"}
                </button>
                </Form.Item>
            </Form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Settings;