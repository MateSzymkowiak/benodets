import App from './app';
import PostsController from './posts/posts.controller';

const port = process.env.PORT || 3000;

const app = new App(
    [
        new PostsController(),
    ],
    port
);

app.listen();