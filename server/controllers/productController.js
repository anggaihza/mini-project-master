const {Op} = require("sequelize");
const db = require("../models");
const jwt = require("jsonwebtoken");

const user = db.User;
const merchant = db.Merchant;
const product = db.Product;

module.exports = {
  addProduct: async (req, res) => {
    let token = req.headers.authorization;
    const {name, description, price, stock, image, category_id} = req.body;

    if (!token) {
      return res.status(400).send(`Token Unauthorize or expired`);
    }

    try {
      token = token.split(" ")[1];

      if (!name || !description || !price || !stock || !image || !category_id)
        throw res.status(400).send(`Please complete your data`);

      const verifyUser = jwt.verify(token, "JWT");
      console.log(verifyUser);

      const userExist = await user.findOne({
        where: {
          id: verifyUser.id,
        },
      });

      const merchantExist = await merchant.findOne({
        where: {
          user_id: verifyUser.id,
        },
      });

      if (userExist.merchant_status) {
        const data = await product.create({
          merchant_id: merchantExist.id,
          ...req.body,
        });

        res.status(200).send({
          status: true,
          data,
          message: `Success add product`,
        });
      } else {
        throw `You need to be a merchant to sell product`;
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  showProduct: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 9; // limitnya, jadi hanya menampilkan 9 produk per halaman

      const categoryId = parseInt(req.query.category) || null;
      const productName = req.query.name || null;

      const categoryQuery = categoryId ? {category_id: categoryId} : {};
      const productQuery = productName
        ? {name: {[Op.like]: "%" + productName + "%"}}
        : {};

      const totalRows = await product.count();
      const totalPage = Math.ceil(totalRows / limit);

      let result = await product.findAll({
        where: {
          ...categoryQuery,
          ...productQuery,
        },
        order: [[req.query.order, req.query.sort]], // order by , desc/asc
        limit: limit,
        offset: (page - 1) * limit,
      });
      res.status(200).send({
        status: true,
        data: result,
        totalPage: totalPage,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  productDetails: async (req, res) => {
    try {
      const query = `SELECT products.id, products.name AS product_name, products.description, products.price, products.stock, products.image,
      categories.id AS category_id, categories.name AS category, 	merchants.id AS merchant_id, merchants.name AS merchant, merchants.address
      FROM products
      INNER JOIN categories ON categories.id = products.category_id
      INNER JOIN merchants ON merchants.id = products.merchant_id
      WHERE products.id=${req.params.id}`;

      const [result] = await db.sequelize.query(query);

      res.status(200).send({
        status: true,
        data: result,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  updateProduct: async (req, res) => {
    try {
      await product.update(req.body, {
        where: {
          id: parseInt(req.params.id),
        },
      });

      res.status(200).send({
        status: true,
        message: `Success update product`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
