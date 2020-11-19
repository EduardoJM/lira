import express from 'express';
import cors from 'cors';
import ip from 'ip';
import routes from './routes';

const app = express();

app.use(cors());
app.use(routes);

console.log(ip.address());

app.listen(3333, () => {
    console.log('Server runing...');
});
