const express = require('express');
const router = express.Router();

const { ShoppingItem, ShoppingList } = require('../models/shoppingList');

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.get('/v1/current-shopping-list/get-all', async (req, res) => {
  try {
    const shoppingList = await ShoppingItem.find();
    res.json(shoppingList);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/v1/current-shopping-list/get-item/:id', async (req, res) => {
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
});

router.post('/v1/current-shopping-list/add-item', async (req, res) => {
  try {
    const createdItem = await ShoppingItem.create(req.body); // 创建新的购物清单项并保存到数据库
    const shoppingList = await ShoppingItem.find();
    console.log(createdItem);
    res.status(201).json({ message: 'Item added successfully', shoppingList, createdItem });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/v1/current-shopping-list/delete-item/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const existingItem = await ShoppingItem.findById(itemId);

    if (!existingItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const result = await ShoppingItem.deleteOne({ _id: itemId });

    console.log(result)

    res.status(204).send(); 

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
