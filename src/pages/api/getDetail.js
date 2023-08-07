
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        // 获取数据库中的所有用户数据
        const { data, error } = await supabase.from('users').select('*');

        if (error) {
          throw new Error(error.message);
        }
        console.log('用户数据：', data);

        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users from the database.' });
      }
      break;
    case 'POST':
      try {
        // 向数据库中添加新用户
        const newUser = req.body; // 假设请求体中包含要添加的用户信息

        const { data, error } = await supabase.from('users').insert([newUser]);

        if (error) {
          throw new Error(error.message);
        }

        res.status(201).json(data[0]);
      } catch (error) {
        res.status(500).json({ error: 'Failed to add user to the database.' });
      }
      break;
    case 'PUT':
      try {
        // 更新数据库中的用户信息
        const { uid } = req.query; // 假设请求参数中包含要更新的用户的uid
        const updatedUser = req.body; // 假设请求体中包含要更新的用户信息

        const { data, error } = await supabase.from('users').update(updatedUser).eq('uid', parseInt(uid));

        if (error) {
          throw new Error(error.message);
        }

        res.json(data[0]);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update user in the database.' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
