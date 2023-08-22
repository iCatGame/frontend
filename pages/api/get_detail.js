import { ironOptions } from '@/lib/iron';
import { createClient } from '@supabase/supabase-js';
import { withIronSessionApiRoute } from 'iron-session/next';
import { parse } from 'url';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


const handler = async (req, res) => {
  const { method, url } = req;
  const { query } = parse(url, true); // 解析查询参数

  switch (method) {
    case "GET":
      const nick_name = query.nick_name || ""; // 获取 nick_name 参数，如果没有则使用默认值
      // console.log(nick_name)
      const { data, error } = await supabase.from('users').select("*").eq('nick_name', nick_name);

      // res.send({"uid":"5607c429-58d7-4668-b48d-415a08e83364","address":"0x1621ff31d9F3B1c5c70542FC3eBf4539A29B4f1C","nick_name":"User1","egg":{},"avator":null,"cover": null,"bio":null,"icat":{}});
      res.send(data)
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
