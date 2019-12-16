import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

export const startMsg = () => console.log('GRAPH-GATEWAY is started...');

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'BCI', url: 'http://localhost:4400/bciapi-graphql' },
        { name: 'RQM', url: 'http://localhost:4500/rqmapi-graphql' }
    ]
});

(async () => {
    const { schema, executor } = await gateway.load();
    const server = new ApolloServer({ schema, executor });
    server.listen(4000).then(({ url }) => {
        console.log(`Apollo Gateway (graphQL) listens on http://localhost:4000/gateway/`);
    });
})();
