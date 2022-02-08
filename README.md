Originally forked from [naperg](https://github.com/alan345/naperg) boilerplate.

Please do these in order. Part of the goal of the course is to upgrade your
abstract thinking. In addition, clean separation usually means that these APIs
should be thought of almost **completely independently** from the actual code
implementation.

This **does not need to copy Feedly exactly**. We will build a basic RSS reader
from scratch.

# Suggested timeline
Aim to have **Database design** and **API** done by the end of the first day
with some start on the code. 
 
# 0. Database design

You must complete the following tables, at least:

* **Users**: exists already on the boilerplate
* **Sources**: a source can have many articles
* **Feeds**: a feed is a collection of sources that belongs to a user
* **Articles**: an article should have at least a URL; it's up to you to think
    of the rest. Be very careful with the `author` field -- who are the authors
    of articles? Support saving an article.
* **Settings**: dark/light theme, 
* **Subscription plan**: Use an enum for type of subscription plan.

## Completion criteria

Run:
```
prisma generate
prisma migrate
```

The first command will generate a strongly-typed library so that you can do
things like `prisma.user.findMany()` How does the code know that you have a
model called `user`? Because you ran `prisma generate`.

There should be no errors.

# 1. API Design

First, and very importantly, spend some time to study examples of GraphQL
schemas. Do not get started writing immediately. Do not continue until you
understand how relations in GraphQL work. You may need to spend some time
reading articles or having your teammate explain it to you. I recommend starting
with the most basic example: [authors and
books](https://www.apollographql.com/docs/tutorial/schema/).

One note about the above link: the code is not what's important, the schema is
the important thing. Learning to know what to ignore when you read things is
also a very important skill.

Second, design the API. Recall the following things about GraphQL, though if you
have studied the examples carefully, these should be known already:
* There is a top level type `Query`. This is like "GET"
* There is a top level type `Mutation`. This is like "POST"
* A `Source`, for example, should have a field called `posts`, where you can
    retrieve subobjects.

For example, if you want to get a user's feeds, you have two options:
* You could create an endpoint on `Query` that directly returns `feeds` (this is
    probably easier at first).
* You could create an endpoint on `Query` that returns `loggedInUser`, but then
    that user has a field `feed` that you can use to fetch the feed.


But again: I ask you to search for examples of GraphQL schemas. Ultimately,
finding good example is the skill that is needed to learn a new technology.

## Completion criteria
* Define an endpoint that gets a user's feeds with the articles
* Define an endpoint that gets a user's settings
* Define an endpoint that allows you to modify a user's settings
* Define an endpoint that adds an *existing* source to a user's feed. That is, it
    should take the ID of an existing source.
* Make sure the endpoint to create a user takes a subscription plan type.

# 2. Coding
Implement the GraphQL endpoints. You can test this using GraphQL playground.
**You do not need a frontend**. If
your endpoint requires authentication (you may need to read up on "JSON web
tokens"), Google "how to authenticate on GraphQL playground."

Don't forget to insert test data. There are multiple ways to do this, but you
can try using Prisma Studio or you can manually insert it into your SQLite
database.

## Completion criteria
Implement the above endpoints.

# 3. Optional features
This is only if you have extra time. Implement the following somehow.

1. How would you support something like "Integrations" on the Feedly settings page?
2. How would you reset a user's account?
3. How would you upgrade an existing user from a free tier to paid tier?

# Presentation Instructions
Rather than doing a free-form presentation, please follow the format below for the presentation. If things get too unorganized, I will stop you. The goal here is to communicate the main ideas clearly and succintly, which is actually a very important skill as a programmer! The total time allocated will be 15 minutes.

## Part 0: Demo
* Show us the most interesting part of your model.
* Show us the most interesting endpoint of your API.

## Part 1: Process recap
* How did you test whether your API was working?
* Discuss and show three things that were difficult for your team. Each person speaks: that is, every person will present one thing that was difficult (personally or for the team as a whole). Please plan ahead of time who will talk about what.
* Was there anything that you had to change after you started coding? If so, what?

## Part 2: Questions
* Remaining time: questions from me
