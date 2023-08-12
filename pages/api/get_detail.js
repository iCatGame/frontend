import { parse } from 'url';

const handler = async (req, res) => {
  const { method, url } = req;
  const { query } = parse(url, true); // 解析查询参数

  switch (method) {
    case "GET":
      const nickName = query.nick_name || "default_nick"; // 获取 nick_name 参数，如果没有则使用默认值
      res.send({ address: "0x", nick_name: nickName });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
