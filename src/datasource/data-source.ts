import {DataSource} from 'typeorm';
import {Product} from '../entities/product.entity';
import {User} from '../entities/user.entity';


export const AppDataSource = new DataSource({
    type: 'mongodb',
    url: "mongodb+srv://Kelvin:bXrSixPBlxZRVmo4@taphoa.mdtds.mongodb.net/?retryWrites=true&w=majority&appName=TapHoa",
    synchronize: true,
    logging: true,
    entities: [Product, User],
});