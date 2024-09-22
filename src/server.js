import jsonServer from 'json-server';
import auth from 'json-server-auth';
const server = jsonServer.create();
const router = jsonServer.router('/Du_an_thuc_tap/db.json'); // Đường dẫn tới file db.json
const middlewares = jsonServer.defaults();

// Cấu hình json-server sử dụng auth middleware
server.db = router.db;
server.use(middlewares);
server.use(auth); // Bổ sung json-server-auth vào các API
server.use(router);

// Lắng nghe server tại cổng 3000
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
