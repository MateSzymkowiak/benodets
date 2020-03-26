import * as express from 'express';
import Post from './post.interface';
import * as mysql from 'mysql';

class PostsController {
    public path = '/posts';
    public router = express.Router();

    private dbCredentials = {
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'my_db'
    };

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.post(this.path, this.createAPost);
    }

    getAllPosts = (request: express.Request, response: express.Response) => {
        let connection = mysql.createConnection(this.dbCredentials);
        connection.connect();
        connection.query('SELECT * FROM Posts ORDER BY id DESC', function (error, results, fields) {
            if (error) throw error;
            else {
                response.status(200).send(this.results);
            }
        });
        response.status(500).send({error:"DB connection problem"});
    };

    createAPost = (request: express.Request, response: express.Response) => {
        const post: Post = request.body;
        let connection = mysql.createConnection(this.dbCredentials);
        connection.connect();

        let sql = `INSERT INTO Posts (author,title,content) VALUES("${post.author}","${post.title}","${post.content}");`;
        connection.query( sql, function (error, results, fields) {
            if (error) {
                response.status(500).send({error:"DB connection problem"});
                throw error;
            }else{
                response.status(201).send(post);
            }
        });

        // connection.query('SELECT @@IDENTITY AS id', post, function (error, results, fields) {
        //     if (error) {
        //         response.status(500).send({error:"DB connection problem"});
        //         throw error;
        //     }
        // });


    }
}

export default PostsController;