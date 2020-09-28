# GraphQL Basics

This repo was made to explore graphQL with node and apollo following along with [this udemy course](https://www.udemy.com/course/graphql-bootcamp/)

## Getting Started

prerequisites: 
* Node v8+ / NPM

### Install

1. Download required dependencies:
    * ```$ npm install -g prisma```
    * [docker ce for appropriate operating system]()
    * [docker-engine for appropriate operating system]()
2. Configure Heroku (or other host site)
3. Run ```$ npm install```
4. Run ```$ npm start```
5. Visit [graphql playground](http://localhost:4466/) to run queries
6. Connect to frontend

# Dependency Notes

* graphql-yoga - for running the server
* graphql-cli - for running common graphql commands from the command line
* prisma - for managing database queries in accordance with schema (ORM+)
* Docker - for deployment with heroku
* Heroku - hosting the database
* Nodemon  - for server refresh on file change during development
* babel[plugins] - for TS/ES7+ etc.
* uuid - for random id generation