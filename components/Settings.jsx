import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  message,
  Upload,
} from 'antd';
import AntdImgCrop from 'antd-img-crop';
import { useAccount } from 'wagmi';
import { toast, Toaster } from 'react-hot-toast';

const Settings = ({ profile }) => {

  const [isSuccess, setIsSuccess] = useState(false);
  const [nick_name, setNick_name] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFileList, setAvatarFileList] = useState([]);
  const [coverFileList, setCoverFileList] = useState([]);
  const { address } = useAccount();


  const normFile = (e) => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = async (values) => {
    // console.log(values, avatarFileList, coverFileList);
    const resSet = await fetch('/api/update_profile', {
      method: "POST",
      body: JSON.stringify({
        address: address,
        nick_name: values.nick_name,
        bio: values.bio,
        avatar: 'https://black-protective-chicken-728.mypinata.cloud/ipfs/' + avatarFileList[0].response.IpfsHash,
        cover: 'https://black-protective-chicken-728.mypinata.cloud/ipfs/' + coverFileList[0].response.IpfsHash
      })
    })
    // console.log(resSet)
    if (resSet.status == 200) {
      setIsSuccess(() => true);
      toast.success("设置成功")
    }
    else {
      console.log(resSet?.error)
      toast.error("出错了，原因请查看浏览器控制台");
    }
  }

  const onFinishFailed = async (err) => {
    toast.error("出错了，原因请查看浏览器控制台");
    console.log(err)
  }

  const beforeUpload = async (file) => {
    console.log(file)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传png或jpg图片!');
    }
    return isJpgOrPng;
  }

  useEffect(() => {
    // console.log('profile', profile)
    setNick_name(profile?.nick_name);
    setBio(profile?.bio);
  }, [profile, avatarFileList, coverFileList])

  return (
    <div className="bg-white min-h-screen">
      <Toaster />
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col content-center items-center justify-center gap-4 max-w-2xl mx-auto border rounded-lg p-20 bg-white drop-shadow-2xl">
          <h1 className="text-2xl font-semibold text-center">设置</h1>
          <div className="relative overflow-hidden flex flex-col gap-18 p-20 bg-gray-200 rounded-lg w-full content-center items-center justify-center">
            <Form labelCol={{ span: 4, }} wrapperCol={{ span: 14, }} layout="horizontal" className='max-w-[600px]' onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{
              'nick_name': profile?.nick_name,
              'bio': profile?.bio
            }}>
              <Form.Item label="昵称" name="nick_name">
                <Input value={nick_name}/>
              </Form.Item>
              <Form.Item label="简介" name="bio">
                <Input value={bio} />
              </Form.Item>
              <Form.Item label="头像" valuePropName="fileList" getValueFromEvent={normFile} name="avatar" extra="头像比例为1:1">
                <AntdImgCrop rotationSlider showGrid showReset aspect={1/1} cropShape='round' modalCancel="取消" modalOk='确定' name="avatar">
                  <Upload.Dragger
                    beforeUpload={beforeUpload}
                    action='https://api.pinata.cloud/pinning/pinFileToIPFS' 
                    headers={{
                      Pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY, 
                      Pinata_secret_api_key:process.env.NEXT_PUBLIC_PINATA_API_SECRET 
                    }} 
                    maxCount={1} 
                    listType="picture-card"
                    fileList={avatarFileList}
                    onChange={({ fileList }) => setAvatarFileList(fileList)}
                  >
                    <div>
                      <UploadOutlined />
                      <div className='mt-2'>
                          上传
                      </div>
                    </div>
                  </Upload.Dragger>
                </AntdImgCrop>
              </Form.Item>
              <Form.Item label="封面" valuePropName="fileList" getValueFromEvent={normFile} name="cover">
                <AntdImgCrop rotationSlider showGrid showReset aspect={1500/250} modalCancel="取消" modalOk='确定' name="cover">
                  <Upload.Dragger 
                  beforeUpload={beforeUpload} 
                  action='https://api.pinata.cloud/pinning/pinFileToIPFS' 
                    headers={{
                      Pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY, 
                      Pinata_secret_api_key:process.env.NEXT_PUBLIC_PINATA_API_SECRET 
                    }} 
                  maxCount={1} 
                  listType="picture-card"
                  fileList={coverFileList}
                  onChange={({ fileList }) => setCoverFileList(fileList)}
                  >
                    <div>
                      <UploadOutlined />
                      <div className='mt-2'>
                          上传
                      </div>
                    </div>
                  </Upload.Dragger>
                </AntdImgCrop>
              </Form.Item>
              <Form.Item className='flex justify-start pt-2'>
                <Button htmlType="submit" className={`rounded-xl px-8 py-3 text-neutral-100 font-[500] transition tracking-wide w-[200px] h-12 outline-none flex justify-center items-center ${isSuccess ? 'bg-amber-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                  {isSuccess ? "设置成功！" : "设置"}
                </Button>
              </Form.Item>

            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings;