import { ironOptions } from '@/lib/iron';
import { createClient } from '@supabase/supabase-js';
import { withIronSessionApiRoute } from 'iron-session/next';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


const handler = async (req, res) => {
  const { method, url } = req;
  // console.log(req.body)

  switch (method) {
    case "POST":
      // console.log(req.body)
      const { address, nick_name, bio, avatar, cover } = JSON.parse(req.body); // 解析查询参数
      // console.log(address, nick_name, bio, avatar, cover)
      const { error } = await supabase
        .from('users')
        .update({
          nick_name : nick_name || null,
          bio       : bio       || null,
          avatar    : avatar    || null,
          cover     : cover     || null
        })
        .eq('address', address);

      console.log(error);
      
      if (error) {
        res.status(400).json({ ok: error, error: error });
      }
      else {
        res.status(200).json({ ok: true });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
