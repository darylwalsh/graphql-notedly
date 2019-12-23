const Query = require('./query')
const Mutation = require('./mutation')
import { GraphQLDateTime } from 'graphql-iso-date'

module.exports = { Query, Mutation, DateTime: GraphQLDateTime }
