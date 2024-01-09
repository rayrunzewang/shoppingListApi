const express = require('express');
const router = express.Router();

const { ShoppingItem } = require('../../models/shoppingList');
const { test, getAll, getItem  } = require('../../controllers/shoppinglist/textAndGet');

router.get('/', test);

router.get('/v1/current-shopping-list/get-all', getAll);

router.get('/v1/current-shopping-list/get-item/:id', getItem);
// TODO 完成 controller
router.post('/v1/current-shopping-list/add-item', async (req, res) => {
  try {
    const createdItem = await ShoppingItem.create(req.body); // 创建新的购物清单项并保存到数据库
    /* TODO
    create() 方法通常用于创建一个新的集合（collection）。
    insertOne() 方法用于向集合中插入单个文档。
    */
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
