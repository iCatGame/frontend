import { GithubFilled } from "@ant-design/icons";
import Link from "next/link";

const FooterApp = () => {
  return (
    <div className="bg-footer bg-black">
      <div className="text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-row justify-between gap-10">
            <div className="flex flex-col gap-6">
              <div className="text-xl font-bold">
                <Link href="/" passHref className="hover:text-white">
                  iCat
                </Link>
              </div>
              <div className="text-sm">
                基于AIGC的区块链游戏，玩家可以通过游戏体验到区块链
                <br /> 和AIGC的乐趣，开发者可以学习在Web3.0开发
              </div>
            </div>
            <div className="flex flex-col gap-6 text-xs">
              <div className="text-xl font-semibold">相关链接</div>
              <div className="flex gap-4">
                <a
                  href="https://github.com/BlockchainGameWithAIGC/frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <GithubFilled />
                </a>
                {/* <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="p-3 bg-gray-800 rounded-full text-xl hover:bg-gray-700">
                  </div>
                </a> */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10"></div>
          <div className="flex justify-between items-center gap-10 mt-10 text-xs">
            <div>© {new Date().getFullYear()} iCat. All rights reserved.</div>
            <div className="flex gap-4 text-xs">
              <a
                href="https://game-tutorial-beta.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                开发文档
              </a>
              <a
                href="https://github.com/BlockchainGameWithAIGC/frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                源代码
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterApp;