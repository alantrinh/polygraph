import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLFloat } from 'graphql';

const GdpPerCapitaType: GraphQLObjectType = new GraphQLObjectType({
    name: 'GdpPerCapita',
    fields: () => ({
        id: { type: GraphQLString },
        country: { type: GraphQLString },
        year: { type: GraphQLInt },
        amount: { type: GraphQLFloat }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        gdp: {
            type: new GraphQLList(GdpPerCapitaType),
            args: { dataSource: { type: GraphQLString } },
            resolve(parentValue, { dataSource }) {
                // generate random data
                if (dataSource === 'random') {
                    const gdp =[];
                    for (const country of ['USA', 'Germany', 'United Kingdom']) {
                        for (let year = 1990; year < 2022; year++) {
                            const amount = Math.floor(Math.random() * 65000);
                            gdp.push({ country, year, amount });
                        }
                    }
                    return gdp;
                }

                // get data from mongodb
                return fetch(`http://localhost:8080`)
                    .then(async res => {
                        const arr: {  _id: string, country: string, year: string, amount: string }[] = await res.json();
                        return arr.map(({ _id, country, year, amount }) => ({ id: _id, country, year, amount }));
                    });
            }
        }
    }
});

export const schema = new GraphQLSchema({
    query: RootQuery
});
