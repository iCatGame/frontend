import { ConnectButton } from "@rainbow-me/rainbowkit";

export const NotLoggedIn = () => {

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-[600px] mx-auto text-center mt-10">
        <h1 className="text-2xl font-semibold mb-4">请登录</h1>
        <p className="text-base mb-6">
          点击下面按钮链接钱包登录到iCat
        </p>
        <div className="flex justify-center items-center">
          <ConnectButton label="链接钱包"/>
        </div>
      </div>
    </div>
  );
};
