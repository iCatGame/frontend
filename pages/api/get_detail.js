import { parse } from 'url';

const handler = async (req, res) => {
  const { method, url } = req;
  const { query } = parse(url, true); // 解析查询参数

  switch (method) {
    case "GET":
      const nickName = query.nick_name || "default_nick"; // 获取 nick_name 参数，如果没有则使用默认值
      res.send({"uid":"5607c429-58d7-4668-b48d-415a08e83364","address":"0x1621ff31d9F3B1c5c70542FC3eBf4539A29B4f1C","nick_name":"User1","egg":{},"avator":null,"cover": null,"bio":null,"icat":{}});
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
