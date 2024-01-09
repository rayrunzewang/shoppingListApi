const { ShoppingItem } = require('../../models/shoppingList');

const test = (req, res) => {
  res.json('Hello, World!');
  /* TODO 区别 json 和 send
    res.end('Hello, World!');
  */
}

const getAll = async (req, res) => {
  try {
    const shoppingList = await ShoppingItem.find();
    res.json(shoppingList);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

const getItem = async (req, res) => {
  const shoppingListId = req.params.id;

  try {
    // 查询数据库，通过唯一标识符获取特定购物清单
    const shoppingList = await ShoppingItem.findById(shoppingListId);

    if (!shoppingList) {
      // 如果找不到匹配的购物清单，返回 404 Not Found
      return res.status(404).json({ error: 'Item not found' });
    }

    // 将查询到的购物清单作为 JSON 响应发送给客户端
    res.json(shoppingList);
  } catch (error) {
    // 发生错误时返回 500 内部服务器错误
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { test, getAll, getItem };