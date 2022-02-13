# RSS Puller Implementation

## Step 0: Read this carefully
During the last project and throughout the course, I have noticed questions
being asked that sometimes illustrate that documentation or instructions were
not read. If this was your workplace and I was your boss, it would not be good.

Therefore, please be in the habit of reading something (instructions,
documentation) and knowing generally what information is there. You do not need
to memorize that information, but you should, for example, remember that there
are a series of steps that you should complete in order, and you can always
check the document if needed.

## Step 1. Seed sources
Seed some sources according to the Prisma schema. You are all familiar with
`seed.ts`. This time, you must seed **valid sources** with real RSS feed URLs.
Please add at least five sources. Please do not do this manually (i.e., insert
rows in the database using an admin tool); use the seed script.

## Step 2. Write the script.
There instructions here will be brief, because there is a substantial amount of
pseudocode inside `script/puller.ts`. Please read the pseudocode carefully.

## Step 3. Read and implement the new GraphQL API
Familiarize yourself with the GraphQL API that I have written for you with
comments.

Ask yourself the following questions:
* How easy or hard would it be to understand these endpoints without comments
  above them?
* What can you do to get in the habit of writing such comments?

Check any TODOs in the `typeDefs/` folder carefully.

## Step 4. Make a frontend
Create a very basic React frontend. It's not important how it looks, but it
should do the following:
* **Source list page**. Query an endpoint to get a list of sources. You need to create a new endpoint
    for this. 
* **Source detail page**. When a user clicks on the source, it refreshes the source in the backend and
    then shows a list of articles. 
* **Article page**. Show the contents of an article after the user clicks on an
    article.

For a first version, you can ignore handling logged in users.
## Bonus section
* **Pagination**: Add pagination to the API and the part of the script that retrieves the
    sources. In a real app, you probably have too many sources to simply
    retrieve it in memory once.
* **Rate limiting**: Add
    [throttling](https://www.google.com/search?q=throttle+for+loop+node)
    somehow, again to prevent too many writes per second to the database.

# Presentation
Please use this as a guideline for the presentation.

## Demo
10 minutes. Please show the following:

* Your frontend, if it exists.
* Any API endpoints you added (e.g., for frontend) or any changes to the API
    (e.g., for pagination).
* One piece of code (it can be a line, function, etc.) that was difficult to get working.
* One piece of code that you thought was interesting.

Please **try to avoid simply walking through code** in an unstructured manner.

## Reflection
5 minutes.

Each person answer the following questions: 
* What was one thing that was more difficult than you thought it would be?
* If you could go back, what is one thing you would do differently?


